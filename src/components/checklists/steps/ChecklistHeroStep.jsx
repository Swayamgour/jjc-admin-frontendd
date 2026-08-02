import { Field, Input } from "../../ui/UI";
import StringListEditor from "../../shared/StringListEditor";
import CtaEditor from "../../shared/CtaEditor";

export default function ChecklistHeroStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <div className="form-grid">
        <Field label="Eyebrow" hint="Leave blank to auto-generate: PlatformLabel · Badge">
          <Input value={form.eyebrow || ""} onChange={(e) => set("eyebrow", e.target.value)} placeholder="Microsoft Purview · Readiness" />
        </Field>
        <Field label="Typical Effort">
          <Input value={form.typicalEffort || ""} onChange={(e) => set("typicalEffort", e.target.value)} placeholder="1 week to assess, plus a rehearsal" />
        </Field>
      </div>

      <Field label="Written For" hint="Leave blank to fall back to the industry label">
        <Input value={form.writtenFor || ""} onChange={(e) => set("writtenFor", e.target.value)} placeholder="Legal" />
      </Field>

      <Field label="Before You Start" hint="Glance sidebar bullet list shown in the hero">
        <StringListEditor
          items={form.beforeYouStart || []}
          onChange={(v) => set("beforeYouStart", v)}
          placeholder="20 checks across 4 sections"
          addLabel="+ Add Item"
          emptyLabel="No items added."
        />
      </Field>

      <CtaEditor label="Primary CTA" value={form.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} textPlaceholder="Start the checklist" linkPlaceholder="#checklist" />
      <CtaEditor label="Secondary CTA" value={form.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} textPlaceholder="Get help with the gaps" linkPlaceholder="/contact" />
    </div>
  );
}
