import { Field, Input } from "../../ui/UI";
import StringListEditor from "../StringListEditor";

function SectionEditor({ title, section = {}, onChange, eyebrowPlaceholder, titlePlaceholder, paragraphPlaceholder }) {
  const set = (key, value) => onChange({ ...section, [key]: value });
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ marginBottom: 12 }}>{title}</h3>
      <div className="grid-2">
        <Field label="Eyebrow">
          <Input value={section.eyebrow || ""} onChange={(e) => set("eyebrow", e.target.value)} placeholder={eyebrowPlaceholder} />
        </Field>
        <Field label="Title">
          <Input value={section.title || ""} onChange={(e) => set("title", e.target.value)} placeholder={titlePlaceholder} />
        </Field>
      </div>
      <Field label="Paragraphs">
        <StringListEditor
          items={section.paragraphs || []}
          onChange={(v) => set("paragraphs", v)}
          placeholder={paragraphPlaceholder}
          multiline
          addLabel="+ Add Paragraph"
          emptyLabel="No paragraphs added."
        />
      </Field>
    </div>
  );
}

export default function StorySituationApproachStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <SectionEditor
        title="The Situation"
        section={form.situation}
        onChange={(v) => set("situation", v)}
        eyebrowPlaceholder="The Situation"
        titlePlaceholder="Records arrived faster than they could be filed"
        paragraphPlaceholder="Medical records arrived from a wide variety of providers in inconsistent formats..."
      />
      <SectionEditor
        title="The Approach"
        section={form.approach}
        onChange={(v) => set("approach", v)}
        eyebrowPlaceholder="The Approach"
        titlePlaceholder="Automating intake without losing the audit trail"
        paragraphPlaceholder="The team automated intake and processing with Power Automate..."
      />
    </div>
  );
}
