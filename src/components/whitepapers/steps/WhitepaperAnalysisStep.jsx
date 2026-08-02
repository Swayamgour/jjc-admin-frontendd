import { Field, Input, Textarea } from "../../ui/UI";

export default function WhitepaperAnalysisStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <Field label="Analysis Heading">
        <Input value={form.analysisHeading || ""} onChange={(e) => set("analysisHeading", e.target.value)} placeholder="The argument in full" />
      </Field>

      <Field label="Analysis Body" hint="Full HTML — use <h2>, <p>, <ul>/<li> blocks. This is the long-form section-by-section argument.">
        <Textarea
          rows={18}
          value={form.analysisBody || ""}
          onChange={(e) => set("analysisBody", e.target.value)}
          placeholder={"<h2>Section heading</h2>\n<p>Paragraph text...</p>\n<ul>\n  <li>Point one</li>\n</ul>"}
        />
      </Field>
    </div>
  );
}
