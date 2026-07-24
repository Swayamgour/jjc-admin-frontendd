import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageHeader, Btn } from "../components/ui/UI";
import "./ServiceFormPage.css";

import { useGetCaseStudyCategoriesQuery } from "../features/caseStudies/caseStudyCategoriesApi";
import {
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  useGetCaseStudiesBySlugQuery,
} from "../features/caseStudies/caseStudiesApi";

import { buildCaseStudyFormData } from "../utils/buildCaseStudyFormData";

import CaseStudyBasicInfoStep from "../components/caseStudies/CaseStudyBasicInfoStep";
import CaseStudyHeroStep from "../components/caseStudies/CaseStudyHeroStep";
import CaseStudyClientInfoStep from "../components/caseStudies/CaseStudyClientInfoStep";
import CaseStudyOverviewStep from "../components/caseStudies/CaseStudyOverviewStep";
import CaseStudyListBlockStep from "../components/caseStudies/CaseStudyListBlockStep";
import CaseStudyApproachStep from "../components/caseStudies/CaseStudyApproachStep";
import CaseStudyResultsStep from "../components/caseStudies/CaseStudyResultsStep";
import CaseStudyTechnologiesStep from "../components/caseStudies/CaseStudyTechnologiesStep";
import CaseStudyBeforeAfterStep from "../components/caseStudies/CaseStudyBeforeAfterStep";
import CaseStudyTestimonialStep from "../components/caseStudies/CaseStudyTestimonialStep";
import CaseStudyGalleryStep from "../components/caseStudies/CaseStudyGalleryStep";
import CaseStudyFaqStep from "../components/caseStudies/CaseStudyFaqStep";
import CaseStudyResourcesStep from "../components/caseStudies/CaseStudyResourcesStep";

const EMPTY_FORM = {
  title: "",
  sourceType: "industry",
  parent: "",
  description: "",
  ctaLabel: "",
  ctaLink: "",

  heroImage: null,
  techBadges: [],
  heroStats: [],

  clientInfo: [],

  overview: { tag: "", heading: "", intro: "", highlights: [] },
  challenge: { heading: "", intro: "", items: [] },
  solution: { heading: "", intro: "", items: [] },
  approach: { heading: "", steps: [] },
  results: { heading: "", stats: [], closing: "" },
  technologies: { heading: "", items: [] },
  beforeAfter: { before: [], after: [] },
  testimonial: { quote: "", author: "", role: "", image: null },
  gallery: [],
  faqs: [],
  resources: {
    heading: "",
    description: "",
    downloadLabel: "",
    downloadLink: "",
    secondaryLabel: "",
    secondaryLink: "",
  },
};

const STEPS = [
  "Basic Info",
  "Hero",
  "Client Info",
  "Overview",
  "Challenge",
  "Solution",
  "Approach",
  "Results",
  "Technologies",
  "Before / After",
  "Testimonial",
  "Gallery",
  "FAQs",
  "Resources",
];

export default function CaseStudyFormPage() {
  const { slug } = useParams();
  const isEdit = Boolean(slug);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: categoriesData } = useGetCaseStudyCategoriesQuery();
  const categories = categoriesData?.data || [];

  // Fetch case study data for edit mode
  const {
    data: caseStudyData,
    isLoading: loadingCaseStudy,
    error: fetchError,
  } = useGetCaseStudiesBySlugQuery(slug, {
    skip: !isEdit,
    refetchOnMountOrArgChange: true
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
      ctaLabel: cs.ctaLabel || "",
      ctaLink: cs.ctaLink || "",

      heroImage: cs.heroImage || null,
      techBadges: cs.techBadges || [],
      heroStats: cs.heroStats || [],

      clientInfo: cs.clientInfo || [],

      overview: {
        ...EMPTY_FORM.overview,
        ...cs.overview,
      },
      challenge: {
        ...EMPTY_FORM.challenge,
        ...cs.challenge,
      },
      solution: {
        ...EMPTY_FORM.solution,
        ...cs.solution,
      },
      approach: {
        ...EMPTY_FORM.approach,
        ...cs.approach,
      },
      results: {
        ...EMPTY_FORM.results,
        ...cs.results,
      },
      technologies: {
        ...EMPTY_FORM.technologies,
        ...cs.technologies,
      },
      beforeAfter: {
        ...EMPTY_FORM.beforeAfter,
        ...cs.beforeAfter,
      },
      testimonial: {
        ...EMPTY_FORM.testimonial,
        ...cs.testimonial,
      },
      gallery: cs.gallery || [],
      faqs: cs.faqs || [],
      resources: {
        ...EMPTY_FORM.resources,
        ...cs.resources,
      },
    });
  }, [caseStudyData]);

  // Handle form submission (Create or Update)
  const handleSubmit = async () => {
    try {
      const formData = buildCaseStudyFormData(form);

      if (isEdit) {
        console.log('start', slug, formData)
        // ✅ CORRECT: Pass slug and body separately
        const result = await updateCaseStudy({
          id: caseStudyData?.data?._id,        // The slug from URL params
          body: formData      // The form data to update
        }).unwrap();
        console.log('end', result)


        console.log("Update successful:", result);
        alert("Case study updated successfully!");
      } else {
        // CREATE: Pass only form data
        const result = await createCaseStudy(formData).unwrap();
        console.log("Create successful:", result);
        alert("Case study created successfully!");
      }

      // Navigate back to list page
      navigate("/case-studies");
    } catch (error) {
      console.error("Form submission error:", error);

      // Show specific error message
      const errorMessage = error?.data?.message ||
        error?.error ||
        "Something went wrong. Please try again.";

      alert(errorMessage);
    }
  };

  // Handle form discard/cancel
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to leave? Changes will be lost.")) {
      navigate("/case-studies");
    }
  };

  const isLoading = creating || updating || loadingCaseStudy;

  // Show loading state for edit mode
  if (isEdit && loadingCaseStudy) {
    return (
      <div className="loading-container" style={{ padding: "40px", textAlign: "center" }}>
        <PageHeader title="Loading Case Study..." />
        <p>Please wait while we fetch the case study data...</p>
      </div>
    );
  }

  // Show error state for edit mode
  if (isEdit && fetchError) {
    return (
      <div className="error-container" style={{ padding: "40px", textAlign: "center" }}>
        <PageHeader title="Error Loading Case Study" />
        <p style={{ color: "red", marginBottom: "20px" }}>
          Could not fetch the case study data. Please try again.
        </p>
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
            <button
              key={item}
              type="button"
              className="wizard-step-item"
              onClick={() => setStep(i)}
              disabled={isLoading}
            >
              <div className={`wizard-circle ${step === i ? "active" : ""}`}>
                {i + 1}
              </div>
              <span className={`wizard-label ${step === i ? "active" : ""}`}>
                {item}
              </span>
              {i !== STEPS.length - 1 && <div className="wizard-line" />}
            </button>
          ))}
        </div>

        <div className="wizard-content">
          <h2 className="wizard-title">Step {step + 1}: {STEPS[step]}</h2>

          <div style={{ marginTop: 30 }}>
            {step === 0 && (
              <CaseStudyBasicInfoStep
                form={form}
                setForm={setForm}
                categories={categories}
                disabled={isLoading}
              />
            )}
            {step === 1 && (
              <CaseStudyHeroStep
                form={form}
                setForm={setForm}
                disabled={isLoading}
              />
            )}
            {step === 2 && (
              <CaseStudyClientInfoStep
                form={form}
                setForm={setForm}
                disabled={isLoading}
              />
            )}
            {step === 3 && (
              <CaseStudyOverviewStep
                form={form}
                setForm={setForm}
                disabled={isLoading}
              />
            )}
            {step === 4 && (
              <CaseStudyListBlockStep
                form={form}
                setForm={setForm}
                sectionKey="challenge"
                itemsLabel="Challenge Points"
                itemPlaceholder="Legacy on-premise servers with frequent downtime"
                disabled={isLoading}
              />
            )}
            {step === 5 && (
              <CaseStudyListBlockStep
                form={form}
                setForm={setForm}
                sectionKey="solution"
                itemsLabel="Solution Points"
                itemPlaceholder="Migrated to Microsoft 365 and Azure"
                disabled={isLoading}
              />
            )}
            {step === 6 && (
              <CaseStudyApproachStep
                form={form}
                setForm={setForm}
                disabled={isLoading}
              />
            )}
            {step === 7 && (
              <CaseStudyResultsStep
                form={form}
                setForm={setForm}
                disabled={isLoading}
              />
            )}
            {step === 8 && (
              <CaseStudyTechnologiesStep
                form={form}
                setForm={setForm}
                disabled={isLoading}
              />
            )}
            {step === 9 && (
              <CaseStudyBeforeAfterStep
                form={form}
                setForm={setForm}
                disabled={isLoading}
              />
            )}
            {step === 10 && (
              <CaseStudyTestimonialStep
                form={form}
                setForm={setForm}
                disabled={isLoading}
              />
            )}
            {step === 11 && (
              <CaseStudyGalleryStep
                form={form}
                setForm={setForm}
                disabled={isLoading}
              />
            )}
            {step === 12 && (
              <CaseStudyFaqStep
                form={form}
                setForm={setForm}
                disabled={isLoading}
              />
            )}
            {step === 13 && (
              <CaseStudyResourcesStep
                form={form}
                setForm={setForm}
                disabled={isLoading}
              />
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Btn
                variant="secondary"
                disabled={step === 0 || isLoading}
                onClick={() => setStep((s) => s - 1)}
              >
                Previous
              </Btn>

              {!isLoading && (
                <Btn
                  variant="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Btn>
              )}
            </div>

            {step < STEPS.length - 1 ? (
              <Btn
                onClick={() => setStep((s) => s + 1)}
                disabled={isLoading}
              >
                Next
              </Btn>
            ) : (
              <Btn
                loading={isLoading}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isEdit ? "Update Case Study" : "Create Case Study"}
              </Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}