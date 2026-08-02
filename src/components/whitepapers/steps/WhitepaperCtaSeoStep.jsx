import { Field, Input, Textarea } from "../../ui/UI";
import CtaEditor from "../../shared/CtaEditor";

export default function WhitepaperCtaSeoStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <Field label="CTA Heading">
        <Input value={form.ctaHeading || ""} onChange={(e) => set("ctaHeading", e.target.value)} placeholder="Recognise the situation?" />
      </Field>
      <Field label="CTA Text">
        <Textarea rows={3} value={form.ctaText || ""} onChange={(e) => set("ctaText", e.target.value)} placeholder="If you are deciding whether to start, we will run..." />
      </Field>
      <CtaEditor label="CTA Band Primary" value={form.ctaBandPrimary} onChange={(v) => set("ctaBandPrimary", v)} textPlaceholder="Discuss this paper" linkPlaceholder="/contact" />
      <CtaEditor label="CTA Band Secondary" value={form.ctaBandSecondary} onChange={(v) => set("ctaBandSecondary", v)} textPlaceholder="Run the related checklist" linkPlaceholder="/checklists" />

      <div className="form-grid" style={{ marginTop: 24 }}>
        <Field label="SEO Title">
          <Input value={form.seoTitle || ""} onChange={(e) => set("seoTitle", e.target.value)} placeholder="Leave blank to use the title" />
        </Field>
      </div>
      <Field label="SEO Description">
        <Textarea rows={3} value={form.seoDescription || ""} onChange={(e) => set("seoDescription", e.target.value)} placeholder="Leave blank to use the description" />
      </Field>
    </div>
  );
}
