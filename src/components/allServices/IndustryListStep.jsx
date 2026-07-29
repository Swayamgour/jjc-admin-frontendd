import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function IndustryListStep({
	form,
	setForm,
	sectionKey = "industryExamples",
	label = "Industries",
}) {

	const section = form[sectionKey] || { tag: "", title: "", subtitle: "", items: [] };
	const items = section.items || [];

	const updateSection = (field, value) => {
		setForm({ ...form, [sectionKey]: { ...section, [field]: value } });
	};

	const addItem = () => {
		setForm({
			...form,
			[sectionKey]: { ...section, items: [...items, { icon: "", industry: "", example: "" }] },
		});
	};

	const updateItem = (index, field, value) => {
		const updated = [...items];
		updated[index] = { ...updated[index], [field]: value };
		setForm({ ...form, [sectionKey]: { ...section, items: updated } });
	};

	const removeItem = (index) => {
		setForm({
			...form,
			[sectionKey]: { ...section, items: items.filter((_, i) => i !== index) },
		});
	};

	return (
		<div>

			<div className="form-grid">
				<Field label={`${label} Tag`}>
					<Input
						value={section.tag || ""}
						onChange={(e) => updateSection("tag", e.target.value)}
						placeholder="Industries"
					/>
				</Field>

				<Field label={`${label} Title`}>
					<Input
						value={section.title || ""}
						onChange={(e) => updateSection("title", e.target.value)}
						placeholder={label}
					/>
				</Field>

				<Field label={`${label} Subtitle`}>
					<Input
						value={section.subtitle || ""}
						onChange={(e) => updateSection("subtitle", e.target.value)}
					/>
				</Field>
			</div>

			<div className="dynamic-header">
				<h3>{label} Items</h3>
				<Btn type="button" onClick={addItem}>Add</Btn>
			</div>

			<div className="dynamic-cards">
				{items.length === 0 ? (
					<div className="dynamic-empty">
						<p>No items added.</p>
						<Btn type="button" onClick={addItem}>Add</Btn>
					</div>
				) : (
					items.map((item, index) => (
						<div key={index} className="dynamic-card">

							<Field label="Icon">
								<Input
									value={item.icon || ""}
									onChange={(e) => updateItem(index, "icon", e.target.value)}
									placeholder="Building"
								/>
							</Field>

							<Field label="Industry">
								<Input
									value={item.industry || ""}
									onChange={(e) => updateItem(index, "industry", e.target.value)}
									placeholder="Healthcare"
								/>
							</Field>

							<Field label="Example">
								<Textarea
									rows={4}
									value={item.example || ""}
									onChange={(e) => updateItem(index, "example", e.target.value)}
									placeholder="Example / use case"
								/>
							</Field>

							<Btn variant="danger" type="button" onClick={() => removeItem(index)}>
								Remove
							</Btn>

						</div>
					))
				)}
			</div>

		</div>
	);
}
