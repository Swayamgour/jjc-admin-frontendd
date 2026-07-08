import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function PlatformBenefitsStep({ form, setForm }) {
	const benefits = form.benefits;

	const updateSection = (key, value) => {
		setForm({
			...form,
			benefits: {
				...benefits,
				[key]: value,
			},
		});
	};

	const addItem = () => {
		updateSection("items", [
			...(benefits.items || []),
			{
				title: "",
				description: "",
			},
		]);
	};

	const updateItem = (index, key, value) => {
		const items = [...benefits.items];

		items[index] = {
			...items[index],
			[key]: value,
		};

		updateSection("items", items);
	};

	const removeItem = (index) => {
		updateSection(
			"items",
			benefits.items.filter((_, i) => i !== index),
		);
	};

	return (
		<div>
			<div className="form-grid">
				<Field label="Tag">
					<Input
						value={benefits.tag}
						onChange={(e) => updateSection("tag", e.target.value)}
					/>
				</Field>

				<Field label="Title">
					<Input
						value={benefits.title}
						onChange={(e) => updateSection("title", e.target.value)}
					/>
				</Field>

				<Field label="Description">
					<Textarea
						rows={4}
						value={benefits.description}
						onChange={(e) => updateSection("description", e.target.value)}
					/>
				</Field>

				<Field label="Button Label">
					<Input
						placeholder="Get Started"
						value={benefits.buttonLabel}
						onChange={(e) => updateSection("buttonLabel", e.target.value)}
					/>
				</Field>
			</div>

			<div className="dynamic-header">
				<h3>Benefit Items</h3>

				<Btn onClick={addItem}>+ Add Benefit</Btn>
			</div>

			<div className="dynamic-cards">
				{(benefits.items || []).map((item, index) => (
					<div key={index} className="dynamic-card">
						<div className="form-grid">
							<Field label="Icon">
								<Input
									placeholder="FaBuilding"
									value={item.icon}
									onChange={(e) => updateItem(index, "icon", e.target.value)}
								/>
							</Field>
							<Field label="Title">
								<Input
									value={item.title}
									onChange={(e) => updateItem(index, "title", e.target.value)}
								/>
							</Field>

							<Field label="Description" className="field-full">
								<Textarea
									rows={4}
									value={item.description}
									onChange={(e) =>updateItem(index, "description", e.target.value)}
										
								/>
							</Field>
						</div>

						<Btn variant="danger" onClick={() => removeItem(index)}>
							Remove
						</Btn>
					</div>
				))}

				{(!benefits.items || benefits.items.length === 0) && (
					<div className="dynamic-empty">
						<p>No benefit items added.</p>

						<Btn onClick={addItem}>Add First Benefit</Btn>
					</div>
				)}
			</div>
		</div>
	);
}
