import { useEffect, useState } from "react";
import { Field, Input, Select, Textarea, Checkbox } from "../../ui/UI";
import { BLOG_PLATFORMS, BLOG_SERVICES, BLOG_INDUSTRIES, BLOG_TYPES, BLOG_ICONS, makeSlug } from "../../../utils/blogTaxonomy";

export default function BlogBasicInfoStep({ form, setForm }) {
  const [manualSlug, setManualSlug] = useState(Boolean(form.slug));
  const set = (key, value) => setForm({ ...form, [key]: value });

  useEffect(() => {
    if (!manualSlug) setForm((prev) => ({ ...prev, slug: makeSlug(prev.title) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title, manualSlug]);

  return (
    <div className="step-content">
      <div className="form-grid">
        <Field label="Title" required>
          <Input value={form.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="The oversharing problem your Copilot rollout will find first" />
        </Field>
        <Field label="Slug" required hint="Auto generated from title">
          <Input value={form.slug || ""} onChange={(e) => { setManualSlug(true); set("slug", e.target.value); }} placeholder="copilot-oversharing-healthcare-sharepoint" />
        </Field>
      </div>

      <Field label="Description" required hint="Used as the lede and the list-card summary">
        <Textarea rows={3} value={form.description || ""} onChange={(e) => set("description", e.target.value)} placeholder="Healthcare organizations have a decade of casually shared links..." />
      </Field>

      <div className="form-grid">
        <Field label="Platform" required>
          <Select value={form.platform || ""} onChange={(e) => set("platform", e.target.value)}>
            <option value="">Select platform</option>
            {BLOG_PLATFORMS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </Select>
        </Field>
        <Field label="Service" required>
          <Select value={form.service || ""} onChange={(e) => set("service", e.target.value)}>
            <option value="">Select service</option>
            {BLOG_SERVICES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
        </Field>
      </div>

      <div className="form-grid">
        <Field label="Industry" required>
          <Select value={form.industry || ""} onChange={(e) => set("industry", e.target.value)}>
            <option value="">Select industry</option>
            {BLOG_INDUSTRIES.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
          </Select>
        </Field>
        <Field label="Type" required>
          <Select value={form.type || ""} onChange={(e) => set("type", e.target.value)}>
            <option value="">Select type</option>
            {BLOG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
      </div>

      <div className="form-grid">
        <Field label="Icon">
          <Select value={form.icon || "chart"} onChange={(e) => set("icon", e.target.value)}>
            {BLOG_ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </Select>
        </Field>
        <Field label="Read Time" hint="Leave blank to auto-calculate from content on save">
          <Input value={form.readTime || ""} onChange={(e) => set("readTime", e.target.value)} placeholder="8 min read" />
        </Field>
      </div>

      <div className="form-grid">
        <Field label="Published Date">
          <Input type="date" value={form.publishedAt ? form.publishedAt.slice(0, 10) : ""} onChange={(e) => set("publishedAt", e.target.value)} />
        </Field>
        <Field label="Author">
          <Input value={form.author || ""} onChange={(e) => set("author", e.target.value)} placeholder="JJC Systems" />
        </Field>
      </div>

      <Field>
        <Checkbox checked={!!form.isPublished} onChange={(e) => set("isPublished", e.target.checked)} label="Published (visible on the public site)" />
      </Field>
    </div>
  );
}
