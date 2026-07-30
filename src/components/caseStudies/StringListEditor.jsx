import { Btn, Input, Textarea } from "../ui/UI";

export default function StringListEditor({
  items = [],
  onChange,
  placeholder,
  addLabel = "+ Add Item",
  emptyLabel = "No items yet.",
  multiline = false,
  rows = 3,
}) {
  const addRow = () => onChange([...(items || []), ""]);
  const updateRow = (index, value) => {
    const next = [...(items || [])];
    next[index] = value;
    onChange(next);
  };
  const removeRow = (index) => onChange((items || []).filter((_, i) => i !== index));

  return (
    <div>
      {(items || []).map((item, index) => (
        <div key={index} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: multiline ? "flex-start" : "center" }}>
          {multiline ? (
            <Textarea rows={rows} value={item} onChange={(e) => updateRow(index, e.target.value)} placeholder={placeholder} />
          ) : (
            <Input value={item} onChange={(e) => updateRow(index, e.target.value)} placeholder={placeholder} />
          )}
          <Btn size="sm" variant="danger" onClick={() => removeRow(index)}>Remove</Btn>
        </div>
      ))}

      {(!items || items.length === 0) && (
        <div className="dynamic-empty">
          <p>{emptyLabel}</p>
        </div>
      )}

      <Btn onClick={addRow}>{addLabel}</Btn>
    </div>
  );
}
