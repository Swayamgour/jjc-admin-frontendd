export const buildServiceFormData = (form) => {


  const formData = new FormData();



  // BASIC

  formData.append(
    "title",
    form.title
  );


  formData.append(
    "slug",
    form.slug || ""
  );


  formData.append(
    "badge",
    form.badge || ""
  );


  formData.append(
    "shortDescription",
    form.shortDescription
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






  // BREADCRUMB


  formData.append(
    "breadcrumb",
    JSON.stringify(
      form.breadcrumb || []
    )
  );







  // HERO WITHOUT FILE


  const heroData = {


    ...form.hero,


    image:

      !(form.hero.image instanceof File)

        ?

        form.hero.image

        :

        undefined


  };




  formData.append(

    "hero",

    JSON.stringify(heroData)

  );





  // HERO IMAGE FILE


  if (
    form.hero.image instanceof File
  ) {


    formData.append(

      "heroImage",

      form.hero.image

    );


  }







  // OVERVIEW


  const overviewData = {


    ...form.overview,


    image:

      !(form.overview?.image instanceof File)

        ?

        form.overview?.image

        :

        undefined

  };




  formData.append(

    "overview",

    JSON.stringify(
      overviewData
    )

  );






  // OVERVIEW IMAGE


  if (
    form.overview?.image instanceof File
  ) {


    formData.append(

      "overviewImage",

      form.overview.image

    );


  }








  // SECTIONS


  const jsonFields = [


    "challenges",


    "serviceScope",


    "relatedPlatforms",


    "deliveryProcess",


    "industryExamples",


    "costFactors",


    "benefits",


    "faqs",


    "caseStudies",


    "cta",


    "theme",


    "seo"


  ];






  jsonFields.forEach((field) => {


    formData.append(

      field,

      JSON.stringify(
        form[field]
      )

    );


  });







  return formData;


};