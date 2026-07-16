import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetBlogsQuery, useDeleteBlogMutation, useToggleBlogStatusMutation } from "../features/blogs/blogApi";

import {
	PageHeader,
	Btn,
	SearchBar,
	EmptyState,
	Table,
	ConfirmDialog,
	Toast,
	StatusBadge,
} from "../components/ui/UI";

const stripHtml = (html = "") => {
	const div = document.createElement("div");
	div.innerHTML = html;
	return div.textContent || div.innerText || "";
};

export default function BlogsPage() {
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [confirm, setConfirm] = useState(null);
	const [toast, setToast] = useState(null);

	const { data, isLoading } = useGetBlogsQuery();

	const blogs = data?.data || [];

	const filtered = blogs.filter((blog) =>
		blog.title?.toLowerCase().includes(search.toLowerCase()),
	);

	const [deleteBlog, { isLoading: deleting }] = useDeleteBlogMutation();

	const [toggleStatus] = useToggleBlogStatusMutation();

	async function handleDelete() {
		if (!confirm) return;

		try {
			await deleteBlog(confirm.id).unwrap();

			setToast({
				type: "success",
				message: "Blog deleted successfully.",
			});

			setConfirm(null);
		} catch (err) {
			setToast({
				type: "error",
				message: err?.data?.message || "Failed to delete blog.",
			});
		}
	}

	async function handleToggle(id) {
		try {
			await toggleStatus(id).unwrap();

			setToast({
				type: "success",
				message: "Blog status updated.",
			});
		} catch (err) {
			setToast({
				type: "error",
				message: err?.data?.message || "Failed to update status.",
			});
		}
	}

  const columns = [
	{
		key: "title",
		label: "Title",
		render: (row) => (
			<div>
				<div
					style={{
						fontWeight: 500,
						color: "var(--text-primary)",
						fontSize: 13,
					}}
				>
					{row.title}
				</div>

				<div className="slug">/{row.slug}</div>
			</div>
		),
	},

	{
		key: "category",
		label: "Category",
		render: (row) => row.category?.name || "-",
	},

	{
		key: "description",
		label: "Description",
		render: (row) => {
			const text = stripHtml(row.description);

			return (
				<span
					style={{
						color: "var(--text-muted)",
						fontSize: 12,
					}}
				>
					{text.slice(0, 80)}
					{text.length > 80 ? "..." : ""}
				</span>
			);
		},
	},

	{
		key: "status",
		label: "Status",
		style: {
			width: 100,
		},
		render: (row) => (
			<StatusBadge published={row.status === "published"}/>
		),
	},

	{
		key: "date",
		label: "Published",
		style: {width: 120},
		render: (row) =>
			row.blogDate
				? new Date(row.blogDate).toLocaleDateString()
				: "-",
	},

	{
		key: "actions",
		label: "",
		style: {width: 170},
		render: (row) => (
			<div className="actions">

				<Btn
					size="sm"
					variant="ghost"
					onClick={() => navigate(`/blog/edit/${row._id}`)}
				>
					Edit
				</Btn>


				<Btn
					size="sm"
					variant={row.status === "published" ? "secondary" : "success"}
					onClick={() =>handleToggle(row._id)}
				>
					{row.status === "published" ? "Unpublish" : "Publish"}
				</Btn>


				<Btn
					size="sm"
					variant="danger"
					onClick={() =>
						setConfirm({
							id: row._id,
							title: row.title,
						})
					}
				>
					Delete
				</Btn>

			</div>
		),
	},
];
	return (
		<>
			<PageHeader
				title="Blogs"
				subtitle="Manage blog posts"
				action={
					<Btn
						variant="primary"
						icon={<PlusIcon />}
						onClick={() => navigate("/blog/new")}
					>
						Add Blog
					</Btn>
				}
			/>

			<div className="filters">
				<SearchBar
					value={search}
					onChange={setSearch}
					placeholder="Search blogs..."
				/>

				<span
					style={{
						fontSize: 12,
						color: "var(--text-muted)",
						marginLeft: "auto",
						whiteSpace: "nowrap",
					}}
				>
					{filtered.length} entries
				</span>
			</div>

			{!isLoading && filtered.length === 0 ? (
				<EmptyState
					title="No blogs yet"
					description="Add your first blog to get started."
					action={
						<Btn variant="primary" onClick={() => navigate("/blog/new")}>
							Add Blog
						</Btn>
					}
				/>
			) : (
				<Table columns={columns} data={filtered} loading={isLoading} />
			)}

			<ConfirmDialog
				open={!!confirm}
				onClose={() => setConfirm(null)}
				onConfirm={handleDelete}
				loading={deleting}
				title="Delete Blog"
				message={`Delete "${confirm?.title}"? This cannot be undone.`}
			/>

			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(null)}
				/>
			)}
		</>
	);
}

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

