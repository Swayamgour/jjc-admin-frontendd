import { Field, Input, Select } from "../../ui/UI";

export default function PageBasicInfoStep({ form, setForm, categories = [], disabled }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  const filteredCategories = categories.filter((c) => c.type === form.sourceType);

  return (
    <div className="step-content">
      <div className="grid-2">
        <Field label="Name" required>
          <Input value={form.name || ""} onChange={(e) => set("name", e.target.value)} placeholder="Healthcare Success Stories" disabled={disabled} />
        </Field>
        <Field label="Source Type" required>
          <Select value={form.sourceType} onChange={(e) => setForm({ ...form, sourceType: e.target.value, parentSlug: "" })} disabled={disabled}>
            <option value="industry">Industry</option>
            <option value="capability">Capability</option>
          </Select>
        </Field>
      </div>

      <Field label="Parent Category" required hint="Must match an existing Industry/Capability category of the selected type">
        <Select value={form.parentSlug || ""} onChange={(e) => set("parentSlug", e.target.value)} disabled={disabled}>
          <option value="">Select a category…</option>
          {filteredCategories.map((c) => (
            <option key={c._id} value={c.slug}>{c.name}</option>
          ))}
        </Select>
      </Field>

      <Field label="Status">
        <Select value={form.status || "published"} onChange={(e) => set("status", e.target.value)} disabled={disabled}>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </Select>
      </Field>

      <Field label="Hero Image">
        <input
          type="file"
          accept="image/*"
          className="input"
          onChange={(e) => set("heroImage", e.target.files?.[0] || null)}
          disabled={disabled}
        />
        {form.heroImage && (
          <div style={{ marginTop: 12 }}>
            <img
              src={form.heroImage instanceof File ? URL.createObjectURL(form.heroImage) : form.heroImage.url}
              alt="Hero Preview"
              style={{ width: 240, borderRadius: 8, objectFit: "cover" }}
            />
          </div>
        )}
      </Field>
    </div>
  );
}
