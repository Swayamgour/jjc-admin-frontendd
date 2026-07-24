import { Btn, Field, Input, Textarea } from "../ui/UI";

/**
 * Generic "add/edit/remove" list editor for arrays of small objects.
 *
 * fields: [{ key, label, placeholder, type: "text" | "textarea" }]
 * emptyItem: the shape of a new blank row, e.g. { icon: "", value: "", label: "" }
 */
export default function RepeaterEditor({
  items = [],
  onChange,
  fields,
  emptyItem,
  addLabel = "+ Add",
  emptyLabel = "Nothing added yet.",
  cardTitle,
}) {
  const addRow = () => onChange([...(items || []), { ...emptyItem }]);

  const updateRow = (index, key, value) => {
    const next = [...(items || [])];
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  };

  const removeRow = (index) => onChange((items || []).filter((_, i) => i !== index));

  return (
    <div>
      <div className="dynamic-header">
        <h3>{cardTitle}</h3>
        <Btn onClick={addRow}>{addLabel}</Btn>
      </div>

      <div className="dynamic-cards">
        {(items || []).map((item, index) => (
          <div key={index} className="dynamic-card">
            <div className="form-grid">
              {fields.map((f) => (
                <Field key={f.key} label={f.label}>
                  {f.type === "textarea" ? (
                    <Textarea
                      rows={f.rows || 3}
                      value={item[f.key] || ""}
                      onChange={(e) => updateRow(index, f.key, e.target.value)}
                      placeholder={f.placeholder}
                    />
                  ) : (
                    <Input
                      value={item[f.key] || ""}
                      onChange={(e) => updateRow(index, f.key, e.target.value)}
                      placeholder={f.placeholder}
                    />
                  )}
                </Field>
              ))}
            </div>
            <Btn variant="danger" onClick={() => removeRow(index)}>Remove</Btn>
          </div>
        ))}

        {(!items || items.length === 0) && (
          <div className="dynamic-empty">
            <p>{emptyLabel}</p>
            <Btn onClick={addRow}>{addLabel}</Btn>
          </div>
        )}
      </div>
    </div>
  );
}
