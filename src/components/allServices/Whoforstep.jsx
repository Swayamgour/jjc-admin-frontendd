import { Field, Input, Textarea } from "../ui/UI";
import { StringListField } from "./Stephelpers";

/* Backend: whoFor = { eyebrow, title, subtitle, honestNote, items: [String] } */

export default function WhoForStep({ section = {}, onChange }) {
    const setSection = (patch) => onChange({ ...section, ...patch });

    return (
        <div>
            <div className="form-grid">
                <Field label="Eyebrow">
                    <Input
                        value={section.eyebrow || ""}
                        onChange={(e) => setSection({ eyebrow: e.target.value })}
                        placeholder="Who it's for"
                    />
                </Field>

                <Field label="Title">
                    <Input
                        value={section.title || ""}
                        onChange={(e) => setSection({ title: e.target.value })}
                        placeholder="Who IT strategy consulting is for"
                    />
                </Field>

                <Field label="Subtitle">
                    <Textarea
                        rows={2}
                        value={section.subtitle || ""}
                        onChange={(e) => setSection({ subtitle: e.target.value })}
                    />
                </Field>

                <Field label="Honest note (callout under the heading)">
                    <Textarea
                        rows={3}
                        value={section.honestNote || ""}
                        onChange={(e) => setSection({ honestNote: e.target.value })}
                        placeholder="If you have a stable environment... you probably don't need us yet."
                    />
                </Field>
            </div>

            <div className="form-grid" style={{ marginTop: 24 }}>
                <StringListField
                    label="Checklist item"
                    addLabel="Add Item"
                    multiline
                    rows={2}
                    values={section.items || []}
                    onChange={(v) => setSection({ items: v })}
                />
            </div>
        </div>
    );
}