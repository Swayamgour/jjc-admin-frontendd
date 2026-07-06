import { Field, Input } from "../ui/UI";

export default function IndustryHeroStep({ form, setForm }) {
	const updateField = (key, value) => {
		setForm({
			...form,
			hero: {
				...(form.hero || {}),
				[key]: value,
			},
		});
	};

	const updateArrayField = (key, value) => {
		setForm({
			...form,
			hero: {
				...(form.hero || {}),
				[key]: value
          ? value.split(",").map((v) => v.trim()).filter(Boolean)
          : [],
			},
		});
	};

	return (
		<div className="step-content">
			{/* Description */}
			<Field label="Hero Description">
				<textarea
					className="input"
					rows={3}
					placeholder="Main hero description..."
					value={form.hero?.description || ""}
					onChange={(e) => updateField("description", e.target.value)}
				/>
			</Field>

			{/* Sub Description */}
			<Field label="Sub Description">
				<textarea
					className="input"
					rows={3}
					placeholder="Sub Description..."
					value={form.hero?.subDescription || ""}
					onChange={(e) => updateField("subDescription", e.target.value)}
				/>
			</Field>

			{/* Hero Badges */}
			<Field label="Hero Badges (comma separated)">
				<Input
					placeholder="Microsoft Partner, Experts, Support"
					value={(form.hero?.heroBadges || []).join(", ")}
					onChange={(e) => updateArrayField("heroBadges", e.target.value)}
				/>
      </Field>
      
      {/* Hero Image */}
      <Field label="Hero Image">
        <input
          type="file"
          accept="image/*"
          className="input"
					onChange={(e) => updateField("heroImage", e.target.files?.[0] || null)}
        />

        {form.hero?.heroImage && (
          <div style={{ marginTop: 12 }}>
            <img
              src={
                form.hero.heroImage instanceof File
                  ? URL.createObjectURL(form.hero.heroImage)
                  : form.hero.heroImage.url
              }
              alt="Hero Preview"
							style={{ width: 220, borderRadius: 8, objectFit: "cover"}}
            />
          </div>
        )}
      </Field>
		</div>
	);
}
