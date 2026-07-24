import { Field, Input } from "../ui/UI";
import RepeaterEditor from "./RepeaterEditor";

export default function CaseStudyApproachStep({ form, setForm }) {
  const approach = form.approach || {};
  const set = (key, value) => setForm({ ...form, approach: { ...approach, [key]: value } });

  return (
    <div className="step-content">
      <Field label="Heading">
        <Input value={approach.heading || ""} onChange={(e) => set("heading", e.target.value)} placeholder="Our Approach" />
      </Field>

      <RepeaterEditor
        cardTitle="Steps"
        items={approach.steps}
        onChange={(v) => set("steps", v)}
        emptyItem={{ number: "", icon: "", title: "", desc: "" }}
        fields={[
          { key: "number", label: "Number", placeholder: "01" },
          { key: "icon", label: "Icon", placeholder: "Search" },
          { key: "title", label: "Title", placeholder: "Assessment" },
          { key: "desc", label: "Description", type: "textarea", rows: 2, placeholder: "..." },
        ]}
        addLabel="+ Add Step"
        emptyLabel="No steps added."
      />
    </div>
  );
}
