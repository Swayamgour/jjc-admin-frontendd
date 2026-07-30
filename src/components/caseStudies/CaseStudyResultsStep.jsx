import { Field, Input, Textarea } from "../ui/UI";
import StringListEditor from "./StringListEditor";

export default function CaseStudyResultsStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <Field label="Results Heading">
        <Input value={form.resultsHeading || ""} onChange={(e) => set("resultsHeading", e.target.value)} placeholder="What was published" />
      </Field>

      <Field label="Results Lede">
        <Textarea rows={2} value={form.resultsLede || ""} onChange={(e) => set("resultsLede", e.target.value)} placeholder="These are the figures exactly as reported in the source..." />
      </Field>

      <Field label="What Changed (outcome bullets)">
        <StringListEditor
          items={form.outcomes}
          onChange={(v) => set("outcomes", v)}
          placeholder="Records from many provider formats normalised into one coherent patient history"
          addLabel="+ Add Outcome"
        />
      </Field>
    </div>
  );
}
