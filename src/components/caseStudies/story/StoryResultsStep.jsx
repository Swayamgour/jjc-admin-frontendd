import { Field, Input, Textarea } from "../../ui/UI";
import StringListEditor from "../StringListEditor";
import RepeaterEditor from "../RepeaterEditor";

export default function StoryResultsStep({ form, setForm }) {
  const results = form.results || {};
  const set = (key, value) => setForm({ ...form, results: { ...results, [key]: value } });

  return (
    <div className="step-content">
      <div className="grid-2">
        <Field label="Eyebrow">
          <Input value={results.eyebrow || ""} onChange={(e) => set("eyebrow", e.target.value)} placeholder="The Results" />
        </Field>
        <Field label="Title">
          <Input value={results.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="What changed" />
        </Field>
      </div>

      <Field label="Description">
        <Textarea rows={3} value={results.description || ""} onChange={(e) => set("description", e.target.value)} placeholder="Processing time dropped from days to minutes..." />
      </Field>

      <RepeaterEditor
        cardTitle="Metrics"
        items={results.metrics || []}
        onChange={(v) => set("metrics", v)}
        emptyItem={{ value: "", label: "" }}
        fields={[
          { key: "value", label: "Value", placeholder: "92%" },
          { key: "label", label: "Label", placeholder: "Reduction in processing time" },
        ]}
        addLabel="+ Add Metric"
        emptyLabel="No metrics added."
      />

      <Field label="Outcomes Heading">
        <Input value={results.changesTitle || ""} onChange={(e) => set("changesTitle", e.target.value)} placeholder="What changed on the ground" />
      </Field>

      <Field label="Outcomes">
        <StringListEditor items={results.outcomes || []} onChange={(v) => set("outcomes", v)} placeholder="Staff redeployed to exception handling only" addLabel="+ Add Outcome" emptyLabel="No outcomes added." />
      </Field>
    </div>
  );
}
