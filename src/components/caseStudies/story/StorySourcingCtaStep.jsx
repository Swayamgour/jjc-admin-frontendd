import { Field, Input, Textarea } from "../../ui/UI";
import StringListEditor from "../StringListEditor";

export default function StorySourcingCtaStep({ form, setForm }) {
  const sourcing = form.sourcing || {};
  const cta = form.cta || {};
  const setSourcing = (key, value) => setForm({ ...form, sourcing: { ...sourcing, [key]: value } });
  const setCta = (key, value) => setForm({ ...form, cta: { ...cta, [key]: value } });
  const setCtaBtn = (which, key, value) => setCta(which, { ...(cta[which] || {}), [key]: value });

  return (
    <div className="step-content">
      <h3 style={{ marginBottom: 12 }}>Sourcing</h3>
      <div className="grid-2">
        <Field label="Eyebrow">
          <Input value={sourcing.eyebrow || ""} onChange={(e) => setSourcing("eyebrow", e.target.value)} placeholder="Sourcing" />
        </Field>
        <Field label="Title">
          <Input value={sourcing.title || ""} onChange={(e) => setSourcing("title", e.target.value)} placeholder="Where this story comes from" />
        </Field>
      </div>
      <Field label="Paragraphs">
        <StringListEditor items={sourcing.paragraphs || []} onChange={(v) => setSourcing("paragraphs", v)} placeholder="Anonymized and adapted from a published Microsoft case study..." multiline addLabel="+ Add Paragraph" emptyLabel="No paragraphs added." />
      </Field>
      <Field label="Summary Note">
        <Textarea rows={2} value={sourcing.summary || ""} onChange={(e) => setSourcing("summary", e.target.value)} placeholder="Sourced and anonymized, not run by us directly." />
      </Field>

      <h3 style={{ margin: "28px 0 12px" }}>Call to Action</h3>
      <Field label="Title">
        <Input value={cta.title || ""} onChange={(e) => setCta("title", e.target.value)} placeholder="Want a result like this?" />
      </Field>
      <Field label="Description">
        <Textarea rows={3} value={cta.description || ""} onChange={(e) => setCta("description", e.target.value)} placeholder="Talk to our team about what this could look like for your organization." />
      </Field>

      <div className="grid-2">
        <Field label="Primary Button">
          <Input value={cta.primaryButton?.label || ""} onChange={(e) => setCtaBtn("primaryButton", "label", e.target.value)} placeholder="Label" />
          <div style={{ marginTop: 8 }}>
            <Input value={cta.primaryButton?.link || ""} onChange={(e) => setCtaBtn("primaryButton", "link", e.target.value)} placeholder="Link" />
          </div>
        </Field>
        <Field label="Secondary Button">
          <Input value={cta.secondaryButton?.label || ""} onChange={(e) => setCtaBtn("secondaryButton", "label", e.target.value)} placeholder="Label" />
          <div style={{ marginTop: 8 }}>
            <Input value={cta.secondaryButton?.link || ""} onChange={(e) => setCtaBtn("secondaryButton", "link", e.target.value)} placeholder="Link" />
          </div>
        </Field>
      </div>

      <Field label="Note">
        <Input value={cta.note || ""} onChange={(e) => setCta("note", e.target.value)} placeholder="No commitment, 20-minute call." />
      </Field>
    </div>
  );
}
