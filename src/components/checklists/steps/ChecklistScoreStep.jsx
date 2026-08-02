import { Btn, Field, Input, Textarea } from "../../ui/UI";

const emptyBand = () => ({ min: 0, max: 100, label: "", description: "" });

export default function ChecklistScoreStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });
  const bands = form.scoreBands || [];

  const addBand = () => set("scoreBands", [...bands, emptyBand()]);
  const removeBand = (i) => set("scoreBands", bands.filter((_, idx) => idx !== i));
  const updateBand = (i, key, value) => {
    const next = [...bands];
    next[i] = { ...next[i], [key]: value };
    set("scoreBands", next);
  };

  return (
    <div className="step-content">
      <div className="form-grid">
        <Field label="Score Heading">
          <Input value={form.scoreHeading || ""} onChange={(e) => set("scoreHeading", e.target.value)} placeholder="Read this against the number above" />
        </Field>
      </div>
      <Field label="Score Lede">
        <Textarea rows={3} value={form.scoreLede || ""} onChange={(e) => set("scoreLede", e.target.value)} placeholder="These bands are deliberately blunt..." />
      </Field>

      <div className="dynamic-header">
        <h3>Score Bands</h3>
        <Btn onClick={addBand}>+ Add Band</Btn>
      </div>
      <div className="dynamic-cards">
        {bands.map((band, i) => (
          <div key={i} className="dynamic-card">
            <div className="form-grid">
              <Field label="Min" required>
                <Input type="number" value={band.min ?? 0} onChange={(e) => updateBand(i, "min", Number(e.target.value))} />
              </Field>
              <Field label="Max" required>
                <Input type="number" value={band.max ?? 100} onChange={(e) => updateBand(i, "max", Number(e.target.value))} />
              </Field>
            </div>
            <Field label="Label" required>
              <Input value={band.label || ""} onChange={(e) => updateBand(i, "label", e.target.value)} placeholder="Significant gaps" />
            </Field>
            <Field label="Description" required>
              <Textarea rows={2} value={band.description || ""} onChange={(e) => updateBand(i, "description", e.target.value)} placeholder="Do not proceed yet..." />
            </Field>
            <Btn variant="danger" onClick={() => removeBand(i)}>Remove Band</Btn>
          </div>
        ))}
        {bands.length === 0 && (
          <div className="dynamic-empty"><p>No score bands added.</p><Btn onClick={addBand}>+ Add Band</Btn></div>
        )}
      </div>

      <Field label="Score Note" className="field-full" hint="Shown under the interactive score widget">
        <Textarea
          rows={2}
          value={form.scoreNote || ""}
          onChange={(e) => set("scoreNote", e.target.value)}
          placeholder="Your score highlights automatically as you tick items above..."
        />
      </Field>
    </div>
  );
}
