import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageHeader, Btn } from "../components/ui/UI";
import "./ServiceFormPage.css";

import {
  useCreateChecklistMutation,
  useUpdateChecklistMutation,
  useGetChecklistByIdQuery,
} from "../features/checklists/checklistApi";

import ChecklistBasicInfoStep from "../components/checklists/steps/ChecklistBasicInfoStep";
import ChecklistHeroStep from "../components/checklists/steps/ChecklistHeroStep";
import ChecklistWhyStep from "../components/checklists/steps/ChecklistWhyStep";
import ChecklistSectionsStep from "../components/checklists/steps/ChecklistSectionsStep";
import ChecklistScoreStep from "../components/checklists/steps/ChecklistScoreStep";
import ChecklistGapsCtaStep from "../components/checklists/steps/ChecklistGapsCtaStep";

const EMPTY_FORM = {
  title: "", slug: "", description: "",
  platform: "", service: "", industry: "", badge: "", icon: "chart", difficulty: "Advanced",
  publishedAt: "",

  eyebrow: "",
  ctaPrimary: { text: "Start the checklist", link: "#checklist" },
  ctaSecondary: { text: "Get help with the gaps", link: "/contact" },
  beforeYouStart: [],

  typicalEffort: "", writtenFor: "",

  whyHeading: "What this checklist is for", whyParagraphs: [], runWith: [],

  checklistHeading: "", checklistLede: "", sections: [],

  scoreHeading: "Read this against the number above", scoreLede: "",
  scoreBands: [
    { min: 0, max: 59, label: "Significant gaps", description: "" },
    { min: 60, max: 84, label: "Mostly ready, with known gaps", description: "" },
    { min: 85, max: 100, label: "Ready", description: "" },
  ],
  scoreNote: "Your score highlights automatically as you tick items above. Nothing is saved, sent or tracked — refreshing the page clears it.",

  gapsHeading: "If you could not tick these, start here", gapsLede: "", gapCards: [],

  ctaHeading: "Want a second opinion on your score?", ctaText: "",
  ctaBandPrimary: { text: "Talk through your result", link: "/contact" },
  ctaBandSecondary: { text: "Read the related guides", link: "/guides" },

  isPublished: true, author: "JJC Systems", seoTitle: "", seoDescription: "",
};

const STEPS = ["Basic Info", "Hero", "Why It Matters", "Checklist Sections", "Score Bands", "Gaps, CTA & SEO"];

export default function ChecklistFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: clData, isLoading: loadingCl, error: fetchError } = useGetChecklistByIdQuery(id, { skip: !isEdit });

  const [createChecklist, { isLoading: creating }] = useCreateChecklistMutation();
  const [updateChecklist, { isLoading: updating }] = useUpdateChecklistMutation();

  useEffect(() => {
    if (!clData?.data) return;
    const c = clData.data;
    setForm({ ...EMPTY_FORM, ...c, publishedAt: c.publishedAt ? c.publishedAt.slice(0, 10) : "" });
  }, [clData]);

  const handleSubmit = async () => {
    if (!form.title || !form.platform || !form.service || !form.industry || !form.badge) {
      alert("Title, Platform, Service, Industry and Badge are required.");
      setStep(0);
      return;
    }
    try {
      const body = { ...form };
      if (!body.publishedAt) delete body.publishedAt;

      if (isEdit) {
        await updateChecklist({ id, ...body }).unwrap();
        alert("Checklist updated successfully!");
      } else {
        await createChecklist(body).unwrap();
        alert("Checklist created successfully!");
      }
      navigate("/checklists");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to leave? Changes will be lost.")) navigate("/checklists");
  };

  const isLoading = creating || updating || loadingCl;

  if (isEdit && loadingCl) {
    return <div style={{ padding: 40, textAlign: "center" }}><PageHeader title="Loading Checklist..." /></div>;
  }

  if (isEdit && fetchError) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <PageHeader title="Error Loading Checklist" />
        <p style={{ color: "red", marginBottom: 20 }}>Could not fetch the checklist. Please try again.</p>
        <Btn onClick={() => navigate("/checklists")}>Go Back</Btn>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? "Edit Checklist" : "Create Checklist"}
        subtitle={isEdit ? "Update this checklist's content" : "Add a new readiness/audit checklist"}
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
            {step === 0 && <ChecklistBasicInfoStep form={form} setForm={setForm} />}
            {step === 1 && <ChecklistHeroStep form={form} setForm={setForm} />}
            {step === 2 && <ChecklistWhyStep form={form} setForm={setForm} />}
            {step === 3 && <ChecklistSectionsStep form={form} setForm={setForm} />}
            {step === 4 && <ChecklistScoreStep form={form} setForm={setForm} />}
            {step === 5 && <ChecklistGapsCtaStep form={form} setForm={setForm} />}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="secondary" disabled={step === 0 || isLoading} onClick={() => setStep((s) => s - 1)}>Previous</Btn>
              {!isLoading && <Btn variant="secondary" onClick={handleCancel}>Cancel</Btn>}
            </div>

            {step < STEPS.length - 1 ? (
              <Btn onClick={() => setStep((s) => s + 1)} disabled={isLoading}>Next</Btn>
            ) : (
              <Btn loading={isLoading} onClick={handleSubmit} disabled={isLoading}>{isEdit ? "Update Checklist" : "Create Checklist"}</Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
