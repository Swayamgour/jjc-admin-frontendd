import { Field, Input, Textarea, Select } from "../components/ui/UI";

export default function BasicInfoStep({ form, setForm, categories }) {

	// `categories` is the flattened subcategory-items array for
	// this page's `type`, fetched by the parent (PageFormPage)
	// via useGetAllItemByCategoryQuery(TYPE_CATEGORY_SLUG[type]).
	const subcategories = categories || [];

	const updateOverview = (field, value) => {
		setForm({
			...form,
			overview: { ...form.overview, [field]: value },
		});
	};

	return (
		<div className="form-grid">

			<Field label="Title" required>
				<Input
					value={form.title}
					onChange={(e) => setForm({ ...form, title: e.target.value })}
					placeholder="Microsoft 365 Consulting"
				/>
			</Field>

			<Field label="Badge">
				<Input
					value={form.badge}
					onChange={(e) => setForm({ ...form, badge: e.target.value })}
					placeholder="Microsoft Partner"
				/>
			</Field>

			<Field label="Slug" required>
				<Input
					value={form.slug}
					onChange={(e) =>
						setForm({
							...form,
							slug: e.target.value
								.toLowerCase()
								.replace(/\s+/g, "-")
								.replace(/[^a-z0-9-]/g, ""),
						})
					}
					placeholder="microsoft-365-consulting"
				/>
			</Field>

			<Field label="Short Description" required>
				<Textarea
					rows={3}
					value={form.shortDescription}
					onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
					placeholder="Short description — shown in mega menu / cards"
				/>
			</Field>

			{/* ================= OVERVIEW ================ */}

			<Field label="Overview Tag">
				<Input
					value={form.overview?.tag || ""}
					onChange={(e) => updateOverview("tag", e.target.value)}
					placeholder="Overview"
				/>
			</Field>

			<Field label="Overview Title">
				<Input
					value={form.overview?.title || ""}
					onChange={(e) => updateOverview("title", e.target.value)}
				/>
			</Field>

			<Field label="Brand Label">
				<Input
					value={form.overview?.brandLabel || ""}
					onChange={(e) => updateOverview("brandLabel", e.target.value)}
				/>
			</Field>

			<Field label="Overview Paragraphs">
				<Textarea
					rows={5}
					value={(form.overview?.paragraphs || []).join("\n")}
					onChange={(e) =>
						updateOverview("paragraphs", e.target.value.split("\n").filter(Boolean))
					}
					placeholder="One paragraph per line"
				/>
			</Field>

			<Field label="Checklist">
				<Textarea
					rows={4}
					value={(form.overview?.checklist || []).join("\n")}
					onChange={(e) =>
						updateOverview("checklist", e.target.value.split("\n").filter(Boolean))
					}
					placeholder="One item per line"
				/>
			</Field>

			<Field label="Order">
				<Input
					type="number"
					value={form.order}
					onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
				/>
			</Field>

			<Field label="Sub Category" required>
				<Select
					value={form.subCategory}
					onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
				>
					<option value="">Select Subcategory</option>
					{subcategories.map((sub) => (
						<option key={sub._id} value={sub._id}>
							{sub.name}
						</option>
					))}
				</Select>
			</Field>

		</div>
	);
}
