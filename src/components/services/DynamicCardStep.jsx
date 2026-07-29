import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function DynamicCardStep({
  title,
  section = {},
  onChange,
  fields = [], // ['title', 'description', 'icon', 'points', 'tag', 'meta', 'link', 'industry']
  cardLabel = "Item",
}) {
  const items = section.items || [];

  const updateSection = (field, value) => {
    onChange({ ...section, [field]: value });
  };

  const addItem = () => {
    const newItem = {};
    fields.forEach((field) => {
      if (field === 'points') newItem.points = [];
      else if (field === 'metrics') newItem.metrics = [];
      else if (field === 'outcomes') newItem.outcomes = [];
      else newItem[field] = "";
    });
    onChange({
      ...section,
      items: [...items, newItem],
    });
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...section, items: updated });
  };

  const updateNestedArray = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value.split("\n").filter(Boolean);
    onChange({ ...section, items: updated });
  };

  const removeItem = (index) => {
    onChange({
      ...section,
      items: items.filter((_, i) => i !== index),
    });
  };

  const renderField = (item, index, field) => {
    const value = item[field] || "";

    switch (field) {
      case "points":
        return (
          <Field label={`Points (one per line)`} key={field}>
            <Textarea
              rows={4}
              value={(item.points || []).join("\n")}
              onChange={(e) =>
                updateNestedArray(index, "points", e.target.value)
              }
              placeholder="One point per line"
            />
          </Field>
        );
      case "metrics":
        return (
          <Field label={`Metrics (one per line)`} key={field}>
            <Textarea
              rows={4}
              value={(item.metrics || []).join("\n")}
              onChange={(e) =>
                updateNestedArray(index, "metrics", e.target.value)
              }
              placeholder="One metric per line"
            />
          </Field>
        );
      case "outcomes":
        return (
          <Field label={`Outcomes (one per line)`} key={field}>
            <Textarea
              rows={4}
              value={(item.outcomes || []).join("\n")}
              onChange={(e) =>
                updateNestedArray(index, "outcomes", e.target.value)
              }
              placeholder="One outcome per line"
            />
          </Field>
        );
      case "description":
        return (
          <Field label="Description" key={field}>
            <Textarea
              rows={4}
              value={value}
              onChange={(e) => updateItem(index, field, e.target.value)}
            />
          </Field>
        );
      default:
        return (
          <Field label={field.charAt(0).toUpperCase() + field.slice(1)} key={field}>
            <Input
              value={value}
              onChange={(e) => updateItem(index, field, e.target.value)}
              placeholder={`Enter ${field}`}
            />
          </Field>
        );
    }
  };

  return (
    <div>
      <div className="form-grid">
        <Field label={`${title} Eyebrow/Tag`}>
          <Input
            value={section.eyebrow || section.tag || ""}
            onChange={(e) => updateSection("eyebrow", e.target.value)}
            placeholder="e.g. Why do it"
          />
        </Field>

        <Field label={`${title} Title`}>
          <Input
            value={section.title || ""}
            onChange={(e) => updateSection("title", e.target.value)}
          />
        </Field>

        <Field label={`${title} Subtitle`}>
          <Input
            value={section.subtitle || ""}
            onChange={(e) => updateSection("subtitle", e.target.value)}
          />
        </Field>

        <Field label="Note">
          <Textarea
            rows={3}
            value={section.note || ""}
            onChange={(e) => updateSection("note", e.target.value)}
          />
        </Field>

        <Field label="Note Highlight">
          <Input
            value={section.noteHighlight || ""}
            onChange={(e) => updateSection("noteHighlight", e.target.value)}
          />
        </Field>
      </div>

      <div className="dynamic-header">
        <h3>{title} Items</h3>
        <Btn type="button" onClick={addItem}>Add</Btn>
      </div>

      <div className="dynamic-cards">
        {items.length === 0 ? (
          <div className="dynamic-empty">
            <p>No items added.</p>
            <Btn type="button" onClick={addItem}>Add</Btn>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} className="dynamic-card">
              <div className="form-grid">
                {fields.map((field) => renderField(item, index, field))}
              </div>
              <Btn variant="danger" type="button" onClick={() => removeItem(index)}>
                Remove
              </Btn>
            </div>
          ))
        )}
      </div>
    </div>
  );
}