import { Field, Input, Textarea } from "../../ui/UI";
import StringListEditor from "../../shared/StringListEditor";
import CtaEditor from "../../shared/CtaEditor";

export default function GuideChecklistCtaSeoStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

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
