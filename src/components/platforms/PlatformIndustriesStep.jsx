import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function PlatformIndustriesStep({ form, setForm }) {
	const industries = form.industries;

	const updateSection = (key, value) => {
		setForm({
			...form,
			industries: {
				...industries,
				[key]: value,
			},
		});
	};

	const addItem = () => {
		updateSection("items", [
			...(industries.items || []),
			{
				icon: "",
				title: "",
				description: "",
			},
		]);
	};

	const updateItem = (index, key, value) => {
		const items = [...industries.items];

		items[index] = {
			...items[index],
			[key]: value,
		};

		updateSection("items", items);
	};

	const removeItem = (index) => {
		updateSection(
			"items",
			industries.items.filter((_, i) => i !== index),
		);
	};

	return (
		<div>
			<div className="form-grid">
				<Field label="Tag">
					<Input
						value={industries.tag}
						onChange={(e) => updateSection("tag", e.target.value)}
					/>
				</Field>

				<Field label="Title">
					<Input
						value={industries.title}
						onChange={(e) => updateSection("title", e.target.value)}
					/>
				</Field>

				<Field label="Subtitle">
					<Textarea
						rows={3}
						value={industries.subtitle}
						onChange={(e) => updateSection("subtitle", e.target.value)}
					/>
				</Field>

				<Field label="Footer Link">
					<Input
						placeholder="/industries"
						value={industries.footerLink}
						onChange={(e) => updateSection("footerLink", e.target.value)}
					/>
				</Field>
			</div>

			<div className="dynamic-header">
				<h3>Industry Cards</h3>

				<Btn onClick={addItem}>+ Add Industry</Btn>
			</div>

			<div className="dynamic-cards">
				{(industries.items || []).map((item, index) => (
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

							<Field label="Description">
								<Textarea
									rows={4}
									value={item.description}
									onChange={(e) => updateItem(index, "description", e.target.value)}
								/>
							</Field>
						</div>

						<Btn variant="danger" onClick={() => removeItem(index)}>
							Remove Industry
						</Btn>
					</div>
				))}

				{(!industries.items || industries.items.length === 0) && (
					<div className="dynamic-empty">
						<p>No industries added.</p>

						<Btn onClick={addItem}>Add First Industry</Btn>
					</div>
				)}
			</div>
		</div>
	);
}
