import { Field, Input, Textarea } from "../../ui/UI";
import RepeaterEditor from "../../shared/RepeaterEditor";

export default function WhitepaperImplicationsReferencesStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="step-content">
      <div className="form-grid">
        <Field label="Implications Heading">
          <Input value={form.implicationsHeading || ""} onChange={(e) => set("implicationsHeading", e.target.value)} placeholder="What this means, depending on your seat" />
        </Field>
      </div>
      <Field label="Implications Lede">
        <Textarea rows={2} value={form.implicationsLede || ""} onChange={(e) => set("implicationsLede", e.target.value)} placeholder="The same argument lands differently across an executive team." />
      </Field>

      <RepeaterEditor
        cardTitle="Implications by Role"
        items={form.implications || []}
        onChange={(v) => set("implications", v)}
        emptyItem={{ role: "", text: "", order: 0 }}
        fields={[
          { key: "role", label: "Role", placeholder: "For the CFO" },
          { key: "text", label: "Text", placeholder: "The productivity case is the one your board has heard before...", type: "textarea" },
        ]}
        addLabel="+ Add Implication"
        emptyLabel="No implications added."
      />

      <div className="form-grid" style={{ marginTop: 24 }}>
        <Field label="References Heading">
          <Input value={form.referencesHeading || ""} onChange={(e) => set("referencesHeading", e.target.value)} placeholder="Where to check this for yourself" />
        </Field>
      </div>
      <Field label="References Lede">
        <Textarea rows={2} value={form.referencesLede || ""} onChange={(e) => set("referencesLede", e.target.value)} placeholder="Microsoft's own documentation for the product behaviour described above." />
      </Field>

      <RepeaterEditor
        cardTitle="References"
        items={form.references || []}
        onChange={(v) => set("references", v)}
        emptyItem={{ number: (form.references?.length || 0) + 1, title: "", source: "", order: 0 }}
        fields={[
          { key: "number", label: "Number" },
          { key: "title", label: "Title", placeholder: "What is OneLake?" },
          { key: "source", label: "Source", placeholder: "Microsoft Fabric documentation — ..." },
        ]}
        addLabel="+ Add Reference"
        emptyLabel="No references added."
      />

      <Field label="References Note" hint="Explains linking convention / attribution">
        <Textarea rows={3} value={form.referencesNote || ""} onChange={(e) => set("referencesNote", e.target.value)} placeholder="On these references: each entry names a Microsoft Learn article..." />
      </Field>
    </div>
  );
}
