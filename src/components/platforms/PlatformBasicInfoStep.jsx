import { Field, Input, Textarea, Select } from "../ui/UI";

export default function PlatformBasicInfoStep({ form, setForm, categories }) {
	// `categories` yahan ab already flattened items array hai
	// (backend ke /platforms/items endpoint se aata hai —
	// {name, slug, icon, description, order, _id} objects ki
	// flat list), isliye seedha ise hi Sub Category options
	// ke liye use karo — koi .find() ya .subcategories nahi.
	const subCategories = (categories || []).map((sub) => ({
		value: sub._id.toString(),
		label: sub.name,
	}));

	return (
		<div className="form-grid">
			<Field label="Platform Title">
				<Input
					value={form.title}
					onChange={(e) =>
						setForm({
							...form,
							title: e.target.value,
						})
					}
				/>
			</Field>

			{/* <Field label="Slug">
				<Input
					value={form.slug}
					onChange={(e) =>
						setForm({
							...form,
							slug: e.target.value,
						})
					}
				/>
			</Field> */}

			<Field label="Short Description">
				<Textarea
					rows={4}
					value={form.shortDescription}
					onChange={(e) =>
						setForm({
							...form,
							shortDescription: e.target.value,
						})
					}
				/>
			</Field>

			<Field label="Badge">
				<Input
					placeholder="e.g. Microsoft Gold Partner"
					value={form.badge}
					onChange={(e) =>
						setForm({
							...form,
							badge: e.target.value,
						})
					}
				/>
			</Field>

			<Field label="Sub Category">
				<Select
					value={form.subCategory}
					onChange={(e) =>
						setForm({
							...form,
							subCategory: e.target.value,
						})
					}
				>
					<option value="">Select Sub Category</option>

					{subCategories.map((item) => (
						<option key={item.value} value={item.value}>
							{item.label}
						</option>
					))}
				</Select>
			</Field>

			<Field label="Display Order">
				<Input
					type="number"
					value={form.order}
					onChange={(e) =>
						setForm({
							...form,
							order: Number(e.target.value),
						})
					}
				/>
			</Field>

			<Field label="Breadcrumb (comma separated)">
				<Input
					placeholder="Home, Platforms, Microsoft 365"
					value={form.breadcrumb.join(", ")}
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
		</div>
	);
}