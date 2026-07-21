import { Field, Input, Select } from "../ui/UI";

export default function IndustryBasicInfoStep({ form, setForm, categories }) {
	const updateField = (field, value) => {
		setForm({
			...form,
			[field]: value,
		});
	};

	// `categories` yahan ab already flattened items array hai
	// (backend ke /industries/items endpoint se aata hai —
	// {name, slug, icon, description, order, _id} objects ki
	// flat list), isliye seedha ise hi Sub Category options
	// ke liye use karo — koi .find() ya .subcategories nahi.
	const subcategories = categories || [];

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

			{/* New Sub Category Field */}
			<Field label="Sub Category">
				<Select
					value={form.subCategory || ""}
					onChange={(e) =>
						setForm({
							...form,
							subCategory: e.target.value,
						})
					}
				>
					<option value="">Select Sub Category</option>

					{subcategories.map((sub) => (
						<option key={sub._id} value={sub._id}>
							{sub.name}
						</option>
					))}
				</Select>
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