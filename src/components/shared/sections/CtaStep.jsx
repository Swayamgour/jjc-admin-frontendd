import { Field, Input, Textarea } from "../../ui/UI";

export default function CtaStep({ form, setForm }) {
	const cta = form.cta;

	const updateField = (key, value) => {
		setForm({
			...form,
			cta: {
				...cta,
				[key]: value,
			},
		});
	};

	return (
		<div className="form-grid">
			<Field label="CTA Title">
				<Input
					value={cta.title}
					onChange={(e) => updateField("title", e.target.value)}
				/>
			</Field>

			<Field label="Description">
				<Textarea
					rows={4}
					value={cta.description}
					onChange={(e) => updateField("description", e.target.value)}
				/>
			</Field>

			<Field label="Primary Button">
				<Input
					placeholder="Talk to an Expert"
					value={cta.primaryLabel}
          onChange={(e) => updateField("primaryLabel", e.target.value)}
				/>
			</Field>

			<Field label="Secondary Button">
				<Input
					placeholder="Contact Us"
					value={cta.secondaryLabel}
          onChange={(e) => updateField("secondaryLabel", e.target.value)}
				/>
			</Field>
		</div>
	);
}
