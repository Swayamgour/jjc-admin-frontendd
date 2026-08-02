import { Field, Input } from "../ui/UI";

/**
 * Editor for a single { text, link } CTA object, e.g. ctaPrimary / ctaSecondary.
 */
export default function CtaEditor({ label, value = {}, onChange, textPlaceholder = "Button text", linkPlaceholder = "/contact" }) {
  const set = (key, v) => onChange({ ...value, [key]: v });

  return (
    <div className="form-grid" style={{ marginTop: 12 }}>
      <Field label={`${label} — Text`}>
        <Input value={value?.text || ""} onChange={(e) => set("text", e.target.value)} placeholder={textPlaceholder} />
      </Field>
      <Field label={`${label} — Link`}>
        <Input value={value?.link || ""} onChange={(e) => set("link", e.target.value)} placeholder={linkPlaceholder} />
      </Field>
    </div>
  );
}
