const slugify = require("slugify");
const CaseStudy = require("../models/CaseStudy");
const { parseJsonFields, resolveParentCategory } = require("../utils/caseStudyHelpers");

const JSON_FIELDS = [
  "heroStats",
  "glanceItems",
  "situation",
  "approachText",
  "outcomes",
  "products",
  "platforms",
  "transfers",
  "sourcing",
  "org",
];

/* ------------------------------------------------------------------ */
/* CREATE                                                              */
/* ------------------------------------------------------------------ */
exports.createCaseStudy = async (req, res) => {
  try {
    const body = { ...req.body };
    parseJsonFields(body, JSON_FIELDS);

    if (!body.sourceType || !["industry", "capability"].includes(body.sourceType)) {
      return res.status(400).json({
        success: false,
        message: "sourceType must be 'industry' or 'capability'",
      });
    }

    if (!body.parentSlug) {
      return res.status(400).json({
        success: false,
        message: "parentSlug is required (the Industry/Capability slug)",
      });
    }

    const parentCategory = await resolveParentCategory(body.sourceType, body.parentSlug);
    if (!parentCategory) {
      return res.status(400).json({
        success: false,
        message: `No ${body.sourceType} category found for slug "${body.parentSlug}"`,
      });
    }

    body.parent = parentCategory._id;
    delete body.parentSlug;

    // ---- files (cloudinary) ----
    const heroFile = req.files?.heroImage?.[0];
    const galleryFiles = req.files?.galleryImages || [];

    if (heroFile) {
      body.heroImage = { url: heroFile.path, publicId: heroFile.filename };
    }
    if (galleryFiles.length) {
      body.gallery = galleryFiles.map((f) => ({ url: f.path, publicId: f.filename }));
    }

    // Gap slots don't need a real slug/title flow through the story detail page
    if (!body.isGap) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }

    const caseStudy = await CaseStudy.create(body);
    res.status(201).json({ success: true, data: caseStudy });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* LIST  — powers the admin table and any raw filtered fetch           */
/* GET /api/case-studies?sourceType=industry&parentSlug=healthcare      */
/* ------------------------------------------------------------------ */
exports.getCaseStudies = async (req, res) => {
  try {
    const { sourceType, parentSlug, status } = req.query;
    const filter = {};

    if (sourceType) filter.sourceType = sourceType;
    filter.status = status || "published";

    if (parentSlug) {
      const parentCategory = await resolveParentCategory(sourceType, parentSlug);
      if (!parentCategory) {
        return res.status(200).json({ success: true, data: [] });
      }
      filter.parent = parentCategory._id;
    }

    const caseStudies = await CaseStudy.find(filter)
      .populate("parent", "name slug type theme icon")
      .select("title slug description heroImage heroStats industryTag capabilityTag isGap sourceType parent status createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: caseStudies });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* GET ONE by id (admin edit form)                                     */
/* ------------------------------------------------------------------ */
exports.getCaseStudyById = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id).populate("parent", "name slug type theme icon");
    if (!caseStudy) {
      return res.status(404).json({ success: false, message: "Case study not found" });
    }
    res.status(200).json({ success: true, data: caseStudy });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* ADMIN — get by slug, any status (edit wizard population)            */
/* GET /api/case-studies/admin/slug/:slug                              */
/* Unlike the public slug endpoint, this ignores status and returns    */
/* the raw document (no "related" wrapper) so the wizard can populate  */
/* its form directly from response.data.                               */
/* ------------------------------------------------------------------ */
exports.getCaseStudyBySlugAdmin = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({ slug: req.params.slug }).populate(
      "parent",
      "name slug type theme icon"
    );
    if (!caseStudy) {
      return res.status(404).json({ success: false, message: "Case study not found" });
    }
    res.status(200).json({ success: true, data: caseStudy });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* ADMIN — toggle publish status                                       */
/* PATCH /api/case-studies/:id/toggle-publish                          */
/* ------------------------------------------------------------------ */
exports.togglePublishCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    if (!caseStudy) {
      return res.status(404).json({ success: false, message: "Case study not found" });
    }
    caseStudy.status = caseStudy.status === "published" ? "draft" : "published";
    await caseStudy.save();
    res.status(200).json({ success: true, data: caseStudy });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* PUBLIC — full detail-page payload                                   */
/* GET /api/case-studies/slug/:slug                                    */
/* Powers SuccessStoryTwentyMillionRecords...jsx — returns the story    */
/* plus an auto-computed "Related reports" rail (max 4).                */
/* ------------------------------------------------------------------ */
exports.getCaseStudyBySlug = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({
      slug: req.params.slug,
      status: "published",
    }).populate("parent", "name slug type theme icon");

    if (!caseStudy) {
      return res.status(404).json({ success: false, message: "Case study not found" });
    }

    const related = await getRelatedCaseStudies(caseStudy);

    res.status(200).json({ success: true, data: { caseStudy, related } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Related reports: prefer same capabilityTag, then same industryTag,
 * then just the most recent published stories. Excludes self and gaps.
 */
async function getRelatedCaseStudies(caseStudy, limit = 4) {
  const baseFilter = {
    _id: { $ne: caseStudy._id },
    status: "published",
    isGap: false,
  };

  const byCapability = caseStudy.capabilityTag
    ? await CaseStudy.find({ ...baseFilter, capabilityTag: caseStudy.capabilityTag })
        .select("title slug industryTag capabilityTag")
        .limit(limit)
    : [];

  if (byCapability.length >= limit) return byCapability.slice(0, limit);

  const excludeIds = [caseStudy._id, ...byCapability.map((c) => c._id)];
  const byIndustry = caseStudy.industryTag
    ? await CaseStudy.find({
        _id: { $nin: excludeIds },
        status: "published",
        isGap: false,
        industryTag: caseStudy.industryTag,
      })
        .select("title slug industryTag capabilityTag")
        .limit(limit - byCapability.length)
    : [];

  const combined = [...byCapability, ...byIndustry];
  if (combined.length >= limit) return combined;

  const fillIds = [caseStudy._id, ...combined.map((c) => c._id)];
  const fillers = await CaseStudy.find({
    _id: { $nin: fillIds },
    status: "published",
    isGap: false,
  })
    .select("title slug industryTag capabilityTag")
    .sort({ createdAt: -1 })
    .limit(limit - combined.length);

  return [...combined, ...fillers];
}

/* ------------------------------------------------------------------ */
/* UPDATE                                                               */
/* ------------------------------------------------------------------ */
exports.updateCaseStudy = async (req, res) => {
  try {
    const body = { ...req.body };
    parseJsonFields(body, JSON_FIELDS);

    if (body.sourceType && body.parentSlug) {
      const parentCategory = await resolveParentCategory(body.sourceType, body.parentSlug);
      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          message: `No ${body.sourceType} category found for slug "${body.parentSlug}"`,
        });
      }
      body.parent = parentCategory._id;
    }
    delete body.parentSlug;

    const heroFile = req.files?.heroImage?.[0];
    const galleryFiles = req.files?.galleryImages || [];

    if (heroFile) {
      body.heroImage = { url: heroFile.path, publicId: heroFile.filename };
    }
    if (galleryFiles.length) {
      body.gallery = galleryFiles.map((f) => ({ url: f.path, publicId: f.filename }));
    }

    if (body.title && !body.isGap) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }

    const caseStudy = await CaseStudy.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!caseStudy) {
      return res.status(404).json({ success: false, message: "Case study not found" });
    }

    res.status(200).json({ success: true, data: caseStudy });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* DELETE                                                               */
/* ------------------------------------------------------------------ */
exports.deleteCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByIdAndDelete(req.params.id);
    if (!caseStudy) {
      return res.status(404).json({ success: false, message: "Case study not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
