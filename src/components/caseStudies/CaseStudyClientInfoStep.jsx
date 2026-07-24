import RepeaterEditor from "./RepeaterEditor";

export default function CaseStudyClientInfoStep({ form, setForm }) {
  return (
    <div className="step-content">
      <RepeaterEditor
        cardTitle="Client Info"
        items={form.clientInfo}
        onChange={(v) => setForm({ ...form, clientInfo: v })}
        emptyItem={{ icon: "", label: "", value: "" }}
        fields={[
          { key: "icon", label: "Icon", placeholder: "User" },
          { key: "label", label: "Label", placeholder: "Client" },
          { key: "value", label: "Value", placeholder: "ABC Healthcare" },
        ]}
        addLabel="+ Add Field"
        emptyLabel="No client info added."
      />
    </div>
  );
}
