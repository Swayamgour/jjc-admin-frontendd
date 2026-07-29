/* ==============================================================
 Converts the wizard's `form` state into multipart FormData for
 the backend (which expects every nested section as a JSON
 string, plus a raw `heroImage` file field — see
 pageController.js parseJsonFields / PAGE_JSON_FIELDS).

 NOTE: only hero.image is wired up as a real file upload here,
 matching the backend's uploadImage.fields([{name:"heroImage"}]).
 If overview.image also needs file upload support, add a second
 multer field on the backend (e.g. "overviewImage") and mirror
 the same extraction logic below for `overview`.
================================================================ */

export function buildPageFormData(form) {
  const fd = new FormData();

  Object.entries(form).forEach(([key, value]) => {

    if (key === "hero") {
      const { image, ...rest } = value || {};
      fd.append("hero", JSON.stringify(rest));
      if (image instanceof File) {
        fd.append("heroImage", image);
      }
      return;
    }

    if (value instanceof File) {
      fd.append(key, value);
      return;
    }

    if (value && typeof value === "object") {
      fd.append(key, JSON.stringify(value));
      return;
    }

    fd.append(key, value ?? "");
  });

  return fd;
}
