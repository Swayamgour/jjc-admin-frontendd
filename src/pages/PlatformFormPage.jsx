import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageHeader, Btn } from "../components/ui/UI";
import "./ServiceFormPage.css";

// Categories
import { useGetAllItemByCategoryQuery } from "../features/categories/categoryApi";

// Platform API
import {
	useCreatePlatformMutation,
	useUpdatePlatformMutation,
	useGetPlatformQuery,
} from "../features/platforms/platformsApi";

// FormData builder
import { buildPlatformFormData } from "../utils/buildPlatformFormData";

// Platform components
import PlatformBasicInfoStep from "../components/platforms/PlatformBasicInfoStep";
import PlatformHeroStep from "../components/platforms/PlatformHeroStep";
import OverviewStep from "../components/shared/sections/OverviewStep";
import PlatformCapabilitiesStep from "../components/platforms/PlatformCapabilitiesStep";
import PlatformBenefitsStep from "../components/platforms/PlatformBenefitsStep";
import ImplementationProcessStep from "../components/shared/sections/ImplementationProcessStep";
import PlatformIndustriesStep from "../components/platforms/PlatformIndustriesStep";
import PlatformCaseStudiesStep from "../components/platforms/PlatformCaseStudiesStep";
import FaqStep from "../components/shared/sections/FaqStep";
import CtaStep from "../components/shared/sections/CtaStep";
import SeoStep from "../components/shared/sections/SeoStep";
import ThemeStep from "../components/shared/sections/ThemeStep";

export default function PlatformFormPage() {
	const { slug } = useParams();
	const isEdit = Boolean(slug);

	const navigate = useNavigate();

	const [step, setStep] = useState(0);

	const steps = [
		"Basic Info",
		"Hero",
		"Overview",
		"Capabilities",
		"Benefits",
		"Implementation",
		"Industries",
		"Case Studies",
		"FAQs",
		"CTA",
		"Theme",
		"SEO",
	];

	const [form, setForm] = useState({
		title: "",
		slug: "",
		shortDescription: "",
		badge: "",
		breadcrumb: [],
		subCategory: "",
		order: 0,

		hero: {
			heading: "",
			highlightedHeading: "",
			description: "",
			subDescription: "",
			badges: [],
			image: null,
		},

		overview: {
			tag: "",
			title: "",
			brandLabel: "",
			image: null,
			paragraphs: [],
			checklist: [],
		},

		capabilities: {
			tag: "",
			title: "",
			subtitle: "",
			items: [],
		},

		benefits: {
			tag: "",
			title: "",
			description: "",
			buttonLabel: "",
			items: [],
		},

		implementationProcess: {
			tag: "",
			title: "",
			subtitle: "",
			steps: [],
		},

		industries: {
			tag: "",
			title: "",
			subtitle: "",
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

		theme: {
			accent: "",
			accentDark: "",
			accentLight: "",
			accentSoft: "",
			heroStart: "",
			heroEnd: "",
			accentRgb: "",
		},

		seo: {
			metaTitle: "",
			metaDescription: "",
			keywords: [],
			ogImage: "",
			canonicalUrl: "",
		},
	});

	const { data: platformData, isLoading: loadingPlatform } =
		useGetPlatformQuery(slug, {
			skip: !isEdit,
		});

	const { data: categoriesData } = useGetAllItemByCategoryQuery('platforms');

	const categories = categoriesData?.data || [];

	const [createPlatform, { isLoading: creating }] =
		useCreatePlatformMutation();

	const [updatePlatform, { isLoading: updating }] =
		useUpdatePlatformMutation();

	useEffect(() => {
		if (!platformData?.data) return;

		const platform = platformData.data;

		setForm({
			title: platform.title || "",
			slug: platform.slug || "",
			shortDescription: platform.shortDescription || "",
			badge: platform.badge || "",
			breadcrumb: platform.breadcrumb || [],
			subCategory: platform.subCategory || "",
			order: platform.order || 0,

			hero: {
				heading: platform.hero?.heading || "",
				highlightedHeading: platform.hero?.highlightedHeading || "",
				description: platform.hero?.description || "",
				subDescription: platform.hero?.subDescription || "",
				badges: platform.hero?.badges || [],
				image: platform.hero?.image || null,
			},

			overview: {
				tag: platform.overview?.tag || "",
				title: platform.overview?.title || "",
				brandLabel: platform.overview?.brandLabel || "",
				image: platform.overview?.image || null,
				paragraphs: platform.overview?.paragraphs || [],
				checklist: platform.overview?.checklist || [],
			},

			capabilities: {
				tag: platform.capabilities?.tag || "",
				title: platform.capabilities?.title || "",
				subtitle: platform.capabilities?.subtitle || "",
				items: platform.capabilities?.items || [],
			},

			benefits: {
				tag: platform.benefits?.tag || "",
				title: platform.benefits?.title || "",
				description: platform.benefits?.description || "",
				buttonLabel: platform.benefits?.buttonLabel || "",
				items: platform.benefits?.items || [],
			},

			implementationProcess: {
				tag: platform.implementationProcess?.tag || "",
				title: platform.implementationProcess?.title || "",
				subtitle: platform.implementationProcess?.subtitle || "",
				steps: platform.implementationProcess?.steps || [],
			},

			industries: {
				tag: platform.industries?.tag || "",
				title: platform.industries?.title || "",
				subtitle: platform.industries?.subtitle || "",
				items: platform.industries?.items || [],
				footerLink: platform.industries?.footerLink || "",
			},

			caseStudies: {
				tag: platform.caseStudies?.tag || "",
				title: platform.caseStudies?.title || "",
				subtitle: platform.caseStudies?.subtitle || "",
				items: platform.caseStudies?.items || [],
			},

			faqs: {
				tag: platform.faqs?.tag || "",
				title: platform.faqs?.title || "",
				items: platform.faqs?.items || [],
			},

			cta: {
				title: platform.cta?.title || "",
				description: platform.cta?.description || "",
				primaryLabel: platform.cta?.primaryLabel || "",
				secondaryLabel: platform.cta?.secondaryLabel || "",
			},

			theme: {
				accent: platform.theme?.accent || "",
				accentDark: platform.theme?.accentDark || "",
				accentLight: platform.theme?.accentLight || "",
				accentSoft: platform.theme?.accentSoft || "",
				heroStart: platform.theme?.heroStart || "",
				heroEnd: platform.theme?.heroEnd || "",
				accentRgb: platform.theme?.accentRgb || "",
			},

			seo: {
				metaTitle: platform.seo?.metaTitle || "",
				metaDescription: platform.seo?.metaDescription || "",
				keywords: platform.seo?.keywords || [],
				ogImage: platform.seo?.ogImage || "",
				canonicalUrl: platform.seo?.canonicalUrl || "",
			},
		});
	}, [platformData]);

	const handleSubmit = async () => {
		try {
			const formData = buildPlatformFormData(form);

			if (isEdit) {
				await updatePlatform({
					slug,
					body: formData,
				}).unwrap();

				alert("Platform updated!");
			} else {
				await createPlatform(formData).unwrap();

				alert("Platform created!");
			}

			navigate("/platforms");
		} catch (error) {
			console.error(error);
			alert(error?.data?.message || "Something went wrong");
		}
	};

	const isLoading = creating || updating || loadingPlatform;

	return (
		<div>
			<PageHeader
				title={isEdit ? "Edit Platform" : "Create Platform"}
				subtitle={isEdit ? "Update platform" : "Add a new platform"}
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
							<PlatformBasicInfoStep
								form={form}
								setForm={setForm}
								categories={categories}
							/>
						)}

						{step === 1 && (
							<PlatformHeroStep form={form} setForm={setForm} />
						)}

						{step === 2 && (
							<OverviewStep form={form} setForm={setForm} />
						)}

						{step === 3 && (
							<PlatformCapabilitiesStep form={form} setForm={setForm} />
						)}
						{step === 4 && (
							<PlatformBenefitsStep form={form} setForm={setForm} />
						)}

						{step === 5 && (
							<ImplementationProcessStep form={form} setForm={setForm}/>
						)}

						{step === 6 && (
							<PlatformIndustriesStep form={form} setForm={setForm} />
						)}

						{step === 7 && (
							<PlatformCaseStudiesStep form={form} setForm={setForm} />
						)}

						{step === 8 && (
							<FaqStep form={form} setForm={setForm} />
						)}

						{step === 9 && (
							<CtaStep form={form} setForm={setForm} />
						)}

						{step === 10 && (
							<ThemeStep form={form} setForm={setForm} />
						)}

						{step === 11 && (
							<SeoStep form={form} setForm={setForm} />
						)}
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: 40,
						}}
					>
						<Btn
							variant="secondary"
							disabled={step === 0}
							onClick={() => setStep((s) => s - 1)}
						>
							Previous
						</Btn>

						{step < steps.length - 1 ? (
							<Btn onClick={() => setStep((s) => s + 1)}>
								Next
							</Btn>
						) : (
							<Btn loading={isLoading} onClick={handleSubmit}>
								{isEdit ? "Update Platform" : "Save Platform"}
							</Btn>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
