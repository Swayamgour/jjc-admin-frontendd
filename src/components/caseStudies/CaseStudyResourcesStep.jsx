import { Field, Input, Textarea } from "../ui/UI";

export default function CaseStudyResourcesStep({ form, setForm }) {
  const resources = form.resources || {};
  const set = (key, value) => setForm({ ...form, resources: { ...resources, [key]: value } });

  return (
    <div className="step-content">
      <Field label="Heading">
        <Input value={resources.heading || ""} onChange={(e) => set("heading", e.target.value)} placeholder="Want the Full Breakdown?" />
      </Field>

      <Field label="Description">
        <Textarea rows={3} value={resources.description || ""} onChange={(e) => set("description", e.target.value)} />
      </Field>

      <div className="form-grid">
        <Field label="Download Label">
          <Input value={resources.downloadLabel || ""} onChange={(e) => set("downloadLabel", e.target.value)} placeholder="Download Full Case Study" />
        </Field>
        <Field label="Download Link">
          <Input value={resources.downloadLink || ""} onChange={(e) => set("downloadLink", e.target.value)} placeholder="#" />
        </Field>
        <Field label="Secondary Label">
          <Input value={resources.secondaryLabel || ""} onChange={(e) => set("secondaryLabel", e.target.value)} placeholder="Share This Story" />
        </Field>
        <Field label="Secondary Link">
          <Input value={resources.secondaryLink || ""} onChange={(e) => set("secondaryLink", e.target.value)} placeholder="#" />
        </Field>
      </div>
    </div>
  );
}
