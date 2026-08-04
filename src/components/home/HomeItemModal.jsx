import { useEffect, useState } from "react";
import { Modal, Field, Input, Textarea, Btn } from "../ui/UI";

const emptyFields = { icon: "", title: "", subtitle: "", description: "", link: "" };

export default function HomeItemModal({ open, mode, item, itemLabel = "Card", onClose, onSave, saving, label }) {
  console.log(label);
  const [fields, setFields] = useState(emptyFields);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (open) {
      setFields({
        icon: item?.icon || "",
        title: item?.title || "",
        subtitle: item?.subtitle || "",
        description: item?.description || "",
        link: item?.link || "",
      });
      setImageFile(null);
    }
  }, [open, item]);

  const set = (key, value) => setFields((f) => ({ ...f, [key]: value }));

  const imageSrc = imageFile ? URL.createObjectURL(imageFile) : item?.image?.url || "";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "edit" ? `Edit ${itemLabel}` : `Add ${itemLabel}`}
      width={560}
    >
      <div className="form-grid">
        {/* FAQ */}
        {label === "FAQs" ? (
          <>
            <Field label="Question" className="field-full">
              <Input
                value={fields.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Enter question"
              />
            </Field>

            <Field label="Answer" className="field-full">
              <Textarea
                rows={5}
                value={fields.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Enter answer"
              />
            </Field>
          </>
        ) : (
          <>
            {label !== "Client Logos" && (
              <Field label="Icon Key" hint="react-icon name / key (optional)">
                <Input
                  value={fields.icon}
                  onChange={(e) => set("icon", e.target.value)}
                />
              </Field>
            )}

            <Field label="Title">
              <Input
                value={fields.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </Field>

            {label !== "Client Logos" && (
              <Field label="Subtitle" className="field-full">
                <Input
                  value={fields.subtitle}
                  onChange={(e) => set("subtitle", e.target.value)}
                />
              </Field>
            )}

            {label !== "Client Logos" && (
              <Field label="Description" className="field-full">
                <Textarea
                  rows={4}
                  value={fields.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </Field>
            )}

            {label !== "Leadership Team" &&
              label !== "Client Logos" && (
                <Field
                  label="Link"
                  hint="Optional URL (e.g. LinkedIn, external page)"
                >
                  <Input
                    value={fields.link}
                    onChange={(e) => set("link", e.target.value)}
                  />
                </Field>
              )}

            {(label === "Leadership Team" ||
              label === "Client Logos" ||
              label === "Detail services") && (
                <Field
                  label="Image"
                  hint="Optional — logos, client photos, etc."
                >
                  <Input
                    type="file"
                    accept="image/*"
                    onClick={(e) => (e.target.value = null)}
                    onChange={(e) =>
                      setImageFile(e.target.files?.[0] || null)
                    }
                  />
                </Field>
              )}
          </>
        )}
      </div>

      {
        imageSrc && (
          <div className="image-preview" style={{ marginTop: 12 }}>
            <img src={imageSrc} alt="preview" style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8, border: "1px solid var(--border)" }} />
          </div>
        )
      }

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
        <Btn variant="primary" loading={saving} onClick={() => onSave({ fields, imageFile })}>
          {mode === "edit" ? "Save Changes" : "Add"}
        </Btn>
      </div>
    </Modal >
  );
}
