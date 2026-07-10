"use client";

import { useState, useEffect, useCallback } from "react";
import { initGitHub, fetchProjects, saveProjectBatch, fetchBlogs, saveBlogBatch } from "@/lib/github-cms";
import { Story, BlogPost } from "@/lib/data";

type AdminTab = "projects" | "blogs";

export default function AdminPage() {
    const [token, setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState<AdminTab>("projects");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [msgType, setMsgType] = useState<"success" | "error">("success");

    // ── Projects state ──────────────────────────────────────────────────────
    const [projects, setProjects] = useState<Story[]>([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [newProject, setNewProject] = useState<Partial<Story>>({
        id: "", title: "", category: "Residential", excerpt: "", content: "",
        date: new Date().getFullYear().toString(), siteArea: "", status: "completed",
        imageUrl: "", images: [],
    });
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [customCategory, setCustomCategory] = useState("");

    const PRESET_CATEGORIES = ["Residential", "Commercial", "Interior", "Public", "Institutional", "Clinical", "Other"];

    // ── Blog state ───────────────────────────────────────────────────────────
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
        id: "", title: "", author: "CREANEERS Studio", date: new Date().toISOString().split("T")[0],
        excerpt: "", content: "", coverImage: "", tags: [],
    });
    const [blogCoverFile, setBlogCoverFile] = useState<File | null>(null);
    const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
    const [tagInput, setTagInput] = useState("");

    // ── Auth ─────────────────────────────────────────────────────────────────
    const handleLogin = useCallback(async (authToken: string) => {
        setLoading(true);
        setMessage("");
        try {
            initGitHub(authToken);
            const [projectRes, blogRes] = await Promise.all([fetchProjects(), fetchBlogs()]);
            setProjects(projectRes.content);
            setBlogs(blogRes.content);
            setIsLoggedIn(true);
            localStorage.setItem("github_cms_token", authToken);
        } catch (error: unknown) {
            setMsgType("error");
            setMessage(error instanceof Error ? error.message : "Authentication failed");
            localStorage.removeItem("github_cms_token");
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const savedToken = localStorage.getItem("github_cms_token");
        if (savedToken) {
            handleLogin(savedToken);
        }
    }, [handleLogin]);

    const handleLogout = () => {
        localStorage.removeItem("github_cms_token");
        setIsLoggedIn(false);
        setToken("");
        setProjects([]);
        setBlogs([]);
    };

    // ── Helpers ───────────────────────────────────────────────────────────────
    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (err) => reject(err);
        });

    const showMsg = (text: string, type: "success" | "error" = "success") => {
        setMsgType(type);
        setMessage(text);
    };

    // ── Project CRUD ──────────────────────────────────────────────────────────
    const handleEditProject = (project: Story) => {
        setEditingProjectId(project.id);
        setNewProject({ ...project, content: project.content.replace(/<p>/g, "").replace(/<\/p>/g, "") });
        // If the saved category is a custom one (not in presets), restore it into the custom input
        setCustomCategory(!PRESET_CATEGORIES.includes(project.category) ? project.category : "");
        setCoverImageFile(null);
        setGalleryFiles([]);
        setShowProjectForm(true);
        setMessage("");
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        setLoading(true);
        setMessage("");
        try {
            const updated = projects.filter((p) => p.id !== id);
            await saveProjectBatch(updated, []);
            const refreshed = await fetchProjects();
            setProjects(refreshed.content);
            setSha(refreshed.sha);
            showMsg("Project deleted successfully!");
        } catch (error: unknown) {
            showMsg("Failed to delete project: " + (error instanceof Error ? error.message : "Unknown error"), "error");
        }
        setLoading(false);
    };

    const handleSaveProject = async () => {
        setLoading(true);
        setMessage("");
        try {
            const projectId = newProject.title?.toLowerCase().replace(/[^a-z0-9]+/g, "_") || `project_${Date.now()}`;
            let uploadedCover = "";
            const uploadedGallery: string[] = [];
            const filesToUpload: { path: string; base64: string }[] = [];

            if (coverImageFile) {
                const base64 = await fileToBase64(coverImageFile);
                const ext = coverImageFile.name.split(".").pop();
                const path = `public/images/projects/${projectId}/cover.${ext}`;
                filesToUpload.push({ path, base64 });
                uploadedCover = `/${path.replace("public/", "")}`;
            }

            for (let i = 0; i < galleryFiles.length; i++) {
                const file = galleryFiles[i];
                const base64 = await fileToBase64(file);
                const ext = file.name.split(".").pop();
                const path = `public/images/projects/${projectId}/gallery_${i + 1}.${ext}`;
                filesToUpload.push({ path, base64 });
                uploadedGallery.push(`/${path.replace("public/", "")}`);
            }

            const projectToSave: Story = {
                id: editingProjectId || projectId,
                title: newProject.title || "Untitled",
                category: newProject.category || "Other",
                excerpt: newProject.excerpt || "",
                content: `<p>${newProject.content}</p>`,
                date: newProject.date || "",
                siteArea: newProject.siteArea || "",
                status: (newProject.status as "completed" | "ongoing" | "idea") || "completed",
                imageUrl: uploadedCover || (editingProjectId ? projects.find((p) => p.id === editingProjectId)?.imageUrl : ""),
                images: (uploadedCover || uploadedGallery.length > 0)
                    ? [uploadedCover, ...uploadedGallery].filter(Boolean)
                    : (editingProjectId ? projects.find((p) => p.id === editingProjectId)?.images : []),
            };

            const updatedProjects = editingProjectId
                ? projects.map((p) => (p.id === editingProjectId ? projectToSave : p))
                : [projectToSave, ...projects];

            await saveProjectBatch(updatedProjects, filesToUpload);
            const refreshed = await fetchProjects();
            setProjects(refreshed.content);
            setSha(refreshed.sha);

            setShowProjectForm(false);
            setEditingProjectId(null);
            setCoverImageFile(null);
            setGalleryFiles([]);
            setNewProject({ id: "", title: "", category: "Residential", excerpt: "", content: "", date: new Date().getFullYear().toString(), siteArea: "", status: "completed", imageUrl: "", images: [] });
            showMsg("Project saved! The site will rebuild and deploy shortly.");
        } catch (error: unknown) {
            showMsg("Failed to save project: " + (error instanceof Error ? error.message : "Unknown error"), "error");
        }
        setLoading(false);
    };

    // ── Blog CRUD ─────────────────────────────────────────────────────────────
    const handleEditBlog = (post: BlogPost) => {
        setEditingBlogId(post.id);
        setNewBlog({ ...post, content: post.content });
        setTagInput((post.tags || []).join(", "));
        setBlogCoverFile(null);
        setShowBlogForm(true);
        setMessage("");
    };

    const handleDeleteBlog = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog post?")) return;
        setLoading(true);
        setMessage("");
        try {
            const updated = blogs.filter((b) => b.id !== id);
            await saveBlogBatch(updated, []);
            const refreshed = await fetchBlogs();
            setBlogs(refreshed.content);
            showMsg("Blog post deleted successfully!");
        } catch (error: unknown) {
            showMsg("Failed to delete blog: " + (error instanceof Error ? error.message : "Unknown error"), "error");
        }
        setLoading(false);
    };

    const handleSaveBlog = async () => {
        setLoading(true);
        setMessage("");
        try {
            const blogId = newBlog.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `post-${Date.now()}`;
            const tags = tagInput.split(",").map((t) => t.trim()).filter(Boolean);

            let uploadedCover = editingBlogId ? (blogs.find((b) => b.id === editingBlogId)?.coverImage || "") : "";
            const filesToUpload: { path: string; base64: string }[] = [];

            if (blogCoverFile) {
                const base64 = await fileToBase64(blogCoverFile);
                const ext = blogCoverFile.name.split(".").pop();
                const path = `public/images/blog/${blogId}/cover.${ext}`;
                filesToUpload.push({ path, base64 });
                uploadedCover = `/${path.replace("public/", "")}`;
            }

            const postToSave: BlogPost = {
                id: editingBlogId || blogId,
                title: newBlog.title || "Untitled",
                author: newBlog.author || "CREANEERS Studio",
                date: newBlog.date || new Date().toISOString().split("T")[0],
                excerpt: newBlog.excerpt || "",
                content: newBlog.content || "",
                coverImage: uploadedCover || undefined,
                tags,
            };

            const updatedBlogs = editingBlogId
                ? blogs.map((b) => (b.id === editingBlogId ? postToSave : b))
                : [postToSave, ...blogs];

            await saveBlogBatch(updatedBlogs, filesToUpload);
            const refreshed = await fetchBlogs();
            setBlogs(refreshed.content);

            setShowBlogForm(false);
            setEditingBlogId(null);
            setBlogCoverFile(null);
            setTagInput("");
            setNewBlog({ id: "", title: "", author: "CREANEERS Studio", date: new Date().toISOString().split("T")[0], excerpt: "", content: "", coverImage: "", tags: [] });
            showMsg("Blog post saved! The site will rebuild and deploy shortly.");
        } catch (error: unknown) {
            showMsg("Failed to save blog post: " + (error instanceof Error ? error.message : "Unknown error"), "error");
        }
        setLoading(false);
    };

    // ── Login Screen ──────────────────────────────────────────────────────────
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl shadow-xl max-w-md w-full">
                    <h1 className="text-3xl font-serif mb-6 text-center text-white">Admin Login</h1>
                    <p className="text-neutral-400 mb-6 text-sm text-center">
                        Enter your GitHub Personal Access Token to manage projects and blog posts.
                    </p>
                    <input
                        type="password"
                        placeholder="GitHub PAT (ghp_...)"
                        className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded mb-4 outline-none focus:ring-2 focus:ring-white"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <button
                        onClick={() => handleLogin(token)}
                        disabled={loading || !token}
                        className="w-full bg-white text-black p-3 rounded font-medium hover:bg-neutral-200 transition disabled:opacity-50"
                    >
                        {loading ? "Authenticating..." : "Login"}
                    </button>
                    {message && <p className="text-red-400 mt-4 text-center text-sm">{message}</p>}
                </div>
            </div>
        );
    }

    // ── Dashboard ─────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-neutral-950 p-6 md:p-12 text-neutral-100">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif text-white">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="text-neutral-400 hover:text-white underline text-sm">
                        Logout
                    </button>
                </div>

                {/* Tab switcher */}
                <div className="flex gap-1 mb-10 bg-neutral-900 border border-neutral-800 rounded-lg p-1 w-fit">
                    {(["projects", "blogs"] as AdminTab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setMessage(""); }}
                            className={`px-6 py-2 rounded-md text-sm font-medium uppercase tracking-widest transition-all ${
                                activeTab === tab
                                    ? "bg-white text-black"
                                    : "text-neutral-400 hover:text-white"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Toast message */}
                {message && (
                    <div className={`border px-4 py-3 rounded mb-6 text-sm ${
                        msgType === "error"
                            ? "bg-red-900/50 border-red-800 text-red-200"
                            : "bg-green-900/50 border-green-800 text-green-200"
                    }`}>
                        {message}
                    </div>
                )}

                {/* ══ PROJECTS TAB ══════════════════════════════════════════════ */}
                {activeTab === "projects" && (
                    <div>
                        {!showProjectForm ? (
                            <div>
                                <button
                                    onClick={() => {
                                        setEditingProjectId(null);
                                        setCustomCategory("");
                                        setNewProject({ id: "", title: "", category: "Residential", excerpt: "", content: "", date: new Date().getFullYear().toString(), siteArea: "", status: "completed", imageUrl: "", images: [] });
                                        setShowProjectForm(true);
                                    }}
                                    className="bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-neutral-200 transition mb-10 inline-block font-medium"
                                >
                                    + Add New Project
                                </button>

                                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                                    <h2 className="text-xl font-medium mb-6 text-white">Projects ({projects.length})</h2>
                                    {projects.length === 0 ? <p className="text-neutral-400">No projects found.</p> : (
                                        <ul className="divide-y divide-neutral-800">
                                            {projects.map((p) => (
                                                <li key={p.id} className="py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                                    <div>
                                                        <p className="font-medium text-white">{p.title}</p>
                                                        <p className="text-sm text-neutral-400">{p.category} · {p.date} · <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${p.status === "ongoing" ? "bg-amber-900/50 text-amber-200" : p.status === "idea" ? "bg-blue-900/50 text-blue-200" : "bg-green-900/50 text-green-200"}`}>{p.status || "completed"}</span></p>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <button onClick={() => handleEditProject(p)} className="text-sm px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition">Edit</button>
                                                        <button onClick={() => handleDeleteProject(p.id)} className="text-sm px-4 py-2 bg-red-900/50 hover:bg-red-900/80 text-red-200 rounded transition">Delete</button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 md:p-10">
                                <h2 className="text-2xl font-serif mb-8 border-b border-neutral-800 pb-4 text-white">
                                    {editingProjectId ? "Edit Project" : "Add New Project"}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">Project Title</label>
                                        <input type="text" className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none"
                                            value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">Category</label>
                                        <select
                                            className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none"
                                            value={PRESET_CATEGORIES.includes(newProject.category ?? "") ? newProject.category : "Other"}
                                            onChange={(e) => {
                                                if (e.target.value !== "Other") {
                                                    setCustomCategory("");
                                                    setNewProject({ ...newProject, category: e.target.value });
                                                } else {
                                                    setNewProject({ ...newProject, category: customCategory || "Other" });
                                                }
                                            }}
                                        >
                                            {PRESET_CATEGORIES.map((cat) => (
                                                <option key={cat}>{cat}</option>
                                            ))}
                                        </select>
                                        {/* Conditional custom input shown when "Other" is selected */}
                                        {(newProject.category === "Other" || (!PRESET_CATEGORIES.includes(newProject.category ?? "") && newProject.category !== "")) && (
                                            <div className="mt-3 flex items-center gap-2">
                                                <span className="text-neutral-500 text-xs uppercase tracking-widest whitespace-nowrap">Specify:</span>
                                                <input
                                                    type="text"
                                                    autoFocus
                                                    placeholder="e.g. Hospitality, Landscape..."
                                                    className="flex-1 bg-neutral-950 border border-dashed border-neutral-600 text-white p-2 rounded focus:ring-2 focus:ring-white outline-none text-sm transition-all"
                                                    value={PRESET_CATEGORIES.includes(newProject.category ?? "") ? customCategory : (newProject.category ?? "")}
                                                    onChange={(e) => {
                                                        setCustomCategory(e.target.value);
                                                        setNewProject({ ...newProject, category: e.target.value || "Other" });
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">Year / Date</label>
                                        <input type="text" className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none"
                                            value={newProject.date} onChange={(e) => setNewProject({ ...newProject, date: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">Site Area</label>
                                        <input type="text" className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none"
                                            value={newProject.siteArea} onChange={(e) => setNewProject({ ...newProject, siteArea: e.target.value })} placeholder="e.g. 1050 sq.ft." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">Status</label>
                                        <select className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none"
                                            value={newProject.status || "completed"} onChange={(e) => setNewProject({ ...newProject, status: e.target.value as "completed" | "ongoing" | "idea" })}>
                                            <option value="completed">Completed</option>
                                            <option value="ongoing">Ongoing</option>
                                            <option value="idea">Idea</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">Short Excerpt</label>
                                    <textarea className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none h-24"
                                        value={newProject.excerpt} onChange={(e) => setNewProject({ ...newProject, excerpt: e.target.value })} />
                                </div>

                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">Full Content / Description</label>
                                    <textarea className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none h-40"
                                        value={newProject.content} onChange={(e) => setNewProject({ ...newProject, content: e.target.value })} />
                                </div>

                                <div className="mb-8 bg-neutral-950 p-6 rounded-lg border border-neutral-800">
                                    <h3 className="font-medium text-white mb-4">Images</h3>
                                    <div className="mb-4">
                                        <label className="block text-sm text-neutral-400 mb-2">Cover Image {editingProjectId && "— Leave blank to keep existing"}</label>
                                        <input type="file" accept="image/*" className="w-full text-sm text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
                                            onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-neutral-400 mb-2">Gallery Images {editingProjectId && "— Leave blank to keep existing"}</label>
                                        <input type="file" accept="image/*" multiple className="w-full text-sm text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
                                            onChange={(e) => { if (e.target.files) setGalleryFiles(Array.from(e.target.files)); }} />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={handleSaveProject} disabled={loading || !newProject.title || (!editingProjectId && !coverImageFile)}
                                        className="bg-white text-black px-8 py-3 rounded shadow hover:bg-neutral-200 transition disabled:opacity-50 font-medium">
                                        {loading ? "Uploading & Saving..." : "Save Project"}
                                    </button>
                                    <button onClick={() => { setShowProjectForm(false); setEditingProjectId(null); }} disabled={loading}
                                        className="bg-neutral-900 border border-neutral-700 text-white px-8 py-3 rounded shadow-sm hover:bg-neutral-800 transition">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ══ BLOGS TAB ═════════════════════════════════════════════════ */}
                {activeTab === "blogs" && (
                    <div>
                        {!showBlogForm ? (
                            <div>
                                <button
                                    onClick={() => {
                                        setEditingBlogId(null);
                                        setTagInput("");
                                        setNewBlog({ id: "", title: "", author: "CREANEERS Studio", date: new Date().toISOString().split("T")[0], excerpt: "", content: "", coverImage: "", tags: [] });
                                        setShowBlogForm(true);
                                    }}
                                    className="bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-neutral-200 transition mb-10 inline-block font-medium"
                                >
                                    + Write New Post
                                </button>

                                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                                    <h2 className="text-xl font-medium mb-6 text-white">Blog Posts ({blogs.length})</h2>
                                    {blogs.length === 0 ? (
                                        <div className="text-center py-12">
                                            <p className="text-neutral-400 mb-2">No blog posts yet.</p>
                                            <p className="text-neutral-600 text-sm">Click &ldquo;Write New Post&rdquo; to publish your first article.</p>
                                        </div>
                                    ) : (
                                        <ul className="divide-y divide-neutral-800">
                                            {blogs.map((b) => (
                                                <li key={b.id} className="py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                                    <div>
                                                        <p className="font-medium text-white">{b.title}</p>
                                                        <p className="text-sm text-neutral-400">
                                                            {b.author} · {new Date(b.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                            {b.tags && b.tags.length > 0 && (
                                                                <span className="ml-2">{b.tags.map(t => `#${t}`).join(" ")}</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <button onClick={() => handleEditBlog(b)} className="text-sm px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition">Edit</button>
                                                        <button onClick={() => handleDeleteBlog(b.id)} className="text-sm px-4 py-2 bg-red-900/50 hover:bg-red-900/80 text-red-200 rounded transition">Delete</button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 md:p-10">
                                <h2 className="text-2xl font-serif mb-8 border-b border-neutral-800 pb-4 text-white">
                                    {editingBlogId ? "Edit Blog Post" : "Write New Post"}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">Title</label>
                                        <input type="text" className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none"
                                            value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                                            placeholder="Your article title..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">Author</label>
                                        <input type="text" className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none"
                                            value={newBlog.author} onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">Date</label>
                                        <input type="date" className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none"
                                            value={newBlog.date} onChange={(e) => setNewBlog({ ...newBlog, date: e.target.value })} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">Tags <span className="text-neutral-500">(comma-separated, e.g. Architecture, Design)</span></label>
                                        <input type="text" className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none"
                                            value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                                            placeholder="Architecture, Interior Design, Sustainability" />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">Excerpt <span className="text-neutral-500">(shown on listing page)</span></label>
                                    <textarea className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none h-24"
                                        value={newBlog.excerpt} onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                                        placeholder="A short teaser for your post..." />
                                </div>

                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Full Content <span className="text-neutral-500">(HTML supported — use &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;strong&gt;, etc.)</span>
                                    </label>
                                    <textarea className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none h-64 font-mono text-sm leading-relaxed"
                                        value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                                        placeholder="<p>Write your article content here...</p>&#10;<p>You can use full HTML including headings, lists, links, etc.</p>" />
                                </div>

                                <div className="mb-8 bg-neutral-950 p-6 rounded-lg border border-neutral-800">
                                    <h3 className="font-medium text-white mb-4">Cover Image</h3>
                                    <label className="block text-sm text-neutral-400 mb-2">{editingBlogId ? "Leave blank to keep existing cover" : "Upload a cover image (optional)"}</label>
                                    <input type="file" accept="image/*" className="w-full text-sm text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
                                        onChange={(e) => setBlogCoverFile(e.target.files?.[0] || null)} />
                                    {editingBlogId && blogs.find(b => b.id === editingBlogId)?.coverImage && (
                                        <p className="text-xs text-neutral-500 mt-2">Current: {blogs.find(b => b.id === editingBlogId)?.coverImage}</p>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={handleSaveBlog} disabled={loading || !newBlog.title || !newBlog.excerpt || !newBlog.content}
                                        className="bg-white text-black px-8 py-3 rounded shadow hover:bg-neutral-200 transition disabled:opacity-50 font-medium">
                                        {loading ? "Saving..." : "Publish Post"}
                                    </button>
                                    <button onClick={() => { setShowBlogForm(false); setEditingBlogId(null); setTagInput(""); }} disabled={loading}
                                        className="bg-neutral-900 border border-neutral-700 text-white px-8 py-3 rounded shadow-sm hover:bg-neutral-800 transition">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
