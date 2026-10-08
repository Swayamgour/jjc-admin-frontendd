import { Btn, Field, Input, Textarea, Checkbox } from "../ui/UI";
import { RICH_TEXT_HINT } from "./Stephelpers";

/* Backend: faqs = { eyebrow, title, helpText, helpLinkText, helpLinkHref, items[{question, answer, open}] }
   `answer` is rich text: supports [label](/url) links. */

export default function PageFaqStep({ section = {}, onChange }) {
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
                        placeholder="FAQs"
                    />
                </Field>

                <Field label="Title">
                    <Input
                        value={section.title || ""}
                        onChange={(e) => setSection({ title: e.target.value })}
                        placeholder="Frequently asked questions"
                    />
                </Field>

                <Field label="Help text">
                    <Input
                        value={section.helpText || ""}
                        onChange={(e) => setSection({ helpText: e.target.value })}
                        placeholder="Can't find your question?"
                    />
                </Field>

                <Field label="Help link text">
                    <Input
                        value={section.helpLinkText || ""}
                        onChange={(e) => setSection({ helpLinkText: e.target.value })}
                        placeholder="Ask us directly"
                    />
                </Field>

                <Field label="Help link URL">
                    <Input
                        value={section.helpLinkHref || ""}
                        onChange={(e) => setSection({ helpLinkHref: e.target.value })}
                        placeholder="/contact"
                    />
                </Field>
            </div>

            <div className="dynamic-header">
                <h3>FAQ Items</h3>
                <Btn
                    type="button"
                    onClick={() =>
                        setSection({ items: [...items, { question: "", answer: "", open: false }] })
                    }
                >
                    Add FAQ
                </Btn>
            </div>

            <div className="dynamic-cards">
                {items.length === 0 ? (
                    <div className="dynamic-empty">
                        <p>No FAQs added yet.</p>
                    </div>
                ) : (
                    items.map((faq, i) => (
                        <div key={i} className="dynamic-card">
                            <Field label="Question" required>
                                <Input
                                    value={faq.question || ""}
                                    onChange={(e) => updateItem(i, "question", e.target.value)}
                                />
                            </Field>

                            <Field label="Answer" required hint={RICH_TEXT_HINT}>
                                <Textarea
                                    rows={4}
                                    value={faq.answer || ""}
                                    onChange={(e) => updateItem(i, "answer", e.target.value)}
                                />
                            </Field>

                            <Checkbox
                                checked={Boolean(faq.open)}
                                onChange={(e) => updateItem(i, "open", e.target.checked)}
                                label="Expanded by default"
                            />

                            <div style={{ marginTop: 12 }}>
                                <Btn
                                    variant="danger"
                                    type="button"
                                    onClick={() => setSection({ items: items.filter((_, idx) => idx !== i) })}
                                >
                                    Remove
                                </Btn>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}