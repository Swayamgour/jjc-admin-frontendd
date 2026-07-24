import { Field, Input, Textarea } from "../ui/UI";

export default function CaseStudyTestimonialStep({ form, setForm }) {
  const testimonial = form.testimonial || {};
  const set = (key, value) => setForm({ ...form, testimonial: { ...testimonial, [key]: value } });

  return (
    <div className="step-content">
      <Field label="Quote">
        <Textarea rows={3} value={testimonial.quote || ""} onChange={(e) => set("quote", e.target.value)} placeholder="JJC Systems transformed our entire IT environment..." />
      </Field>

      <div className="form-grid">
        <Field label="Author">
          <Input value={testimonial.author || ""} onChange={(e) => set("author", e.target.value)} placeholder="John Smith" />
        </Field>
        <Field label="Role">
          <Input value={testimonial.role || ""} onChange={(e) => set("role", e.target.value)} placeholder="IT Director, ABC Healthcare" />
        </Field>
      </div>

      <Field label="Author Photo">
        <input
          type="file"
          accept="image/*"
          className="input"
          onChange={(e) => set("image", e.target.files?.[0] || null)}
        />
        {testimonial.image && (
          <div style={{ marginTop: 12 }}>
            <img
              src={testimonial.image instanceof File ? URL.createObjectURL(testimonial.image) : testimonial.image.url}
              alt="Testimonial Preview"
              style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
        )}
      </Field>
    </div>
  );
}
