import { Field } from "../ui/UI";
import StringListEditor from "./StringListEditor";

export default function CaseStudyBeforeAfterStep({ form, setForm }) {
  const beforeAfter = form.beforeAfter || {};
  const set = (key, value) => setForm({ ...form, beforeAfter: { ...beforeAfter, [key]: value } });

  return (
    <div className="step-content">
      <div className="form-grid">
        <Field label="Before">
          <StringListEditor
            items={beforeAfter.before}
            onChange={(v) => set("before", v)}
            placeholder="Manual Processes"
            addLabel="+ Add Before Item"
          />
        </Field>
        <Field label="After">
          <StringListEditor
            items={beforeAfter.after}
            onChange={(v) => set("after", v)}
            placeholder="Automated Workflows"
            addLabel="+ Add After Item"
          />
        </Field>
      </div>
    </div>
  );
}
