import { Field, Input } from "../../ui/UI";
import RepeaterEditor from "../RepeaterEditor";

export default function PageRelatedCapabilitiesStep({ form, setForm }) {
  const related = form.relatedCapabilities || {};
  const set = (key, value) => setForm({ ...form, relatedCapabilities: { ...related, [key]: value } });

  return (
    <div className="step-content">
      <div className="grid-2">
        <Field label="Eyebrow">
          <Input value={related.eyebrow || ""} onChange={(e) => set("eyebrow", e.target.value)} placeholder="Explore More" />
        </Field>
        <Field label="Title">
          <Input value={related.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="Related capabilities" />
        </Field>
      </div>

      <RepeaterEditor
        cardTitle="Capability Items"
        items={related.items || []}
        onChange={(v) => set("items", v)}
        emptyItem={{ title: "", description: "", link: "" }}
        fields={[
          { key: "title", label: "Title", placeholder: "Business Applications" },
          { key: "description", label: "Description", type: "textarea", placeholder: "Automate workflows across your organization." },
          { key: "link", label: "Link", placeholder: "/success/capability-business-applications" },
        ]}
        addLabel="+ Add Capability"
        emptyLabel="No capabilities added."
      />
    </div>
  );
}
