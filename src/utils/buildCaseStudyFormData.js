// Matches backend controllers/caseStudyController.js JSON_FIELDS exactly.
// Anything NOT in this list is sent as a plain string field.
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
  "seoKeywords",
];

/**
 * Builds the multipart/form-data payload the backend expects for
 * POST /case-studies and PUT /case-studies/:id.
 *
 * `form` should carry: title, sourceType, parentSlug, description,
 * industryTag, capabilityTag, isGap, gapNote, org, heroEyebrow, heroLede,
 * heroStats, glanceItems, situation, approachText, resultsHeading,
 * resultsLede, outcomes, products, platforms, transfers, sourcing,
 * status, heroImage (File | {url,publicId} | null),
 * gallery (File[] | {url,publicId}[])
 */
export function buildCaseStudyFormData(form) {
  const fd = new FormData();

  const PLAIN_FIELDS = [
    "title",
    "sourceType",
    "description",
    "industryTag",
    "capabilityTag",
    "isGap",
    "gapNote",
    "heroEyebrow",
    "heroLede",
    "resultsHeading",
    "resultsLede",
    "status",
  ];

  PLAIN_FIELDS.forEach((key) => {
    const value = form[key];
    if (value === undefined || value === null) return;
    fd.append(key, typeof value === "boolean" ? String(value) : value);
  });

  // The Basic Info step stores the selected category under `form.parent`
  // (it's the <Select> value, populated with each category's slug) — the
  // backend expects that same value under the `parentSlug` field.
  if (form.parent) {
    fd.append("parentSlug", form.parent);
  }

  JSON_FIELDS.forEach((key) => {
    const value = form[key];
    if (value === undefined || value === null) return;
    fd.append(key, JSON.stringify(value));
  });

  // Hero image: only append if the user picked a NEW file.
  // (An existing {url, publicId} object means "keep as is" — leave it out.)
  if (form.heroImage instanceof File) {
    fd.append("heroImage", form.heroImage);
  }

  // Gallery: backend REPLACES the whole gallery array whenever new files are
  // uploaded, so only send files here when the user is adding/replacing images.
  const newGalleryFiles = (form.gallery || []).filter((item) => item instanceof File);
  newGalleryFiles.forEach((file) => fd.append("galleryImages", file));

  return fd;
}