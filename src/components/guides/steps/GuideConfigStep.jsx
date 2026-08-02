import { Field, Input } from "../../ui/UI";
import GuideConfigStepsEditor from "../GuideConfigStepsEditor";

export default function GuideConfigStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <div className="form-grid">
        <Field label="Configuration Heading">
          <Input value={form.configHeading || ""} onChange={(e) => set("configHeading", e.target.value)} placeholder="Step by step" />
        </Field>
        <Field label="Configuration Lede">
          <Input value={form.configLede || ""} onChange={(e) => set("configLede", e.target.value)} placeholder="A short intro sentence" />
        </Field>
      </div>

      <GuideConfigStepsEditor steps={form.configSteps || []} onChange={(v) => set("configSteps", v)} />
    </div>
  );
}
