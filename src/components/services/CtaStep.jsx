import { Field, Input, Textarea } from "../ui/UI";

export default function CtaStep({
    title = "Call To Action",
    section = {},
    onChange,
}) {
    const updateSection = (field, value) => {
        onChange({
            ...section,
            [field]: value,
        });
    };

    const updatePrimaryButton = (field, value) => {
        onChange({
            ...section,
            primaryButton: {
                ...(section.primaryButton || {}),
                [field]: value,
            },
        });
    };

    const updateSecondaryButton = (field, value) => {
        onChange({
            ...section,
            secondaryButton: {
                ...(section.secondaryButton || {}),
                [field]: value,
            },
        });
    };

    return (
        <div>
            <div className="form-grid">
                <Field label="Eyebrow">
                    <Input
                        value={section.eyebrow || ""}
                        onChange={(e) =>
                            updateSection("eyebrow", e.target.value)
                        }
                    />
                </Field>

                <Field label="Title">
                    <Input
                        value={section.title || ""}
                        onChange={(e) =>
                            updateSection("title", e.target.value)
                        }
                    />
                </Field>

                <Field label="Description">
                    <Textarea
                        rows={4}
                        value={section.description || ""}
                        onChange={(e) =>
                            updateSection("description", e.target.value)
                        }
                    />
                </Field>
            </div>

            <div className="dynamic-card">
                <h3>Primary Button</h3>

                <div className="form-grid">
                    <Field label="Label">
                        <Input
                            value={section.primaryButton?.label || ""}
                            onChange={(e) =>
                                updatePrimaryButton("label", e.target.value)
                            }
                        />
                    </Field>

                    <Field label="Link">
                        <Input
                            value={section.primaryButton?.link || ""}
                            onChange={(e) =>
                                updatePrimaryButton("link", e.target.value)
                            }
                        />
                    </Field>
                </div>
            </div>

            <div className="dynamic-card">
                <h3>Secondary Button</h3>

                <div className="form-grid">
                    <Field label="Label">
                        <Input
                            value={section.secondaryButton?.label || ""}
                            onChange={(e) =>
                                updateSecondaryButton("label", e.target.value)
                            }
                        />
                    </Field>

                    <Field label="Link">
                        <Input
                            value={section.secondaryButton?.link || ""}
                            onChange={(e) =>
                                updateSecondaryButton("link", e.target.value)
                            }
                        />
                    </Field>
                </div>
            </div>
        </div>
    );
}