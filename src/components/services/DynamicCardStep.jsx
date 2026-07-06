import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function DynamicCardStep({ title, items, onChange }) {
	const addItem = () => {
		onChange([
			...items,
			{
				icon: "",
				title: "",
				subtitle: "",
				description: "",
			},
		]);
	};

	const updateItem = (index, field, value) => {
		const updated = [...items];

		updated[index] = {
			...updated[index],
			[field]: value,
		};

		onChange(updated);
	};

	const removeItem = (index) => {
		onChange(items.filter((_, i) => i !== index));
	};

	return (
		<div>
			<div className="dynamic-header">
				<h3>{title}</h3>

				<Btn type="button" onClick={addItem}>
					Add
				</Btn>
			</div>

			<div className="dynamic-cards">
				{items.length === 0 ? (
					<div className="dynamic-empty">
						<p>No {title.toLowerCase()} added yet.</p>

						<Btn type="button" onClick={addItem}>
							Add {title}
						</Btn>
					</div>
				) : (
					items.map((item, index) => (
						<div key={index} className="dynamic-card">
							<Field label="Icon">
								<Input
									value={item.icon}
                  onChange={(e) => updateItem(index, "icon", e.target.value)}
									placeholder="lucide icon name"
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
