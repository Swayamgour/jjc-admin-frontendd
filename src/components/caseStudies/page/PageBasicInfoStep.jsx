import { Field, Input, Textarea, Select, Checkbox } from "../../ui/UI";

const URL_SEGMENT = {
  service: "services",
  industry: "industries",
  platform: "platforms",
};

/* Backend basics: title, slug, badge, shortDescription, subCategory, order, isPublished.
   - `category` is derived by the backend from the chosen subCategory (item), so there is no Category dropdown.
   - `urlPath` is derived by the backend from the slug, shown here read-only. */

export default function PageBasicInfoStep({ form, setForm, categories = [], type }) {
  const set = (patch) => setForm({ ...form, ...patch });

  const urlPreview = `/${URL_SEGMENT[type] || "pages"}/${form.slug || "your-slug"}`;

  return (
    <div className="form-grid">
      <Field label="Title" required>
        <Input
          value={form.title || ""}
          onChange={(e) => set({ title: e.target.value })}
          placeholder="e.g. IT Strategy & Consulting"
        />
      </Field>

      <Field label="Badge">
        <Input
          value={form.badge || ""}
          onChange={(e) => set({ badge: e.target.value })}
          placeholder="e.g. Strategy & Transformation"
        />
      </Field>

      <Field label="Slug" required hint={`Public URL: ${urlPreview}`}>
        <Input
          value={form.slug || ""}
          onChange={(e) =>
            set({
              slug: e.target.value
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, ""),
            })
          }
          placeholder="it-strategy-consulting"
        />
      </Field>

      <Field label="Short Description" required>
        <Textarea
          rows={3}
          value={form.shortDescription || ""}
          onChange={(e) => set({ shortDescription: e.target.value })}
          placeholder="Shown in the mega menu and cards"
        />
      </Field>

      <Field label="Sub Category" required>
        <Select
          value={form.subCategory || ""}
          onChange={(e) => set({ subCategory: e.target.value })}
        >
          <option value="">Select Subcategory</option>
          {categories.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Order">
        <Input
          type="number"
          value={form.order ?? 0}
          onChange={(e) => set({ order: Number(e.target.value) })}
        />
      </Field>

      <Field label="Status">
        <Checkbox
          checked={Boolean(form.isPublished)}
          onChange={(e) => set({ isPublished: e.target.checked })}
          label={form.isPublished ? "Published" : "Draft (hidden from the site)"}
        />
      </Field>
    </div>
  );
}