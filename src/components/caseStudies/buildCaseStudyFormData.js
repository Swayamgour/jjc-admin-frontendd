/**
 * Serializes the CaseStudy wizard form into FormData for multipart upload.
 * Field names here must stay in sync with:
 *   - backend/controllers/caseStudyController.js  → JSON_FIELDS
 *   - backend/models/CaseStudy.js
 */

const SCALAR_FIELDS = [
  "title",
  "description",
  "sourceType",
  "industryTag",
  "capabilityTag",
  "gapNote",
  "heroEyebrow",
  "heroLede",
  "resultsHeading",
  "resultsLede",
  "status",
];

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

export function buildCaseStudyFormData(form) {
  const fd = new FormData();

  SCALAR_FIELDS.forEach((key) => {
    if (form[key] !== undefined && form[key] !== null) {
      fd.append(key, form[key]);
    }
  });

  fd.append("isGap", form.isGap ? "true" : "false");
  fd.append("parentSlug", form.parent || "");

  JSON_FIELDS.forEach((key) => {
    if (form[key] !== undefined) {
      fd.append(key, JSON.stringify(form[key]));
    }
  });

  if (form.heroImage instanceof File) {
    fd.append("heroImage", form.heroImage);
  }

  (form.gallery || []).forEach((item) => {
    if (item instanceof File) {
      fd.append("galleryImages", item);
    }
  });

  return fd;
}
