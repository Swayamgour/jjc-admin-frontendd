import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Field } from "../../ui/UI";

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

export default function BlogContentStep({ form, setForm }) {
  return (
    <div className="step-content">
      <Field
        label="Content"
        hint="Write your blog content. Headings, paragraphs and lists will automatically be saved as HTML."
      >
        <ReactQuill
          theme="snow"
          value={form.content || ""}
          onChange={(value) =>
            setForm({
              ...form,
              content: value,
            })
          }
          modules={modules}
          formats={formats}
          style={{ minHeight: "450px" }}
        />
      </Field>
    </div>
  );
}