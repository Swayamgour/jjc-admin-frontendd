import { Field, Input, Textarea } from "../../ui/UI";

export default function OverviewStep({ form, setForm }) {
    const overview = form.overview || {};

    const updateOverview = (key, value) => {
        setForm({
            ...form,
            overview: {
                ...overview,
                [key]: value,
            },
        });
    };

    const imageSrc =
        overview.image instanceof File
            ? URL.createObjectURL(overview.image)
            : overview.image?.url || "";

    return (
        <div className="form-grid">
            <Field label="Tag">
                <Input
                    value={overview.tag || ""}
                    onChange={(e) => updateOverview("tag", e.target.value)}
                />
            </Field>

            <Field label="Title">
                <Input
                    value={overview.title || ""}
                    onChange={(e) => updateOverview("title", e.target.value)}
                />
            </Field>

            <Field label="Brand Label">
                <Input
                    value={overview.brandLabel || ""}
                    onChange={(e) =>
                        updateOverview("brandLabel", e.target.value)
                    }
                />
            </Field>

            <Field label="Overview Image">
                <Input
                    type="file"
                    accept="image/*"
                    onClick={(e) => {
                        e.target.value = null;
                    }}
                    onChange={(e) =>
                        updateOverview("image", e.target.files?.[0] || null)
                    }
                />
            </Field>

            {imageSrc && (
                <div className="image-preview">
                    <img
                        src={imageSrc}
                        alt="Overview Preview"
                        className="hero-preview"
                    />
                </div>
            )}

            <Field label="Paragraphs (one per line)">
                <Textarea
                    rows={6}
                    value={(overview.paragraphs || []).join("\n")}
                    onChange={(e) =>
                        updateOverview(
                            "paragraphs",
                            e.target.value
                                .split("\n")
                                .map((item) => item.trim())
                                .filter(Boolean),
                        )
                    }
                />
            </Field>

            <Field label="Checklist (one per line)">
                <Textarea
                    rows={6}
                    value={(overview.checklist || []).join("\n")}
                    onChange={(e) =>
                        updateOverview(
                            "checklist",
                            e.target.value
                                .split("\n")
                                .map((item) => item.trim())
                                .filter(Boolean),
                        )
                    }
                />
            </Field>
        </div>
    );
}
