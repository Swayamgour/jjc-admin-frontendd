import { Field, Input, Textarea } from "../ui/UI";

/* Backend: cta = { title, description, primaryLabel, primaryLink, secondaryLabel, secondaryLink, note }
   (the old services/CtaStep wrote primaryButton/secondaryButton, which the backend
   and the public page never read) */

export default function PageCtaStep({ section = {}, onChange }) {
    const setSection = (patch) => onChange({ ...section, ...patch });

    return (
        <div className="form-grid">
            <Field label="Title">
                <Input
                    value={section.title || ""}
                    onChange={(e) => setSection({ title: e.target.value })}
                    placeholder="Start with an honest assessment, not a proposal"
                />
            </Field>

            <Field label="Description">
                <Textarea
                    rows={4}
                    value={section.description || ""}
                    onChange={(e) => setSection({ description: e.target.value })}
                />
            </Field>

            <Field label="Primary button label">
                <Input
                    value={section.primaryLabel || ""}
                    onChange={(e) => setSection({ primaryLabel: e.target.value })}
                    placeholder="Book a consultation"
                />
            </Field>

            <Field label="Primary button link">
                <Input
                    value={section.primaryLink || ""}
                    onChange={(e) => setSection({ primaryLink: e.target.value })}
                    placeholder="/contact"
                />
            </Field>

            <Field label="Secondary button label">
                <Input
                    value={section.secondaryLabel || ""}
                    onChange={(e) => setSection({ secondaryLabel: e.target.value })}
                />
            </Field>

            <Field label="Secondary button link">
                <Input
                    value={section.secondaryLink || ""}
                    onChange={(e) => setSection({ secondaryLink: e.target.value })}
                    placeholder="/services"
                />
            </Field>

            <Field label="Small note under the buttons">
                <Input
                    value={section.note || ""}
                    onChange={(e) => setSection({ note: e.target.value })}
                />
            </Field>
        </div>
    );
}