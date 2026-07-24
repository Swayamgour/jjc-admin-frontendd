import { Field, Input } from "../ui/UI";
import RepeaterEditor from "./RepeaterEditor";

export default function CaseStudyHeroStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  const setBadges = (value) =>
    set("techBadges", value ? value.split(",").map((v) => v.trim()).filter(Boolean) : []);

  return (
    <div className="step-content">
      <Field label="Hero Image">
        <input
          type="file"
          accept="image/*"
          className="input"
          onChange={(e) => set("heroImage", e.target.files?.[0] || null)}
        />
        {form.heroImage && (
          <div style={{ marginTop: 12 }}>
            <img
              src={form.heroImage instanceof File ? URL.createObjectURL(form.heroImage) : form.heroImage.url}
              alt="Hero Preview"
              style={{ width: 240, borderRadius: 8, objectFit: "cover" }}
            />
          </div>
        )}
      </Field>

      <Field label="Tech Badges (comma separated)" hint="e.g. Microsoft 365, Azure, SharePoint, Power BI">
        <Input
          value={(form.techBadges || []).join(", ")}
          onChange={(e) => setBadges(e.target.value)}
          placeholder="Microsoft 365, Azure, SharePoint, Power BI"
        />
      </Field>

      <RepeaterEditor
        cardTitle="Hero Stats"
        items={form.heroStats}
        onChange={(v) => set("heroStats", v)}
        emptyItem={{ icon: "", value: "", label: "" }}
        fields={[
          { key: "icon", label: "Icon", placeholder: "Smile" },
          { key: "value", label: "Value", placeholder: "98%" },
          { key: "label", label: "Label", placeholder: "Client Satisfaction" },
        ]}
        addLabel="+ Add Stat"
        emptyLabel="No hero stats added."
      />
    </div>
  );
}
