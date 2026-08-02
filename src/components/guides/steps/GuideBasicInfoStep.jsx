import { useEffect, useState } from "react";
import { Field, Input, Select, Textarea, Checkbox } from "../../ui/UI";
import { PLATFORMS, SERVICES, INDUSTRIES, LEVELS, makeSlug } from "../../../utils/contentTaxonomy";

export default function GuideBasicInfoStep({ form, setForm }) {
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
          <Input value={form.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="Copilot rollout guide" />
        </Field>
        <Field label="Slug" required hint="Auto generated from title">
          <Input value={form.slug || ""} onChange={(e) => { setManualSlug(true); set("slug", e.target.value); }} placeholder="copilot-rollout-guide" />
        </Field>
      </div>

      <Field label="Description" required>
        <Textarea rows={3} value={form.description || ""} onChange={(e) => set("description", e.target.value)} placeholder="List-card summary shown on /guides" />
      </Field>

      <div className="form-grid">
        <Field label="Platform" required>
          <Select value={form.platform || ""} onChange={(e) => set("platform", e.target.value)}>
            <option value="">Select platform</option>
            {PLATFORMS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </Select>
        </Field>
        <Field label="Service" required>
          <Select value={form.service || ""} onChange={(e) => set("service", e.target.value)}>
            <option value="">Select service</option>
            {SERVICES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
        </Field>
      </div>

      <div className="form-grid">
        <Field label="Industry" required>
          <Select value={form.industry || ""} onChange={(e) => set("industry", e.target.value)}>
            <option value="">Select industry</option>
            {INDUSTRIES.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
          </Select>
        </Field>
        <Field label="Level" required>
          <Select value={form.level || ""} onChange={(e) => set("level", e.target.value)}>
            <option value="">Select level</option>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </Select>
        </Field>
      </div>

      <div className="form-grid">
        <Field label="Icon" hint="Icon key used by the frontend, e.g. chart, erp, shield">
          <Input value={form.icon || ""} onChange={(e) => set("icon", e.target.value)} placeholder="chart" />
        </Field>
        <Field label="Published Date">
          <Input type="date" value={form.publishedAt ? form.publishedAt.slice(0, 10) : ""} onChange={(e) => set("publishedAt", e.target.value)} />
        </Field>
      </div>

      <div className="form-grid">
        <Field label="Author">
          <Input value={form.author || ""} onChange={(e) => set("author", e.target.value)} placeholder="JJC Systems" />
        </Field>
        <Field label="Read Time" hint="Leave blank to auto-calculate from content on save">
          <Input value={form.readTime || ""} onChange={(e) => set("readTime", e.target.value)} placeholder="6 min read" />
        </Field>
      </div>

      <Field>
        <Checkbox checked={!!form.isPublished} onChange={(e) => set("isPublished", e.target.checked)} label="Published (visible on the public site)" />
      </Field>
    </div>
  );
}
