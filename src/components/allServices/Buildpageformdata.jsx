/* ==============================================================
 Converts the wizard's `form` state into multipart FormData for
 the backend (which expects every nested section as a JSON
 string, plus a raw `heroImage` file field — see
 pageController.js parseJsonFields / PAGE_JSON_FIELDS).

 Keys the backend either computes itself or doesn't have in the
 Page schema are skipped, so GET -> edit -> PUT never sends
 read-only / derived data back.
================================================================ */

const IGNORED_KEYS = new Set([
    "_id",
    "__v",
    "id",
    "type",            // fixed by the route (/pages/:type)
    "createdAt",
    "updatedAt",
    "category",        // backend derives it from subCategory
    "urlPath",         // backend derives it from slug
    "overview",        // legacy: not in the Page schema
    "deliveryProcess", // legacy: not in the Page schema
    // read-only extras returned by GET /pages/:type/:slug
    "subCategoryName",
    "categoryName",
    "categorySlug",
    "groupName",
    "groupSlug",
]);

export function buildPageFormData(form) {
    const fd = new FormData();

    Object.entries(form).forEach(([key, value]) => {
        if (IGNORED_KEYS.has(key)) return;

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