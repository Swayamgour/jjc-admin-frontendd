import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function DynamicCardStep({
  title,
  section = {},
  onChange,
  fields = [], // ['title', 'description', 'icon', 'points', 'tag', 'meta', 'link', 'industry']
  cardLabel = "Item",
  arrayKey = "items", // e.g. "metrics" for outcomes section
}) {
  const items = section[arrayKey] || [];

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
      [arrayKey]: [...items, newItem],
    });
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...section, [arrayKey]: updated });
  };

  const updateNestedArray = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value.split("\n").filter(Boolean);
    onChange({ ...section, [arrayKey]: updated });
  };

  const removeItem = (index) => {
    onChange({
      ...section,
      [arrayKey]: items.filter((_, i) => i !== index),
    });
  };

  const renderField = (item, index, field) => {
    const value = item[field] || "";

    switch (field) {
      case "points":
        return (
          <div key={field}>
            <h4>Points</h4>

            {(item.points || []).map((point, i) => (
              <div key={i} className="form-grid">
                <Field label={`Point ${i + 1}`}>
                  <Input
                    value={point || ""}
                    onChange={(e) => {
                      const updated = [...items];

                      const points = [
                        ...(updated[index]?.points || []),
                      ];

                      points[i] = e.target.value;

                      updated[index] = {
                        ...updated[index],
                        points,
                      };

                      onChange({
                        ...section,
                        [arrayKey]: updated,
                      });
                    }}
                  />
                </Field>

                <Btn
                  type="button"
                  variant="danger"
                  onClick={() => {
                    const updated = [...items];

                    updated[index] = {
                      ...updated[index],
                      points: updated[index].points.filter(
                        (_, idx) => idx !== i
                      ),
                    };

                    onChange({
                      ...section,
                      [arrayKey]: updated,
                    });
                  }}
                >
                  Remove
                </Btn>
              </div>
            ))}

            <Btn
              type="button"
              onClick={() => {
                const updated = [...items];

                updated[index] = {
                  ...updated[index],
                  points: [
                    ...(updated[index]?.points || []),
                    "",
                  ],
                };

                onChange({
                  ...section,
                  [arrayKey]: updated,
                });
              }}
            >
              Add Point
            </Btn>
          </div>
        );
      // case "metrics":
      //   return (
      //     <Field label={`Metrics (one per line)`} key={field}>
      //       <Textarea
      //         rows={4}
      //         value={(item.metrics || []).join("\n")}
      //         onChange={(e) =>
      //           updateNestedArray(index, "metrics", e.target.value)
      //         }
      //         placeholder="One metric per line"
      //       />
      //     </Field>
      //   );

      case "metrics":
        return (
          <div key={field}>
            <h4>Metrics</h4>

            {(item.metrics || []).map((metric, i) => (
              <div key={i} className="form-grid">
                <Field label="Value">
                  <Input
                    value={metric.value || ""}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[index].metrics[i].value = e.target.value;
                      onChange({ ...section, [arrayKey]: updated });
                    }}
                  />
                </Field>

                <Field label="Label">
                  <Input
                    value={metric.label || ""}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[index].metrics[i].label = e.target.value;
                      onChange({ ...section, [arrayKey]: updated });
                    }}
                  />
                </Field>
              </div>
            ))}

            <Btn
              type="button"
              onClick={() => {
                const updated = [...items];

                updated[index].metrics = [
                  ...(updated[index].metrics || []),
                  {
                    value: "",
                    label: "",
                  },
                ];

                onChange({ ...section, [arrayKey]: updated });
              }}
            >
              Add Metric
            </Btn>
          </div>
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
        <h3>{title} {cardLabel}s</h3>
        <Btn type="button" onClick={addItem}>Add</Btn>
      </div>

      <div className="dynamic-cards">
        {items.length === 0 ? (
          <div className="dynamic-empty">
            <p>No {cardLabel.toLowerCase()}s added.</p>
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