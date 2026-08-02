import { Btn, Field, Input, Textarea } from "../ui/UI";

const emptyItem = () => ({ label: "", note: "", order: 0 });
const emptySection = () => ({ title: "", description: "", items: [], order: 0 });

export default function ChecklistSectionsEditor({ sections = [], onChange }) {
  const addSection = () => onChange([...(sections || []), emptySection()]);
  const removeSection = (i) => onChange(sections.filter((_, idx) => idx !== i));
  const updateSection = (i, key, value) => {
    const next = [...sections];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };

  const addItem = (secIdx) => {
    const next = [...sections];
    next[secIdx] = { ...next[secIdx], items: [...(next[secIdx].items || []), emptyItem()] };
    onChange(next);
  };
  const removeItem = (secIdx, itemIdx) => {
    const next = [...sections];
    next[secIdx] = { ...next[secIdx], items: next[secIdx].items.filter((_, i) => i !== itemIdx) };
    onChange(next);
  };
  const updateItem = (secIdx, itemIdx, key, value) => {
    const next = [...sections];
    const items = [...next[secIdx].items];
    items[itemIdx] = { ...items[itemIdx], [key]: value };
    next[secIdx] = { ...next[secIdx], items };
    onChange(next);
  };

  return (
    <div>
      <div className="dynamic-header">
        <h3>Checklist Sections</h3>
        <Btn onClick={addSection}>+ Add Section</Btn>
      </div>

      <div className="dynamic-cards">
        {sections.map((section, secIdx) => (
          <div key={secIdx} className="dynamic-card" style={{ borderLeft: "3px solid var(--accent, #4f7cff)" }}>
            <div className="form-grid">
              <Field label="Section Title" required>
                <Input value={section.title || ""} onChange={(e) => updateSection(secIdx, "title", e.target.value)} placeholder="Licensing and roles" />
              </Field>
              <Field label="Order">
                <Input type="number" value={section.order ?? 0} onChange={(e) => updateSection(secIdx, "order", Number(e.target.value))} />
              </Field>
            </div>
            <Field label="Section Description">
              <Textarea rows={2} value={section.description || ""} onChange={(e) => updateSection(secIdx, "description", e.target.value)} placeholder="The prerequisites that stop an exercise before it begins." />
            </Field>

            <div style={{ marginTop: 14, paddingLeft: 14, borderLeft: "2px dashed var(--border, #e2e5ea)" }}>
              <div className="dynamic-header">
                <h4 style={{ margin: 0, fontSize: 13 }}>Check Items ({section.items?.length || 0})</h4>
                <Btn size="sm" onClick={() => addItem(secIdx)}>+ Add Item</Btn>
              </div>

              {(section.items || []).map((item, itemIdx) => (
                <div key={itemIdx} className="dynamic-card" style={{ marginTop: 8 }}>
                  <Field label="Label (bold check line)" required>
                    <Input
                      value={item.label || ""}
                      onChange={(e) => updateItem(secIdx, itemIdx, "label", e.target.value)}
                      placeholder="Microsoft 365 E5 or the Compliance add-on confirmed"
                    />
                  </Field>
                  <Field label="Note (why it matters)" required>
                    <Textarea
                      rows={2}
                      value={item.note || ""}
                      onChange={(e) => updateItem(secIdx, itemIdx, "note", e.target.value)}
                      placeholder="Premium eDiscovery requires the higher tier..."
                    />
                  </Field>
                  <Btn size="sm" variant="danger" onClick={() => removeItem(secIdx, itemIdx)}>Remove Item</Btn>
                </div>
              ))}
              {(!section.items || section.items.length === 0) && (
                <div className="dynamic-empty"><p>No items in this section yet.</p></div>
              )}
            </div>

            <Btn variant="danger" onClick={() => removeSection(secIdx)} style={{ marginTop: 14 }}>Remove Section</Btn>
          </div>
        ))}

        {sections.length === 0 && (
          <div className="dynamic-empty">
            <p>No sections added.</p>
            <Btn onClick={addSection}>+ Add Section</Btn>
          </div>
        )}
      </div>
    </div>
  );
}
