export const buildCaseStudyFormData = (form) => {
  const formData = new FormData();

  // simple fields
  formData.append("title", form.title || "");
  formData.append("description", form.description || "");
  formData.append("sourceType", form.sourceType || "industry");
  formData.append("parentSlug", form.parent || "");
  formData.append("ctaLabel", form.ctaLabel || "");
  formData.append("ctaLink", form.ctaLink || "");

  // JSON fields
  formData.append("techBadges", JSON.stringify(form.techBadges || []));
  formData.append("heroStats", JSON.stringify(form.heroStats || []));
  formData.append("clientInfo", JSON.stringify(form.clientInfo || []));
  formData.append("overview", JSON.stringify(form.overview || {}));
  formData.append("challenge", JSON.stringify(form.challenge || {}));
  formData.append("solution", JSON.stringify(form.solution || {}));
  formData.append("approach", JSON.stringify(form.approach || {}));
  formData.append("results", JSON.stringify(form.results || {}));
  formData.append("technologies", JSON.stringify(form.technologies || {}));
  formData.append("beforeAfter", JSON.stringify(form.beforeAfter || {}));
  formData.append("faqs", JSON.stringify(form.faqs || []));
  formData.append("resources", JSON.stringify(form.resources || {}));

  // testimonial — strip the image (sent as a file separately if new)
  formData.append(
    "testimonial",
    JSON.stringify({
      ...form.testimonial,
      image: form.testimonial?.image instanceof File ? undefined : form.testimonial?.image,
    })
  );

  // hero image
  if (form.heroImage instanceof File) {
    formData.append("heroImage", form.heroImage);
  }

  // testimonial image
  if (form.testimonial?.image instanceof File) {
    formData.append("testimonialImage", form.testimonial.image);
  }

  // gallery — split into kept-existing (already-uploaded objects) vs new files
  const gallery = form.gallery || [];
  const existingGallery = gallery.filter((g) => !(g instanceof File));
  const newGalleryFiles = gallery.filter((g) => g instanceof File);

  formData.append("existingGallery", JSON.stringify(existingGallery));
  newGalleryFiles.forEach((file) => formData.append("galleryImages", file));

  return formData;
};
