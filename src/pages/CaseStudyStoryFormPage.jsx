import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageHeader, Btn } from "../components/ui/UI";
import "./ServiceFormPage.css";

import { useGetCaseStudyCategoriesQuery } from "../features/caseStudies/caseStudyCategoriesApi";
import {
  useCreateCaseStudyStoryMutation,
  useUpdateCaseStudyStoryMutation,
  useGetCaseStudyStoryBySlugAdminQuery,
  useGetCaseStudyStoriesQuery,
} from "../features/caseStudies/caseStudyStoriesApi";

import StoryBasicInfoStep from "../components/caseStudies/story/StoryBasicInfoStep";
import StoryHeroStep from "../components/caseStudies/story/StoryHeroStep";
import StorySituationApproachStep from "../components/caseStudies/story/StorySituationApproachStep";
import StoryResultsStep from "../components/caseStudies/story/StoryResultsStep";
import StoryPlatformsStep from "../components/caseStudies/story/StoryPlatformsStep";
import StoryTransfersStep from "../components/caseStudies/story/StoryTransfersStep";
import StorySourcingCtaStep from "../components/caseStudies/story/StorySourcingCtaStep";
import StoryRelatedSeoStep from "../components/caseStudies/story/StoryRelatedSeoStep";

const EMPTY_FORM = {
  title: "",
  parentCategory: "",
  organization: "",
  country: "",
  tags: [],
  breadcrumbs: [],
  subNavigation: [],

  hero: {
    eyebrow: "", title: "", subtitle: "",
    primaryButton: { label: "", link: "" },
    secondaryButton: { label: "", link: "" },
    glanceTitle: "", glance: [], stats: [],
  },

  situation: { eyebrow: "", title: "", paragraphs: [] },
  approach: { eyebrow: "", title: "", paragraphs: [] },

  results: { eyebrow: "", title: "", description: "", metrics: [], changesTitle: "", outcomes: [] },

  platforms: { eyebrow: "", title: "", items: [] },

  transfers: {
    eyebrow: "", title: "", description: "",
    warningTitle: "", warningDescription: "",
    approachTitle: "", process: [],
  },

  sourcing: { eyebrow: "", title: "", paragraphs: [], summary: "" },

  cta: {
    title: "", description: "",
    primaryButton: { label: "", link: "" },
    secondaryButton: { label: "", link: "" },
    note: "",
  },

  relatedStoriesTitle: "",
  relatedStories: [],

  seo: { title: "", description: "", keywords: [] },

  status: "published",
};

const STEPS = [
  "Basic Info",
  "Hero",
  "Situation & Approach",
  "Results",
  "Platforms",
  "What Transfers",
  "Sourcing & CTA",
  "Related & SEO",
];

// Strip the `story` field down to a plain ObjectId string (relatedStories.story
// arrives populated from the API when editing; the backend expects an id on save).
function normalizeRelated(relatedStories = []) {
  return relatedStories.map((r) => ({
    story: typeof r.story === "object" && r.story !== null ? r.story._id : r.story || "",
    title: r.title || "",
    slug: r.slug || "",
    category: r.category || "",
  }));
}

export default function CaseStudyStoryFormPage() {
  const { slug } = useParams();
  const isEdit = Boolean(slug);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: categoriesData } = useGetCaseStudyCategoriesQuery();
  const categories = categoriesData?.data || [];

  const { data: allStoriesData } = useGetCaseStudyStoriesQuery({});
  const allStories = allStoriesData?.data || [];

  const {
    data: storyData,
    isLoading: loadingStory,
    error: fetchError,
  } = useGetCaseStudyStoryBySlugAdminQuery(slug, {
    skip: !isEdit,
    refetchOnMountOrArgChange: true,
  });

  const [createStory, { isLoading: creating }] = useCreateCaseStudyStoryMutation();
  const [updateStory, { isLoading: updating }] = useUpdateCaseStudyStoryMutation();

  useEffect(() => {
    if (!storyData?.data) return;
    const s = storyData.data;

    setForm({
      title: s.title || "",
      parentCategory: s.parentCategory?._id || s.parentCategory || "",
      organization: s.organization || "",
      country: s.country || "",
      tags: s.tags || [],
      breadcrumbs: s.breadcrumbs || [],
      subNavigation: s.subNavigation || [],

      hero: { ...EMPTY_FORM.hero, ...s.hero },
      situation: { ...EMPTY_FORM.situation, ...s.situation },
      approach: { ...EMPTY_FORM.approach, ...s.approach },
      results: { ...EMPTY_FORM.results, ...s.results },
      platforms: { ...EMPTY_FORM.platforms, ...s.platforms },
      transfers: { ...EMPTY_FORM.transfers, ...s.transfers },
      sourcing: { ...EMPTY_FORM.sourcing, ...s.sourcing },
      cta: { ...EMPTY_FORM.cta, ...s.cta },

      relatedStoriesTitle: s.relatedStoriesTitle || "",
      relatedStories: normalizeRelated(s.relatedStories),

      seo: { ...EMPTY_FORM.seo, ...s.seo },
      status: s.status || "published",
    });
  }, [storyData]);

  const handleSubmit = async () => {
    if (!form.title) {
      alert("Title is required.");
      setStep(0);
      return;
    }
    try {
      const body = { ...form, relatedStories: normalizeRelated(form.relatedStories) };
      // Drop empty parentCategory so Mongoose doesn't try to cast "" to an ObjectId
      if (!body.parentCategory) delete body.parentCategory;

      if (isEdit) {
        await updateStory({ id: storyData?.data?._id, ...body }).unwrap();
        alert("Story updated successfully!");
      } else {
        await createStory(body).unwrap();
        alert("Story created successfully!");
      }
      navigate("/case-study-stories");
    } catch (error) {
      console.error("Story form submission error:", error);
      const errorMessage = error?.data?.message || error?.error || "Something went wrong. Please try again.";
      alert(errorMessage);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to leave? Changes will be lost.")) {
      navigate("/case-study-stories");
    }
  };

  const isLoading = creating || updating || loadingStory;

  if (isEdit && loadingStory) {
    return (
      <div className="loading-container" style={{ padding: "40px", textAlign: "center" }}>
        <PageHeader title="Loading Story..." />
        <p>Please wait while we fetch the story data...</p>
      </div>
    );
  }

  if (isEdit && fetchError) {
    return (
      <div className="error-container" style={{ padding: "40px", textAlign: "center" }}>
        <PageHeader title="Error Loading Story" />
        <p style={{ color: "red", marginBottom: "20px" }}>Could not fetch the story data. Please try again.</p>
        <Btn onClick={() => navigate("/case-study-stories")}>Go Back</Btn>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? "Edit Case Study Story" : "Create Case Study Story"}
        subtitle={isEdit ? "Update this story's content" : "Add a new full case study story"}
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
            {step === 0 && <StoryBasicInfoStep form={form} setForm={setForm} categories={categories} disabled={isLoading} />}
            {step === 1 && <StoryHeroStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 2 && <StorySituationApproachStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 3 && <StoryResultsStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 4 && <StoryPlatformsStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 5 && <StoryTransfersStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 6 && <StorySourcingCtaStep form={form} setForm={setForm} disabled={isLoading} />}
            {step === 7 && (
              <StoryRelatedSeoStep
                form={form}
                setForm={setForm}
                allStories={allStories}
                currentId={storyData?.data?._id}
                disabled={isLoading}
              />
            )}
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
                {isEdit ? "Update Story" : "Create Story"}
              </Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
