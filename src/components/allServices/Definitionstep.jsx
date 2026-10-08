import { Btn, Field, Input, Textarea } from "../ui/UI";
import { StringListField, RICH_TEXT_HINT } from "./Stephelpers";

/* Backend: definition = { eyebrow, title, layersLabel, layers[{icon,title,description,tag}], paragraphs[] } */

export default function DefinitionStep({ section = {}, onChange }) {
    const layers = section.layers || [];

    const setSection = (patch) => onChange({ ...section, ...patch });

    const updateLayer = (i, field, value) => {
        const next = [...layers];
        next[i] = { ...next[i], [field]: value };
        setSection({ layers: next });
    };

    return (
        <div>
            <div className="form-grid">
                <Field label="Eyebrow">
                    <Input
                        value={section.eyebrow || ""}
                        onChange={(e) => setSection({ eyebrow: e.target.value })}
                        placeholder="The basics"
                    />
                </Field>

                <Field label="Title">
                    <Input
                        value={section.title || ""}
                        onChange={(e) => setSection({ title: e.target.value })}
                        placeholder="What is IT strategy consulting?"
                    />
                </Field>

                <Field label="Layers strip label (accessibility)">
                    <Input
                        value={section.layersLabel || ""}
                        onChange={(e) => setSection({ layersLabel: e.target.value })}
                        placeholder="Where strategy sits within IT consulting and services"
                    />
                </Field>
            </div>

            {/* ---------- layers ---------- */}
            <div className="dynamic-header">
                <h3>Layers</h3>
                <Btn
                    type="button"
                    onClick={() =>
                        setSection({
                            layers: [...layers, { icon: "", title: "", description: "", tag: "" }],
                        })
                    }
                >
                    Add Layer
                </Btn>
            </div>

            <div className="dynamic-cards">
                {layers.length === 0 ? (
                    <div className="dynamic-empty">
                        <p>No layers added.</p>
                    </div>
                ) : (
                    layers.map((layer, i) => (
                        <div key={i} className="dynamic-card">
                            <div className="form-grid">
                                <Field label="Title">
                                    <Input
                                        value={layer.title || ""}
                                        onChange={(e) => updateLayer(i, "title", e.target.value)}
                                        placeholder="Strategy"
                                    />
                                </Field>
                                <Field label="Description">
                                    <Input
                                        value={layer.description || ""}
                                        onChange={(e) => updateLayer(i, "description", e.target.value)}
                                        placeholder="Where to go, in what order"
                                    />
                                </Field>
                                <Field label="Tag">
                                    <Input
                                        value={layer.tag || ""}
                                        onChange={(e) => updateLayer(i, "tag", e.target.value)}
                                        placeholder="This page | Consulting | Delivery | Ongoing"
                                    />
                                </Field>
                                <Field label="Icon (optional)">
                                    <Input
                                        value={layer.icon || ""}
                                        onChange={(e) => updateLayer(i, "icon", e.target.value)}
                                        placeholder="route"
                                    />
                                </Field>
                            </div>
                            <Btn
                                variant="danger"
                                type="button"
                                onClick={() =>
                                    setSection({ layers: layers.filter((_, idx) => idx !== i) })
                                }
                            >
                                Remove
                            </Btn>
                        </div>
                    ))
                )}
            </div>

            {/* ---------- paragraphs ---------- */}
            <div className="form-grid" style={{ marginTop: 24 }}>
                <StringListField
                    label="Paragraph"
                    addLabel="Add Paragraph"
                    multiline
                    rows={5}
                    hint={RICH_TEXT_HINT}
                    values={section.paragraphs || []}
                    onChange={(v) => setSection({ paragraphs: v })}
                />
            </div>
        </div>
    );
}