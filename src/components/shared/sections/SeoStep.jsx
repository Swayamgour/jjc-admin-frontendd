import { Field, Input, Textarea } from "../../ui/UI";


export default function SeoStep({
  form,
  setForm
}) {


  const seo = form.seo || {};



  const updateSeo = (field, value) => {


    setForm({


      ...form,


      seo: {


        ...seo,


        [field]: value


      }


    });


  };





  return (

    <div className="form-grid">





      <Field label="Meta Title">


        <Input

          value={seo.metaTitle || ""}

          onChange={(e) =>

            updateSeo(

              "metaTitle",

              e.target.value

            )

          }


          placeholder="Microsoft 365 Consulting Services"

        />


      </Field>









      <Field
        label="Meta Description"
        hint={`${seo.metaDescription?.length || 0}/160`}
      >


        <Textarea


          rows={4}


          maxLength={160}


          value={
            seo.metaDescription || ""
          }


          onChange={(e) =>

            updateSeo(

              "metaDescription",

              e.target.value

            )

          }


          placeholder="SEO description"


        />


      </Field>









      <Field label="Keywords (comma separated)">



        <Input


          value={

            Array.isArray(seo.keywords)

              ?

              seo.keywords.join(", ")

              :

              ""

          }



          onChange={(e) =>

            updateSeo(

              "keywords",


              e.target.value

                .split(",")

                .map(
                  item => item.trim()
                )

                .filter(Boolean)

            )

          }



          placeholder="Microsoft 365, Cloud Migration"

        />



      </Field>










      <Field label="OG Image URL">


        <Input


          value={
            seo.ogImage || ""
          }


          onChange={(e) =>

            updateSeo(

              "ogImage",

              e.target.value

            )

          }



          placeholder="https://image-url"


        />


      </Field>









      <Field label="Canonical URL">


        <Input


          value={
            seo.canonicalUrl || ""
          }


          onChange={(e) =>

            updateSeo(

              "canonicalUrl",

              e.target.value

            )

          }


          placeholder="/services/microsoft-365"


        />


      </Field>






    </div>

  );


}