import { Field, Input, Textarea } from "../ui/UI";
import RepeaterEditor from "./RepeaterEditor";

export default function CaseStudyOverviewStep({ form, setForm }) {
  const overview = form.overview || {};
  const set = (key, value) => setForm({ ...form, overview: { ...overview, [key]: value } });

  return (
    <div className="step-content">
      <div className="form-grid">
        <Field label="Tag">
          <Input value={overview.tag || ""} onChange={(e) => set("tag", e.target.value)} placeholder="PROJECT OVERVIEW" />
        </Field>
        <Field label="Heading">
          <Input value={overview.heading || ""} onChange={(e) => set("heading", e.target.value)} placeholder="A Full-Scale Digital Transformation..." />
        </Field>
      </div>

      <Field label="Intro">
        <Textarea rows={4} value={overview.intro || ""} onChange={(e) => set("intro", e.target.value)} placeholder="Full intro paragraph..." />
      </Field>

      <RepeaterEditor
        cardTitle="Highlights"
        items={overview.highlights}
        onChange={(v) => set("highlights", v)}
        emptyItem={{ icon: "", title: "", desc: "" }}
        fields={[
          { key: "icon", label: "Icon", placeholder: "Target" },
          { key: "title", label: "Title", placeholder: "Clear Objective" },
          { key: "desc", label: "Description", type: "textarea", rows: 2, placeholder: "..." },
        ]}
        addLabel="+ Add Highlight"
        emptyLabel="No highlights added."
      />
    </div>
  );
}
