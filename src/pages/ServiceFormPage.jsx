import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageHeader, Btn } from "../components/ui/UI";
import "./ServiceFormPage.css";

import { useGetAllItemByCategoryQuery } from "../features/categories/categoryApi";

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



const defaultSection = {
	tag: "",
	title: "",
	subtitle: "",
	items: []
};



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
		"SEO"

	];




	const [form, setForm] = useState({


		title: "",
		slug: "",
		badge: "",
		shortDescription: "",

		category: "",
		subCategory: "",

		order: 0,


		breadcrumb: [
			"Home",
			"Services"
		],




		hero: {


			heading: "",

			highlightedHeading: "",

			description: "",

			subDescription: "",

			badges: [],

			ctaText: "",

			ctaLink: "",

			image: null

		},




		overview: {


			tag: "",

			title: "",

			brandLabel: "",

			paragraphs: [],

			checklist: [],

			image: null


		},




		challenges: { ...defaultSection },


		serviceScope: { ...defaultSection },


		relatedPlatforms: { ...defaultSection },




		deliveryProcess: {


			tag: "",

			title: "",

			subtitle: "",

			steps: []

		},




		industryExamples: {


			tag: "",

			title: "",

			subtitle: "",

			items: []

		},





		costFactors: { ...defaultSection },



		benefits: {

			tag: "",

			title: "",

			description: "",

			items: []

		},





		faqs: {


			tag: "FAQs",

			title: "",

			items: []

		},





		caseStudies: { ...defaultSection },





		cta: {


			title: "",

			description: "",

			primaryLabel: "",

			secondaryLabel: ""

		},





		theme: {


			accent: "#2563EB",

			accentDark: "",

			accentLight: "",

			accentSoft: "",

			heroStart: "",

			heroEnd: "",

			accentRgb: ""

		},





		seo: {


			metaTitle: "",

			metaDescription: "",

			keywords: [],

			ogImage: "",

			canonicalUrl: ""

		}



	});






	const { data: categoriesData } = useGetAllItemByCategoryQuery('services');


	const categories =
		categoriesData?.data || [];





	const {
		data: serviceData,
		isLoading: loadingService

	} = useGetServiceQuery(
		slug,
		{
			skip: !isEdit
		}
	);




	const [createService, { isLoading: creating }]
		=
		useCreateServiceMutation();



	const [updateService, { isLoading: updating }]
		=
		useUpdateServiceMutation();






	// EDIT DATA SET

	useEffect(() => {


		if (!serviceData?.data)
			return;



		setForm((prev) => ({

			...prev,

			...serviceData.data


		}));



	}, [serviceData]);






	const handleSubmit = async () => {


		try {


			const formData =
				buildServiceFormData(form);



			if (isEdit) {



				await updateService({

					slug,

					body: formData


				}).unwrap();



				alert(
					"Service updated successfully"
				);



			} else {



				await createService(
					formData
				).unwrap();



				alert(
					"Service created successfully"
				);



			}



			navigate("/services");



		} catch (error) {


			console.log(error);


		}



	};




	const isLoading =
		creating ||
		updating ||
		loadingService;






	return (

		<div>


			<PageHeader

				title={
					isEdit
						?
						"Edit Service"
						:
						"Create Service"
				}


				subtitle={
					isEdit
						?
						"Update existing service"
						:
						"Add new service"
				}

			/>




			<div className="wizard">


				<div className="wizard-steps">


					{

						steps.map((item, i) => (


							<button

								key={item}

								className="wizard-step-item"

								onClick={() => setStep(i)}

							>


								<div

									className={
										`wizard-circle ${step === i ? "active" : ""
										}`
									}

								>

									{i + 1}

								</div>


								<span

									className={
										`wizard-label ${step === i ? "active" : ""
										}`
									}

								>

									{item}

								</span>



							</button>



						))

					}



				</div>







				<div className="wizard-content">


					<h2 className="wizard-title">

						Step {step + 1}: {steps[step]}

					</h2>





					<div style={{ marginTop: 30 }}>



						{
							step === 0 &&

							<BasicInfoStep

								form={form}

								setForm={setForm}

								categories={categories}

							/>

						}




						{
							step === 1 &&

							<HeroStep

								form={form}

								setForm={setForm}

							/>

						}





						{
							step === 2 &&

							<DynamicCardStep

								title="Challenges"

								section={form.challenges}

								onChange={(v) =>

									setForm({
										...form,
										challenges: v
									})

								}

							/>

						}




						{
							step === 3 &&

							<DynamicCardStep

								title="Service Scope"

								section={form.serviceScope}

								onChange={(v) =>

									setForm({
										...form,
										serviceScope: v
									})

								}

							/>

						}






						{
							step === 4 &&

							<DynamicCardStep

								title="Platforms"

								section={form.relatedPlatforms}

								onChange={(v) =>

									setForm({
										...form,
										relatedPlatforms: v
									})

								}

							/>

						}





						{
							step === 5 &&

							<DeliveryProcessStep

								form={form}

								setForm={setForm}

							/>

						}






						{
							step === 6 &&

							<IndustryExamplesStep

								form={form}

								setForm={setForm}

							/>

						}





						{
							step === 7 &&

							<DynamicCardStep

								title="Cost Factors"

								section={form.costFactors}

								onChange={(v) =>

									setForm({
										...form,
										costFactors: v
									})

								}

							/>

						}





						{
							step === 8 &&

							<DynamicCardStep

								title="Benefits"

								section={form.benefits}

								onChange={(v) =>

									setForm({
										...form,
										benefits: v
									})

								}

							/>

						}





						{
							step === 9 &&

							<FaqStep

								form={form}

								setForm={setForm}

							/>

						}






						{
							step === 10 &&

							<DynamicCardStep

								title="Case Studies"

								section={form.caseStudies}

								onChange={(v) =>

									setForm({
										...form,
										caseStudies: v
									})

								}

							/>

						}





						{
							step === 11 &&


							<SeoStep

								form={form}

								setForm={setForm}

							/>


						}



					</div>





					<div

						style={{

							display: "flex",

							justifyContent: "space-between",

							marginTop: 40

						}}

					>



						<Btn

							variant="secondary"

							disabled={step === 0}

							onClick={() =>
								setStep(s => s - 1)
							}

						>

							Previous

						</Btn>





						{

							step < steps.length - 1

								?

								<Btn

									onClick={() =>
										setStep(s => s + 1)
									}

								>

									Next

								</Btn>


								:


								<Btn

									loading={isLoading}

									onClick={handleSubmit}

								>

									{
										isEdit
											?
											"Update Service"
											:
											"Save Service"
									}


								</Btn>

						}



					</div>



				</div>


			</div>


		</div>

	);


}