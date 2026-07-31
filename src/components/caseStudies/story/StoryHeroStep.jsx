import { Field, Input, Textarea } from "../../ui/UI";
import StringListEditor from "../StringListEditor";
import RepeaterEditor from "../RepeaterEditor";

export default function StoryHeroStep({ form, setForm, disabled }) {
  const hero = form.hero || {};
  const setHero = (key, value) => setForm({ ...form, hero: { ...hero, [key]: value } });
  const setBtn = (which, key, value) =>
    setHero(which, { ...(hero[which] || {}), [key]: value });

  return (
    <div className="step-content">
      <Field label="Eyebrow">
        <Input value={hero.eyebrow || ""} onChange={(e) => setHero("eyebrow", e.target.value)} placeholder="Healthcare · Modern Work & Automation" disabled={disabled} />
      </Field>

      <Field label="Title" required>
        <Input value={hero.title || ""} onChange={(e) => setHero("title", e.target.value)} placeholder="20M records a year, processed without new headcount" disabled={disabled} />
      </Field>

      <Field label="Subtitle">
        <Textarea rows={3} value={hero.subtitle || ""} onChange={(e) => setHero("subtitle", e.target.value)} placeholder="Medical records arrived from a wide variety of providers in inconsistent formats..." disabled={disabled} />
      </Field>

      <div className="grid-2">
        <Field label="Primary Button">
          <Input value={hero.primaryButton?.label || ""} onChange={(e) => setBtn("primaryButton", "label", e.target.value)} placeholder="Label" disabled={disabled} />
          <div style={{ marginTop: 8 }}>
            <Input value={hero.primaryButton?.link || ""} onChange={(e) => setBtn("primaryButton", "link", e.target.value)} placeholder="Link" disabled={disabled} />
          </div>
        </Field>
        <Field label="Secondary Button">
          <Input value={hero.secondaryButton?.label || ""} onChange={(e) => setBtn("secondaryButton", "label", e.target.value)} placeholder="Label" disabled={disabled} />
          <div style={{ marginTop: 8 }}>
            <Input value={hero.secondaryButton?.link || ""} onChange={(e) => setBtn("secondaryButton", "link", e.target.value)} placeholder="Link" disabled={disabled} />
          </div>
        </Field>
      </div>

      <Field label="At-a-glance Heading">
        <Input value={hero.glanceTitle || ""} onChange={(e) => setHero("glanceTitle", e.target.value)} placeholder="At a glance" disabled={disabled} />
      </Field>

      <Field label="At-a-glance Bullets">
        <StringListEditor items={hero.glance || []} onChange={(v) => setHero("glance", v)} placeholder="Fully automated intake for 20M+ records/year" addLabel="+ Add Bullet" emptyLabel="No bullets added." />
      </Field>

      <RepeaterEditor
        cardTitle="Hero Stats (shown in the hero strip)"
        items={hero.stats || []}
        onChange={(v) => setHero("stats", v)}
        emptyItem={{ value: "", label: "" }}
        fields={[
          { key: "value", label: "Value", placeholder: "20M" },
          { key: "label", label: "Label", placeholder: "Records processed per year" },
        ]}
        addLabel="+ Add Stat"
        emptyLabel="No stats added."
      />
    </div>
  );
}
