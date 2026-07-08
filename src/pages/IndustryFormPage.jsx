import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageHeader, Btn } from "../components/ui/UI";
import "./ServiceFormPage.css";

// Industry API
import {
	useCreateIndustryMutation,
	useUpdateIndustryMutation,
	useGetIndustryQuery,
} from "../features/industries/industriesApi";

// FormData builder
import { buildIndustryFormData } from "../utils/buildIndustryFormData";

// Industry components
import IndustryBasicInfoStep from "../components/industries/IndustryBasicInfoStep";
import IndustryHeroStep from "../components/industries/IndustryHeroStep";
import ThemeStep from "../components/shared/sections/ThemeStep";
import OverviewStep from "../components/shared/sections/OverviewStep";
import IndustrySolutionsStep from "../components/industries/IndustrySolutionsStep";
import IndustryBenefitsStep from "../components/industries/IndustryBenefitsStep";
import ImplementationProcessStep from "../components/shared/sections/ImplementationProcessStep";
import IndustryTechnologiesStep from "../components/industries/IndustryTechnologiesStep";
import CaseStudiesStep from "../components/shared/sections/CaseStudiesStep";
import FaqStep from "../components/shared/sections/FaqStep";
import CtaStep from "../components/shared/sections/CtaStep";
export default function IndustryFormPage() {
	const { slug } = useParams();
	const isEdit = Boolean(slug);

	const navigate = useNavigate();

	const [step, setStep] = useState(0);

	const steps = [
		"Basic Info",
		"Hero",
		"Theme",
		"Overview",
		"Solutions",
		"Benefits",
		"Implementation",
		"Technologies",
		"Case Studies",
		"FAQs",
		"CTA",
	];

	const [form, setForm] = useState({
		title: "",
		slug: "",
		badge: "",
		breadcrumb: [],
		order: 0,

		hero: {
			description: "",
			subDescription: "",
			heroBadges: [],
			heroImage: null,
		},

		theme: {
			accent: "",
			accentDark: "",
			accentLight: "",
			accentSoft: "",
			heroStart: "",
			heroEnd: "",
			accentRgb: "",
		},

		overview: {
			tag: "",
			title: "",
			brandLabel: "",
			image: null,
			paragraphs: [],
			checklist: [],
		},

		solutions: {
			tag: "",
			title: "",
			subtitle: "",
			bg: "",
			columns: "",
			alignLeft: "",
			items: [],
		},

		benefits: {
			tag: "",
			title: "",
			desc: "",
			visualIcon: "",
			miniIcons: [],
			items: [],
			buttonLabel: "",
		},

		implementationProcess: {
			tag: "",
			title: "",
			subtitle: "",
			steps: [],
		},

		technologies: {
			tag: "",
			title: "",
			subtitle: "",
			columns: "",
			items: [],
			footerLink: "",
		},

		caseStudies: {
			tag: "",
			title: "",
			subtitle: "",
			items: [],
		},

		faqs: {
			tag: "",
			title: "",
			items: [],
		},

		cta: {
			title: "",
			description: "",
			primaryLabel: "",
			secondaryLabel: "",
		},
	});

	const { data: industryData, isLoading: loadingIndustry } =
		useGetIndustryQuery(slug, {
			skip: !isEdit,
		});

	const [createIndustry, { isLoading: creating }] =
		useCreateIndustryMutation();

	const [updateIndustry, { isLoading: updating }] =
		useUpdateIndustryMutation();

	useEffect(() => {
		if (!industryData?.data) return;

		console.log(industryData.data);
		
		const industry = industryData.data;
		

		setForm({
			title: industry.title || "",
			slug: industry.slug || "",
			badge: industry.badge || "",
			breadcrumb: industry.breadcrumb || [],
			order: industry.order || 0,

			hero: {
				description: industry.hero?.description || "",
				subDescription: industry.hero?.subDescription || "",
				heroBadges: industry.hero?.heroBadges || [],
				heroImage: industry.hero?.heroImage || null,
			},

			theme: {
				accent: industry.theme?.accent || "",
				accentDark: industry.theme?.accentDark || "",
				accentLight: industry.theme?.accentLight || "",
				accentSoft: industry.theme?.accentSoft || "",
				heroStart: industry.theme?.heroStart || "",
				heroEnd: industry.theme?.heroEnd || "",
				accentRgb: industry.theme?.accentRgb || "",
			},

			overview: {
				tag: industry.overview?.tag || "",
				title: industry.overview?.title || "",
				brandLabel: industry.overview?.brandLabel || "",
				image: industry.overview?.image || null,
				paragraphs: industry.overview?.paragraphs || [],
				checklist: industry.overview?.checklist || [],
			},

			solutions: {
				tag: industry.solutions?.tag || "",
				title: industry.solutions?.title || "",
				subtitle: industry.solutions?.subtitle || "",
				bg: industry.solutions?.bg || "",
				columns: industry.solutions?.columns || 3,
				alignLeft: industry.solutions?.alignLeft ?? false,
				items: industry.solutions?.items || [],
			},

			benefits: {
				tag: industry.benefits?.tag || "",
				title: industry.benefits?.title || "",
				desc: industry.benefits?.desc || "",
				visualIcon: industry.benefits?.visualIcon || "",
				miniIcons: industry.benefits?.miniIcons || [],
				items: industry.benefits?.items || [],
				buttonLabel: industry.benefits?.buttonLabel || "",
			},

			implementationProcess: {
				tag: industry.implementationProcess?.tag || "",
				title: industry.implementationProcess?.title || "",
				subtitle: industry.implementationProcess?.subtitle || "",
				steps: industry.implementationProcess?.steps || [],
			},

			technologies: {
				tag: industry.technologies?.tag || "",
				title: industry.technologies?.title || "",
				subtitle: industry.technologies?.subtitle || "",
				columns: industry.technologies?.columns || 4,
				items: industry.technologies?.items || [],
				footerLink: industry.technologies?.footerLink || "",
			},

			caseStudies: {
				tag: industry.caseStudies?.tag || "",
				title: industry.caseStudies?.title || "",
				subtitle: industry.caseStudies?.subtitle || "",
				items: industry.caseStudies?.items || [],
			},

			faqs: {
				tag: industry.faqs?.tag || "",
				title: industry.faqs?.title || "",
				items: industry.faqs?.items || [],
			},

			cta: {
				title: industry.cta?.title || "",
				description: industry.cta?.description || "",
				primaryLabel: industry.cta?.primaryLabel || "",
				secondaryLabel: industry.cta?.secondaryLabel || "",
			},
		});
	}, [industryData]);

	const handleSubmit = async () => {
		try {
			const formData = buildIndustryFormData(form);

			if (isEdit) {
				await updateIndustry({
					slug,
					body: formData,
				}).unwrap();

				alert("Industry updated!");
			} else {
				await createIndustry(formData).unwrap();

				alert("Industry created!");
			}

			navigate("/industries");
		} catch (error) {
			console.error(error);
			alert(error?.data?.message || "Something went wrong");
		}
	};

	const isLoading = creating || updating || loadingIndustry;

	return (
		<div>
			<PageHeader
				title={isEdit ? "Edit Industry" : "Create Industry"}
				subtitle={isEdit ? "Update Industry" : "Add a new Industry"}
			/>

			<div className="wizard">
				<div className="wizard-steps">
					{steps.map((item, i) => (
						<button
							key={item}
							type="button"
							className="wizard-step-item"
							onClick={() => setStep(i)}
						>
							<div className={`wizard-circle ${step === i ? "active" : ""}`}>
								{i + 1}
							</div>

							<span className={`wizard-label ${step === i ? "active" : ""}`}>
								{item}
							</span>

							{i !== steps.length - 1 && (
								<div className="wizard-line" />
							)}
						</button>
					))}
				</div>

				<div className="wizard-content">
					{/* <h2>{steps[step]}</h2> */}
					<h2 className="wizard-title">
						Step {step + 1}: {steps[step]}
					</h2>

					<div style={{ marginTop: 30 }}>
						{step === 0 && (
							<IndustryBasicInfoStep form={form} setForm={setForm}/>
						)}

						{step === 1 && (
							<IndustryHeroStep form={form} setForm={setForm} />
						)}

						{step === 2 && (
							<ThemeStep form={form} setForm={setForm} />
						)}

						{step === 3 && (
							<OverviewStep form={form} setForm={setForm} />
						)}

						{step === 4 && (
							<IndustrySolutionsStep form={form} setForm={setForm} />
						)}
            
						{step === 5 && (
							<IndustryBenefitsStep form={form} setForm={setForm}/>
						)}
						
						{step === 6 && (
							<ImplementationProcessStep form={form} setForm={setForm}/>
						)}
						
						{step === 7 && (
							<IndustryTechnologiesStep form={form} setForm={setForm}/>
						)}
						
						{step === 8 && (
							<CaseStudiesStep form={form} setForm={setForm} />
						)}

						{step === 9 && (
							<FaqStep form={form} setForm={setForm}/>
						)}

						{step === 10 && (
							<CtaStep form={form} setForm={setForm}/>
						)} 
					</div>

					<div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
						<Btn variant="secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
							Previous
						</Btn>

						{step < steps.length - 1 ? (
							<Btn onClick={() => setStep((s) => s + 1)}>Next</Btn>
						) : (
							<Btn loading={isLoading} onClick={handleSubmit}>
								{isEdit ? "Update Indusrty" : "Save Industry"}
							</Btn>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
