import { Field, Input, Textarea } from "../../ui/UI";
import StringListEditor from "../../shared/StringListEditor";
import CtaEditor from "../../shared/CtaEditor";

export default function GuideChecklistCtaSeoStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });
  const seo = form.seo || {};
  const setSeo = (key, value) => setForm({ ...form, seo: { ...seo, [key]: value } });

  return (
    <div className="step-content">
      <Field label="Checklist Title">
        <Input value={form.checklistTitle || ""} onChange={(e) => set("checklistTitle", e.target.value)} placeholder="Completion checklist" />
      </Field>
      <Field label="Checklist Items">
        <StringListEditor
          items={form.checklistItems || []}
          onChange={(v) => set("checklistItems", v)}
          placeholder="Retention labels applied to all record series"
          addLabel="+ Add Item"
          emptyLabel="No checklist items added."
        />
      </Field>

      <div className="form-grid" style={{ marginTop: 24 }}>
        <Field label="CTA Heading">
          <Input value={form.ctaHeading || ""} onChange={(e) => set("ctaHeading", e.target.value)} placeholder="Want a second pair of eyes?" />
        </Field>
      </div>
      <Field label="CTA Text">
        <Textarea rows={3} value={form.ctaText || ""} onChange={(e) => set("ctaText", e.target.value)} placeholder="We will review your configuration and flag anything worth fixing." />
      </Field>
      <CtaEditor label="CTA Band Primary" value={form.ctaBandPrimary} onChange={(v) => set("ctaBandPrimary", v)} textPlaceholder="Request a consultation" linkPlaceholder="/contact" />
      <CtaEditor label="CTA Band Secondary" value={form.ctaBandSecondary} onChange={(v) => set("ctaBandSecondary", v)} textPlaceholder="See our platform page" linkPlaceholder="/platforms/x" />

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
          placeholder="Dynamics 365, Configuration Guide"
        />
      </Field>
      <Field label="Canonical URL">
        <Input value={seo.canonicalUrl || ""} onChange={(e) => setSeo("canonicalUrl", e.target.value)} placeholder="https://jjcsystems.com/guides/your-slug" />
      </Field>
      <Field label="OG Image URL">
        <Input value={seo.ogImage || ""} onChange={(e) => setSeo("ogImage", e.target.value)} placeholder="https://image-url" />
      </Field>
    </div>
  );
}
