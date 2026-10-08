import { Btn, Field, Input, Textarea } from "../ui/UI";

/* Editable list of plain strings (checklist lines, paragraphs, points...) */
export function StringListField({
    label,
    values = [],
    onChange,
    addLabel = "Add",
    multiline = false,
    rows = 3,
    placeholder = "",
    hint,
}) {
    const update = (i, v) => {
        const next = [...values];
        next[i] = v;
        onChange(next);
    };

    return (
        <div style={{ gridColumn: "1 / -1" }}>
            <div className="dynamic-header">
                <h4>{label}</h4>
                <Btn type="button" onClick={() => onChange([...values, ""])}>
                    {addLabel}
                </Btn>
            </div>

            {hint && (
                <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 8px" }}>{hint}</p>
            )}

            {values.length === 0 && (
                <p style={{ fontSize: 13, color: "#9ca3af" }}>Nothing added yet.</p>
            )}

            {values.map((value, i) => (
                <div key={i} className="form-grid" style={{ alignItems: "end", marginBottom: 8 }}>
                    <Field label={`${label} ${i + 1}`}>
                        {multiline ? (
                            <Textarea
                                rows={rows}
                                value={value || ""}
                                onChange={(e) => update(i, e.target.value)}
                                placeholder={placeholder}
                            />
                        ) : (
                            <Input
                                value={value || ""}
                                onChange={(e) => update(i, e.target.value)}
                                placeholder={placeholder}
                            />
                        )}
                    </Field>
                    <Btn
                        type="button"
                        variant="danger"
                        onClick={() => onChange(values.filter((_, idx) => idx !== i))}
                    >
                        Remove
                    </Btn>
                </div>
            ))}
        </div>
    );
}

/* Shown under any text field that is rendered through renderRichText() on the site */
export const RICH_TEXT_HINT =
    "Links: write [label](/url), e.g. [managed IT](/services/managed-it-services)";