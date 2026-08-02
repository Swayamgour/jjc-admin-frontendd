import { Field, Input, Textarea } from "../../ui/UI";
import StringListEditor from "../../shared/StringListEditor";

export default function GuideWhyStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <Field label="Business Summary Heading">
        <Input value={form.businessSummaryHeading || ""} onChange={(e) => set("businessSummaryHeading", e.target.value)} placeholder="If you own the outcome" />
      </Field>
      <Field label="Business Summary">
        <Textarea rows={4} value={form.businessSummary || ""} onChange={(e) => set("businessSummary", e.target.value)} placeholder="What this means for the person who owns the result..." />
      </Field>

      <Field label="Technical Summary Heading">
        <Input value={form.technicalSummaryHeading || ""} onChange={(e) => set("technicalSummaryHeading", e.target.value)} placeholder="If you have to build it" />
      </Field>
      <Field label="Technical Summary">
        <Textarea rows={4} value={form.technicalSummary || ""} onChange={(e) => set("technicalSummary", e.target.value)} placeholder="What this means for the person who has to implement it..." />
      </Field>

      <Field label="Problem Heading">
        <Input value={form.problemHeading || ""} onChange={(e) => set("problemHeading", e.target.value)} placeholder="The problem this solves" />
      </Field>
      <Field label="Problem Paragraphs">
        <StringListEditor
          items={form.problemParagraphs || []}
          onChange={(v) => set("problemParagraphs", v)}
          placeholder="Describe the problem in a paragraph..."
          multiline
          addLabel="+ Add Paragraph"
          emptyLabel="No paragraphs added."
        />
      </Field>
    </div>
  );
}
