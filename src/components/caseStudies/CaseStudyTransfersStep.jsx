import { Field, Input, Textarea } from "../ui/UI";
import RepeaterEditor from "./RepeaterEditor";

export default function CaseStudyTransfersStep({ form, setForm }) {
  const transfers = form.transfers || {};
  const set = (key, value) => setForm({ ...form, transfers: { ...transfers, [key]: value } });

  return (
    <div className="step-content">
      <Field label="Intro" hint="'Any organization ingesting...' style framing paragraph">
        <Textarea rows={3} value={transfers.intro || ""} onChange={(e) => set("intro", e.target.value)} placeholder="Any organization ingesting high volumes of unstructured documents..." />
      </Field>

      <div className="form-grid">
        <Field label="Note Icon">
          <Input value={transfers.noteIcon || "i-target"} onChange={(e) => set("noteIcon", e.target.value)} placeholder="i-target" />
        </Field>
        <Field label="Note Title">
          <Input value={transfers.noteTitle || ""} onChange={(e) => set("noteTitle", e.target.value)} placeholder="Where it usually gets harder than expected:" />
        </Field>
      </div>

      <Field label="Note Body">
        <Textarea rows={3} value={transfers.noteBody || ""} onChange={(e) => set("noteBody", e.target.value)} placeholder="Automation at this volume makes exception handling the whole job..." />
      </Field>

      <Field label="Approach Heading">
        <Input value={transfers.approachHeading || ""} onChange={(e) => set("approachHeading", e.target.value)} placeholder="Our approach to Modern Work & Automation work" />
      </Field>

      <RepeaterEditor
        cardTitle="Process Steps"
        items={transfers.steps}
        onChange={(v) => set("steps", v)}
        emptyItem={{ title: "", desc: "" }}
        fields={[
          { key: "title", label: "Title", placeholder: "Check what you already own" },
          { key: "desc", label: "Description", type: "textarea", rows: 2, placeholder: "Most organizations are licensed for more than they have deployed..." },
        ]}
        addLabel="+ Add Step"
        emptyLabel="No steps added."
      />
    </div>
  );
}
