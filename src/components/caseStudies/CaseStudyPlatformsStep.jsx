import { Field } from "../ui/UI";
import StringListEditor from "./StringListEditor";
import RepeaterEditor from "./RepeaterEditor";

export default function CaseStudyPlatformsStep({ form, setForm }) {
  return (
    <div className="step-content">
      <Field label="Products (short chip list — shown on the case-card)">
        <StringListEditor
          items={form.products}
          onChange={(v) => setForm({ ...form, products: v })}
          placeholder="Power Automate"
          addLabel="+ Add Product"
        />
      </Field>

      <RepeaterEditor
        cardTitle="Platforms Involved (detail page task-board)"
        items={form.platforms}
        onChange={(v) => setForm({ ...form, platforms: v })}
        emptyItem={{ appTag: "", name: "", desc: "" }}
        fields={[
          { key: "appTag", label: "App Tag", placeholder: "Power Platform" },
          { key: "name", label: "Product Name", placeholder: "Power Automate" },
          { key: "desc", label: "What it did here", type: "textarea", rows: 2, placeholder: "Workflow and integration. Moves data between systems..." },
        ]}
        addLabel="+ Add Platform"
        emptyLabel="No platforms added."
      />
    </div>
  );
}
