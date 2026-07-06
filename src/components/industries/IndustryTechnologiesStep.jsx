import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function IndustryTechnologiesStep({ form, setForm }) {
	const technologies = form.technologies;

	const updateSection = (key, value) => {
		setForm({
			...form,
			technologies: {
				...technologies,
				[key]: value,
			},
		});
	};

	const addItem = () => {
		updateSection("items", [
			...(technologies.items || []),
			{
				icon: "",
				label: "",
				desc: "",
			},
		]);
	};

	const updateItem = (index, key, value) => {
		const items = [...(technologies.items || [])];

		items[index] = {
			...items[index],
			[key]: value,
		};

		updateSection("items", items);
	};

	const removeItem = (index) => {
		updateSection(
			"items",
			technologies.items.filter((_, i) => i !== index),
		);
	};

	return (
		<div>
			<div className="form-grid">
				<Field label="Tag">
					<Input
						value={technologies.tag || ""}
						onChange={(e) => updateSection("tag", e.target.value)}
					/>
				</Field>

				<Field label="Title">
					<Input
						value={technologies.title || ""}
						onChange={(e) => updateSection("title", e.target.value)}
					/>
				</Field>

				<Field label="Subtitle">
					<Textarea
						rows={3}
						value={technologies.subtitle || ""}
						onChange={(e) => updateSection("subtitle", e.target.value)}
					/>
				</Field>

				<Field label="Columns">
					<Input
						type="number"
						value={technologies.columns ?? ""}
						onChange={(e) =>
							updateSection(
								"columns",
								e.target.value === "" ? "" : Number(e.target.value),
							)
						}
					/>
				</Field>

				<Field label="Footer Link">
					<Input
						placeholder="Explore Manufacturing Solutions"
						value={technologies.footerLink || ""}
            onChange={(e) => updateSection("footerLink", e.target.value)}
					/>
				</Field>
			</div>

			<div className="dynamic-header">
				<h3>Technology Cards</h3>

				<Btn onClick={addItem}>+ Add Technology</Btn>
			</div>

			<div className="dynamic-cards">
				{(technologies.items || []).map((item, index) => (
					<div key={index} className="dynamic-card">
						<div className="form-grid">
							<Field label="Icon">
								<Input
									placeholder="FaCloud"
									value={item.icon || ""}
                  onChange={(e) => updateItem(index, "icon", e.target.value)}
								/>
							</Field>

							<Field label="Label">
								<Input
									value={item.label || ""}
									onChange={(e) => updateItem(index, "label", e.target.value)}
								/>
							</Field>

							<Field label="Description">
								<Textarea
									rows={3}
									value={item.desc || ""}
									onChange={(e) => updateItem(index, "desc", e.target.value)}
								/>
							</Field>
						</div>

						<Btn variant="danger" onClick={() => removeItem(index)}>
							Remove
						</Btn>
					</div>
				))}

				{(!technologies.items || technologies.items.length === 0) && (
					<div className="dynamic-empty">
						<p>No technologies added.</p>

						<Btn onClick={addItem}>Add First Technology</Btn>
					</div>
				)}
			</div>
		</div>
	);
}
