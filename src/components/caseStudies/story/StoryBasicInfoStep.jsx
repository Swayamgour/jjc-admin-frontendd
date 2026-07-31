import { Field, Input, Select } from "../../ui/UI";
import StringListEditor from "../StringListEditor";
import RepeaterEditor from "../RepeaterEditor";

export default function StoryBasicInfoStep({ form, setForm, categories = [], disabled }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <div className="grid-2">
        <Field label="Title" required>
          <Input value={form.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="20M Records a Year, Processed Without New Headcount" disabled={disabled} />
        </Field>
        <Field label="Parent Category" hint="Industry / Capability this story belongs to">
          <Select value={form.parentCategory || ""} onChange={(e) => set("parentCategory", e.target.value)} disabled={disabled}>
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} ({c.type})
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid-2">
        <Field label="Organization">
          <Input value={form.organization || ""} onChange={(e) => set("organization", e.target.value)} placeholder="Regional Health Network" disabled={disabled} />
        </Field>
        <Field label="Country">
          <Input value={form.country || ""} onChange={(e) => set("country", e.target.value)} placeholder="United States" disabled={disabled} />
        </Field>
      </div>

      <Field label="Status">
        <Select value={form.status || "published"} onChange={(e) => set("status", e.target.value)} disabled={disabled}>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </Select>
      </Field>

      <Field label="Tags" hint="Short labels shown on the story card">
        <StringListEditor items={form.tags || []} onChange={(v) => set("tags", v)} placeholder="Healthcare" addLabel="+ Add Tag" emptyLabel="No tags added." />
      </Field>

      <Field label="Breadcrumbs" hint="Shown at the top of the story page">
        <RepeaterEditor
          cardTitle="Breadcrumbs"
          items={form.breadcrumbs || []}
          onChange={(v) => set("breadcrumbs", v)}
          emptyItem={{ label: "", link: "" }}
          fields={[
            { key: "label", label: "Label", placeholder: "Success Stories" },
            { key: "link", label: "Link", placeholder: "/success" },
          ]}
          addLabel="+ Add Breadcrumb"
          emptyLabel="No breadcrumbs added."
        />
      </Field>

      <Field label="Sub-navigation" hint="In-page jump links (e.g. Situation, Approach, Results…)">
        <RepeaterEditor
          cardTitle="Sub-navigation Links"
          items={form.subNavigation || []}
          onChange={(v) => set("subNavigation", v)}
          emptyItem={{ label: "", link: "" }}
          fields={[
            { key: "label", label: "Label", placeholder: "Results" },
            { key: "link", label: "Link", placeholder: "#results" },
          ]}
          addLabel="+ Add Link"
          emptyLabel="No sub-navigation links added."
        />
      </Field>
    </div>
  );
}
