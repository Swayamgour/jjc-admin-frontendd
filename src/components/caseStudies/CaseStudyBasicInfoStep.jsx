import { Field, Input, Textarea, Select } from "../ui/UI";
import StringListEditor from "./StringListEditor";

export default function CaseStudyBasicInfoStep({ form, setForm, categories = [] }) {
  const set = (key, value) => setForm({ ...form, [key]: value });
  const setOrg = (key, value) => setForm({ ...form, org: { ...(form.org || {}), [key]: value } });

  const filteredParents = categories.filter((c) => c.type === form.sourceType);

  return (
    <div className="step-content">
      <Field label="Case Study Title" required>
        <Input
          value={form.title || ""}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Twenty million records a year, processed without new headcount"
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

      <div className="form-grid">
        <Field label="Industry Tag" hint="Chip shown on the card, e.g. 'Healthcare'">
          <Input value={form.industryTag || ""} onChange={(e) => set("industryTag", e.target.value)} placeholder="Healthcare" />
        </Field>
        <Field label="Capability Tag" hint="Chip shown on the card, e.g. 'Modern Work & Automation'">
          <Input value={form.capabilityTag || ""} onChange={(e) => set("capabilityTag", e.target.value)} placeholder="Modern Work & Automation" />
        </Field>
      </div>

      <Field label="Description" required hint="Meta description — used for SEO and share previews">
        <Textarea
          rows={3}
          value={form.description || ""}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Short summary shown in search results and social shares..."
        />
      </Field>

      <Field label="SEO Keywords" hint="Used for the story's meta keywords tag">
        <StringListEditor
          items={form.seoKeywords}
          onChange={(v) => set("seoKeywords", v)}
          placeholder="Healthcare Automation"
          addLabel="+ Add Keyword"
        />
      </Field>

      <div className="form-grid">
        <Field label="Client Organization" hint="Kept generic — never the real client name, per anonymization policy">
          <Input value={form.org?.name || ""} onChange={(e) => setOrg("name", e.target.value)} placeholder="A national acute care provider group" />
        </Field>
        <Field label="Region">
          <Input value={form.org?.region || ""} onChange={(e) => setOrg("region", e.target.value)} placeholder="United States" />
        </Field>
      </div>

      <Field label="Reserved / Gap Slot" hint="Turn on to show a dashed placeholder card instead of a full story (used when no sourceable case study exists yet)">
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
          <input type="checkbox" checked={!!form.isGap} onChange={(e) => set("isGap", e.target.checked)} />
          This is a reserved slot, not a published story
        </label>
      </Field>

      {form.isGap && (
        <Field label="Gap Note" required hint="Shown in place of the story body">
          <Textarea
            rows={3}
            value={form.gapNote || ""}
            onChange={(e) => set("gapNote", e.target.value)}
            placeholder="We have not published a story in this slot yet..."
          />
        </Field>
      )}
    </div>
  );
}
