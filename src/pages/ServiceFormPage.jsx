import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader, Btn } from "../components/ui/UI";
import "./ServiceFormPage.css";
import { useGetCategoriesQuery } from "../features/categories/categoryApi";
import {
	useCreateServiceMutation,
	useUpdateServiceMutation,
	useGetServiceQuery,
} from "../features/services/servicesApi";
import { buildServiceFormData } from "../utils/buildServiceFormData";
import BasicInfoStep from "../components/services/BasicInfoStep";
import HeroStep from "../components/services/HeroStep";
import DynamicCardStep from "../components/services/DynamicCardStep";
import DeliveryProcessStep from "../components/services/DeliveryProcessStep";
import IndustryExamplesStep from "../components/services/IndustryExamplesStep";
import FaqStep from "../components/services/FaqStep";
import SeoStep from "../components/shared/sections/SeoStep";

export default function ServiceFormPage() {
	const { slug } = useParams();
	const isEdit = Boolean(slug);

	const navigate = useNavigate();

	const [step, setStep] = useState(0);

	const steps = [
		"Basic Info",
		"Hero",
		"Challenges",
		"Service Scope",
		"Platforms",
		"Delivery",
		"Industries",
		"Cost Factors",
		"Benefits",
		"FAQs",
		"Case Studies",
		"SEO",
	];

	const [form, setForm] = useState({
		title: "",
		slug: "",
		shortDescription: "",
		overview: "",
		category: "",
		subCategory: "",
		order: 0,

		hero: {
			heading: "",
			subHeading: "",
			ctaText: "",
			ctaLink: "",
			image: null,
		},

		challenges: [],
		serviceScope: [],
		relatedPlatforms: [],
		costFactors: [],
		benefits: [],
		caseStudies: [],

		deliveryProcess: [],
		industryExamples: [],
		faqs: [],

		seo: {
			metaTitle: "",
			metaDescription: "",
			keywords: [],
			ogImage: "",
			canonicalUrl: "",
		},
	});

	const { data: categoriesData } = useGetCategoriesQuery();

	const categories = categoriesData?.data || [];

	const { data: serviceData, isLoading: loadingService } = useGetServiceQuery(
		slug,
		{ skip: !isEdit },
	);

	const [createService, { isLoading: creating }] = useCreateServiceMutation();

	const [updateService, { isLoading: updating }] = useUpdateServiceMutation();

	useEffect(() => {
		if (!serviceData?.data) return;

		const service = serviceData.data;

		setForm({
			title: service.title || "",
			slug: service.slug || "",
			shortDescription: service.shortDescription || "",
			overview: service.overview || "",

			category: service.category || "",
			subCategory: service.subCategory || "",

			order: service.order || 0,

			hero: {
				heading: service.hero?.heading || "",
				subHeading: service.hero?.subHeading || "",
				ctaText: service.hero?.ctaText || "",
				ctaLink: service.hero?.ctaLink || "",
				image: service.hero?.image || null,
			},

			challenges: service.challenges || [],
			serviceScope: service.serviceScope || [],
			relatedPlatforms: service.relatedPlatforms || [],
			deliveryProcess: service.deliveryProcess || [],
			industryExamples: service.industryExamples || [],
			costFactors: service.costFactors || [],
			benefits: service.benefits || [],
			faqs: service.faqs || [],
			caseStudies: service.caseStudies || [],

			seo: {
				metaTitle: service.seo?.metaTitle || "",
				metaDescription: service.seo?.metaDescription || "",
				keywords: service.seo?.keywords || [],
				ogImage: service.seo?.ogImage || "",
				canonicalUrl: service.seo?.canonicalUrl || "",
			},
		});
	}, [serviceData]);

	const handleSubmit = async () => {
		try {
			const formData = buildServiceFormData(form);

			if (isEdit) {
				await updateService({
					slug,
					body: formData,
				}).unwrap();

				alert("Service updated successfully!");
			} else {
				await createService(formData).unwrap();

				alert("Service created successfully!");
			}

			// Redirect to services page
			navigate("/services");
		} catch (err) {
			console.error(err);
		}
	};

	const isLoading = creating || updating || loadingService;

	return (
		<div>
			<PageHeader
				title={isEdit ? "Edit Service" : "Create Service"}
        subtitle={isEdit ? "Update existing service" : "Add a new service"}
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
							<BasicInfoStep form={form} setForm={setForm} categories={categories}/>
						)}

						{step === 1 && (
							<HeroStep form={form} setForm={setForm} />
						)}

						{step === 2 && (
							<DynamicCardStep
								title="Challenges"
								items={form.challenges}
								onChange={(value) =>
									setForm({
										...form,
										challenges: value,
									})
								}
							/>
						)}

						{step === 3 && (
							<DynamicCardStep
								title="Service Scope"
								items={form.serviceScope}
								onChange={(value) =>
									setForm({
										...form,
										serviceScope: value,
									})
								}
							/>
						)}

						{step === 4 && (
							<DynamicCardStep
								title="Related Platforms"
								items={form.relatedPlatforms}
								onChange={(value) =>
									setForm({
										...form,
										relatedPlatforms: value,
									})
								}
							/>
						)}

						{step === 5 && (
							<DeliveryProcessStep form={form} setForm={setForm}/>
						)}

						{step === 6 && (
							<IndustryExamplesStep form={form} setForm={setForm}/>
						)}

						{step === 7 && (
							<DynamicCardStep
								title="Cost Factors"
								items={form.costFactors}
								onChange={(value) =>
									setForm({
										...form,
										costFactors: value,
									})
								}
							/>
						)}

						{step === 8 && (
							<DynamicCardStep
								title="Benefits"
								items={form.benefits}
								onChange={(value) =>
									setForm({
										...form,
										benefits: value,
									})
								}
							/>
						)}

						{step === 9 && (
							<FaqStep form={form} setForm={setForm} />
						)}

						{step === 10 && (
							<DynamicCardStep
								title="Case Studies"
								items={form.caseStudies}
								onChange={(value) =>
									setForm({
										...form,
										caseStudies: value,
									})
								}
							/>
						)}

						{step === 11 && (
							<SeoStep form={form} setForm={setForm} />
						)}
					</div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
						<Btn variant="secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
							Previous
						</Btn>

						{step < steps.length - 1 ? (
							<Btn onClick={() => setStep((s) => s + 1)}> Next </Btn>
						) : (
							<Btn loading={isLoading} onClick={handleSubmit}>
								{isEdit ? "Update Service" : "Save Service"}
							</Btn>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
