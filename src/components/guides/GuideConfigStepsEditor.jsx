import { Btn, Field, Input, Textarea } from "../ui/UI";

const emptyStep = (n = 1) => ({ number: n, title: "", paragraphs: [], settings: [], order: 0 });

export default function GuideConfigStepsEditor({ steps = [], onChange }) {
  const addStep = () => onChange([...(steps || []), emptyStep((steps?.length || 0) + 1)]);
  const removeStep = (i) => onChange(steps.filter((_, idx) => idx !== i));
  const updateStep = (i, key, value) => {
    const next = [...steps];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };

  // paragraphs (string list) helpers
  const addParagraph = (i) => updateStep(i, "paragraphs", [...(steps[i].paragraphs || []), ""]);
  const updateParagraph = (i, pIdx, value) => {
    const paragraphs = [...(steps[i].paragraphs || [])];
    paragraphs[pIdx] = value;
    updateStep(i, "paragraphs", paragraphs);
  };
  const removeParagraph = (i, pIdx) => updateStep(i, "paragraphs", steps[i].paragraphs.filter((_, idx) => idx !== pIdx));

  // settings (term/definition) helpers
  const addSetting = (i) => updateStep(i, "settings", [...(steps[i].settings || []), { term: "", definition: "" }]);
  const updateSetting = (i, sIdx, key, value) => {
    const settings = [...(steps[i].settings || [])];
    settings[sIdx] = { ...settings[sIdx], [key]: value };
    updateStep(i, "settings", settings);
  };
  const removeSetting = (i, sIdx) => updateStep(i, "settings", steps[i].settings.filter((_, idx) => idx !== sIdx));

  return (
    <div>
      <div className="dynamic-header">
        <h3>Configuration Steps</h3>
        <Btn onClick={addStep}>+ Add Step</Btn>
      </div>

      <div className="dynamic-cards">
        {steps.map((step, i) => (
          <div key={i} className="dynamic-card" style={{ borderLeft: "3px solid var(--accent, #4f7cff)" }}>
            <div className="form-grid">
              <Field label="Step Number" required>
                <Input type="number" value={step.number ?? i + 1} onChange={(e) => updateStep(i, "number", Number(e.target.value))} />
              </Field>
              <Field label="Step Title" required>
                <Input value={step.title || ""} onChange={(e) => updateStep(i, "title", e.target.value)} placeholder="Configure retention labels" />
              </Field>
            </div>

            <div style={{ marginTop: 12, paddingLeft: 14, borderLeft: "2px dashed var(--border, #e2e5ea)" }}>
              <div className="dynamic-header">
                <h4 style={{ margin: 0, fontSize: 13 }}>Paragraphs</h4>
                <Btn size="sm" onClick={() => addParagraph(i)}>+ Add Paragraph</Btn>
              </div>
              {(step.paragraphs || []).map((p, pIdx) => (
                <div key={pIdx} style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "flex-start" }}>
                  <Textarea rows={2} value={p} onChange={(e) => updateParagraph(i, pIdx, e.target.value)} placeholder="Explain this part of the step..." />
                  <Btn size="sm" variant="danger" onClick={() => removeParagraph(i, pIdx)}>Remove</Btn>
                </div>
              ))}
              {(!step.paragraphs || step.paragraphs.length === 0) && <div className="dynamic-empty"><p>No paragraphs yet.</p></div>}
            </div>

            <div style={{ marginTop: 14, paddingLeft: 14, borderLeft: "2px dashed var(--border, #e2e5ea)" }}>
              <div className="dynamic-header">
                <h4 style={{ margin: 0, fontSize: 13 }}>Settings (term / definition)</h4>
                <Btn size="sm" onClick={() => addSetting(i)}>+ Add Setting</Btn>
              </div>
              {(step.settings || []).map((s, sIdx) => (
                <div key={sIdx} className="form-grid" style={{ marginTop: 8, alignItems: "flex-end" }}>
                  <Field label="Term">
                    <Input value={s.term || ""} onChange={(e) => updateSetting(i, sIdx, "term", e.target.value)} placeholder="Retention period" />
                  </Field>
                  <Field label="Definition">
                    <Input value={s.definition || ""} onChange={(e) => updateSetting(i, sIdx, "definition", e.target.value)} placeholder="7 years from matter closure" />
                  </Field>
                  <Btn size="sm" variant="danger" onClick={() => removeSetting(i, sIdx)}>Remove</Btn>
                </div>
              ))}
              {(!step.settings || step.settings.length === 0) && <div className="dynamic-empty"><p>No settings rows yet.</p></div>}
            </div>

            <Btn variant="danger" onClick={() => removeStep(i)} style={{ marginTop: 14 }}>Remove Step</Btn>
          </div>
        ))}

        {steps.length === 0 && (
          <div className="dynamic-empty">
            <p>No configuration steps added.</p>
            <Btn onClick={addStep}>+ Add Step</Btn>
          </div>
        )}
      </div>
    </div>
  );
}
