import { Field, Input, Textarea } from "../../ui/UI";
import StringListEditor from "../../shared/StringListEditor";
import RepeaterEditor from "../../shared/RepeaterEditor";

export default function WhitepaperAbstractFindingsStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <Field label="Abstract Heading" hint="Usually the same as the subtitle">
        <Input value={form.abstractHeading || ""} onChange={(e) => set("abstractHeading", e.target.value)} placeholder="An honest assessment of..." />
      </Field>
      <Field label="Abstract Paragraphs">
        <StringListEditor
          items={form.abstractParagraphs || []}
          onChange={(v) => set("abstractParagraphs", v)}
          placeholder="Every institution above a certain size has..."
          multiline
          addLabel="+ Add Paragraph"
          emptyLabel="No paragraphs added."
        />
      </Field>

      <div className="form-grid" style={{ marginTop: 20 }}>
        <Field label="Findings Heading">
          <Input value={form.findingsHeading || ""} onChange={(e) => set("findingsHeading", e.target.value)} placeholder="Four things this paper argues" />
        </Field>
      </div>
      <Field label="Findings Lede">
        <Textarea rows={2} value={form.findingsLede || ""} onChange={(e) => set("findingsLede", e.target.value)} placeholder="If you read nothing else, read these." />
      </Field>

      <RepeaterEditor
        cardTitle="Key Findings"
        items={form.findings || []}
        onChange={(v) => set("findings", v)}
        emptyItem={{ number: (form.findings?.length || 0) + 1, title: "", description: "", order: 0 }}
        fields={[
          { key: "number", label: "Number" },
          { key: "title", label: "Title", placeholder: "Definitional disagreement is the binding constraint" },
          { key: "description", label: "Description", placeholder: "Explain the finding...", type: "textarea" },
        ]}
        addLabel="+ Add Finding"
        emptyLabel="No findings added."
      />
    </div>
  );
}
