import { Field, Input } from "../../ui/UI";
import StringListEditor from "../../shared/StringListEditor";
import RepeaterEditor from "../../shared/RepeaterEditor";

export default function ChecklistWhyStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <Field label="Why Heading">
        <Input value={form.whyHeading || ""} onChange={(e) => set("whyHeading", e.target.value)} placeholder="What this checklist is for" />
      </Field>

      <Field label="Why Paragraphs">
        <StringListEditor
          items={form.whyParagraphs || []}
          onChange={(v) => set("whyParagraphs", v)}
          placeholder="Explain the purpose of the checklist..."
          multiline
          addLabel="+ Add Paragraph"
          emptyLabel="No paragraphs added."
        />
      </Field>

      <RepeaterEditor
        cardTitle="Run With"
        items={form.runWith || []}
        onChange={(v) => set("runWith", v)}
        emptyItem={{ label: "", text: "" }}
        fields={[
          { key: "label", label: "Label", placeholder: "Run it with" },
          { key: "text", label: "Text", placeholder: "Managing partner or risk partner" },
        ]}
        addLabel="+ Add Row"
        emptyLabel="No rows added."
      />
    </div>
  );
}
