import { Field, Input } from "../../ui/UI";
import StringListEditor from "../../shared/StringListEditor";
import CtaEditor from "../../shared/CtaEditor";

export default function WhitepaperHeroStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <Field label="Eyebrow" hint="Leave blank to auto-generate: PlatformLabel · IndustryLabel">
        <Input value={form.eyebrow || ""} onChange={(e) => set("eyebrow", e.target.value)} placeholder="Microsoft Fabric · Financial Services" />
      </Field>

      <Field label="In This Paper" hint="Glance sidebar bullet list shown in the hero">
        <StringListEditor
          items={form.inThisPaper || []}
          onChange={(v) => set("inThisPaper", v)}
          placeholder="An abstract and four numbered findings"
          addLabel="+ Add Item"
          emptyLabel="No items added."
        />
      </Field>

      <CtaEditor label="Primary CTA" value={form.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} textPlaceholder="Discuss this paper" linkPlaceholder="/contact" />
      <CtaEditor label="Secondary CTA" value={form.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} textPlaceholder="Jump to the findings" linkPlaceholder="#findings" />
    </div>
  );
}
