import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function HomeHeroStep({ form, setForm }) {
  const update = (key, value) => setForm({ ...form, [key]: value });

  const imageSrc =
    form.image instanceof File ? URL.createObjectURL(form.image) : form.image?.url || "";

  /* ---------------- Partners ---------------- */
  const addPartner = () =>
    update("partners", [...(form.partners || []), { icon: "", title: "", order: (form.partners || []).length }]);

  const updatePartner = (index, key, value) => {
    const partners = [...(form.partners || [])];
    partners[index] = { ...partners[index], [key]: value };
    update("partners", partners);
  };

  const removePartner = (index) =>
    update("partners", (form.partners || []).filter((_, i) => i !== index));

  /* ---------------- Floating Cards ---------------- */
  const addFloatingCard = () =>
    update("floatingCards", [
      ...(form.floatingCards || []),
      { icon: "", title: "", subtitle: "", order: (form.floatingCards || []).length },
    ]);

  const updateFloatingCard = (index, key, value) => {
    const cards = [...(form.floatingCards || [])];
    cards[index] = { ...cards[index], [key]: value };
    update("floatingCards", cards);
  };

  const removeFloatingCard = (index) =>
    update("floatingCards", (form.floatingCards || []).filter((_, i) => i !== index));

  return (
    <div>
      <div className="form-grid">
        <Field label="Tag" hint='e.g. "SMART SOLUTIONS. REAL IMPACT."'>
          <Input value={form.tag || ""} onChange={(e) => update("tag", e.target.value)} />
        </Field>

        <Field label="Highlighted Word" hint="The word wrapped in <span class=highlight>">
          <Input
            value={form.highlightedText || ""}
            onChange={(e) => update("highlightedText", e.target.value)}
          />
        </Field>

        <Field label="Title" className="field-full">
          <Input value={form.title || ""} onChange={(e) => update("title", e.target.value)} />
        </Field>

        <Field label="Description" className="field-full">
          <Textarea
            rows={4}
            value={form.description || ""}
            onChange={(e) => update("description", e.target.value)}
          />
        </Field>

        <Field label="Primary Button Text">
          <Input
            value={form.primaryButtonText || ""}
            onChange={(e) => update("primaryButtonText", e.target.value)}
          />
        </Field>

        <Field label="Primary Button Link">
          <Input
            value={form.primaryButtonLink || ""}
            onChange={(e) => update("primaryButtonLink", e.target.value)}
          />
        </Field>

        <Field label="Secondary Button Text">
          <Input
            value={form.secondaryButtonText || ""}
            onChange={(e) => update("secondaryButtonText", e.target.value)}
          />
        </Field>

        <Field label="Secondary Button Link">
          <Input
            value={form.secondaryButtonLink || ""}
            onChange={(e) => update("secondaryButtonLink", e.target.value)}
          />
        </Field>

        <Field label="Hero Image">
          <Input
            type="file"
            accept="image/*"
            onClick={(e) => (e.target.value = null)}
            onChange={(e) => update("image", e.target.files?.[0] || null)}
          />
        </Field>
      </div>

      {imageSrc && (
        <div className="image-preview" style={{ marginTop: 16 }}>
          <img src={imageSrc} alt="Hero Preview" className="hero-preview" />
        </div>
      )}

      {/* ---------------- Partners ---------------- */}
      {/* <div className="dynamic-header" style={{ marginTop: 32 }}>
        <h3>Partner Logos / Badges</h3>
        <Btn onClick={addPartner}>+ Add Partner</Btn>
      </div> */}

      {/* <div className="dynamic-cards">
        {(form.partners || []).map((partner, index) => (
          <div key={index} className="dynamic-card">
            <div className="form-grid">
              <Field label="Icon Key" hint='e.g. "M365", "Azure", "Dynamics"'>
                <Input
                  value={partner.icon || ""}
                  onChange={(e) => updatePartner(index, "icon", e.target.value)}
                />
              </Field>
              <Field label="Title">
                <Input
                  value={partner.title || ""}
                  onChange={(e) => updatePartner(index, "title", e.target.value)}
                />
              </Field>
            </div>
            <Btn variant="danger" onClick={() => removePartner(index)}>
              Remove Partner
            </Btn>
          </div>
        ))}

        {(!form.partners || form.partners.length === 0) && (
          <div className="dynamic-empty">
            <p>No partners added.</p>
            <Btn onClick={addPartner}>Add First Partner</Btn>
          </div>
        )}
      </div> */}

      {/* ---------------- Floating Cards ---------------- */}
      <div className="dynamic-header" style={{ marginTop: 32 }}>
        <h3>Floating Cards</h3>
        <Btn onClick={addFloatingCard}>+ Add Floating Card</Btn>
      </div>

      <div className="dynamic-cards">
        {(form.floatingCards || []).map((card, index) => (
          <div key={index} className="dynamic-card">
            <div className="form-grid">
              <Field label="Icon Key">
                <Input
                  value={card.icon || ""}
                  onChange={(e) => updateFloatingCard(index, "icon", e.target.value)}
                />
              </Field>
              <Field label="Title">
                <Input
                  value={card.title || ""}
                  onChange={(e) => updateFloatingCard(index, "title", e.target.value)}
                />
              </Field>
              <Field label="Subtitle" className="field-full">
                <Input
                  value={card.subtitle || ""}
                  onChange={(e) => updateFloatingCard(index, "subtitle", e.target.value)}
                />
              </Field>
            </div>
            <Btn variant="danger" onClick={() => removeFloatingCard(index)}>
              Remove Card
            </Btn>
          </div>
        ))}

        {(!form.floatingCards || form.floatingCards.length === 0) && (
          <div className="dynamic-empty">
            <p>No floating cards added.</p>
            <Btn onClick={addFloatingCard}>Add First Floating Card</Btn>
          </div>
        )}
      </div>
    </div>
  );
}
