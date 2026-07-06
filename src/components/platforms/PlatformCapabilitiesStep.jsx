import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function PlatformCapabilitiesStep({ form, setForm }) {
	const capabilities = form.capabilities;

	const updateSection = (key, value) => {
		setForm({
			...form,
			capabilities: {
				...capabilities,
				[key]: value,
			},
		});
	};

	const addItem = () => {
		updateSection("items", [
			...(capabilities.items || []),
			{
				icon: "",
				title: "",
				subtitle: "",
				description: "",
			},
		]);
	};

	const updateItem = (index, key, value) => {
		const items = [...capabilities.items];

		items[index] = {
			...items[index],
			[key]: value,
		};

		updateSection("items", items);
	};

	const removeItem = (index) => {
		updateSection(
			"items",
			capabilities.items.filter((_, i) => i !== index),
		);
	};

	return (
		<div>
			<div className="form-grid">
				<Field label="Tag">
					<Input
						value={capabilities.tag}
						onChange={(e) => updateSection("tag", e.target.value)}
					/>
				</Field>

				<Field label="Title">
					<Input
						value={capabilities.title}
						onChange={(e) => updateSection("title", e.target.value)}
					/>
				</Field>

				<Field label="Subtitle">
					<Textarea
						rows={3}
						value={capabilities.subtitle}
						onChange={(e) => updateSection("subtitle", e.target.value)}
					/>
				</Field>
			</div>

			<div className="dynamic-header">
				<h3>Capability Cards</h3>

				<Btn onClick={addItem}>+ Add Card</Btn>
			</div>

			<div className="dynamic-cards">
				{(capabilities.items || []).map((item, index) => (
					<div key={index} className="dynamic-card">
						<div className="form-grid">
							<Field label="Icon">
								<Input
									placeholder="FaCloud"
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

							<Field label="Subtitle">
								<Input
									value={item.subtitle}
									onChange={(e) => updateItem(index, "subtitle", e.target.value)}
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
							Remove
						</Btn>
					</div>
				))}

				{capabilities.items?.length === 0 && (
					<div className="dynamic-empty">
						<p>No capability cards added.</p>

						<Btn onClick={addItem}>Add First Card</Btn>
					</div>
				)}
			</div>
		</div>
	);
}
