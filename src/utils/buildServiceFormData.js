export const buildServiceFormData = (form) => {
  const formData = new FormData();

  formData.append("title", form.title);
  formData.append("slug", form.slug);
  formData.append(
    "shortDescription",
    form.shortDescription
  );
  formData.append(
    "overview",
    form.overview
  );
  formData.append(
    "category",
    form.category
  );
  formData.append(
    "subCategory",
    form.subCategory
  );
  formData.append(
    "order",
    form.order
  );

  // formData.append(
  //   "hero",
  //   JSON.stringify({
  //     heading: form.hero.heading,
  //     subHeading: form.hero.subHeading,
  //     ctaText: form.hero.ctaText,
  //     ctaLink: form.hero.ctaLink,
  //   })
  // );
  
  formData.append(
  "hero",
  JSON.stringify({
    heading: form.hero.heading,
    subHeading: form.hero.subHeading,
    ctaText: form.hero.ctaText,
    ctaLink: form.hero.ctaLink,
    image:
      !(form.hero.image instanceof File) && form.hero.image
        ? form.hero.image
        : undefined,
  })
);

if (form.hero.image instanceof File) {
  formData.append("image", form.hero.image);
}

  formData.append(
    "challenges",
    JSON.stringify(form.challenges)
  );

  formData.append(
    "serviceScope",
    JSON.stringify(form.serviceScope)
  );

  formData.append(
    "relatedPlatforms",
    JSON.stringify(form.relatedPlatforms)
  );

  formData.append(
    "deliveryProcess",
    JSON.stringify(form.deliveryProcess)
  );

  formData.append(
    "industryExamples",
    JSON.stringify(form.industryExamples)
  );

  formData.append(
    "costFactors",
    JSON.stringify(form.costFactors)
  );

  formData.append(
    "benefits",
    JSON.stringify(form.benefits)
  );

  formData.append(
    "faqs",
    JSON.stringify(form.faqs)
  );

  formData.append(
    "caseStudies",
    JSON.stringify(form.caseStudies)
  );

  formData.append(
    "seo",
    JSON.stringify(form.seo)
  );

  return formData;
};