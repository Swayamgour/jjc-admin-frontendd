export const buildIndustryFormData = (form) => {
	const formData = new FormData();

	// Simple fields
	formData.append("title", form.title || "");
	formData.append("slug", form.slug || "");
	formData.append("badge", form.badge || "");
	formData.append("order", form.order || 0);

	// JSON fields
	formData.append("breadcrumb", JSON.stringify(form.breadcrumb || []));

	formData.append(
		"hero",
		JSON.stringify({
			...form.hero,
			heroImage:
				form.hero?.heroImage instanceof File
					? undefined
					: form.hero?.heroImage,
		}),
	);

	formData.append("theme", JSON.stringify(form.theme || {}));

	formData.append(
		"overview",
		JSON.stringify({
			...form.overview,
			image:
				form.overview?.image instanceof File
					? undefined
					: form.overview?.image,
		}),
	);

	formData.append("solutions", JSON.stringify(form.solutions || {}));

	formData.append("benefits", JSON.stringify(form.benefits || {}));

  formData.append("implementationProcess", JSON.stringify(form.implementationProcess || {}));

	formData.append("technologies", JSON.stringify(form.technologies || {}));

	formData.append("caseStudies", JSON.stringify(form.caseStudies || {}));

	formData.append("faqs", JSON.stringify(form.faqs || {}));

	formData.append("cta", JSON.stringify(form.cta || {}));

	// Upload Hero Image
	if (form.hero?.heroImage instanceof File) {
		formData.append("heroImage", form.hero.heroImage);
	}

	// Upload Overview Image
	if (form.overview?.image instanceof File) {
		formData.append("overviewImage", form.overview.image);
	}

	return formData;
};
