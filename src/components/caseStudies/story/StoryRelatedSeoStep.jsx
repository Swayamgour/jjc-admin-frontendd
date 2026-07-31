import { Field, Input, Textarea, Select, Btn } from "../../ui/UI";
import StringListEditor from "../StringListEditor";

export default function StoryRelatedSeoStep({ form, setForm, allStories = [], currentId }) {
  const seo = form.seo || {};
  const setSeo = (key, value) => setForm({ ...form, seo: { ...seo, [key]: value } });
  const set = (key, value) => setForm({ ...form, [key]: value });

  const related = form.relatedStories || [];
  const otherStories = allStories.filter((s) => s._id !== currentId);

  const addRow = () => set("relatedStories", [...related, { story: "", title: "", slug: "", category: "" }]);
  const updateRow = (index, key, value) => {
    const next = [...related];
    next[index] = { ...next[index], [key]: value };
    set("relatedStories", next);
  };
  const removeRow = (index) => set("relatedStories", related.filter((_, i) => i !== index));

  const pickExisting = (index, storyId) => {
    const picked = otherStories.find((s) => s._id === storyId);
    const next = [...related];
    next[index] = {
      ...next[index],
      story: storyId,
      title: picked?.title || next[index].title,
      slug: picked?.slug || next[index].slug,
    };
    set("relatedStories", next);
  };

  return (
    <div className="step-content">
      <h3 style={{ marginBottom: 12 }}>Related Stories</h3>
      <Field label="Section Heading">
        <Input value={form.relatedStoriesTitle || ""} onChange={(e) => set("relatedStoriesTitle", e.target.value)} placeholder="More success stories" />
      </Field>

      <div className="dynamic-header">
        <h3>Related Story Entries</h3>
        <Btn onClick={addRow}>+ Add Related Story</Btn>
      </div>

      <div className="dynamic-cards">
        {related.map((item, index) => (
          <div key={index} className="dynamic-card">
            <div className="form-grid">
              <Field label="Link to Existing Story">
                <Select value={item.story || ""} onChange={(e) => pickExisting(index, e.target.value)}>
                  <option value="">— Manual entry below —</option>
                  {otherStories.map((s) => (
                    <option key={s._id} value={s._id}>{s.title}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Title Override">
                <Input value={item.title || ""} onChange={(e) => updateRow(index, "title", e.target.value)} placeholder="Display title" />
              </Field>
              <Field label="Slug Override">
                <Input value={item.slug || ""} onChange={(e) => updateRow(index, "slug", e.target.value)} placeholder="story-slug" />
              </Field>
              <Field label="Category Label">
                <Input value={item.category || ""} onChange={(e) => updateRow(index, "category", e.target.value)} placeholder="Healthcare" />
              </Field>
            </div>
            <Btn variant="danger" onClick={() => removeRow(index)}>Remove</Btn>
          </div>
        ))}
        {related.length === 0 && (
          <div className="dynamic-empty">
            <p>No related stories added.</p>
          </div>
        )}
      </div>

      <h3 style={{ margin: "28px 0 12px" }}>SEO</h3>
      <Field label="Meta Title">
        <Input value={seo.title || ""} onChange={(e) => setSeo("title", e.target.value)} placeholder="20M Records a Year, Processed Without New Headcount" />
      </Field>
      <Field label="Meta Description">
        <Textarea rows={3} value={seo.description || ""} onChange={(e) => setSeo("description", e.target.value)} placeholder="How a regional health network automated medical record intake..." />
      </Field>
      <Field label="Keywords">
        <StringListEditor items={seo.keywords || []} onChange={(v) => setSeo("keywords", v)} placeholder="healthcare automation" addLabel="+ Add Keyword" emptyLabel="No keywords added." />
      </Field>
    </div>
  );
}
