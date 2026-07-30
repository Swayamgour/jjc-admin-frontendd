import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageHeader, Btn } from "../components/ui/UI";
import "./ServiceFormPage.css";

import { useGetCaseStudyCategoriesQuery } from "../features/caseStudies/caseStudyCategoriesApi";
import {
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  useGetCaseStudyBySlugAdminQuery,
} from "../features/caseStudies/caseStudiesApi";

import { buildCaseStudyFormData } from "../utils/buildCaseStudyFormData";

import CaseStudyBasicInfoStep from "../components/caseStudies/CaseStudyBasicInfoStep";
import CaseStudyHeroStep from "../components/caseStudies/CaseStudyHeroStep";
import CaseStudyGlanceStep from "../components/caseStudies/CaseStudyGlanceStep";
import CaseStudyTextBlockStep from "../components/caseStudies/CaseStudyTextBlockStep";
import CaseStudyResultsStep from "../components/caseStudies/CaseStudyResultsStep";
import CaseStudyPlatformsStep from "../components/caseStudies/CaseStudyPlatformsStep";
import CaseStudyTransfersStep from "../components/caseStudies/CaseStudyTransfersStep";
import CaseStudySourcingStep from "../components/caseStudies/CaseStudySourcingStep";
import CaseStudyGalleryStep from "../components/caseStudies/CaseStudyGalleryStep";

const EMPTY_FORM = {
  title: "",
  sourceType: "industry",
  parent: "",
  description: "",
  industryTag: "",
  capabilityTag: "",
  isGap: false,
  gapNote: "",
  org: { name: "", region: "" },

  heroEyebrow: "",
  heroLede: "",
  heroImage: null,
  heroStats: [],

  glanceItems: [],

  situation: { intro: "", body: "" },
  approachText: { intro: "", body: "" },

  resultsHeading: "What was published",
  resultsLede: "",
  outcomes: [],

  products: [],
  platforms: [],

  transfers: {
    intro: "",
    noteIcon: "i-target",
    noteTitle: "Where it usually gets harder than expected:",
    noteBody: "",
    approachHeading: "",
    steps: [],
  },

  sourcing: { paragraphs: [], shortNote: "" },

  seoKeywords: [],

  gallery: [],
  status: "published",
};

const STEPS = [
  "Basic Info",
  "Hero",
  "At a Glance",
  "The Situation",
  "What Was Done",
  "Results",
  "Platforms",
  "What Transfers",
  "Sourcing",
  "Gallery",
];

export default function CaseStudyFormPage() {
  const { slug } = useParams();
  const isEdit = Boolean(slug);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: categoriesData } = useGetCaseStudyCategoriesQuery();
  const categories = categoriesData?.data || [];

  // Admin lookup — returns the raw doc regardless of published/draft status
  const {
    data: caseStudyData,
    isLoading: loadingCaseStudy,
    error: fetchError,
  } = useGetCaseStudyBySlugAdminQuery(slug, {
    skip: !isEdit,
    refetchOnMountOrArgChange: true,
  });

  const [createCaseStudy, { isLoading: creating }] = useCreateCaseStudyMutation();
  const [updateCaseStudy, { isLoading: updating }] = useUpdateCaseStudyMutation();

  // Populate form with fetched data
  useEffect(() => {
    if (!caseStudyData?.data) return;
    const cs = caseStudyData.data;

    setForm({
      title: cs.title || "",
      sourceType: cs.sourceType || "industry",
      parent: cs.parent?.slug || cs.parent?._id || "",
      description: cs.description || "",
      industryTag: cs.industryTag || "",
      capabilityTag: cs.capabilityTag || "",
      isGap: cs.isGap || false,
      gapNote: cs.gapNote || "",
      org: { ...EMPTY_FORM.org, ...cs.org },

      heroEyebrow: cs.heroEyebrow || "",
      heroLede: cs.heroLede || "",
      heroImage: cs.heroImage || null,
      heroStats: cs.heroStats || [],

      glanceItems: cs.glanceItems || [],

      situation: { ...EMPTY_FORM.situation, ...cs.situation },
      approachText: { ...EMPTY_FORM.approachText, ...cs.approachText },

      resultsHeading: cs.resultsHeading || EMPTY_FORM.resultsHeading,
      resultsLede: cs.resultsLede || "",
      outcomes: cs.outcomes || [],

      products: cs.products || [],
      platforms: cs.platforms || [],

      transfers: { ...EMPTY_FORM.transfers, ...cs.transfers },

      sourcing: { ...EMPTY_FORM.sourcing, ...cs.sourcing },

      seoKeywords: cs.seoKeywords || [],

      gallery: cs.gallery || [],
      status: cs.status || "published",
    });
  }, [caseStudyData]);

  // Handle form submission (Create or Update)
  const handleSubmit = async () => {
    try {
      const formData = buildCaseStudyFormData(form);

      if (isEdit) {
        await updateCaseStudy({
          id: caseStudyData?.data?._id,
          body: formData,
        }).unwrap();
        alert("Case study updated successfully!");
      } else {
        await createCaseStudy(formData).unwrap();
        alert("Case study created successfully!");
      }

      navigate("/case-studies");
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage = error?.data?.message || error?.error || "Something went wrong. Please try again.";
      alert(errorMessage);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to leave? Changes will be lost.")) {
      navigate("/case-studies");
    }
  };

  const isLoading = creating || updating || loadingCaseStudy;

  if (isEdit && loadingCaseStudy) {
    return (
      <div className="loading-container" style={{ padding: "40px", textAlign: "center" }}>
        <PageHeader title="Loading Case Study..." />
        <p>Please wait while we fetch the case study data...</p>
      </div>
    );
  }

  if (isEdit && fetchError) {
    return (
      <div className="error-container" style={{ padding: "40px", textAlign: "center" }}>
        <PageHeader title="Error Loading Case Study" />
        <p style={{ color: "red", marginBottom: "20px" }}>Could not fetch the case study data. Please try again.</p>
        <Btn onClick={() => navigate("/case-studies")}>Go Back</Btn>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? "Edit Case Study" : "Create Case Study"}
        subtitle={isEdit ? "Update case study details" : "Add a new case study to your portfolio"}
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
            {step === 0 && <CaseStudyBasicInfoStep form={form} setForm={setForm} categories={categories} disabled={isLoading} />}
            {step === 1 && <CaseStudyHeroStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 2 && <CaseStudyGlanceStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 3 && (
              <CaseStudyTextBlockStep
                form={form}
                setForm={setForm}
                sectionKey="situation"
                introLabel="Situation — Intro"
                bodyLabel="Situation — Expanded"
                introPlaceholder="Medical records arrived from a wide variety of providers in inconsistent formats..."
                bodyPlaceholder="Records processing is the sort of work that never appears on a strategy slide..."
              />
            )}
            {step === 4 && (
              <CaseStudyTextBlockStep
                form={form}
                setForm={setForm}
                sectionKey="approachText"
                introLabel="What Was Done — Intro"
                bodyLabel="What Was Done — Expanded"
                introPlaceholder="The DevOps team automated intake and processing with Power Automate..."
                bodyPlaceholder="The scale here is what makes it notable..."
              />
            )}
            {step === 5 && <CaseStudyResultsStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 6 && <CaseStudyPlatformsStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 7 && <CaseStudyTransfersStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 8 && <CaseStudySourcingStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 9 && <CaseStudyGalleryStep form={form} setForm={setForm} disabled={isLoading} />}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Btn variant="secondary" disabled={step === 0 || isLoading} onClick={() => setStep((s) => s - 1)}>
                Previous
              </Btn>
              {!isLoading && (
                <Btn variant="secondary" onClick={handleCancel}>
                  Cancel
                </Btn>
              )}
            </div>

            {step < STEPS.length - 1 ? (
              <Btn onClick={() => setStep((s) => s + 1)} disabled={isLoading}>
                Next
              </Btn>
            ) : (
              <Btn loading={isLoading} onClick={handleSubmit} disabled={isLoading}>
                {isEdit ? "Update Case Study" : "Create Case Study"}
              </Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
