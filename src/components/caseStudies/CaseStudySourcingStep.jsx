import { Field, Textarea } from "../ui/UI";
import StringListEditor from "./StringListEditor";

export default function CaseStudySourcingStep({ form, setForm }) {
  const sourcing = form.sourcing || {};
  const set = (key, value) => setForm({ ...form, sourcing: { ...sourcing, [key]: value } });

  return (
    <div className="step-content">
      <Field label="Paragraphs" hint="Each entry renders as its own paragraph under 'Where this report comes from'">
        <StringListEditor
          items={sourcing.paragraphs}
          onChange={(v) => set("paragraphs", v)}
          placeholder="This report is drawn from a case study published by Microsoft..."
          addLabel="+ Add Paragraph"
          multiline
          rows={4}
        />
      </Field>

      <Field label="Short Note" hint="The bold 'In short:' summary line at the bottom of the sourcing section">
        <Textarea
          rows={2}
          value={sourcing.shortNote || ""}
          onChange={(e) => set("shortNote", e.target.value)}
          placeholder="published by Microsoft, about its customer, not about ours. Names withheld, figures unchanged, sources available on request."
        />
      </Field>
    </div>
  );
}
