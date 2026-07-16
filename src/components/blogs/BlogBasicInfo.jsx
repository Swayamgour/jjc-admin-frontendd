import { useEffect, useState, useMemo } from "react";
import { Field, Input, Select, Textarea } from "../ui/UI";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const makeSlug = (text = "") =>
	text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");

export default function BlogBasicInfo({ form, setForm, categories = [] }) {
	const [manualSlug, setManualSlug] = useState(false);

	const update = (key, value) => {
		setForm((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	// Auto slug generation
	useEffect(() => {
		if (!manualSlug) {
			setForm((prev) => ({
				...prev,
				slug: makeSlug(prev.title),
			}));
		}
	}, [form.title, manualSlug, setForm]);

	const handleImage = (e) => {
		const file = e.target.files[0];

		if (!file) return;

		if (!file.type.startsWith("image/")) {
			alert("Please select image file");
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			alert("Image size should be less than 5MB");
			return;
		}

		update("image", file);
	};

	const modules = useMemo(
		() => ({
			toolbar: [
				[{ font: [] }],
				[{ size: ["small", false, "large", "huge"] }],
				[{ header: [1, 2, 3, 4, 5, 6, false] }],

				["bold", "italic", "underline", "strike"],

				[{ color: [] }, { background: [] }],

				[{ list: "ordered" }, { list: "bullet" }],

				[{ align: [] }],

				["blockquote", "code-block"],

				["link", "image", "video"],

				["clean"],
			],
		}),
		[],
	);

	const formats = useMemo(
		() => [
			"font",
			"size",
			"header",

			"bold",
			"italic",
			"underline",
			"strike",

			"color",
			"background",

			"list",
			"bullet",

			"align",

			"blockquote",
			"code-block",

			"link",
			"image",
			"video",
		],
		[],
	);

	return (
		<div className="form-section">
			{/* Basic Information */}

			<div className="form-grid">
				<Field label="Blog Title" required>
					<Input
						value={form.title}
						placeholder="Enter blog title"
						onChange={(e) => update("title", e.target.value)}
					/>
				</Field>

				<Field label="Slug" required>
					<Input
						value={form.slug}
						placeholder="blog-slug"
						onChange={(e) => {
							setManualSlug(true);
							update("slug", e.target.value);
						}}
					/>

					<span className="slug">Auto generated from title</span>
				</Field>
			</div>

			<div
				className="form-grid"
				style={{marginTop: 20}}
			>
				<Field label="Category" required>
					<Select
						value={form.category}
						onChange={(e) => update("category", e.target.value)}
					>
						<option value="">Select Category</option>

						{categories.map((item) => (
							<option key={item._id} value={item._id}>
								{item.name}
							</option>
						))}
					</Select>
				</Field>

				<Field label="Status">
					<Select
						value={form.status}
						onChange={(e) => update("status", e.target.value)}
					>
						<option value="draft">Draft</option>

						<option value="published">Published</option>
					</Select>
				</Field>
			</div>

			{/* Description */}

			<div
				style={{
					marginTop: 20,
				}}
			>
				<Field label="Description" required>
					<div className="editor-wrapper">
						<ReactQuill
							theme="snow"
							value={form.description}
							onChange={(value) => {
								setForm((prev) => ({
									...prev,
									description: value,
								}));
							}}
							modules={modules}
							formats={formats}
							placeholder="Write your blog content..."
							style={{
								height: 320,
								marginBottom: 45,
							}}
						/>
					</div>
				</Field>
			</div>

			{/* Image Section */}

			<div
				className="form-grid"
				style={{
					marginTop: 30,
				}}
			>
				<Field label="Blog Image">
					<div className="blog-upload">
						<input
							type="file"
							accept="image/*"
							onChange={handleImage}
						/>

						{form.image && typeof form.image === "string" && (
							<img
								src={form.image}
								className="blog-image-preview"
								alt=""
							/>
						)}

						{form.image instanceof File && (
							<img
								src={URL.createObjectURL(form.image)}
								className="blog-image-preview"
								alt=""
							/>
						)}
					</div>
				</Field>

				<Field label="Image Alt Text">
					<Input
						value={form.imageAlt}
						placeholder="Describe image"
						onChange={(e) => update("imageAlt", e.target.value)}
					/>
				</Field>
			</div>

			{/* Date */}

			<div
				className="form-grid"
				style={{
					marginTop: 20,
				}}
			>
				<Field label="Blog Date" required>
					<Input
						type="date"
						value={form.blogDate}
						onChange={(e) => update("blogDate", e.target.value)}
					/>
				</Field>
			</div>

			{/* SEO */}

			<h3
				style={{
					marginTop: 40,
					marginBottom: 20,
				}}
			>
				SEO Information
			</h3>

			<div className="form-grid">
				<Field label="Meta Title">
					<Input
						value={form.metaTitle}
						placeholder="SEO title"
						onChange={(e) => update("metaTitle", e.target.value)}
					/>
				</Field>

				<Field label="Meta Keywords">
					<Input
						value={form.metaKeywords}
						placeholder="keyword1, keyword2"
						onChange={(e) => update("metaKeywords", e.target.value)}
					/>
				</Field>
			</div>

			<div
				style={{
					marginTop: 20,
				}}
			>
				<Field label="Meta Description">
					<Textarea
						rows={4}
						value={form.metaDescription}
						placeholder="SEO description"
						onChange={(e) =>
							update("metaDescription", e.target.value)
						}
					/>
				</Field>
			</div>
		</div>
	);
}
