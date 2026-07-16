export function buildBlogFormData(form) {
  const formData = new FormData();

  // Basic
  formData.append("title", form.title || "");
  formData.append("slug", form.slug || "");
  formData.append("category", form.category || "");
  formData.append("description", form.description || "");

  // Image
  if (form.image instanceof File) {
    formData.append("image", form.image);
  }

  formData.append("imageAlt", form.imageAlt || "");

  // Blog Date
  formData.append("blogDate", form.blogDate || "");

  // SEO
  formData.append("metaTitle", form.metaTitle || "");
  formData.append("metaDescription", form.metaDescription || "");
  formData.append("metaKeywords", form.metaKeywords || "");

  // Status
  formData.append("status", form.status || "draft");

  return formData;
}