import { Field, Input } from "../../ui/UI";
import ChecklistSectionsEditor from "../ChecklistSectionsEditor";

export default function ChecklistSectionsStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });
  const totalChecks = (form.sections || []).reduce((sum, s) => sum + (s.items?.length || 0), 0);

  return (
    <div className="step-content">
      <div className="form-grid">
        <Field label="Checklist Heading" hint="Leave blank to auto-generate from total check count">
          <Input value={form.checklistHeading || ""} onChange={(e) => set("checklistHeading", e.target.value)} placeholder={`${totalChecks} checks, in the order we would run them`} />
        </Field>
        <Field label="Checklist Lede">
          <Input value={form.checklistLede || ""} onChange={(e) => set("checklistLede", e.target.value)} placeholder="Tick only what you can genuinely evidence today." />
        </Field>
      </div>

      <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "4px 0 16px" }}>
        Total checks across all sections: <strong>{totalChecks}</strong>
      </p>

      <ChecklistSectionsEditor sections={form.sections || []} onChange={(v) => set("sections", v)} />
    </div>
  );
}
