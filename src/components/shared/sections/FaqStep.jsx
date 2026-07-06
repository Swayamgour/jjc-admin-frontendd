import { Btn, Field, Input, Textarea } from "../../ui/UI";

export default function FaqStep({ form, setForm }) {
	const faqs = form.faqs || {};

	const updateSection = (key, value) => {
		setForm({
			...form,
			faqs: {
				...faqs,
				[key]: value,
			},
		});
	};

	const addFaq = () => {
		updateSection("items", [
			...(faqs.items || []),
			{
				question: "",
				answer: "",
			},
		]);
	};

	const updateFaq = (index, key, value) => {
		const items = [...(faqs.items || [])];

		items[index] = {
			...items[index],
			[key]: value,
		};

		updateSection("items", items);
	};

	const removeFaq = (index) => {
		updateSection(
			"items",
			(faqs.items || []).filter((_, i) => i !== index),
		);
	};

	return (
		<div>
			<div className="form-grid">
				<Field label="Section Tag">
					<Input
						value={faqs.tag || ""}
						onChange={(e) => updateSection("tag", e.target.value)}
					/>
				</Field>

				<Field label="Section Title">
					<Input
						value={faqs.title || ""}
						onChange={(e) => updateSection("title", e.target.value)}
					/>
				</Field>
			</div>

			<div className="dynamic-header">
				<h3>FAQs</h3>

				<Btn onClick={addFaq}>+ Add FAQ</Btn>
			</div>

			<div className="dynamic-cards">
				{(faqs.items || []).map((faq, index) => (
					<div key={index} className="dynamic-card">
						<div className="form-grid">
							<Field label="Question">
								<Input
									value={faq.question || ""}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
								/>
							</Field>

							<Field label="Answer">
								<Textarea
									rows={5}
									value={faq.answer || ""}
									onChange={(e) =>  updateFaq(index, "answer", e.target.value)}
								/>
							</Field>
						</div>

						<Btn variant="danger" onClick={() => removeFaq(index)}>
							Remove FAQ
						</Btn>
					</div>
				))}

				{(!faqs.items || faqs.items.length === 0) && (
					<div className="dynamic-empty">
						<p>No FAQs added.</p>

						<Btn onClick={addFaq}>Add First FAQ</Btn>
					</div>
				)}
			</div>
		</div>
	);
}
