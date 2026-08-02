import { Textarea, Field } from "../../ui/UI";

export default function BlogContentStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <Field
        label="Content"
        hint="Full HTML body — use <h2>, <p>, <ul>/<li>, and <div class='pull'> for the takeaways pull-quote block. This is what renders on the article page."
      >
        <Textarea
          rows={22}
          value={form.content || ""}
          onChange={(e) => set("content", e.target.value)}
          placeholder={'<p class="stand">Opening stand-first paragraph...</p>\n<h2>Section heading</h2>\n<p>Paragraph text...</p>\n<ul>\n  <li>Point one</li>\n</ul>'}
        />
      </Field>
    </div>
  );
}
