import { Btn, Field, Input, Textarea } from "../ui/UI";

/* Backend: microsoftPlatforms = { eyebrow, title, subtitle, items[{icon,title,description}], note } */

export default function MicrosoftPlatformsStep({ section = {}, onChange }) {
    const items = section.items || [];

    const setSection = (patch) => onChange({ ...section, ...patch });

    const updateItem = (i, field, value) => {
        const next = [...items];
        next[i] = { ...next[i], [field]: value };
        setSection({ items: next });
    };

    return (
        <div>
            <div className="form-grid">
                <Field label="Eyebrow">
                    <Input
                        value={section.eyebrow || ""}
                        onChange={(e) => setSection({ eyebrow: e.target.value })}
                        placeholder="Microsoft platforms"
                    />
                </Field>

                <Field label="Title">
                    <Input
                        value={section.title || ""}
                        onChange={(e) => setSection({ title: e.target.value })}
                        placeholder="Where Microsoft technology fits into the plan"
                    />
                </Field>

                <Field label="Subtitle">
                    <Textarea
                        rows={3}
                        value={section.subtitle || ""}
                        onChange={(e) => setSection({ subtitle: e.target.value })}
                    />
                </Field>

                <Field label="Closing note">
                    <Input
                        value={section.note || ""}
                        onChange={(e) => setSection({ note: e.target.value })}
                        placeholder="Where a non-Microsoft tool is the better answer, the plan says so."
                    />
                </Field>
            </div>

            <div className="dynamic-header">
                <h3>Platform Cards</h3>
                <Btn
                    type="button"
                    onClick={() =>
                        setSection({ items: [...items, { icon: "", title: "", description: "" }] })
                    }
                >
                    Add Platform
                </Btn>
            </div>

            <div className="dynamic-cards">
                {items.length === 0 ? (
                    <div className="dynamic-empty">
                        <p>No platforms added.</p>
                    </div>
                ) : (
                    items.map((item, i) => (
                        <div key={i} className="dynamic-card">
                            <div className="form-grid">
                                <Field label="Title">
                                    <Input
                                        value={item.title || ""}
                                        onChange={(e) => updateItem(i, "title", e.target.value)}
                                        placeholder="Azure"
                                    />
                                </Field>
                                <Field label="Icon (optional)">
                                    <Input
                                        value={item.icon || ""}
                                        onChange={(e) => updateItem(i, "icon", e.target.value)}
                                        placeholder="cloud"
                                    />
                                </Field>
                                <Field label="Description">
                                    <Textarea
                                        rows={3}
                                        value={item.description || ""}
                                        onChange={(e) => updateItem(i, "description", e.target.value)}
                                    />
                                </Field>
                            </div>
                            <Btn
                                variant="danger"
                                type="button"
                                onClick={() => setSection({ items: items.filter((_, idx) => idx !== i) })}
                            >
                                Remove
                            </Btn>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}