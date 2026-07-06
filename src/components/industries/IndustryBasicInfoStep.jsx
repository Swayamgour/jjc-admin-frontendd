import { Field, Input } from "../ui/UI";

export default function IndustryBasicInfoStep({ form, setForm }) {
	const updateField = (field, value) => {
		setForm({
			...form,
			[field]: value,
		});
	};

	return (
		<div className="step-content">
			<Field label="Industry Title">
				<Input
					value={form.title}
					onChange={(e) => updateField("title", e.target.value)}
					placeholder="Manufacturing"
				/>
			</Field>

			<Field label="Slug">
				<Input
					value={form.slug}
					onChange={(e) => updateField("slug", e.target.value)}
					placeholder="manufacturing"
				/>
			</Field>

			<Field label="Badge">
				<Input
					placeholder="DELIVER EXCELLENCE. DRIVE GROWTH."
					value={form.badge || ""}
					onChange={(e) => updateField("badge", e.target.value)}
				/>
			</Field>

			<Field label="Breadcrumb (comma separated)">
				<Input
					placeholder="Home, Industries, Manufacturing"
					value={(form.breadcrumb || []).join(", ")}
					onChange={(e) =>
						setForm({
							...form,
							breadcrumb: e.target.value
								.split(",")
								.map((item) => item.trim())
								.filter(Boolean),
						})
					}
				/>
			</Field>

			<Field label="Display Order">
				<Input
					type="number"
					value={form.order}
					onChange={(e) => updateField("order", Number(e.target.value))}
				/>
			</Field>
		</div>
	);
}
