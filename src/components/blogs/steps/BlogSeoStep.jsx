import { Field, Input, Textarea } from "../../ui/UI";

export default function BlogSeoStep({ form, setForm }) {
  const seo = form.seo || {};
  const setSeo = (key, value) => setForm({ ...form, seo: { ...seo, [key]: value } });

  return (
    <div className="step-content">
      <Field label="Meta Title" hint="Leave blank to use the title">
        <Input value={seo.metaTitle || ""} onChange={(e) => setSeo("metaTitle", e.target.value)} placeholder="Leave blank to use the title" />
      </Field>
      <Field label="Meta Description" hint={`${seo.metaDescription?.length || 0}/160 — leave blank to use the description`}>
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
          placeholder="Microsoft 365, Cloud Migration"
        />
      </Field>
      <Field label="Canonical URL">
        <Input value={seo.canonicalUrl || ""} onChange={(e) => setSeo("canonicalUrl", e.target.value)} placeholder="https://jjcsystems.com/blog/your-post-slug" />
      </Field>
      <Field label="OG Image URL">
        <Input value={seo.ogImage || ""} onChange={(e) => setSeo("ogImage", e.target.value)} placeholder="https://image-url" />
      </Field>
    </div>
  );
}
