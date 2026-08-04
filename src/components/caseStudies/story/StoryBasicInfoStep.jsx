import { useMemo } from "react";
import { Field, Input, Select } from "../../ui/UI";
import StringListEditor from "../StringListEditor";
import RepeaterEditor from "../RepeaterEditor";
import { useGetCaseStudyBySlugAdminQuery } from "../../../features/caseStudies/caseStudiesApi";

// Turns a title into a URL-safe slug: "Ninety-six per cent..." -> "ninety-six-per-cent..."
function slugify(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function StoryBasicInfoStep({ form, setForm, categories = [], disabled }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  const selectedCategory = useMemo(
    () => categories.find((c) => c._id === form.parentCategory),
    [categories, form.parentCategory]
  );

  const {
    data: categoryData,
    isFetching: loadingCaseStudies,
  } = useGetCaseStudyBySlugAdminQuery(
    selectedCategory?.slug,
    { skip: !selectedCategory?.slug }
  );

  // Stories live nested inside the category payload, not as a top-level list,
  // and each entry has no _id/slug of its own — only title + content fields.
  const caseStudies = categoryData?.data?.successStories?.stories || [];

  const handleCategoryChange = (value) => {
    // Changing category invalidates whatever case study was picked before.
    setForm({ ...form, parentCategory: value, title: "", slug: "" });
  };

  const handleCaseStudySelect = (indexStr) => {
    if (indexStr === "") return;
    const cs = caseStudies[Number(indexStr)];
    if (!cs) return;
    setForm({ ...form, title: cs.title || "", slug: slugify(cs.title) });
  };

  return (
    <div className="step-content">
      <div className="grid-2">
        <Field label="Parent Category" hint="Industry / Capability this story belongs to">
          <Select value={form.parentCategory || ""} onChange={(e) => handleCategoryChange(e.target.value)} disabled={disabled}>
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} ({c.type})
              </option>
            ))}
          </Select>
        </Field>

        {form.parentCategory && (
          <Field
            label="Source Case Study"
            hint={loadingCaseStudies ? "Loading case studies…" : "Pick one to auto-fill title & slug"}
          >
            <Select onChange={(e) => handleCaseStudySelect(e.target.value)} disabled={disabled || loadingCaseStudies} defaultValue="">
              <option value="">— Select a case study —</option>
              {caseStudies.map((cs, idx) => (
                <option key={idx} value={idx}>
                  {cs.title}{cs.type === "reserved" ? " (reserved slot)" : ""}
                </option>
              ))}
            </Select>
          </Field>
        )}
      </div>

      <div className="grid-2">
        <Field label="Title" required>
          <Input value={form.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="20M Records a Year, Processed Without New Headcount" disabled={disabled} />
        </Field>
        <Field label="Slug" hint="Auto-filled from the selected case study; edit if needed">
          <Input value={form.slug || ""} onChange={(e) => set("slug", e.target.value)} placeholder="a-port-dispatch-operation-visible-in-real-time" disabled={disabled} />
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