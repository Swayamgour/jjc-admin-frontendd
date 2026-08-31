import { Field, Input, Textarea } from "../../ui/UI";
import RepeaterEditor from "../../shared/RepeaterEditor";
import CtaEditor from "../../shared/CtaEditor";

export default function ChecklistGapsCtaStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });
  const seo = form.seo || {};
  const setSeo = (key, value) => setForm({ ...form, seo: { ...seo, [key]: value } });

  return (
    <div className="step-content">
      <div className="form-grid">
        <Field label="Gaps Heading">
          <Input value={form.gapsHeading || ""} onChange={(e) => set("gapsHeading", e.target.value)} placeholder="If you could not tick these, start here" />
        </Field>
      </div>
      <Field label="Gaps Lede">
        <Textarea rows={2} value={form.gapsLede || ""} onChange={(e) => set("gapsLede", e.target.value)} placeholder="The items below are the ones whose absence causes the most trouble downstream." />
      </Field>

      <RepeaterEditor
        cardTitle="Gap Cards"
        items={form.gapCards || []}
        onChange={(v) => set("gapCards", v)}
        emptyItem={{ title: "", description: "", icon: "i-target", order: 0 }}
        fields={[
          { key: "title", label: "Title", placeholder: "Nothing has ever been disposed of" },
          { key: "description", label: "Description", placeholder: "This is the expensive one...", type: "textarea" },
          { key: "icon", label: "Icon", placeholder: "i-target" },
        ]}
        addLabel="+ Add Gap Card"
        emptyLabel="No gap cards added."
      />

      <div className="form-grid" style={{ marginTop: 24 }}>
        <Field label="CTA Heading">
          <Input value={form.ctaHeading || ""} onChange={(e) => set("ctaHeading", e.target.value)} placeholder="Want a second opinion on your score?" />
        </Field>
      </div>
      <Field label="CTA Text">
        <Textarea rows={3} value={form.ctaText || ""} onChange={(e) => set("ctaText", e.target.value)} placeholder="We will run a scoped readiness review..." />
      </Field>
      <CtaEditor label="CTA Band Primary" value={form.ctaBandPrimary} onChange={(v) => set("ctaBandPrimary", v)} textPlaceholder="Talk through your result" linkPlaceholder="/contact" />
      <CtaEditor label="CTA Band Secondary" value={form.ctaBandSecondary} onChange={(v) => set("ctaBandSecondary", v)} textPlaceholder="Read the related guides" linkPlaceholder="/guides" />

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
          placeholder="Microsoft 365, Compliance Audit"
        />
      </Field>
      <Field label="Canonical URL">
        <Input value={seo.canonicalUrl || ""} onChange={(e) => setSeo("canonicalUrl", e.target.value)} placeholder="https://jjcsystems.com/checklists/your-slug" />
      </Field>
      <Field label="OG Image URL">
        <Input value={seo.ogImage || ""} onChange={(e) => setSeo("ogImage", e.target.value)} placeholder="https://image-url" />
      </Field>
    </div>
  );
}
