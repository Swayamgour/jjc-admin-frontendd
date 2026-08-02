import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageHeader, Btn } from "../components/ui/UI";
import "./ServiceFormPage.css";

import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useGetBlogByIdQuery,
} from "../features/blogs/blogApi";

import BlogBasicInfoStep from "../components/blogs/steps/BlogBasicInfoStep";
import BlogHeroStep from "../components/blogs/steps/BlogHeroStep";
import BlogContentStep from "../components/blogs/steps/BlogContentStep";
import BlogSeoStep from "../components/blogs/steps/BlogSeoStep";

const EMPTY_FORM = {
  title: "", slug: "", description: "", content: "",
  platform: "", service: "", industry: "", type: "", icon: "chart",
  readTime: "", publishedAt: "",

  eyebrow: "", takeaways: [],
  ctaPrimary: { text: "Talk to us about this", link: "/contact" },
  ctaSecondary: { text: "More insights", link: "/blog" },
  breadcrumb: { parent: "Insights", parentLink: "/blog", current: "" },

  isPublished: true, author: "JJC Systems", seoTitle: "", seoDescription: "",
};

const STEPS = ["Basic Info", "Hero", "Content", "SEO"];

export default function BlogForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: blogData, isLoading: loadingBlog, error: fetchError } = useGetBlogByIdQuery(id, { skip: !isEdit });

  const [createBlog, { isLoading: creating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation();

  useEffect(() => {
    if (!blogData?.data) return;
    const p = blogData.data;
    setForm({ ...EMPTY_FORM, ...p, publishedAt: p.publishedAt ? p.publishedAt.slice(0, 10) : "" });
  }, [blogData]);

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.platform || !form.service || !form.industry || !form.type) {
      alert("Title, Description, Platform, Service, Industry and Type are required.");
      setStep(0);
      return;
    }
    try {
      const body = { ...form };
      if (!body.publishedAt) delete body.publishedAt;

      if (isEdit) {
        await updateBlog({ id, ...body }).unwrap();
        alert("Blog post updated successfully!");
      } else {
        await createBlog(body).unwrap();
        alert("Blog post created successfully!");
      }
      navigate("/blog");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to leave? Changes will be lost.")) navigate("/blog");
  };

  const isLoading = creating || updating || loadingBlog;

  if (isEdit && loadingBlog) {
    return <div style={{ padding: 40, textAlign: "center" }}><PageHeader title="Loading Blog Post..." /></div>;
  }

  if (isEdit && fetchError) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <PageHeader title="Error Loading Blog Post" />
        <p style={{ color: "red", marginBottom: 20 }}>Could not fetch the blog post. Please try again.</p>
        <Btn onClick={() => navigate("/blog")}>Go Back</Btn>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? "Edit Blog Post" : "Create Blog Post"}
        subtitle={isEdit ? "Update this article's content" : "Add a new insight / article"}
      />

      <div className="wizard">
        <div className="wizard-steps">
          {STEPS.map((item, i) => (
            <button key={item} type="button" className="wizard-step-item" onClick={() => setStep(i)} disabled={isLoading}>
              <div className={`wizard-circle ${step === i ? "active" : ""}`}>{i + 1}</div>
              <span className={`wizard-label ${step === i ? "active" : ""}`}>{item}</span>
              {i !== STEPS.length - 1 && <div className="wizard-line" />}
            </button>
          ))}
        </div>

        <div className="wizard-content">
          <h2 className="wizard-title">Step {step + 1}: {STEPS[step]}</h2>

          <div style={{ marginTop: 30 }}>
            {step === 0 && <BlogBasicInfoStep form={form} setForm={setForm} />}
            {step === 1 && <BlogHeroStep form={form} setForm={setForm} />}
            {step === 2 && <BlogContentStep form={form} setForm={setForm} />}
            {step === 3 && <BlogSeoStep form={form} setForm={setForm} />}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="secondary" disabled={step === 0 || isLoading} onClick={() => setStep((s) => s - 1)}>Previous</Btn>
              {!isLoading && <Btn variant="secondary" onClick={handleCancel}>Cancel</Btn>}
            </div>

            {step < STEPS.length - 1 ? (
              <Btn onClick={() => setStep((s) => s + 1)} disabled={isLoading}>Next</Btn>
            ) : (
              <Btn loading={isLoading} onClick={handleSubmit} disabled={isLoading}>{isEdit ? "Update Post" : "Create Post"}</Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
