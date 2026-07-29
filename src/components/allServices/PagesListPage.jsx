import { useMemo } from "react";
import ContentPage from "../ui/ContentPage";
import {
  useGetPagesQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
  useTogglePagePublishMutation,
} from "../../features/pages/pagesApi";
// import { useGetCategoriesQuery } from "../features/categories/categoryApi";
import { TYPE_CATEGORY_SLUG } from "../../utils/pageSectionsConfig";
import { useGetCategoriesQuery } from "../../features/categories/categoryApi";

const EXTRA_COLS = [
  {
    key: "shortDescription",
    label: "Description",
    render: (row) => (
      <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
        {row.shortDescription?.slice(0, 80)}…
      </span>
    ),
  },
];

/* ==============================================================
 PagesListPage — replaces ServicesPage.jsx. Same quick-create /
 quick-edit grid (ContentPage) but parameterized by `type`, so
 it powers /services, /industries and /platforms from one file.

 Full section editing (challenges, hero, etc.) still happens in
 the wizard (PageFormPage) via navigateToCreate/navigateToEdit —
 this page is only the list + the lightweight inline fields.
================================================================ */

export default function PagesListPage({ type, title, subtitle, basePath }) {
  const { data: categoriesData } = useGetCategoriesQuery();

  const subcategoryOptions = useMemo(() => {
    const categories = categoriesData?.data || [];
    const cat = categories.find((c) => c.slug === TYPE_CATEGORY_SLUG[type]);
    return (
      cat?.subcategories?.map((sub) => ({
        value: sub._id,
        label: sub.name,
      })) || []
    );
  }, [categoriesData, type]);

  const fields = useMemo(
    () => [
      {
        key: "title",
        label: "Title",
        required: true,
        placeholder: "e.g. ERP, Finance & Operations",
      },
      {
        key: "subCategory",
        label: "Subcategory",
        type: "select",
        required: true,
        hint: "Choose which group this belongs to",
        options: subcategoryOptions,
      },
      {
        key: "shortDescription",
        label: "Short Description",
        type: "textarea",
        rows: 2,
        placeholder: "Max 300 chars — shown in mega menu",
        required: true,
      },
      {
        key: "hero",
        label: "Hero Section",
        type: "grid",
        subFields: [
          {
            key: "heading",
            label: "Hero Heading",
            placeholder: "e.g. ERP & Finance Operations Consulting",
            required: true,
          },
          {
            key: "highlightedHeading",
            label: "Highlighted Heading",
            placeholder: "One-line value statement",
          },
        ],
      },
      {
        key: "seo",
        label: "SEO",
        type: "grid",
        subFields: [
          {
            key: "metaTitle",
            label: "Meta Title",
            placeholder: "JJC Systems | Page Name",
          },
          {
            key: "metaDescription",
            label: "Meta Description (max 160)",
            placeholder: "Describe this page for Google…",
          },
        ],
      },
    ],
    [subcategoryOptions]
  );

  // Wrap the type-agnostic RTK hooks so ContentPage can keep
  // calling them without knowing about `type` at all.
  const useList = (arg) => useGetPagesQuery({ type, ...arg });
  const useCreate = () => {
    const [mutate, state] = useCreatePageMutation();
    return [(body) => mutate({ type, body }), state];
  };
  const useUpdate = () => {
    const [mutate, state] = useUpdatePageMutation();
    return [({ slug, body }) => mutate({ type, slug, body }), state];
  };
  const useDelete = () => {
    const [mutate, state] = useDeletePageMutation();
    return [(slug) => mutate({ type, slug }), state];
  };
  const useToggle = () => {
    const [mutate, state] = useTogglePagePublishMutation();
    return [(id) => mutate({ type, id }), state];
  };

  console.log(basePath)

  return (
    <ContentPage
      title={title}
      subtitle={subtitle}
      useList={useList}
      useCreate={useCreate}
      useUpdate={useUpdate}
      useDelete={useDelete}
      useToggle={useToggle}
      fields={fields}
      columns={EXTRA_COLS}
      navigateToCreate={`${basePath}/new`}
      // navigateToEdit={basePath}
      navigateToEdit={`${basePath}/edit`}
    />
  );
}
