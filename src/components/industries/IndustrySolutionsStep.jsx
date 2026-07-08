import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function IndustrySolutionsStep({ form, setForm }) {
	const solutions = form.solutions;

	const updateSection = (key, value) => {
		setForm({
			...form,
			solutions: {
				...solutions,
				[key]: value,
			},
		});
	};

	const addItem = () => {
		updateSection("items", [
			...(solutions.items || []),
			{
				icon: "",
				title: "",
				description: "",
			},
		]);
	};

	const updateItem = (index, key, value) => {
		const items = [...solutions.items];

		items[index] = {
			...items[index],
			[key]: value,
		};

		updateSection("items", items);
	};

	const removeItem = (index) => {
		updateSection(
			"items",
			solutions.items.filter((_, i) => i !== index),
		);
	};

	return (
		<div>
			<div className="form-grid">
				<Field label="Tag">
					<Input
						value={solutions.tag || ""}
						onChange={(e) => updateSection("tag", e.target.value)}
					/>
				</Field>

				<Field label="Title">
					<Input
						value={solutions.title || ""}
						onChange={(e) => updateSection("title", e.target.value)}
					/>
				</Field>

				<Field label="Subtitle">
					<Textarea
						rows={3}
						value={solutions.subtitle || ""}
						onChange={(e) => updateSection("subtitle", e.target.value)}
					/>
				</Field>

				<Field label="Background">
					<Input
						placeholder="white"
						value={solutions.bg || ""}
						onChange={(e) => updateSection("bg", e.target.value)}
					/>
				</Field>

				<Field label="Columns">
					<Input
						type="number"
						value={solutions.columns}
						onChange={(e) =>
							updateSection(
								"columns",
								e.target.value === ""
									? ""
									: Number(e.target.value),
							)
						}
					/>
				</Field>

				<Field label="Align Left">
					<select
						className="input"
						value={solutions.alignLeft}
						onChange={(e) =>
							updateSection(
								"alignLeft",
								e.target.value === ""
									? ""
									: e.target.value === "true",
							)
						}
					>
						<option value="">Select</option>
						<option value="true">Yes</option>
						<option value="false">No</option>
					</select>
				</Field>
			</div>

			<div className="dynamic-header">
				<h3>Solution Cards</h3>

				<Btn onClick={addItem}>+ Add Card</Btn>
			</div>

			<div className="dynamic-cards">
				{(solutions.items || []).map((item, index) => (
					<div key={index} className="dynamic-card">
						<div className="form-grid">
							<Field label="Icon">
								<Input
									placeholder="FaIndustry"
									value={item.icon || ""}
									onChange={(e) => updateItem(index, "icon", e.target.value)}
								/>
							</Field>

							<Field label="Title">
								<Input
									value={item.title || ""}
									onChange={(e) => updateItem(index, "title", e.target.value)}
								/>
							</Field>

							<Field label="Description" className="field-full">
								<Textarea
									rows={4}
									value={item.description || ""}
									onChange={(e) => updateItem(index, "description", e.target.value)}
								/>
							</Field>
						</div>

						<Btn variant="danger" onClick={() => removeItem(index)}>
							Remove
						</Btn>
					</div>
				))}

				{solutions.items?.length === 0 && (
					<div className="dynamic-empty">
						<p>No solution cards added.</p>

						<Btn onClick={addItem}>Add First Card</Btn>
					</div>
				)}
			</div>
		</div>
	);
}
