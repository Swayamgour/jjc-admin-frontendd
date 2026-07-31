import { Field, Input, Textarea } from "../../ui/UI";
import RepeaterEditor from "../RepeaterEditor";

export default function StoryTransfersStep({ form, setForm }) {
  const transfers = form.transfers || {};
  const set = (key, value) => setForm({ ...form, transfers: { ...transfers, [key]: value } });

  return (
    <div className="step-content">
      <div className="grid-2">
        <Field label="Eyebrow">
          <Input value={transfers.eyebrow || ""} onChange={(e) => set("eyebrow", e.target.value)} placeholder="What Transfers" />
        </Field>
        <Field label="Title">
          <Input value={transfers.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="What this looks like elsewhere" />
        </Field>
      </div>

      <Field label="Description">
        <Textarea rows={3} value={transfers.description || ""} onChange={(e) => set("description", e.target.value)} placeholder="This pattern generalizes to any high-volume, multi-format intake process..." />
      </Field>

      <div className="grid-2">
        <Field label="Warning Title">
          <Input value={transfers.warningTitle || ""} onChange={(e) => set("warningTitle", e.target.value)} placeholder="Where it usually gets harder than expected" />
        </Field>
        <Field label="Approach Heading">
          <Input value={transfers.approachTitle || ""} onChange={(e) => set("approachTitle", e.target.value)} placeholder="Typical rollout approach" />
        </Field>
      </div>

      <Field label="Warning Description">
        <Textarea rows={3} value={transfers.warningDescription || ""} onChange={(e) => set("warningDescription", e.target.value)} placeholder="Legacy formats without consistent field mapping..." />
      </Field>

      <RepeaterEditor
        cardTitle="Rollout Process Steps"
        items={transfers.process || []}
        onChange={(v) => set("process", v)}
        emptyItem={{ step: "", title: "", description: "" }}
        fields={[
          { key: "step", label: "Step #", placeholder: "1" },
          { key: "title", label: "Title", placeholder: "Audit existing formats" },
          { key: "description", label: "Description", type: "textarea", placeholder: "Catalogue every incoming document type before automating." },
        ]}
        addLabel="+ Add Step"
        emptyLabel="No process steps added."
      />
    </div>
  );
}
