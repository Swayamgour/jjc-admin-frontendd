import { Btn, Field, Input, Textarea } from "../components/ui/UI";

export default function FaqStep({ form, setForm }) {
  const faqs = form.faqs || { tag: "", title: "", subtitle: "", items: [] };
  const items = faqs.items || [];

  const updateFaq = (field, value) => {
    setForm({ ...form, faqs: { ...faqs, [field]: value } });
  };

  const addItem = () => {
    setForm({
      ...form,
      faqs: {
        ...faqs,
        items: [...items, { question: "", answer: "" }],
      },
    });
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, faqs: { ...faqs, items: updated } });
  };

  const removeItem = (index) => {
    setForm({
      ...form,
      faqs: { ...faqs, items: items.filter((_, i) => i !== index) },
    });
  };

  return (
    <div>
      <div className="form-grid">
        <Field label="FAQ Tag">
          <Input
            value={faqs.tag || ""}
            onChange={(e) => updateFaq("tag", e.target.value)}
            placeholder="FAQs"
          />
        </Field>

        <Field label="FAQ Title">
          <Input
            value={faqs.title || ""}
            onChange={(e) => updateFaq("title", e.target.value)}
            placeholder="Frequently Asked Questions"
          />
        </Field>

        <Field label="FAQ Subtitle">
          <Input
            value={faqs.subtitle || ""}
            onChange={(e) => updateFaq("subtitle", e.target.value)}
          />
        </Field>
      </div>

      <div className="dynamic-header">
        <h3>FAQ Items</h3>
        <Btn type="button" onClick={addItem}>Add</Btn>
      </div>

      <div className="dynamic-cards">
        {items.length === 0 ? (
          <div className="dynamic-empty">
            <p>No FAQs added.</p>
            <Btn type="button" onClick={addItem}>Add FAQ</Btn>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} className="dynamic-card">
              <Field label="Question">
                <Input
                  value={item.question || ""}
                  onChange={(e) => updateItem(index, "question", e.target.value)}
                  placeholder="Frequently asked question"
                />
              </Field>

              <Field label="Answer">
                <Textarea
                  rows={4}
                  value={item.answer || ""}
                  onChange={(e) => updateItem(index, "answer", e.target.value)}
                  placeholder="Answer to the question"
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