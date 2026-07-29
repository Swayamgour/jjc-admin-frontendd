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
	SECTION_LIBRARY,
	REQUIRED_FIELDS,
	buildDefaultForm,
	getStepLabel,
} from "../../utils/pageSectionsConfig";
import { useGetAllItemByCategoryQuery } from "../../features/categories/categoryApi";
import BasicInfoStep from "../services/BasicInfoStep";
import HeroStep from "../services/HeroStep";
import OverviewStep from "../shared/sections/OverviewStep";
import SeoStep from "../shared/sections/SeoStep";
import FaqStep from "../services/FaqStep";
import DeliveryProcessStep from "../services/DeliveryProcessStep";
import DynamicCardStep from "../services/DynamicCardStep";
import IndustryListStep from "./IndustryListStep";

// Field configurations for each section type
const SECTION_FIELD_CONFIG = {
	challenges: {
		fields: ["title", "description"],
		label: "Challenge",
	},
	sectorOverview: {
		fields: ["title", "description"],
		label: "Sector",
	},
	applicationLayer: {
		fields: ["tag", "title", "description"],
		label: "Application",
	},
	capabilities: {
		fields: ["icon", "title", "description", "points"],
		label: "Capability",
	},
	industryUseCases: {
		fields: ["title", "description"],
		label: "Use Case",
	},
	outcomes: {
		fields: ["label", "value", "description"],
		label: "Outcome",
	},
	pillars: {
		fields: ["icon", "title", "description", "points"],
		label: "Pillar",
	},
	taskBoard: {
		fields: ["tag", "title", "description"],
		label: "Task",
	},
	consultingServices: {
		fields: ["tag", "title", "description"],
		label: "Service",
	},
	appGrid: {
		fields: ["tag", "title", "description"],
		label: "Application",
	},
	whyUs: {
		fields: ["icon", "title", "description", "points"],
		label: "Reason",
	},
	successStories: {
		fields: ["industry", "title", "summary", "metrics", "outcomes", "ctaLink"],
		label: "Story",
	},
	insights: {
		fields: ["tag", "meta", "title", "description", "link"],
		label: "Post",
	},
	cta: {
		fields: ["title", "description", "primaryLabel", "primaryLink", "secondaryLabel", "secondaryLink", "note"],
		label: "CTA",
	},
	relatedItems: {
		fields: ["title", "description"],
		label: "Related Item",
	},
	approach: {
		fields: ["title", "description"],
		label: "Step",
	},
};

function getByPath(obj, path) {
	return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function isEmptyValue(v) {
	if (v === undefined || v === null) return true;
	if (typeof v === "string") return v.trim() === "";
	if (Array.isArray(v)) return v.length === 0;
	return false;
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

	useEffect(() => {
		if (!pageData?.data) return;
		setForm((prev) => ({ ...prev, ...pageData.data, type }));
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
		stepKeys.forEach((key) => {
			missing.push(...validateStep(key));
		});
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
			console.log(err);
			setError(err?.data?.message || "Something went wrong");
		}
	};

	const isLoading = creating || updating || loadingPage;
	const currentKey = stepKeys[step];
	const currentSection = SECTION_LIBRARY[currentKey];

	function renderStep() {
		if (currentKey === "basicInfo") {
			return <BasicInfoStep form={form} setForm={setForm} categories={categories} type={type} />;
		}
		if (currentKey === "hero") {
			return <HeroStep form={form} setForm={setForm} />;
		}
		if (currentKey === "overview") {
			return <OverviewStep form={form} setForm={setForm} />;
		}
		if (currentKey === "seo") {
			return <SeoStep form={form} setForm={setForm} />;
		}
		if (currentKey === "faqs") {
			return <FaqStep form={form} setForm={setForm} />;
		}

		const componentType = currentSection?.component;

		if (componentType === "deliveryProcess") {
			return (
				<DeliveryProcessStep
					form={form}
					setForm={setForm}
					sectionKey={currentKey}
					label={getStepLabel(type, currentKey)}
				/>
			);
		}

		if (componentType === "industryList") {
			return (
				<IndustryListStep
					form={form}
					setForm={setForm}
					sectionKey={currentKey}
					label={getStepLabel(type, currentKey)}
				/>
			);
		}

		// Dynamic card sections with field configs
		const config = SECTION_FIELD_CONFIG[currentKey];
		if (config) {
			return (
				<DynamicCardStep
					title={getStepLabel(type, currentKey)}
					section={form[currentKey] || {}}
					onChange={(v) => setForm({ ...form, [currentKey]: v })}
					fields={config.fields}
					cardLabel={config.label}
				/>
			);
		}

		// Fallback for any other section
		return (
			<DynamicCardStep
				title={getStepLabel(type, currentKey)}
				section={form[currentKey] || {}}
				onChange={(v) => setForm({ ...form, [currentKey]: v })}
				fields={["title", "description"]}
				cardLabel="Item"
			/>
		);
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
						<div style={{ color: "#dc2626", marginTop: 12, fontSize: 14 }}>
							{error}
						</div>
					)}

					<div style={{ marginTop: 30 }}>
						{renderStep()}
					</div>

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

function labelForType(type) {
	if (type === "service") return "Service";
	if (type === "industry") return "Industry";
	if (type === "platform") return "Platform";
	return type;
}