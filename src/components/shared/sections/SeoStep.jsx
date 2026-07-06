import { Field, Input, Textarea } from "../../ui/UI";

export default function SeoStep({ form, setForm }) {
  const seo = form.seo || {};

  const updateSeo = (field, value) => {
    setForm({
      ...form,
      seo: {
        ...seo,
        [field]: value,
      },
    });
  };

  return (
    <div className="form-grid">
      <Field label="Meta Title">
        <Input
          value={seo.metaTitle || ""}
          onChange={(e) =>
            updateSeo("metaTitle", e.target.value)
          }
        />
      </Field>

      <Field label="Meta Description">
        <Textarea
          rows={4}
          value={seo.metaDescription || ""}
          onChange={(e) =>
            updateSeo("metaDescription", e.target.value)
          }
        />
      </Field>

      <Field label="Keywords (comma separated)">
        <Input
          value={(seo.keywords || []).join(", ")}
          onChange={(e) =>
            updateSeo(
              "keywords",
              e.target.value
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean)
            )
          }
        />
      </Field>

      <Field label="OG Image URL">
        <Input
          value={seo.ogImage || ""}
          onChange={(e) =>
            updateSeo("ogImage", e.target.value)
          }
        />
      </Field>

      <Field label="Canonical URL">
        <Input
          value={seo.canonicalUrl || ""}
          onChange={(e) =>
            updateSeo("canonicalUrl", e.target.value)
          }
        />
      </Field>
    </div>
  );
}