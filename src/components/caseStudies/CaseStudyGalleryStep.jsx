import { Btn, Field } from "../ui/UI";

export default function CaseStudyGalleryStep({ form, setForm }) {
  const gallery = form.gallery || [];

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []);
    setForm({ ...form, gallery: [...gallery, ...files] });
  };

  const removeAt = (index) => setForm({ ...form, gallery: gallery.filter((_, i) => i !== index) });

  return (
    <div className="step-content">
      <Field label="Gallery Images" hint="Upload one or more images; existing images are kept unless removed">
        <input
          type="file"
          accept="image/*"
          multiple
          className="input"
          onChange={(e) => addFiles(e.target.files)}
        />
      </Field>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
        {gallery.map((item, index) => {
          const src = item instanceof File ? URL.createObjectURL(item) : item.url;
          return (
            <div key={index} style={{ position: "relative" }}>
              <img src={src} alt={`Gallery ${index + 1}`} style={{ width: 120, height: 90, borderRadius: 8, objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 4, right: 4 }}>
                <Btn size="sm" variant="danger" onClick={() => removeAt(index)}>×</Btn>
              </div>
            </div>
          );
        })}

        {gallery.length === 0 && (
          <div className="dynamic-empty" style={{ width: "100%" }}>
            <p>No gallery images added.</p>
          </div>
        )}
      </div>
    </div>
  );
}
