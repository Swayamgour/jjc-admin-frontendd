import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader, Btn } from "../ui/UI";
import {
	useCreatePageMutation,
	useUpdatePageMutation,
	useGetPageQuery,
} from "../../features/pages/pagesApi";
import { buildPageFormData } from "../../utils/buildPageFormData";
import {
	TYPE_STEP_MAP,
	TYPE_CATEGORY_SLUG,
	REQUIRED_FIELDS,
	buildDefaultForm,
	getStepLabel,
	getSectionConfig,
} from "../../utils/pageSectionsConfig";
import { useGetAllItemByCategoryQuery } from "../../features/categories/categoryApi";

import HeroStep from "../services/HeroStep";
import SeoStep from "../shared/sections/SeoStep";
import SuccessStoriesStep from "../services/SuccessStoriesStep";

import PageBasicInfoStep from "../caseStudies/page/PageBasicInfoStep";
import DefinitionStep from "./Definitionstep";
import WhoForStep from "./Whoforstep";
import MicrosoftPlatformsStep from "./Microsoftplatformsstep";
import PageFaqStep from "./Pagefaqstep";
import PageCtaStep from "./Pagectastep";
import CardSectionStep from "./Cardsectionstep";

function getByPath(obj, path) {
	return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function isEmptyValue(v) {
	if (v === undefined || v === null) return true;
	if (typeof v === "string") return v.trim() === "";
	if (Array.isArray(v)) return v.length === 0;
	return false;
}

function labelForType(type) {
	if (type === "service") return "Service";
	if (type === "industry") return "Industry";
	if (type === "platform") return "Platform";
	return type;
}

export default function PageFormPage({ type, listPath }) {
	const { slug } = useParams();
	const isEdit = Boolean(slug);
	const navigate = useNavigate();

	const [step, setStep] = useState(0);
	const [error, setError] = useState("");

	const stepKeys = TYPE_STEP_MAP[type] || [];
	const steps = stepKeys.map((key) => getStepLabel(type, key));

	const [form, setForm] = useState(() => buildDefaultForm(type));

	const { data: categoriesData } = useGetAllItemByCategoryQuery(TYPE_CATEGORY_SLUG[type]);
	const categories = categoriesData?.data || [];

	const { data: pageData, isLoading: loadingPage } = useGetPageQuery(
		{ type, slug },
		{ skip: !isEdit }
	);

	const [createPage, { isLoading: creating }] = useCreatePageMutation();
	const [updatePage, { isLoading: updating }] = useUpdatePageMutation();

	useEffect(() => {
		if (!isEdit) {
			setForm(buildDefaultForm(type));
			setStep(0);
		}
	}, [type, isEdit]);

	/* Edit mode: start from defaults, then lay the saved page on top, so
	   pages saved before a section existed (e.g. no `faqs` yet) still get
	   a complete, safe shape for every step. */
	useEffect(() => {
		if (!pageData?.data) return;
		const defaults = buildDefaultForm(type);
		const saved = pageData.data;

		const merged = { ...defaults };
		Object.keys(saved).forEach((key) => {
			const d = defaults[key];
			const s = saved[key];
			// nested sections: keep default keys the saved doc doesn't have
			merged[key] =
				d && s && typeof d === "object" && !Array.isArray(d) && typeof s === "object" && !Array.isArray(s)
					? { ...d, ...s }
					: s;
		});

		setForm({ ...merged, type });
	}, [pageData, type]);

	function validateStep(stepKey) {
		const rules = REQUIRED_FIELDS[stepKey];
		if (!rules) return [];
		return rules
			.filter((rule) => isEmptyValue(getByPath(form, rule.path)))
			.map((rule) => rule.label);
	}

	function validateAll() {
		const missing = [];
		stepKeys.forEach((key) => missing.push(...validateStep(key)));
		return [...new Set(missing)];
	}

	function goToStep(nextIndex) {
		if (nextIndex > step) {
			const missing = validateStep(stepKeys[step]);
			if (missing.length) {
				setError(`Please fill: ${missing.join(", ")}`);
				return;
			}
		}
		setError("");
		setStep(nextIndex);
	}

	const handleSubmit = async () => {
		const missing = validateAll();
		if (missing.length) {
			setError(`Please fill: ${missing.join(", ")}`);
			const badStepIndex = stepKeys.findIndex((key) => validateStep(key).length);
			if (badStepIndex >= 0) setStep(badStepIndex);
			return;
		}

		/* FAQ rows need both fields (backend requires question + answer) */
		const badFaq = (form.faqs?.items || []).findIndex(
			(f) => !f.question?.trim() || !f.answer?.trim()
		);
		if (badFaq >= 0) {
			setError(`FAQ #${badFaq + 1}: question and answer are both required`);
			const faqIndex = stepKeys.indexOf("faqs");
			if (faqIndex >= 0) setStep(faqIndex);
			return;
		}

		try {
			const formData = buildPageFormData(form);

			if (isEdit) {
				await updatePage({ type, slug, body: formData }).unwrap();
				alert(`${type} updated successfully`);
			} else {
				await createPage({ type, body: formData }).unwrap();
				alert(`${type} created successfully`);
			}

			navigate(listPath);
		} catch (err) {
			console.error(err);
			setError(err?.data?.message || "Something went wrong");
		}
	};

	const isLoading = creating || updating || loadingPage;
	const currentKey = stepKeys[step];

	const setSectionValue = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

	function renderStep() {
		switch (currentKey) {
			case "basicInfo":
				return (
					<PageBasicInfoStep
						form={form}
						setForm={setForm}
						categories={categories}
						type={type}
					/>
				);

			case "hero":
				return <HeroStep form={form} setForm={setForm} />;

			case "seo":
				return <SeoStep form={form} setForm={setForm} />;

			case "definition":
				return (
					<DefinitionStep section={form.definition || {}} onChange={setSectionValue("definition")} />
				);

			case "whoFor":
				return <WhoForStep section={form.whoFor || {}} onChange={setSectionValue("whoFor")} />;

			case "microsoftPlatforms":
				return (
					<MicrosoftPlatformsStep
						section={form.microsoftPlatforms || {}}
						onChange={setSectionValue("microsoftPlatforms")}
					/>
				);

			case "faqs":
				return <PageFaqStep section={form.faqs || {}} onChange={setSectionValue("faqs")} />;

			case "cta":
				return <PageCtaStep section={form.cta || {}} onChange={setSectionValue("cta")} />;

			case "successStories":
				return (
					<SuccessStoriesStep
						title="Success Stories"
						section={form.successStories || {}}
						onChange={setSectionValue("successStories")}
					/>
				);

			default: {
				const config = getSectionConfig(type, currentKey);
				if (!config) {
					return <p>No editor is configured for “{currentKey}”.</p>;
				}
				return (
					<CardSectionStep
						title={getStepLabel(type, currentKey)}
						section={form[currentKey] || {}}
						onChange={setSectionValue(currentKey)}
						config={config}
					/>
				);
			}
		}
	}

	return (
		<div>
			<PageHeader
				title={isEdit ? `Edit ${labelForType(type)}` : `Create ${labelForType(type)}`}
				subtitle={isEdit ? `Update existing ${type}` : `Add new ${type}`}
			/>

			<div className="wizard">
				<div className="wizard-steps">
					{steps.map((label, i) => (
						<button key={stepKeys[i]} className="wizard-step-item" onClick={() => goToStep(i)}>
							<div className={`wizard-circle ${step === i ? "active" : ""}`}>{i + 1}</div>
							<span className={`wizard-label ${step === i ? "active" : ""}`}>{label}</span>
						</button>
					))}
				</div>

				<div className="wizard-content">
					<h2 className="wizard-title">
						Step {step + 1}: {steps[step]}
					</h2>

					{error && (
						<div style={{ color: "#dc2626", marginTop: 12, fontSize: 14 }}>{error}</div>
					)}

					<div style={{ marginTop: 30 }}>{renderStep()}</div>

					<div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
						<Btn variant="secondary" disabled={step === 0} onClick={() => goToStep(step - 1)}>
							Previous
						</Btn>

						{step < steps.length - 1 ? (
							<Btn onClick={() => goToStep(step + 1)}>Next</Btn>
						) : (
							<Btn loading={isLoading} onClick={handleSubmit}>
								{isEdit ? `Update ${labelForType(type)}` : `Save ${labelForType(type)}`}
							</Btn>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}