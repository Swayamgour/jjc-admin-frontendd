import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageHeader, Btn } from "../components/ui/UI";
import "./ServiceFormPage.css";

import {
  useCreateGuideMutation,
  useUpdateGuideMutation,
  useGetGuideByIdQuery,
} from "../features/guides/guideApi";

import GuideBasicInfoStep from "../components/guides/steps/GuideBasicInfoStep";
import GuideHeroStep from "../components/guides/steps/GuideHeroStep";
import GuideWhyStep from "../components/guides/steps/GuideWhyStep";
import GuidePrerequisitesConceptsStep from "../components/guides/steps/GuidePrerequisitesConceptsStep";
import GuideConfigStep from "../components/guides/steps/GuideConfigStep";
import GuideVerifyPitfallsStep from "../components/guides/steps/GuideVerifyPitfallsStep";
import GuideChecklistCtaSeoStep from "../components/guides/steps/GuideChecklistCtaSeoStep";

const EMPTY_FORM = {
  title: "", slug: "", description: "",
  platform: "", service: "", industry: "", level: "", icon: "chart",
  readTime: "", publishedAt: "",

  eyebrow: "", keyPractices: [],
  ctaPrimary: { text: "Get help with this", link: "/contact" },
  ctaSecondary: { text: "Skip to configuration", link: "#config" },
  typicalEffort: "", writtenFor: "",

  businessSummaryHeading: "If you own the outcome", businessSummary: "",
  technicalSummaryHeading: "If you have to build it", technicalSummary: "",
  problemHeading: "The problem this solves", problemParagraphs: [],

  prerequisites: [],

  conceptsHeading: "The concepts worth understanding first", conceptsLede: "", concepts: [],

  configHeading: "Step by step", configLede: "", configSteps: [],

  verifySteps: [],

  bestPracticeHeading: "What we do on every engagement of this type", bestPractices: [],

  pitfallsHeading: "What catches most first attempts", pitfallsLede: "", pitfalls: [],

  checklistTitle: "Completion checklist", checklistItems: [],

  ctaHeading: "Want a second pair of eyes?", ctaText: "",
  ctaBandPrimary: { text: "Request a consultation", link: "/contact" },
  ctaBandSecondary: { text: "", link: "" },

  isPublished: true, author: "JJC Systems", seoTitle: "", seoDescription: "",
};

const STEPS = [
  "Basic Info", "Hero", "Why This Matters", "Prerequisites & Concepts",
  "Configuration", "Verify & Pitfalls", "Checklist, CTA & SEO",
];

export default function GuideFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: guideData, isLoading: loadingGuide, error: fetchError } = useGetGuideByIdQuery(id, { skip: !isEdit });

  const [createGuide, { isLoading: creating }] = useCreateGuideMutation();
  const [updateGuide, { isLoading: updating }] = useUpdateGuideMutation();

  useEffect(() => {
    if (!guideData?.data) return;
    const g = guideData.data;
    setForm({ ...EMPTY_FORM, ...g, publishedAt: g.publishedAt ? g.publishedAt.slice(0, 10) : "" });
  }, [guideData]);

  const handleSubmit = async () => {
    if (!form.title || !form.platform || !form.service || !form.industry || !form.level) {
      alert("Title, Platform, Service, Industry and Level are required.");
      setStep(0);
      return;
    }
    try {
      const body = { ...form };
      if (!body.publishedAt) delete body.publishedAt;

      if (isEdit) {
        await updateGuide({ id, ...body }).unwrap();
        alert("Guide updated successfully!");
      } else {
        await createGuide(body).unwrap();
        alert("Guide created successfully!");
      }
      navigate("/guides");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to leave? Changes will be lost.")) navigate("/guides");
  };

  const isLoading = creating || updating || loadingGuide;

  if (isEdit && loadingGuide) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <PageHeader title="Loading Guide..." />
      </div>
    );
  }

  if (isEdit && fetchError) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <PageHeader title="Error Loading Guide" />
        <p style={{ color: "red", marginBottom: 20 }}>Could not fetch the guide. Please try again.</p>
        <Btn onClick={() => navigate("/guides")}>Go Back</Btn>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? "Edit Guide" : "Create Guide"}
        subtitle={isEdit ? "Update this guide's content" : "Add a new configuration guide"}
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
            {step === 0 && <GuideBasicInfoStep form={form} setForm={setForm} />}
            {step === 1 && <GuideHeroStep form={form} setForm={setForm} />}
            {step === 2 && <GuideWhyStep form={form} setForm={setForm} />}
            {step === 3 && <GuidePrerequisitesConceptsStep form={form} setForm={setForm} />}
            {step === 4 && <GuideConfigStep form={form} setForm={setForm} />}
            {step === 5 && <GuideVerifyPitfallsStep form={form} setForm={setForm} />}
            {step === 6 && <GuideChecklistCtaSeoStep form={form} setForm={setForm} />}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="secondary" disabled={step === 0 || isLoading} onClick={() => setStep((s) => s - 1)}>Previous</Btn>
              {!isLoading && <Btn variant="secondary" onClick={handleCancel}>Cancel</Btn>}
            </div>

            {step < STEPS.length - 1 ? (
              <Btn onClick={() => setStep((s) => s + 1)} disabled={isLoading}>Next</Btn>
            ) : (
              <Btn loading={isLoading} onClick={handleSubmit} disabled={isLoading}>{isEdit ? "Update Guide" : "Create Guide"}</Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
