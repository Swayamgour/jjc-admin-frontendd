import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PageHeader, Btn } from "../components/ui/UI";
import "./BlogForm.css"; 

import { useGetBlogCategoriesQuery } from "../features/blogCategories/blogCategoryApi";
import { useCreateBlogMutation, useUpdateBlogMutation, useGetBlogQuery } from "../features/blogs/blogApi";

import { buildBlogFormData } from "../utils/buildBlogFormData";
import BlogBasicInfo from "../components/blogs/BlogBasicInfo";

export default function BlogFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",

    description: "",

    image: null,
    imageAlt: "",

    blogDate: "",

    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",

    status: "draft",
  });
  
  const { data: blogData, isLoading: loadingBlog } = useGetBlogQuery(id, {skip: !isEdit,});

  const { data: categoryData } = useGetBlogCategoriesQuery();

  const categories =categoryData?.data || [];

  const [createBlog, { isLoading: creating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation();

  useEffect(() => {
    if (!blogData?.data) return;

    const blog = blogData.data;

    setForm({
      title: blog.title || "",
      slug: blog.slug || "",

      category: blog.category?._id || blog.category || "",

      description: blog.description || "",

      image: blog.image || null,
      imageAlt: blog.imageAlt || "",

      blogDate: blog.blogDate
        ? blog.blogDate.slice(0, 10)
        : "",

      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      metaKeywords: blog.metaKeywords || "",

      status: blog.status || "draft",
    });
  }, [blogData]);

  const handleSubmit = async () => {
    try{
      const formData = buildBlogFormData(form);
      
      if(isEdit){
          await updateBlog({
              id,
              body: formData,
          }).unwrap();

          alert("Blog updated");
      }else{
        await createBlog(formData).unwrap();
        alert("Blog created");
      }

      navigate("/blog");

    }catch(err){
      console.log(err);
      alert(err?.data?.message ||"Something went wrong");
    }
  };

  const isLoading = creating || updating || loadingBlog;
  
  return (
  <>
    <PageHeader
      title={isEdit? "Edit Blog": "Create Blog"}
      subtitle={isEdit ? "Update Blog" : "Add a new Blog"} 
    />

    <div className="wizard">
      <div className="wizard-content">
        <BlogBasicInfo form={form} setForm={setForm} categories={categories}/>

        <div
          style={{
              display:"flex",
              justifyContent:"flex-end",
              marginTop:40,
          }}
        >
          <Btn loading={isLoading} onClick={handleSubmit}>
            {isEdit? "Update Blog": "Save Blog"}
          </Btn>
        </div>
      </div>
    </div>
  </>
  );
}
