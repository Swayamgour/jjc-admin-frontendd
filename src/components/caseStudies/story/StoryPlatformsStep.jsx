import { Field, Input } from "../../ui/UI";
import RepeaterEditor from "../RepeaterEditor";

export default function StoryPlatformsStep({ form, setForm }) {
  const platforms = form.platforms || {};
  const set = (key, value) => setForm({ ...form, platforms: { ...platforms, [key]: value } });

  return (
    <div className="step-content">
      <div className="grid-2">
        <Field label="Eyebrow">
          <Input value={platforms.eyebrow || ""} onChange={(e) => set("eyebrow", e.target.value)} placeholder="Platforms Used" />
        </Field>
        <Field label="Title">
          <Input value={platforms.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="What powered it" />
        </Field>
      </div>

      <RepeaterEditor
        cardTitle="Platform Items"
        items={platforms.items || []}
        onChange={(v) => set("items", v)}
        emptyItem={{ tag: "", title: "", description: "" }}
        fields={[
          { key: "tag", label: "Tag", placeholder: "Automation" },
          { key: "title", label: "Title", placeholder: "Power Automate" },
          { key: "description", label: "Description", type: "textarea", placeholder: "Handled record intake and routing end to end." },
        ]}
        addLabel="+ Add Platform"
        emptyLabel="No platforms added."
      />
    </div>
  );
}
