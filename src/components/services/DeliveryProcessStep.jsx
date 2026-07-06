import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function DeliveryProcessStep({ form, setForm }) {
	const addItem = () => {
		setForm({
			...form,
			deliveryProcess: [
				...form.deliveryProcess,
				{
					step: form.deliveryProcess.length + 1,
					title: "",
					description: "",
				},
			],
		});
	};

	const updateItem = (index, field, value) => {
		const updated = [...form.deliveryProcess];

		updated[index] = {
			...updated[index],
			[field]: value,
		};

		setForm({
			...form,
			deliveryProcess: updated,
		});
	};

	const removeItem = (index) => {
		setForm({
			...form,
			deliveryProcess: form.deliveryProcess.filter((_, i) => i !== index),
		});
	};

	return (
		<div>
			<div className="dynamic-header">
				<h3>Delivery Process</h3>

				<Btn type="button" onClick={addItem}>
					Add
				</Btn>
			</div>

			<div className="dynamic-cards">
				{form.deliveryProcess.length === 0 ? (
					<div className="dynamic-empty">
						<p>No delivery steps added yet.</p>

						<Btn type="button" onClick={addItem}>
							Add Delivery Step
						</Btn>
					</div>
				) : (
					form.deliveryProcess.map((item, index) => (
						<div key={index} className="dynamic-card">
							<Field label="Step">
								<Input
									type="number"
									value={item.step}
									onChange={(e) => updateItem(index, "step", e.target.value)}
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

							<Btn
								variant="danger"
								type="button"
								onClick={() => removeItem(index)}
							>
								Remove
							</Btn>
						</div>
					))
				)}
			</div>
		</div>
	);
}
