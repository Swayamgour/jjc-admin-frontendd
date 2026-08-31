import { Field, Input, Textarea } from "../../ui/UI";
import CtaEditor from "../../shared/CtaEditor";

export default function WhitepaperCtaSeoStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });
  const seo = form.seo || {};
  const setSeo = (key, value) => setForm({ ...form, seo: { ...seo, [key]: value } });

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
        <Field label="Meta Title">
          <Input value={seo.metaTitle || ""} onChange={(e) => setSeo("metaTitle", e.target.value)} placeholder="Leave blank to use the title" />
        </Field>
      </div>
      <Field label="Meta Description" hint={`${seo.metaDescription?.length || 0}/160`}>
        <Textarea rows={3} maxLength={160} value={seo.metaDescription || ""} onChange={(e) => setSeo("metaDescription", e.target.value)} placeholder="Leave blank to use the description" />
      </Field>
      <Field label="Keywords (comma separated)">
        <Input
          value={Array.isArray(seo.keywords) ? seo.keywords.join(", ") : ""}
          onChange={(e) =>
            setSeo(
              "keywords",
              e.target.value.split(",").map((item) => item.trim()).filter(Boolean)
            )
          }
          placeholder="Compliance, Risk Management"
        />
      </Field>
      <Field label="Canonical URL">
        <Input value={seo.canonicalUrl || ""} onChange={(e) => setSeo("canonicalUrl", e.target.value)} placeholder="https://jjcsystems.com/whitepapers/your-slug" />
      </Field>
      <Field label="OG Image URL">
        <Input value={seo.ogImage || ""} onChange={(e) => setSeo("ogImage", e.target.value)} placeholder="https://image-url" />
      </Field>
    </div>
  );
}
