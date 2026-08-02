import { Field, Input } from "../../ui/UI";
import RepeaterEditor from "../../shared/RepeaterEditor";

export default function GuidePrerequisitesConceptsStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <RepeaterEditor
        cardTitle="Before You Start (Prerequisites)"
        items={form.prerequisites || []}
        onChange={(v) => set("prerequisites", v)}
        emptyItem={{ label: "", text: "" }}
        fields={[
          { key: "label", label: "Label", placeholder: "Licensing" },
          { key: "text", label: "Text", placeholder: "Microsoft 365 E5 confirmed" },
        ]}
        addLabel="+ Add Prerequisite"
        emptyLabel="No prerequisites added."
      />

      <div style={{ marginTop: 30 }}>
        <div className="form-grid">
          <Field label="Concepts Heading">
            <Input value={form.conceptsHeading || ""} onChange={(e) => set("conceptsHeading", e.target.value)} placeholder="The concepts worth understanding first" />
          </Field>
          <Field label="Concepts Lede">
            <Input value={form.conceptsLede || ""} onChange={(e) => set("conceptsLede", e.target.value)} placeholder="A short intro sentence" />
          </Field>
        </div>

        <RepeaterEditor
          cardTitle="Concept Cards"
          items={form.concepts || []}
          onChange={(v) => set("concepts", v)}
          emptyItem={{ title: "", description: "", icon: "i-check", order: 0 }}
          fields={[
            { key: "title", label: "Title", placeholder: "Retention labels" },
            { key: "description", label: "Description", placeholder: "What this concept means", type: "textarea" },
            { key: "icon", label: "Icon", placeholder: "i-check" },
          ]}
          addLabel="+ Add Concept"
          emptyLabel="No concepts added."
        />
      </div>
    </div>
  );
}
