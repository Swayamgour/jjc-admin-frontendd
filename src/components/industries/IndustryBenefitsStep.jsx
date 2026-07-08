import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function IndustryBenefitsStep({
	form,
	setForm,
}) {
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
			icon: "",
			title: "",
			description: "",
		},
	]);
};

	const updateItem = (index, key, value) => {
	const items = [...(benefits.items || [])];

	items[index] = {
		...items[index],
		[key]: value,
	};

	updateSection("items", items);
};

	const removeItem = (index) => {
	updateSection(
		"items",
		benefits.items.filter((_, i) => i !== index)
	);
};

	return (
		<div>
			<div className="form-grid">
				<Field label="Tag">
					<Input
						value={benefits.tag || ""}
						onChange={(e) => updateSection("tag", e.target.value)}
					/>
				</Field>

				<Field label="Title">
					<Input
						value={benefits.title || ""}
						onChange={(e) => updateSection("title", e.target.value)}
					/>
				</Field>

				<Field label="Description">
					<Textarea
						rows={4}
						value={benefits.desc || ""}
						onChange={(e) => updateSection("desc", e.target.value)}
					/>
				</Field>

				<Field label="Visual Icon">
					<Input
						placeholder="FaRocket"
						value={benefits.visualIcon || ""}
						onChange={(e) => updateSection("visualIcon", e.target.value)}
					/>
				</Field>

				<Field label="Mini Icons (comma separated)">
					<Input
						placeholder="FaChartLine, FaUsers, FaBrain, FaBriefcase"
						value={(benefits.miniIcons || []).join(", ")}
						onChange={(e) =>
							updateSection(
								"miniIcons",
								e.target.value
									.split(",")
									.map((item) => item.trim())
									.filter(Boolean)
							)
						}
					/>
				</Field>

				<Field label="Button Label">
					<Input
						value={benefits.buttonLabel || ""}
						onChange={(e) => updateSection("buttonLabel", e.target.value)}
					/>
				</Field>
			</div>

			<div className="dynamic-header">
				<h3>Benefits List</h3>

				<Btn onClick={addItem}>
					+ Add Benefit
				</Btn>
			</div>

			<div className="dynamic-cards">
				{(benefits.items || []).map((item, index) => (
					<div key={index} className="dynamic-card">
						<div className="form-grid">
							<Field label="Icon">
								<Input
									placeholder="FaRocket"
									value={item.icon}
									onChange={(e) =>
										updateItem(index, "icon", e.target.value)
									}
								/>
							</Field>

							<Field label="Title">
								<Input
									value={item.title}
									onChange={(e) =>
										updateItem(index, "title", e.target.value)
									}
								/>
							</Field>

							<Field label="Description" className="field-full">
								<Textarea
									rows={4}
									value={item.description}
									onChange={(e) =>
										updateItem(
											index,
											"description",
											e.target.value
										)
									}
								/>
							</Field>
						</div>

						<Btn
							variant="danger"
							onClick={() => removeItem(index)}
						>
							Remove
						</Btn>
					</div>
				))}

				{benefits.items?.length === 0 && (
					<div className="dynamic-empty">
						<p>No benefits added.</p>

						<Btn onClick={addItem}>
							Add First Benefit
						</Btn>
					</div>
				)}
			</div>
		</div>
	);
}