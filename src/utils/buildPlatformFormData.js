export const buildPlatformFormData = (form) => {
	const formData = new FormData();

	// Simple fields
	formData.append("title", form.title || "");
	formData.append("slug", form.slug || "");
	formData.append("shortDescription", form.shortDescription || "");
	formData.append("badge", form.badge || "");
	formData.append("subCategory", form.subCategory || "");
	formData.append("order", form.order || 0);

	// JSON fields
	formData.append("breadcrumb", JSON.stringify(form.breadcrumb || []));

	formData.append(
		"hero",
		JSON.stringify({
			...form.hero,
			image:
				form.hero?.image instanceof File ? undefined : form.hero?.image,
		}),
	);

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

	formData.append("capabilities", JSON.stringify(form.capabilities || {}));

	formData.append("benefits", JSON.stringify(form.benefits || {}));

	formData.append(
		"implementationProcess",
		JSON.stringify(form.implementationProcess || {}),
	);

	formData.append("industries", JSON.stringify(form.industries || {}));

	formData.append("caseStudies", JSON.stringify(form.caseStudies || {}));

	formData.append("faqs", JSON.stringify(form.faqs || {}));

	formData.append("cta", JSON.stringify(form.cta || {}));

	formData.append("theme", JSON.stringify(form.theme || {}));

	formData.append("seo", JSON.stringify(form.seo || {}));

	// Upload Hero Image
	if (form.hero?.image instanceof File) {
		formData.append("heroImage", form.hero.image);
	}

	// Upload Overview Image
	if (form.overview?.image instanceof File) {
		formData.append("overviewImage", form.overview.image);
	}

	return formData;
};
