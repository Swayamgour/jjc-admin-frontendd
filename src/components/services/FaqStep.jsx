import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function FaqStep({ form, setForm }) {
	const addFaq = () => {
		setForm({
			...form,
			faqs: [
				...form.faqs,
				{
					question: "",
					answer: "",
				},
			],
		});
	};

	const updateFaq = (index, field, value) => {
		const updated = [...form.faqs];

		updated[index][field] = value;

		setForm({
			...form,
			faqs: updated,
		});
	};

	const removeFaq = (index) => {
		setForm({
			...form,
			faqs: form.faqs.filter((_, i) => i !== index),
		});
	};

	return (
		<div>
			<div className="dynamic-header">
				<h3>FAQs</h3>

				<Btn type="button" onClick={addFaq}>
					Add
				</Btn>
			</div>

			<div className="dynamic-cards">
				{form.faqs.length === 0 ? (
					<div className="dynamic-empty">
						<p>No FAQs added yet.</p>

						<Btn type="button" onClick={addFaq}>
							Add FAQ
						</Btn>
					</div>
				) : (
					form.faqs.map((faq, index) => (
						<div key={index} className="dynamic-card">
							<Field label="Question">
								<Input
									value={faq.question}
									onChange={(e) => updateFaq(index, "question", e.target.value)}
								/>
							</Field>

							<Field label="Answer">
								<Textarea
									rows={4}
									value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
								/>
							</Field>

							<Btn
								variant="danger"
								type="button"
								onClick={() => removeFaq(index)}
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
