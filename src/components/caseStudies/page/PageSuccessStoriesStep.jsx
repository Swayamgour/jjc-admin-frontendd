import { Field, Input, Textarea, Select, Btn } from "../../ui/UI";
import StringListEditor from "../StringListEditor";
import RepeaterEditor from "../RepeaterEditor";

const EMPTY_STORY = {
  type: "published",
  tags: [],
  title: "",
  organization: "",
  country: "",
  challenge: "",
  solution: "",
  metrics: [],
  outcomes: [],
  products: [],
  description: "",
  button: { label: "", link: "" },
};

function StoryCard({ story, onChange, onRemove, index }) {
  const set = (key, value) => onChange({ ...story, [key]: value });
  const setButton = (key, value) => set("button", { ...(story.button || {}), [key]: value });

  return (
    <div className="dynamic-card" style={{ marginBottom: 20 }}>
      <div className="dynamic-header">
        <h3>Story #{index + 1}</h3>
        <Btn variant="danger" onClick={onRemove}>Remove Story</Btn>
      </div>

      <div className="form-grid">
        <Field label="Title">
          <Input value={story.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="Cut onboarding time by 60%" />
        </Field>
        <Field label="Type">
          <Select value={story.type || "published"} onChange={(e) => set("type", e.target.value)}>
            <option value="published">Published</option>
            <option value="reserved">Reserved</option>
          </Select>
        </Field>
        <Field label="Organization">
          <Input value={story.organization || ""} onChange={(e) => set("organization", e.target.value)} placeholder="Regional Health Network" />
        </Field>
        <Field label="Country">
          <Input value={story.country || ""} onChange={(e) => set("country", e.target.value)} placeholder="United States" />
        </Field>
      </div>

      <Field label="Challenge">
        <Textarea rows={2} value={story.challenge || ""} onChange={(e) => set("challenge", e.target.value)} placeholder="What problem was being solved" />
      </Field>
      <Field label="Solution">
        <Textarea rows={2} value={story.solution || ""} onChange={(e) => set("solution", e.target.value)} placeholder="What was implemented" />
      </Field>
      <Field label="Card Description">
        <Textarea rows={2} value={story.description || ""} onChange={(e) => set("description", e.target.value)} placeholder="Short preview text shown on the card" />
      </Field>

      <Field label="Tags">
        <StringListEditor items={story.tags || []} onChange={(v) => set("tags", v)} placeholder="Automation" addLabel="+ Add Tag" emptyLabel="No tags." />
      </Field>

      <Field label="Outcomes">
        <StringListEditor items={story.outcomes || []} onChange={(v) => set("outcomes", v)} placeholder="Reduced manual entry by 90%" addLabel="+ Add Outcome" emptyLabel="No outcomes." />
      </Field>

      <Field label="Products">
        <StringListEditor items={story.products || []} onChange={(v) => set("products", v)} placeholder="Power Automate" addLabel="+ Add Product" emptyLabel="No products." />
      </Field>

      <RepeaterEditor
        cardTitle="Metrics"
        items={story.metrics || []}
        onChange={(v) => set("metrics", v)}
        emptyItem={{ value: "", label: "" }}
        fields={[
          { key: "value", label: "Value", placeholder: "92%" },
          { key: "label", label: "Label", placeholder: "Reduction in processing time" },
        ]}
        addLabel="+ Add Metric"
        emptyLabel="No metrics added."
      />

      <div className="grid-2">
        <Field label="Button Label">
          <Input value={story.button?.label || ""} onChange={(e) => setButton("label", e.target.value)} placeholder="Read the story" />
        </Field>
        <Field label="Button Link">
          <Input value={story.button?.link || ""} onChange={(e) => setButton("link", e.target.value)} placeholder="/success/story-slug" />
        </Field>
      </div>
    </div>
  );
}

export default function PageSuccessStoriesStep({ form, setForm }) {
  const successStories = form.successStories || {};
  const set = (key, value) => setForm({ ...form, successStories: { ...successStories, [key]: value } });
  const disclaimer = successStories.disclaimer || {};
  const setDisclaimer = (key, value) => set("disclaimer", { ...disclaimer, [key]: value });

  const stories = successStories.stories || [];
  const addStory = () => set("stories", [...stories, { ...EMPTY_STORY }]);
  const updateStory = (i, value) => {
    const next = [...stories];
    next[i] = value;
    set("stories", next);
  };
  const removeStory = (i) => set("stories", stories.filter((_, idx) => idx !== i));

  return (
    <div className="step-content">
      <div className="grid-2">
        <Field label="Eyebrow">
          <Input value={successStories.eyebrow || ""} onChange={(e) => set("eyebrow", e.target.value)} placeholder="Success Stories" />
        </Field>
        <Field label="Title">
          <Input value={successStories.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="Four outcomes in Healthcare" />
        </Field>
      </div>
      <Field label="Description">
        <Textarea rows={2} value={successStories.description || ""} onChange={(e) => set("description", e.target.value)} placeholder="A sample of the outcomes organizations like yours have seen." />
      </Field>

      <div className="dynamic-header">
        <h3>Stories</h3>
        <Btn onClick={addStory}>+ Add Story</Btn>
      </div>

      {stories.map((story, i) => (
        <StoryCard key={i} story={story} index={i} onChange={(v) => updateStory(i, v)} onRemove={() => removeStory(i)} />
      ))}

      {stories.length === 0 && (
        <div className="dynamic-empty" style={{ marginBottom: 20 }}>
          <p>No stories added yet.</p>
          <Btn onClick={addStory}>+ Add Story</Btn>
        </div>
      )}

      <h3 style={{ margin: "20px 0 12px" }}>Disclaimer</h3>
      <Field label="Disclaimer Title">
        <Input value={disclaimer.title || ""} onChange={(e) => setDisclaimer("title", e.target.value)} placeholder="Sourced & anonymized" />
      </Field>
      <Field label="Disclaimer Description">
        <Textarea rows={2} value={disclaimer.description || ""} onChange={(e) => setDisclaimer("description", e.target.value)} placeholder="These outcomes are adapted from publicly available case studies." />
      </Field>
    </div>
  );
}
