import { Field, Input } from "../ui/UI";
import StringListEditor from "./StringListEditor";

export default function CaseStudyTechnologiesStep({ form, setForm }) {
  const technologies = form.technologies || {};
  const set = (key, value) => setForm({ ...form, technologies: { ...technologies, [key]: value } });

  return (
    <div className="step-content">
      <Field label="Heading">
        <Input value={technologies.heading || ""} onChange={(e) => set("heading", e.target.value)} placeholder="Technologies Used" />
      </Field>

      <Field label="Technologies">
        <StringListEditor
          items={technologies.items}
          onChange={(v) => set("items", v)}
          placeholder="Microsoft 365"
          addLabel="+ Add Technology"
        />
      </Field>
    </div>
  );
}
