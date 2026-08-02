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

import PageBasicInfoStep from "../components/caseStudies/page/PageBasicInfoStep";
import PageHeroSectionStep from "../components/caseStudies/page/PageHeroSectionStep";
import PageSuccessStoriesStep from "../components/caseStudies/page/PageSuccessStoriesStep";
import PageRelatedCapabilitiesStep from "../components/caseStudies/page/PageRelatedCapabilitiesStep";
import PageCtaSeoStep from "../components/caseStudies/page/PageCtaSeoStep";

const EMPTY_FORM = {
  name: "",
  sourceType: "industry",
  parentSlug: "",
  status: "published",
  heroImage: null,

  heroSection: {
    breadcrumb: [],
    eyebrow: "",
    title: "",
    description: "",
    buttons: [],
    glance: { title: "", items: [] },
    stats: [],
  },

  successStories: {
    eyebrow: "",
    title: "",
    description: "",
    stories: [],
    disclaimer: { title: "", description: "" },
  },

  relatedCapabilities: {
    eyebrow: "",
    title: "",
    items: [],
  },

  ctaSection: {
    title: "",
    description: "",
    buttons: [],
    note: "",
  },

  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    canonicalUrl: "",
  },
};

const STEPS = [
  "Basic Info",
  "Hero Section",
  "Success Stories",
  "Related Capabilities",
  "CTA & SEO",
];

export default function CaseStudyFormPage() {
  const { slug } = useParams();
  const isEdit = Boolean(slug);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: categoriesData } = useGetCaseStudyCategoriesQuery();
  const categories = categoriesData?.data || [];

  // console.log(slug)

  // Admin lookup — returns the raw doc regardless of published/draft status
  const {
    data: caseStudyData,
    isLoading: loadingCaseStudy,
    error: fetchError,
  } = useGetCaseStudyBySlugAdminQuery(slug, {
    skip: !isEdit,
    refetchOnMountOrArgChange: true,
  });

  console.log({
    loadingCaseStudy,
    fetchError,
    caseStudyData,
  });

  const [createCaseStudy, { isLoading: creating }] = useCreateCaseStudyMutation();
  const [updateCaseStudy, { isLoading: updating }] = useUpdateCaseStudyMutation();

  // Populate form with fetched data
  useEffect(() => {
    if (!caseStudyData?.data) return;
    const cs = caseStudyData.data;

    setForm({
      name: cs.name || "",
      sourceType: cs.sourceType || "industry",
      parentSlug: cs.parent?.slug || "",
      status: cs.status || "published",
      heroImage: cs.heroImage || null,

      heroSection: {
        ...EMPTY_FORM.heroSection,
        ...cs.heroSection,
        glance: { ...EMPTY_FORM.heroSection.glance, ...cs.heroSection?.glance },
      },

      successStories: {
        ...EMPTY_FORM.successStories,
        ...cs.successStories,
        disclaimer: { ...EMPTY_FORM.successStories.disclaimer, ...cs.successStories?.disclaimer },
      },

      relatedCapabilities: { ...EMPTY_FORM.relatedCapabilities, ...cs.relatedCapabilities },
      ctaSection: { ...EMPTY_FORM.ctaSection, ...cs.ctaSection },
      seo: { ...EMPTY_FORM.seo, ...cs.seo },
    });
  }, [caseStudyData]);

  // Handle form submission (Create or Update)
  const handleSubmit = async () => {
    if (!form.name) {
      alert("Name is required.");
      setStep(0);
      return;
    }
    if (!form.parentSlug) {
      alert("Please select a parent category.");
      setStep(0);
      return;
    }

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

  console.log(isEdit, fetchError)

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
        subtitle={isEdit ? "Update case study details" : "Add a new case study listing page"}
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
            {step === 0 && <PageBasicInfoStep form={form} setForm={setForm} categories={categories} disabled={isLoading} />}
            {step === 1 && <PageHeroSectionStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 2 && <PageSuccessStoriesStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 3 && <PageRelatedCapabilitiesStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 4 && <PageCtaSeoStep form={form} setForm={setForm} disabled={isLoading} />}
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
