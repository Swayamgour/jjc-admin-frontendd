import { useEffect, useState } from "react";
import { PageHeader, Btn, Toast } from "../components/ui/UI";
import HomeHeroStep from "../components/home/HomeHeroStep";
import HomeSectionEditor from "../components/home/HomeSectionEditor";
import { useGetHomeHeroQuery, useUpdateHomeHeroMutation } from "../features/home/homeApi";
import "./ServiceFormPage.css";
import "./HomePageBuilder.css";

const SECTIONS = [
  { key: "whyChooseUs", label: "choose", itemLabel: "Reason" },
  { key: "detailedServices", label: "Detail services", itemLabel: "Reason" },
  { key: "challenges", label: "Challenges", itemLabel: "Challenge" },
  { key: "solutionAreas", label: "Solution Areas", itemLabel: "Solution" },
  { key: "benefits", label: "Benefits", itemLabel: "Benefit" },
  { key: "clientLogos", label: "Client Logos", itemLabel: "Logo" },
  { key: "leadershipTeam", label: "Leadership Team", itemLabel: "Member" },

  { key: "deliveryProcess", label: "Delivery Process", itemLabel: "Step" },


  { key: "testimonials", label: "Testimonials", itemLabel: "Testimonial" },
  { key: "faqs", label: "FAQs", itemLabel: "FAQ" },
];

const TABS = [{ key: "hero", label: "Hero" }, ...SECTIONS];

export default function HomePageBuilder() {
  const [tab, setTab] = useState("hero");

  return (
    <div>
      <PageHeader
        title="Home Page"
        subtitle="Manage every section of the public website's home page"
      />

      <div className="wizard">
        <div className="wizard-steps">
          {TABS.map((t, i) => (
            <button
              key={t.key}
              type="button"
              className="wizard-step-item"
              onClick={() => setTab(t.key)}
            >
              <div className={`wizard-circle ${tab === t.key ? "active" : ""}`}>{i + 1}</div>
              <span className={`wizard-label ${tab === t.key ? "active" : ""}`}>{t.label}</span>
              {i !== TABS.length - 1 && <div className="wizard-line" />}
            </button>
          ))}
        </div>

        <div className="wizard-content">
          <h2 className="wizard-title">
            {TABS.find((t) => t.key === tab)?.label}
          </h2>

          <div style={{ marginTop: 30 }}>
            {tab === "hero" ? (
              <HeroPanel />
            ) : (
              <HomeSectionEditor
                key={tab}
                sectionKey={tab}
                label={SECTIONS.find((s) => s.key === tab)?.label}
                itemLabel={SECTIONS.find((s) => s.key === tab)?.itemLabel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroPanel() {
  const { data, isLoading } = useGetHomeHeroQuery();
  const [updateHero, { isLoading: saving }] = useUpdateHomeHeroMutation();
  const [form, setForm] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!data?.data) return;
    const hero = data.data;
    setForm({
      tag: hero.tag || "",
      title: hero.title || "",
      highlightedText: hero.highlightedText || "",
      description: hero.description || "",
      primaryButtonText: hero.primaryButtonText || "",
      primaryButtonLink: hero.primaryButtonLink || "",
      secondaryButtonText: hero.secondaryButtonText || "",
      secondaryButtonLink: hero.secondaryButtonLink || "",
      image: hero.image || null,
      partners: hero.partners || [],
      floatingCards: hero.floatingCards || [],
    });
  }, [data]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      [
        "tag", "title", "highlightedText", "description",
        "primaryButtonText", "primaryButtonLink",
        "secondaryButtonText", "secondaryButtonLink",
      ].forEach((key) => formData.append(key, form[key] || ""));

      formData.append("partners", JSON.stringify(form.partners || []));
      formData.append("floatingCards", JSON.stringify(form.floatingCards || []));

      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      await updateHero(formData).unwrap();
      setToast({ message: "Hero section saved", type: "success" });
    } catch (err) {
      setToast({ message: err?.data?.message || "Failed to save hero", type: "error" });
    }
  };

  if (isLoading) return <p>Loading hero…</p>;

  return (
    <div>
      <HomeHeroStep form={form} setForm={setForm} />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
        <Btn variant="primary" onClick={handleSave} loading={saving}>
          Save Hero Section
        </Btn>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
