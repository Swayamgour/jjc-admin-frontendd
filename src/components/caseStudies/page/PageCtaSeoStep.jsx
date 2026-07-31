import { Field, Input, Textarea } from "../../ui/UI";
import StringListEditor from "../StringListEditor";
import RepeaterEditor from "../RepeaterEditor";

export default function PageCtaSeoStep({ form, setForm }) {
  const cta = form.ctaSection || {};
  const seo = form.seo || {};
  const setCta = (key, value) => setForm({ ...form, ctaSection: { ...cta, [key]: value } });
  const setSeo = (key, value) => setForm({ ...form, seo: { ...seo, [key]: value } });

  return (
    <div className="step-content">
      <h3 style={{ marginBottom: 12 }}>Call to Action</h3>
      <Field label="Title">
        <Input value={cta.title || ""} onChange={(e) => setCta("title", e.target.value)} placeholder="Ready to see results like these?" />
      </Field>
      <Field label="Description">
        <Textarea rows={3} value={cta.description || ""} onChange={(e) => setCta("description", e.target.value)} placeholder="Talk to our team about what this could look like for your organization." />
      </Field>

      <RepeaterEditor
        cardTitle="Buttons"
        items={cta.buttons || []}
        onChange={(v) => setCta("buttons", v)}
        emptyItem={{ label: "", link: "", variant: "" }}
        fields={[
          { key: "label", label: "Label", placeholder: "Talk to us" },
          { key: "link", label: "Link", placeholder: "/contact" },
          { key: "variant", label: "Variant", placeholder: "primary" },
        ]}
        addLabel="+ Add Button"
        emptyLabel="No buttons added."
      />

      <Field label="Note">
        <Input value={cta.note || ""} onChange={(e) => setCta("note", e.target.value)} placeholder="No commitment, 20-minute call." />
      </Field>

      <h3 style={{ margin: "28px 0 12px" }}>SEO</h3>
      <Field label="Meta Title">
        <Input value={seo.metaTitle || ""} onChange={(e) => setSeo("metaTitle", e.target.value)} placeholder="Healthcare Success Stories | JJC Systems" />
      </Field>
      <Field label="Meta Description">
        <Textarea rows={3} value={seo.metaDescription || ""} onChange={(e) => setSeo("metaDescription", e.target.value)} placeholder="See how healthcare organizations modernized their operations..." />
      </Field>
      <Field label="Keywords">
        <StringListEditor items={seo.keywords || []} onChange={(v) => setSeo("keywords", v)} placeholder="healthcare automation" addLabel="+ Add Keyword" emptyLabel="No keywords added." />
      </Field>
      <Field label="Canonical URL">
        <Input value={seo.canonicalUrl || ""} onChange={(e) => setSeo("canonicalUrl", e.target.value)} placeholder="https://jjcsystems.com/success/industry-healthcare" />
      </Field>
    </div>
  );
}
