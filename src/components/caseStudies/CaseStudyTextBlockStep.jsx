import { Field, Textarea } from "../ui/UI";

/**
 * Shared editor for the { intro, body } shape used by both
 * `situation` ("The situation") and `approachText` ("What was done").
 */
export default function CaseStudyTextBlockStep({ form, setForm, sectionKey, introLabel, bodyLabel, introPlaceholder, bodyPlaceholder }) {
  const section = form[sectionKey] || {};
  const set = (key, value) => setForm({ ...form, [sectionKey]: { ...section, [key]: value } });

  return (
    <div className="step-content">
      <Field label={introLabel} required hint="Short version — also shown in the case-card preview">
        <Textarea rows={3} value={section.intro || ""} onChange={(e) => set("intro", e.target.value)} placeholder={introPlaceholder} />
      </Field>

      <Field label={bodyLabel} hint="Expanded paragraph — shown only on the full story page">
        <Textarea rows={5} value={section.body || ""} onChange={(e) => set("body", e.target.value)} placeholder={bodyPlaceholder} />
      </Field>
    </div>
  );
}
