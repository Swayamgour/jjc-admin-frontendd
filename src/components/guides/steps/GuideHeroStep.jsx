import { Field, Input } from "../../ui/UI";
import StringListEditor from "../../shared/StringListEditor";
import CtaEditor from "../../shared/CtaEditor";

export default function GuideHeroStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <div className="form-grid">
        <Field label="Eyebrow" hint="Leave blank to auto-generate: PlatformLabel · Level">
          <Input value={form.eyebrow || ""} onChange={(e) => set("eyebrow", e.target.value)} placeholder="Microsoft Fabric · Advanced" />
        </Field>
        <Field label="Typical Effort">
          <Input value={form.typicalEffort || ""} onChange={(e) => set("typicalEffort", e.target.value)} placeholder="3–6 weeks including a parallel quarter" />
        </Field>
      </div>

      <Field label="Written For" hint="Leave blank to fall back to the industry label">
        <Input value={form.writtenFor || ""} onChange={(e) => set("writtenFor", e.target.value)} placeholder="Manufacturing" />
      </Field>

      <Field label="Key Practices" hint="Glance sidebar bullet list shown in the hero">
        <StringListEditor
          items={form.keyPractices || []}
          onChange={(v) => set("keyPractices", v)}
          placeholder="Confirm licensing before enabling"
          addLabel="+ Add Practice"
          emptyLabel="No key practices added."
        />
      </Field>

      <CtaEditor label="Primary CTA" value={form.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} textPlaceholder="Get help with this" linkPlaceholder="/contact" />
      <CtaEditor label="Secondary CTA" value={form.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} textPlaceholder="Skip to configuration" linkPlaceholder="#config" />
    </div>
  );
}
