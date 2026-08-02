import { Field, Input, Textarea } from "../../ui/UI";

export default function BlogSeoStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <Field label="SEO Title" hint="Leave blank to use the title">
        <Input value={form.seoTitle || ""} onChange={(e) => set("seoTitle", e.target.value)} placeholder="Leave blank to use the title" />
      </Field>
      <Field label="SEO Description" hint="Leave blank to use the description">
        <Textarea rows={3} value={form.seoDescription || ""} onChange={(e) => set("seoDescription", e.target.value)} placeholder="Leave blank to use the description" />
      </Field>
    </div>
  );
}
