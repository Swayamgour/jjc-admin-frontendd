import { Btn, Field, Input, Textarea } from "../../ui/UI";

export default function CaseStudiesStep({ form, setForm }) {
	const caseStudies = form.caseStudies || {};

	const updateSection = (key, value) => {
		setForm({
			...form,
			caseStudies: {
				...caseStudies,
				[key]: value,
			},
		});
	};

	const addItem = () => {
		updateSection("items", [
			...(caseStudies.items || []),
			{
				tag: "",
				title: "",
				description: "",
				stat: "",
				statLabel: "",
				color: "",
			},
		]);
	};

	const updateItem = (index, key, value) => {
		const items = [...(caseStudies.items || [])];

		items[index] = {
			...items[index],
			[key]: value,
		};

		updateSection("items", items);
	};

	const removeItem = (index) => {
		updateSection(
			"items",
			caseStudies.items.filter((_, i) => i !== index),
		);
	};

	return (
		<div>
			<div className="form-grid">
				<Field label="Tag">
					<Input
						value={caseStudies.tag || ""}
						onChange={(e) => updateSection("tag", e.target.value)}
					/>
				</Field>

				<Field label="Title">
					<Input
						value={caseStudies.title || ""}
						onChange={(e) => updateSection("title", e.target.value)}
					/>
				</Field>

				<Field label="Subtitle">
					<Textarea
						rows={3}
						value={caseStudies.subtitle || ""}
						onChange={(e) =>
							updateSection("subtitle", e.target.value)
						}
					/>
				</Field>
			</div>

			<div className="dynamic-header">
				<h3>Case Studies</h3>

				<Btn onClick={addItem}>+ Add Case Study</Btn>
			</div>

			<div className="dynamic-cards">
				{(caseStudies.items || []).map((item, index) => (
					<div key={index} className="dynamic-card">
						<div className="form-grid">
							<Field label="Tag">
								<Input
									value={item.tag || ""}
									onChange={(e) =>updateItem(index, "tag", e.target.value)}
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

							<Field label="Statistic">
								<Input
									placeholder="98%"
									value={item.stat || ""}
									onChange={(e) => updateItem(index, "stat", e.target.value)}
								/>
							</Field>

							<Field label="Statistic Label">
								<Input
									placeholder="Customer Satisfaction"
									value={item.statLabel || ""}
									onChange={(e) => updateItem(index, "statLabel", e.target.value)}
								/>
							</Field>

							<Field label="Background Color">
								<Input
									placeholder="linear-gradient(...) or #2563eb"
									value={item.color || ""}
									onChange={(e) => updateItem(index, "color", e.target.value)}
								/>
							</Field>
						</div>

						<Btn variant="danger" onClick={() => removeItem(index)}>
							Remove Case Study
						</Btn>
					</div>
				))}

				{(!caseStudies.items || caseStudies.items.length === 0) && (
					<div className="dynamic-empty">
						<p>No case studies added.</p>

						<Btn onClick={addItem}>Add First Case Study</Btn>
					</div>
				)}
			</div>
		</div>
	);
}
