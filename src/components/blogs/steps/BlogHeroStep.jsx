import { Field, Input } from "../../ui/UI";
import StringListEditor from "../../shared/StringListEditor";
import CtaEditor from "../../shared/CtaEditor";

export default function BlogHeroStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });
  const setBreadcrumb = (key, value) => setForm({ ...form, breadcrumb: { ...form.breadcrumb, [key]: value } });

  return (
    <div className="step-content">
      <Field label="Eyebrow" hint="Leave blank to auto-generate: PlatformLabel · Type">
        <Input value={form.eyebrow || ""} onChange={(e) => set("eyebrow", e.target.value)} placeholder="SharePoint · Challenges" />
      </Field>

      <Field label="Takeaways" hint="Bullet list shown in the hero and repeated in the 'What to take away' pull-quote">
        <StringListEditor
          items={form.takeaways || []}
          onChange={(v) => set("takeaways", v)}
          placeholder="Run a permission and oversharing assessment before assigning a single Copilot licence"
          addLabel="+ Add Takeaway"
          emptyLabel="No takeaways added."
        />
      </Field>

      <CtaEditor label="Primary CTA" value={form.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} textPlaceholder="Talk to us about this" linkPlaceholder="/contact" />
      <CtaEditor label="Secondary CTA" value={form.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} textPlaceholder="More insights" linkPlaceholder="/blog" />

      <div className="form-grid" style={{ marginTop: 20 }}>
        <Field label="Breadcrumb Parent">
          <Input value={form.breadcrumb?.parent || ""} onChange={(e) => setBreadcrumb("parent", e.target.value)} placeholder="Insights" />
        </Field>
        <Field label="Breadcrumb Parent Link">
          <Input value={form.breadcrumb?.parentLink || ""} onChange={(e) => setBreadcrumb("parentLink", e.target.value)} placeholder="/blog" />
        </Field>
      </div>
      <Field label="Breadcrumb Current" hint="Leave blank to fall back to the industry label">
        <Input value={form.breadcrumb?.current || ""} onChange={(e) => setBreadcrumb("current", e.target.value)} placeholder="Healthcare" />
      </Field>
    </div>
  );
}
