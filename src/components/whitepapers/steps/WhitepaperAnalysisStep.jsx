import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Field, Input } from "../../ui/UI";

export default function WhitepaperAnalysisStep({ form, setForm }) {
  const set = (key, value) => setForm({ ...form, [key]: value });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  return (
    <div className="step-content">
      <Field
        label="Analysis Heading"
        hint="Main heading for the analysis section."
      >
        <Input
          value={form.analysisHeading || ""}
          onChange={(e) => set("analysisHeading", e.target.value)}
          placeholder="The argument in full"
        />
      </Field>

      <Field
        label="Analysis Body"
        hint="Write your analysis with headings, paragraphs, lists, links, images, etc. HTML is generated automatically."
      >
        <ReactQuill
          theme="snow"
          value={form.analysisBody || ""}
          onChange={(value) => set("analysisBody", value)}
          modules={modules}
          formats={formats}
          style={{ minHeight: "450px", marginBottom: "50px" }}
        />
      </Field>
    </div>
  );
}