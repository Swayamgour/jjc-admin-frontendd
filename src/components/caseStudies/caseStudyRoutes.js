const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth"); // adjust path to your actual auth middleware
const { uploadImage } = require("../config/cloudinary");

const ctrl = require("../controllers/caseStudyController");

/* ------------------------- Public ------------------------- */

// Full detail-page payload — story + auto-computed "Related reports"
// GET /api/case-studies/slug/story-twenty-million-records-a-year-processed-without-new
router.get("/slug/:slug", ctrl.getCaseStudyBySlug);

/* ------------------------- Admin (specific paths BEFORE /:id) ------------------------- */

// Edit-wizard population — any status, unwrapped
// GET /api/case-studies/admin/slug/:slug
router.get("/admin/slug/:slug", protect, authorize("admin", "editor"), ctrl.getCaseStudyBySlugAdmin);

router.patch("/:id/toggle-publish", protect, authorize("admin", "editor"), ctrl.togglePublishCaseStudy);

router.post(
  "/",
  protect,
  authorize("admin", "editor"),
  uploadImage.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  ctrl.createCaseStudy
);

router.put(
  "/:id",
  protect,
  authorize("admin", "editor"),
  uploadImage.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  ctrl.updateCaseStudy
);

router.delete("/:id", protect, authorize("admin", "editor"), ctrl.deleteCaseStudy);

/* ------------------------- Raw list / get-by-id (keep LAST — /:id is a catch-all) ------------------------- */

router.get("/", ctrl.getCaseStudies);
router.get("/:id", ctrl.getCaseStudyById);

module.exports = router;
