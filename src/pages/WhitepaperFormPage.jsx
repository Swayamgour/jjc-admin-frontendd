import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageHeader, Btn } from "../components/ui/UI";
import "./ServiceFormPage.css";

import {
  useCreateWhitepaperMutation,
  useUpdateWhitepaperMutation,
  useGetWhitepaperByIdQuery,
} from "../features/whitepapers/whitepaperApi";

import WhitepaperBasicInfoStep from "../components/whitepapers/steps/WhitepaperBasicInfoStep";
import WhitepaperHeroStep from "../components/whitepapers/steps/WhitepaperHeroStep";
import WhitepaperAbstractFindingsStep from "../components/whitepapers/steps/WhitepaperAbstractFindingsStep";
import WhitepaperAnalysisStep from "../components/whitepapers/steps/WhitepaperAnalysisStep";
import WhitepaperFrameworkStep from "../components/whitepapers/steps/WhitepaperFrameworkStep";
import WhitepaperImplicationsReferencesStep from "../components/whitepapers/steps/WhitepaperImplicationsReferencesStep";
import WhitepaperCtaSeoStep from "../components/whitepapers/steps/WhitepaperCtaSeoStep";

const EMPTY_FORM = {
  title: "", slug: "", description: "", subtitle: "",
  platform: "", service: "", industry: "", icon: "chart",
  pages: 10, readTime: "", publishedAt: "",

  eyebrow: "", inThisPaper: [],
  ctaPrimary: { text: "Discuss this paper", link: "/contact" },
  ctaSecondary: { text: "Jump to the findings", link: "#findings" },

  abstractHeading: "", abstractParagraphs: [],

  findingsHeading: "Four things this paper argues",
  findingsLede: "If you read nothing else, read these. The analysis that follows sets out the evidence for each.",
  findings: [],

  analysisHeading: "The argument in full", analysisBody: "",

  frameworkHeading: "Something you can apply without us", frameworkLede: "",
  frameworkName: "", frameworkDescription: "", frameworkStages: [],

  implicationsHeading: "What this means, depending on your seat", implicationsLede: "", implications: [],

  referencesHeading: "Where to check this for yourself", referencesLede: "", references: [], referencesNote: "",

  ctaHeading: "Recognise the situation?", ctaText: "",
  ctaBandPrimary: { text: "Discuss this paper", link: "/contact" },
  ctaBandSecondary: { text: "Run the related checklist", link: "/checklists" },

  isPublished: true, author: "JJC Systems", seoTitle: "", seoDescription: "",
};

const STEPS = [
  "Basic Info", "Hero", "Abstract & Findings", "Analysis",
  "Framework", "Implications & References", "CTA & SEO",
];

export default function WhitepaperFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: wpData, isLoading: loadingWp, error: fetchError } = useGetWhitepaperByIdQuery(id, { skip: !isEdit });

  const [createWhitepaper, { isLoading: creating }] = useCreateWhitepaperMutation();
  const [updateWhitepaper, { isLoading: updating }] = useUpdateWhitepaperMutation();

  useEffect(() => {
    if (!wpData?.data) return;
    const w = wpData.data;
    setForm({ ...EMPTY_FORM, ...w, publishedAt: w.publishedAt ? w.publishedAt.slice(0, 10) : "" });
  }, [wpData]);

  const handleSubmit = async () => {
    if (!form.title || !form.platform || !form.service || !form.industry) {
      alert("Title, Platform, Service and Industry are required.");
      setStep(0);
      return;
    }
    try {
      const body = { ...form };
      if (!body.publishedAt) delete body.publishedAt;

      if (isEdit) {
        await updateWhitepaper({ id, ...body }).unwrap();
        alert("Whitepaper updated successfully!");
      } else {
        await createWhitepaper(body).unwrap();
        alert("Whitepaper created successfully!");
      }
      navigate("/whitepapers");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to leave? Changes will be lost.")) navigate("/whitepapers");
  };

  const isLoading = creating || updating || loadingWp;

  if (isEdit && loadingWp) {
    return <div style={{ padding: 40, textAlign: "center" }}><PageHeader title="Loading Whitepaper..." /></div>;
  }

  if (isEdit && fetchError) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <PageHeader title="Error Loading Whitepaper" />
        <p style={{ color: "red", marginBottom: 20 }}>Could not fetch the whitepaper. Please try again.</p>
        <Btn onClick={() => navigate("/whitepapers")}>Go Back</Btn>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? "Edit Whitepaper" : "Create Whitepaper"}
        subtitle={isEdit ? "Update this whitepaper's content" : "Add a new whitepaper"}
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
            {step === 0 && <WhitepaperBasicInfoStep form={form} setForm={setForm} />}
            {step === 1 && <WhitepaperHeroStep form={form} setForm={setForm} />}
            {step === 2 && <WhitepaperAbstractFindingsStep form={form} setForm={setForm} />}
            {step === 3 && <WhitepaperAnalysisStep form={form} setForm={setForm} />}
            {step === 4 && <WhitepaperFrameworkStep form={form} setForm={setForm} />}
            {step === 5 && <WhitepaperImplicationsReferencesStep form={form} setForm={setForm} />}
            {step === 6 && <WhitepaperCtaSeoStep form={form} setForm={setForm} />}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="secondary" disabled={step === 0 || isLoading} onClick={() => setStep((s) => s - 1)}>Previous</Btn>
              {!isLoading && <Btn variant="secondary" onClick={handleCancel}>Cancel</Btn>}
            </div>

            {step < STEPS.length - 1 ? (
              <Btn onClick={() => setStep((s) => s + 1)} disabled={isLoading}>Next</Btn>
            ) : (
              <Btn loading={isLoading} onClick={handleSubmit} disabled={isLoading}>{isEdit ? "Update Whitepaper" : "Create Whitepaper"}</Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
