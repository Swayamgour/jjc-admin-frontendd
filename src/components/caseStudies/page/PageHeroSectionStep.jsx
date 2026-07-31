import { Field, Input, Textarea } from "../../ui/UI";
import StringListEditor from "../StringListEditor";
import RepeaterEditor from "../RepeaterEditor";

export default function PageHeroSectionStep({ form, setForm, disabled }) {
  const hero = form.heroSection || {};
  const set = (key, value) => setForm({ ...form, heroSection: { ...hero, [key]: value } });
  const glance = hero.glance || {};
  const setGlance = (key, value) => set("glance", { ...glance, [key]: value });

  return (
    <div className="step-content">
      <RepeaterEditor
        cardTitle="Breadcrumb"
        items={hero.breadcrumb || []}
        onChange={(v) => set("breadcrumb", v)}
        emptyItem={{ title: "", link: "" }}
        fields={[
          { key: "title", label: "Title", placeholder: "Success Stories" },
          { key: "link", label: "Link", placeholder: "/success" },
        ]}
        addLabel="+ Add Breadcrumb"
        emptyLabel="No breadcrumbs added."
      />

      <Field label="Eyebrow">
        <Input value={hero.eyebrow || ""} onChange={(e) => set("eyebrow", e.target.value)} placeholder="Client Success · Healthcare" disabled={disabled} />
      </Field>

      <Field label="Title" required>
        <Input value={hero.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="What good looks like in Healthcare" disabled={disabled} />
      </Field>

      <Field label="Description">
        <Textarea rows={3} value={hero.description || ""} onChange={(e) => set("description", e.target.value)} placeholder="Real outcomes from organizations modernizing their operations..." disabled={disabled} />
      </Field>

      <RepeaterEditor
        cardTitle="Buttons"
        items={hero.buttons || []}
        onChange={(v) => set("buttons", v)}
        emptyItem={{ label: "", link: "", variant: "" }}
        fields={[
          { key: "label", label: "Label", placeholder: "Talk to us" },
          { key: "link", label: "Link", placeholder: "/contact" },
          { key: "variant", label: "Variant", placeholder: "primary" },
        ]}
        addLabel="+ Add Button"
        emptyLabel="No buttons added."
      />

      <Field label="Glance Heading">
        <Input value={glance.title || ""} onChange={(e) => setGlance("title", e.target.value)} placeholder="At a glance" disabled={disabled} />
      </Field>
      <Field label="Glance Items">
        <StringListEditor items={glance.items || []} onChange={(v) => setGlance("items", v)} placeholder="4 published outcomes" addLabel="+ Add Item" emptyLabel="No glance items added." />
      </Field>

      <RepeaterEditor
        cardTitle="Hero Stats"
        items={hero.stats || []}
        onChange={(v) => set("stats", v)}
        emptyItem={{ value: "", label: "" }}
        fields={[
          { key: "value", label: "Value", placeholder: "4" },
          { key: "label", label: "Label", placeholder: "Success stories" },
        ]}
        addLabel="+ Add Stat"
        emptyLabel="No stats added."
      />
    </div>
  );
}
