import { Field, Input, Textarea, Select } from "../ui/UI";

export default function BasicInfoStep({ form, setForm, categories }) {
	const selectedCategory = categories.find((c) => c._id === form.category);

	const subcategories = selectedCategory?.subcategories || [];

	return (
		<div className="form-grid">
			<Field label="Service Title" required>
				<Input
					value={form.title}
					onChange={(e) =>
						setForm({
							...form,
							title: e.target.value,
						})
					}
					placeholder="Web Development"
				/>
			</Field>

			<Field label="Slug">
				<Input
					value={form.slug}
					onChange={(e) =>
						setForm({
							...form,
							slug: e.target.value,
						})
					}
					placeholder="Leave blank to auto generate"
				/>
			</Field>

			<Field label="Short Description" required>
				<Textarea
					rows={3}
					value={form.shortDescription}
					onChange={(e) =>
						setForm({
							...form,
							shortDescription: e.target.value,
						})
					}
					placeholder="Short service description"
				/>
			</Field>

			<Field label="Overview">
				<Textarea
					rows={6}
					value={form.overview}
					onChange={(e) =>
						setForm({
							...form,
							overview: e.target.value,
						})
					}
					placeholder="Service overview"
				/>
			</Field>

			<Field label="Order">
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

			<Field label="Category">
				<Select
					value={form.category}
					onChange={(e) =>
						setForm({
							...form,
							category: e.target.value,
							subCategory: "",
						})
					}
				>
					<option value="">Select Category</option>

					{categories.map((cat) => (
						<option key={cat._id} value={cat._id}>
							{cat.name}
						</option>
					))}
				</Select>
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
					disabled={!form.category}
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
