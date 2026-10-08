import { Btn, Field, Input, Textarea, Select } from "../ui/UI";
import { StringListField } from "./Stephelpers";

/* ==============================================================
 Generic "section header + list of cards" editor, driven by
 SECTION_FIELD_CONFIG (utils/pageSectionsConfig.js).

 Reads/writes exactly the backend shape:
   section = { eyebrow, title, subtitle, [arrayKey]: [...], note, ... }
================================================================ */

const HEADER_META = {
    eyebrow: { label: "Eyebrow", placeholder: "e.g. Why do it" },
    title: { label: "Section Title" },
    subtitle: { label: "Subtitle", multiline: true },
};

const FIELD_LABELS = {
    outcomeAsk: "Outcome leaders ask for",
    ctaLink: "CTA Link",
    meta: "Meta (e.g. 6 min read)",
};

const FIELD_PLACEHOLDERS = {
    icon: "icon name, e.g. route, shield, check",
    tag: "e.g. Clinical",
    link: "/page-or-url",
};

const MULTILINE_FIELDS = new Set(["description", "outcomeAsk"]);

const fieldLabel = (f) => FIELD_LABELS[f] || f.charAt(0).toUpperCase() + f.slice(1);

export default function CardSectionStep({
    title,
    section = {},
    onChange,
    config,
}) {
    const {
        arrayKey = "items",
        label: cardLabel = "Item",
        fields = [],
        header = ["eyebrow", "title", "subtitle"],
        note = false,
        noteHighlight = false,
        tagOptions,
        associated = false,
    } = config;

    const items = section[arrayKey] || [];

    const setSection = (patch) => onChange({ ...section, ...patch });

    /* ---------- cards ---------- */

    const addItem = () => {
        const blank = {};
        fields.forEach((f) => {
            if (f === "points") blank.points = [];
            else if (f === "tag" && tagOptions) blank.tag = tagOptions[0];
            else blank[f] = "";
        });
        setSection({ [arrayKey]: [...items, blank] });
    };

    const updateItem = (index, field, value) => {
        const next = [...items];
        next[index] = { ...next[index], [field]: value };
        setSection({ [arrayKey]: next });
    };

    const removeItem = (index) =>
        setSection({ [arrayKey]: items.filter((_, i) => i !== index) });

    const renderField = (item, index, field) => {
        if (field === "points") {
            return (
                <StringListField
                    key={field}
                    label="Point"
                    addLabel="Add Point"
                    values={item.points || []}
                    onChange={(v) => updateItem(index, "points", v)}
                />
            );
        }

        if (field === "tag" && tagOptions) {
            return (
                <Field label="Tag" key={field}>
                    <Select
                        value={item.tag || tagOptions[0]}
                        onChange={(e) => updateItem(index, "tag", e.target.value)}
                    >
                        {tagOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </option>
                        ))}
                    </Select>
                </Field>
            );
        }

        if (MULTILINE_FIELDS.has(field)) {
            return (
                <Field label={fieldLabel(field)} key={field}>
                    <Textarea
                        rows={field === "description" ? 4 : 2}
                        value={item[field] || ""}
                        onChange={(e) => updateItem(index, field, e.target.value)}
                    />
                </Field>
            );
        }

        return (
            <Field label={fieldLabel(field)} key={field}>
                <Input
                    value={item[field] || ""}
                    onChange={(e) => updateItem(index, field, e.target.value)}
                    placeholder={FIELD_PLACEHOLDERS[field] || `Enter ${field}`}
                />
            </Field>
        );
    };

    /* ---------- outcomes: "business outcomes" block ---------- */

    const associatedItems = section.associatedItems || [];

    const updateAssociated = (i, field, value) => {
        const next = [...associatedItems];
        next[i] = { ...next[i], [field]: value };
        setSection({ associatedItems: next });
    };

    return (
        <div>
            {/* ---------- section header ---------- */}
            <div className="form-grid">
                {header.map((key) => {
                    const meta = HEADER_META[key];
                    return (
                        <Field label={meta.label} key={key}>
                            {meta.multiline ? (
                                <Textarea
                                    rows={2}
                                    value={section[key] || ""}
                                    onChange={(e) => setSection({ [key]: e.target.value })}
                                />
                            ) : (
                                <Input
                                    value={section[key] || ""}
                                    onChange={(e) => setSection({ [key]: e.target.value })}
                                    placeholder={meta.placeholder}
                                />
                            )}
                        </Field>
                    );
                })}

                {note && (
                    <Field label="Note">
                        <Textarea
                            rows={3}
                            value={section.note || ""}
                            onChange={(e) => setSection({ note: e.target.value })}
                        />
                    </Field>
                )}

                {noteHighlight && (
                    <Field label="Note Highlight (bold text after the note)">
                        <Input
                            value={section.noteHighlight || ""}
                            onChange={(e) => setSection({ noteHighlight: e.target.value })}
                        />
                    </Field>
                )}
            </div>

            {/* ---------- cards ---------- */}
            <div className="dynamic-header">
                <h3>
                    {title}: {cardLabel}s
                </h3>
                <Btn type="button" onClick={addItem}>
                    Add {cardLabel}
                </Btn>
            </div>

            <div className="dynamic-cards">
                {items.length === 0 ? (
                    <div className="dynamic-empty">
                        <p>No {cardLabel.toLowerCase()}s added.</p>
                        <Btn type="button" onClick={addItem}>
                            Add {cardLabel}
                        </Btn>
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

            {/* ---------- outcomes extras ---------- */}
            {associated && (
                <>
                    <div className="dynamic-header" style={{ marginTop: 32 }}>
                        <h3>Business outcomes block (optional)</h3>
                    </div>

                    <div className="form-grid">
                        <Field label="Associated Title">
                            <Input
                                value={section.associatedTitle || ""}
                                onChange={(e) => setSection({ associatedTitle: e.target.value })}
                            />
                        </Field>

                        <Field label="Associated Subtitle">
                            <Textarea
                                rows={2}
                                value={section.associatedSubtitle || ""}
                                onChange={(e) => setSection({ associatedSubtitle: e.target.value })}
                            />
                        </Field>

                        <Field label="Associated Note">
                            <Textarea
                                rows={2}
                                value={section.associatedNote || ""}
                                onChange={(e) => setSection({ associatedNote: e.target.value })}
                            />
                        </Field>
                    </div>

                    <div className="dynamic-header">
                        <h4>Associated Items</h4>
                        <Btn
                            type="button"
                            onClick={() =>
                                setSection({
                                    associatedItems: [...associatedItems, { title: "", description: "" }],
                                })
                            }
                        >
                            Add Item
                        </Btn>
                    </div>

                    <div className="dynamic-cards">
                        {associatedItems.map((item, i) => (
                            <div key={i} className="dynamic-card">
                                <div className="form-grid">
                                    <Field label="Title">
                                        <Input
                                            value={item.title || ""}
                                            onChange={(e) => updateAssociated(i, "title", e.target.value)}
                                        />
                                    </Field>
                                    <Field label="Description">
                                        <Textarea
                                            rows={3}
                                            value={item.description || ""}
                                            onChange={(e) => updateAssociated(i, "description", e.target.value)}
                                        />
                                    </Field>
                                </div>
                                <Btn
                                    variant="danger"
                                    type="button"
                                    onClick={() =>
                                        setSection({
                                            associatedItems: associatedItems.filter((_, idx) => idx !== i),
                                        })
                                    }
                                >
                                    Remove
                                </Btn>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}