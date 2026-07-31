// Matches backend controllers/caseStudyController.js JSON_FIELDS exactly:
//   heroSection, successStories, relatedCapabilities, ctaSection, seo
// Anything NOT in this list is sent as a plain string field.
const JSON_FIELDS = [
  "heroSection",
  "successStories",
  "relatedCapabilities",
  "ctaSection",
  "seo",
];

const PLAIN_FIELDS = ["name", "sourceType", "status"];

/**
 * Builds the multipart/form-data payload the backend expects for
 * POST /case-studies and PUT /case-studies/:id.
 *
 * `form` should carry: name, sourceType, parentSlug, status,
 * heroSection, successStories, relatedCapabilities, ctaSection, seo,
 * heroImage (File | {url,publicId} | null)
 */
export function buildCaseStudyFormData(form) {
  const fd = new FormData();

  PLAIN_FIELDS.forEach((key) => {
    const value = form[key];
    if (value === undefined || value === null) return;
    fd.append(key, value);
  });

  if (form.parentSlug) {
    fd.append("parentSlug", form.parentSlug);
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

  return fd;
}
