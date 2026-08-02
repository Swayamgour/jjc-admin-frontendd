import { Field, Input } from "../../ui/UI";
import StringListEditor from "../../shared/StringListEditor";
import RepeaterEditor from "../../shared/RepeaterEditor";

export default function GuideVerifyPitfallsStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <Field label="Verify Steps" hint="How to confirm the configuration worked">
        <StringListEditor
          items={form.verifySteps || []}
          onChange={(v) => set("verifySteps", v)}
          placeholder="Run a test search and confirm results are scoped correctly"
          addLabel="+ Add Verify Step"
          emptyLabel="No verify steps added."
        />
      </Field>

      <div className="form-grid" style={{ marginTop: 20 }}>
        <Field label="Best Practice Heading">
          <Input value={form.bestPracticeHeading || ""} onChange={(e) => set("bestPracticeHeading", e.target.value)} placeholder="What we do on every engagement of this type" />
        </Field>
      </div>
      <Field label="Best Practices">
        <StringListEditor
          items={form.bestPractices || []}
          onChange={(v) => set("bestPractices", v)}
          placeholder="Always test in a pilot group first"
          addLabel="+ Add Best Practice"
          emptyLabel="No best practices added."
        />
      </Field>

      <div className="form-grid" style={{ marginTop: 20 }}>
        <Field label="Pitfalls Heading">
          <Input value={form.pitfallsHeading || ""} onChange={(e) => set("pitfallsHeading", e.target.value)} placeholder="What catches most first attempts" />
        </Field>
        <Field label="Pitfalls Lede">
          <Input value={form.pitfallsLede || ""} onChange={(e) => set("pitfallsLede", e.target.value)} placeholder="A short intro sentence" />
        </Field>
      </div>
      <RepeaterEditor
        cardTitle="Pitfalls"
        items={form.pitfalls || []}
        onChange={(v) => set("pitfalls", v)}
        emptyItem={{ title: "", description: "" }}
        fields={[
          { key: "title", label: "Title", placeholder: "Skipping the pilot" },
          { key: "description", label: "Description", placeholder: "What goes wrong and why", type: "textarea" },
        ]}
        addLabel="+ Add Pitfall"
        emptyLabel="No pitfalls added."
      />
    </div>
  );
}
