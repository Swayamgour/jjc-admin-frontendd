import { Field, Input, Textarea } from "../ui/UI";
import StringListEditor from "./StringListEditor";

export default function CaseStudyListBlockStep({ form, setForm, sectionKey, itemsLabel, itemPlaceholder }) {
  const section = form[sectionKey] || {};
  const set = (key, value) => setForm({ ...form, [sectionKey]: { ...section, [key]: value } });

  return (
    <div className="step-content">
      <Field label="Heading">
        <Input value={section.heading || ""} onChange={(e) => set("heading", e.target.value)} />
      </Field>

      <Field label="Intro">
        <Textarea rows={3} value={section.intro || ""} onChange={(e) => set("intro", e.target.value)} />
      </Field>

      <Field label={itemsLabel}>
        <StringListEditor
          items={section.items}
          onChange={(v) => set("items", v)}
          placeholder={itemPlaceholder}
          addLabel="+ Add Item"
        />
      </Field>
    </div>
  );
}
