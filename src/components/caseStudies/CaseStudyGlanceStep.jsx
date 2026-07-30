import RepeaterEditor from "./RepeaterEditor";

export default function CaseStudyGlanceStep({ form, setForm }) {
  return (
    <div className="step-content">
      <RepeaterEditor
        cardTitle="At a Glance"
        items={form.glanceItems}
        onChange={(v) => setForm({ ...form, glanceItems: v })}
        emptyItem={{ icon: "i-check", text: "" }}
        fields={[
          { key: "icon", label: "Icon", placeholder: "i-check" },
          { key: "text", label: "Text", placeholder: "Sector: Healthcare" },
        ]}
        addLabel="+ Add Line"
        emptyLabel="No glance items added."
      />
    </div>
  );
}
