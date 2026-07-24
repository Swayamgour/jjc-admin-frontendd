import { Field, Input, Textarea } from "../ui/UI";
import RepeaterEditor from "./RepeaterEditor";

export default function CaseStudyResultsStep({ form, setForm }) {
  const results = form.results || {};
  const set = (key, value) => setForm({ ...form, results: { ...results, [key]: value } });

  return (
    <div className="step-content">
      <Field label="Heading">
        <Input value={results.heading || ""} onChange={(e) => set("heading", e.target.value)} placeholder="Results & Impact" />
      </Field>

      <RepeaterEditor
        cardTitle="Stats"
        items={results.stats}
        onChange={(v) => set("stats", v)}
        emptyItem={{ icon: "", value: "", label: "" }}
        fields={[
          { key: "icon", label: "Icon", placeholder: "TrendingUp" },
          { key: "value", label: "Value", placeholder: "60%" },
          { key: "label", label: "Label", placeholder: "Reduction in IT Issues" },
        ]}
        addLabel="+ Add Stat"
        emptyLabel="No result stats added."
      />

      <Field label="Closing Note">
        <Textarea rows={2} value={results.closing || ""} onChange={(e) => set("closing", e.target.value)} />
      </Field>
    </div>
  );
}
