import { Btn, Field, Input } from "../ui/UI";

export default function IndustryExamplesStep({ form, setForm }) {
	const addItem = () => {
		setForm({
			...form,
			industryExamples: [
				...form.industryExamples,
				{
					industry: "",
					example: "",
				},
			],
		});
	};

	const updateItem = (index, field, value) => {
		const updated = [...form.industryExamples];

		updated[index] = {
			...updated[index],
			[field]: value,
		};

		setForm({
			...form,
			industryExamples: updated,
		});
	};

	const removeItem = (index) => {
		setForm({
			...form,
			industryExamples: form.industryExamples.filter(
				(_, i) => i !== index,
			),
		});
	};

	return (
		<div>
			<div className="dynamic-header">
				<h3>Industry Examples</h3>

				<Btn type="button" onClick={addItem}>
					Add
				</Btn>
			</div>

			<div className="dynamic-cards">
				{form.industryExamples.length === 0 ? (
					<div className="dynamic-empty">
						<p>No industry examples added yet.</p>

						<Btn type="button" onClick={addItem}>
							Add Industry Example
						</Btn>
					</div>
				) : (
					form.industryExamples.map((item, index) => (
						<div key={index} className="dynamic-card">
							<Field label="Industry">
								<Input
									value={item.industry}
                  onChange={(e) => updateItem(index, "industry", e.target.value)}
									placeholder="e.g. Healthcare"
								/>
							</Field>

							<Field label="Example">
								<Input
									value={item.example}
									onChange={(e) => updateItem(index, "example", e.target.value)}
									placeholder="e.g. Hospital Management System"
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
