import { Field, Input, Textarea } from "../ui/UI";
import RepeaterEditor from "./RepeaterEditor";

export default function CaseStudyHeroStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <Field label="Hero Eyebrow" hint="e.g. 'Healthcare · Modern Work & Automation'">
        <Input value={form.heroEyebrow || ""} onChange={(e) => set("heroEyebrow", e.target.value)} placeholder="Healthcare · Modern Work & Automation" />
      </Field>

      <Field label="Hero Lede" required hint="The paragraph under the H1 — also reused as the case-card preview text">
        <Textarea rows={3} value={form.heroLede || ""} onChange={(e) => set("heroLede", e.target.value)} placeholder="Medical records arrived from a wide variety of providers..." />
      </Field>

      <Field label="Hero Image">
        <input
          type="file"
          accept="image/*"
          className="input"
          onChange={(e) => set("heroImage", e.target.files?.[0] || null)}
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

      <RepeaterEditor
        cardTitle="Stats (max 4 — shown on the card and on the story's stats strip)"
        items={form.heroStats}
        onChange={(v) => set("heroStats", v.slice(0, 4))}
        emptyItem={{ value: "", label: "" }}
        fields={[
          { key: "value", label: "Value", placeholder: "20M" },
          { key: "label", label: "Label", placeholder: "Records processed per year" },
        ]}
        addLabel="+ Add Stat"
        emptyLabel="No stats added."
      />
    </div>
  );
}
