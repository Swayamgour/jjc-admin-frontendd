import { Field, Input, Textarea, Select } from "../ui/UI";

export default function CaseStudyBasicInfoStep({ form, setForm, categories = [] }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  const filteredParents = categories.filter((c) => c.type === form.sourceType);

  return (
    <div className="step-content">
      <Field label="Case Study Title" required>
        <Input
          value={form.title || ""}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Modernizing IT Infrastructure for a Multi-location Hospital"
        />
      </Field>

      <div className="form-grid">
        <Field label="Source Type" required hint="Which 'Browse By...' section this belongs to">
          <Select
            value={form.sourceType || "industry"}
            onChange={(e) => setForm({ ...form, sourceType: e.target.value, parent: "" })}
          >
            <option value="industry">Industry</option>
            <option value="capability">Capability</option>
          </Select>
        </Field>

        <Field label={form.sourceType === "capability" ? "Capability" : "Industry"} required>
          <Select value={form.parent || ""} onChange={(e) => set("parent", e.target.value)}>
            <option value="">Select…</option>
            {filteredParents.map((c) => (
              <option key={c._id} value={c.slug}>{c.name}</option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Description" required hint="Short summary shown on case study cards and hero">
        <Textarea
          rows={3}
          value={form.description || ""}
          onChange={(e) => set("description", e.target.value)}
          placeholder="JJC Systems helped a leading healthcare provider modernize..."
        />
      </Field>

      <div className="form-grid">
        <Field label="CTA Label">
          <Input value={form.ctaLabel || ""} onChange={(e) => set("ctaLabel", e.target.value)} placeholder="Schedule a Consultation" />
        </Field>
        <Field label="CTA Link">
          <Input value={form.ctaLink || ""} onChange={(e) => set("ctaLink", e.target.value)} placeholder="/contact-us" />
        </Field>
      </div>
    </div>
  );
}
