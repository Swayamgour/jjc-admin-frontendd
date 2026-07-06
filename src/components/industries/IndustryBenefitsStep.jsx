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

	const addListItem = () => {
		updateSection("list", [
			...(benefits.list || []),
			"",
		]);
	};

	const updateListItem = (index, value) => {
		const list = [...(benefits.list || [])];
		list[index] = value;
		updateSection("list", list);
	};

	const removeListItem = (index) => {
		updateSection(
			"list",
			benefits.list.filter((_, i) => i !== index)
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

				<Btn onClick={addListItem}>
					+ Add Benefit
				</Btn>
			</div>

			<div className="dynamic-cards">
				{(benefits.list || []).map((item, index) => (
					<div key={index} className="dynamic-card">
						<Field label={`Benefit ${index + 1}`}>
							<Textarea
								rows={2}
								value={item}
								onChange={(e) =>updateListItem(index,e.target.value)}
							/>
						</Field>

						<Btn variant="danger" onClick={() =>removeListItem(index)}>
							Remove
						</Btn>
					</div>
				))}

				{benefits.list?.length === 0 && (
					<div className="dynamic-empty">
						<p>No benefits added.</p>

						<Btn onClick={addListItem}>
							Add First Benefit
						</Btn>
					</div>
				)}
			</div>
		</div>
	);
}