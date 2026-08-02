import { Field, Input, Textarea } from "../../ui/UI";
import RepeaterEditor from "../../shared/RepeaterEditor";

export default function WhitepaperFrameworkStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <div className="form-grid">
        <Field label="Framework Heading">
          <Input value={form.frameworkHeading || ""} onChange={(e) => set("frameworkHeading", e.target.value)} placeholder="Something you can apply without us" />
        </Field>
        <Field label="Framework Name">
          <Input value={form.frameworkName || ""} onChange={(e) => set("frameworkName", e.target.value)} placeholder="The consolidation sequence" />
        </Field>
      </div>

      <Field label="Framework Lede">
        <Textarea rows={2} value={form.frameworkLede || ""} onChange={(e) => set("frameworkLede", e.target.value)} placeholder="Every paper in this series ends with a framework..." />
      </Field>
      <Field label="Framework Description">
        <Textarea rows={2} value={form.frameworkDescription || ""} onChange={(e) => set("frameworkDescription", e.target.value)} placeholder="Five stages. Institutions that skip the first reliably rebuild it later." />
      </Field>

      <RepeaterEditor
        cardTitle="Framework Stages"
        items={form.frameworkStages || []}
        onChange={(v) => set("frameworkStages", v)}
        emptyItem={{ number: (form.frameworkStages?.length || 0) + 1, title: "", description: "", order: 0 }}
        fields={[
          { key: "number", label: "Number" },
          { key: "title", label: "Title", placeholder: "Agree" },
          { key: "description", label: "Description", placeholder: "Definitions and owners for every metric that will be published...", type: "textarea" },
        ]}
        addLabel="+ Add Stage"
        emptyLabel="No stages added."
      />
    </div>
  );
}
