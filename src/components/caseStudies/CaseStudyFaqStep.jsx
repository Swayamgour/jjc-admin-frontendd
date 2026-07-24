import RepeaterEditor from "./RepeaterEditor";

export default function CaseStudyFaqStep({ form, setForm }) {
  return (
    <div className="step-content">
      <RepeaterEditor
        cardTitle="FAQs"
        items={form.faqs}
        onChange={(v) => setForm({ ...form, faqs: v })}
        emptyItem={{ question: "", answer: "" }}
        fields={[
          { key: "question", label: "Question", placeholder: "How long did the full migration take?" },
          { key: "answer", label: "Answer", type: "textarea", rows: 3, placeholder: "..." },
        ]}
        addLabel="+ Add FAQ"
        emptyLabel="No FAQs added."
      />
    </div>
  );
}
