import { Btn, Field, Input, Textarea } from "../components/ui/UI";

export default function DeliveryProcessStep({
	form,
	setForm,
	sectionKey = "deliveryProcess",
	label = "Delivery Process",
}) {

	const section = form[sectionKey] || { tag: "", title: "", subtitle: "", steps: [] };
	const steps = section.steps || [];

	const updateSection = (field, value) => {
		setForm({ ...form, [sectionKey]: { ...section, [field]: value } });
	};

	const addItem = () => {
		setForm({
			...form,
			[sectionKey]: {
				...section,
				steps: [...steps, { step: steps.length + 1, icon: "", title: "", description: "" }],
			},
		});
	};

	const updateItem = (index, field, value) => {
		const updated = [...steps];
		updated[index] = { ...updated[index], [field]: value };
		setForm({ ...form, [sectionKey]: { ...section, steps: updated } });
	};

	const removeItem = (index) => {
		setForm({
			...form,
			[sectionKey]: { ...section, steps: steps.filter((_, i) => i !== index) },
		});
	};

	return (
		<div>

			<div className="form-grid">
				<Field label={`${label} Tag`}>
					<Input
						value={section.tag || ""}
						onChange={(e) => updateSection("tag", e.target.value)}
						placeholder="Process"
					/>
				</Field>

				<Field label={`${label} Title`}>
					<Input
						value={section.title || ""}
						onChange={(e) => updateSection("title", e.target.value)}
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
				<h3>{label} Steps</h3>
				<Btn type="button" onClick={addItem}>Add</Btn>
			</div>

			<div className="dynamic-cards">
				{steps.length === 0 ? (
					<div className="dynamic-empty">
						<p>No steps added.</p>
						<Btn type="button" onClick={addItem}>Add Step</Btn>
					</div>
				) : (
					steps.map((item, index) => (
						<div key={index} className="dynamic-card">

							<Field label="Step Number">
								<Input
									type="number"
									value={item.step}
									onChange={(e) => updateItem(index, "step", Number(e.target.value))}
								/>
							</Field>

							<Field label="Icon">
								<Input
									value={item.icon || ""}
									onChange={(e) => updateItem(index, "icon", e.target.value)}
									placeholder="Rocket"
								/>
							</Field>

							<Field label="Title">
								<Input
									value={item.title || ""}
									onChange={(e) => updateItem(index, "title", e.target.value)}
								/>
							</Field>

							<Field label="Description">
								<Textarea
									rows={4}
									value={item.description || ""}
									onChange={(e) => updateItem(index, "description", e.target.value)}
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
