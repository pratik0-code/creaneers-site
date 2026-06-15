"use client";

import { useState, useEffect } from "react";
import { initGitHub, fetchProjects, saveProjectBatch } from "@/lib/github-cms";
import { Story } from "@/lib/data";

export default function AdminPage() {
    const [token, setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [projects, setProjects] = useState<Story[]>([]);
    const [sha, setSha] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // New Project Form State
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState<Partial<Story>>({
        id: "",
        title: "",
        category: "Residential",
        excerpt: "",
        content: "",
        date: new Date().getFullYear().toString(),
        siteArea: "",
        imageUrl: "",
        images: []
    });
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("github_cms_token");
        if (savedToken) {
            setToken(savedToken);
            handleLogin(savedToken);
        }
    }, []);

    const handleLogin = async (authToken: string) => {
        setLoading(true);
        setMessage("");
        try {
            initGitHub(authToken);
            const { content, sha } = await fetchProjects();
            setProjects(content);
            setSha(sha);
            setIsLoggedIn(true);
            localStorage.setItem("github_cms_token", authToken);
        } catch (error: any) {
            setMessage(error.message);
            localStorage.removeItem("github_cms_token");
        }
        setLoading(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("github_cms_token");
        setIsLoggedIn(false);
        setToken("");
        setProjects([]);
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleEditProject = (project: Story) => {
        setEditingId(project.id);
        setNewProject({
            ...project,
            content: project.content.replace(/<p>/g, '').replace(/<\/p>/g, '') // strip p tags for editing
        });
        setCoverImageFile(null);
        setGalleryFiles([]);
        setShowForm(true);
        setMessage("");
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        setLoading(true);
        setMessage("");
        try {
            const updatedProjects = projects.filter(p => p.id !== id);
            await saveProjectBatch(updatedProjects, []);
            const refreshed = await fetchProjects();
            setProjects(refreshed.content);
            setSha(refreshed.sha);
            setMessage("Project deleted successfully!");
        } catch (error: any) {
            setMessage("Failed to delete project: " + error.message);
        }
        setLoading(false);
    };

    const handleSaveProject = async () => {
        setLoading(true);
        setMessage("");
        try {
            const projectId = newProject.title?.toLowerCase().replace(/[^a-z0-9]+/g, '_') || `project_${Date.now()}`;
            
            let uploadedCover = "";
            const uploadedGallery: string[] = [];

            const filesToUpload: { path: string; base64: string }[] = [];

            // Upload Cover Image
            if (coverImageFile) {
                const base64 = await fileToBase64(coverImageFile);
                const ext = coverImageFile.name.split('.').pop();
                const path = `public/images/projects/${projectId}/cover.${ext}`;
                filesToUpload.push({ path, base64 });
                uploadedCover = `/${path.replace('public/', '')}`;
            }

            // Upload Gallery Images
            for (let i = 0; i < galleryFiles.length; i++) {
                const file = galleryFiles[i];
                const base64 = await fileToBase64(file);
                const ext = file.name.split('.').pop();
                const path = `public/images/projects/${projectId}/gallery_${i + 1}.${ext}`;
                filesToUpload.push({ path, base64 });
                uploadedGallery.push(`/${path.replace('public/', '')}`);
            }

            // Create new project object
            const projectToSave: Story = {
                id: editingId || projectId,
                title: newProject.title || "Untitled",
                category: newProject.category || "Other",
                excerpt: newProject.excerpt || "",
                content: `<p>${newProject.content}</p>`,
                date: newProject.date || "",
                siteArea: newProject.siteArea || "",
                imageUrl: uploadedCover || (editingId ? projects.find(p => p.id === editingId)?.imageUrl : ""),
                images: (uploadedCover || uploadedGallery.length > 0)
                    ? [uploadedCover, ...uploadedGallery].filter(Boolean)
                    : (editingId ? projects.find(p => p.id === editingId)?.images : []),
            };

            let updatedProjects;
            if (editingId) {
                updatedProjects = projects.map(p => p.id === editingId ? projectToSave : p);
            } else {
                updatedProjects = [projectToSave, ...projects];
            }
            await saveProjectBatch(updatedProjects, filesToUpload);

            // Refresh state
            const refreshed = await fetchProjects();
            setProjects(refreshed.content);
            setSha(refreshed.sha);
            
            setShowForm(false);
            setEditingId(null);
            setCoverImageFile(null);
            setGalleryFiles([]);
            setNewProject({
                id: "", title: "", category: "Residential", excerpt: "", content: "", date: new Date().getFullYear().toString(), siteArea: "", imageUrl: "", images: []
            });
            setMessage("Project saved successfully! The site will automatically rebuild and deploy soon.");

        } catch (error: any) {
            setMessage("Failed to save project: " + error.message);
        }
        setLoading(false);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl shadow-xl max-w-md w-full">
                    <h1 className="text-3xl font-serif mb-6 text-center text-white">Admin Login</h1>
                    <p className="text-neutral-400 mb-6 text-sm text-center">
                        Enter your GitHub Personal Access Token to manage projects.
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

    return (
        <div className="min-h-screen bg-neutral-950 p-6 md:p-12 text-neutral-100">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-serif text-white">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="text-neutral-400 hover:text-white underline text-sm">
                        Logout
                    </button>
                </div>

                {message && (
                    <div className="bg-green-900/50 border border-green-800 text-green-200 px-4 py-3 rounded mb-6">
                        {message}
                    </div>
                )}

                {!showForm ? (
                    <div>
                        <button 
                            onClick={() => {
                                setEditingId(null);
                                setNewProject({ id: "", title: "", category: "Residential", excerpt: "", content: "", date: new Date().getFullYear().toString(), siteArea: "", imageUrl: "", images: [] });
                                setShowForm(true);
                            }}
                            className="bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-neutral-200 transition mb-10 inline-block font-medium"
                        >
                            + Add New Project
                        </button>

                        <div className="bg-neutral-900 rounded-xl shadow-sm border border-neutral-800 p-6">
                            <h2 className="text-xl font-medium mb-6 text-white">Current Projects</h2>
                            {projects.length === 0 ? <p className="text-neutral-400">No projects found.</p> : (
                                <ul className="divide-y divide-neutral-800">
                                    {projects.map((p) => (
                                        <li key={p.id} className="py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                            <div>
                                                <p className="font-medium text-white">{p.title}</p>
                                                <p className="text-sm text-neutral-400">{p.category} • {p.date}</p>
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
                    <div className="bg-neutral-900 rounded-xl shadow-sm border border-neutral-800 p-6 md:p-10">
                        <h2 className="text-2xl font-serif mb-8 border-b border-neutral-800 pb-4 text-white">
                            {editingId ? "Edit Project" : "Add New Project"}
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">Project Title</label>
                                <input type="text" className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none" 
                                    value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">Category</label>
                                <select className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none"
                                    value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})}>
                                    <option>Residential</option>
                                    <option>Commercial</option>
                                    <option>Interior</option>
                                    <option>Public</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">Year / Date</label>
                                <input type="text" className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none" 
                                    value={newProject.date} onChange={e => setNewProject({...newProject, date: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">Site Area</label>
                                <input type="text" className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none" 
                                    value={newProject.siteArea} onChange={e => setNewProject({...newProject, siteArea: e.target.value})} placeholder="e.g. 1050 sq.ft." />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Short Excerpt (shows on home page)</label>
                            <textarea className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none h-24"
                                value={newProject.excerpt} onChange={e => setNewProject({...newProject, excerpt: e.target.value})} />
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Full Content / Description</label>
                            <textarea className="w-full bg-neutral-950 border border-neutral-800 text-white p-3 rounded focus:ring-2 focus:ring-white outline-none h-40"
                                value={newProject.content} onChange={e => setNewProject({...newProject, content: e.target.value})} />
                        </div>

                        <div className="mb-8 bg-neutral-950 p-6 rounded-lg border border-neutral-800">
                            <h3 className="font-medium text-white mb-4">Images</h3>
                            <div className="mb-4">
                                <label className="block text-sm text-neutral-400 mb-2">Cover Image (Main Image) {editingId && "- Leave blank to keep existing"}</label>
                                <input type="file" accept="image/*" className="w-full text-sm text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
                                    onChange={e => setCoverImageFile(e.target.files?.[0] || null)} />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Gallery Images {editingId && "- Leave blank to keep existing"}</label>
                                <input type="file" accept="image/*" multiple className="w-full text-sm text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
                                    onChange={e => {
                                        if (e.target.files) setGalleryFiles(Array.from(e.target.files));
                                    }} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                onClick={handleSaveProject} 
                                disabled={loading || !newProject.title || (!editingId && !coverImageFile)}
                                className="bg-white text-black px-8 py-3 rounded shadow hover:bg-neutral-200 transition disabled:opacity-50 font-medium"
                            >
                                {loading ? "Uploading & Saving..." : "Save Project"}
                            </button>
                            <button 
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingId(null);
                                }} 
                                disabled={loading}
                                className="bg-neutral-900 border border-neutral-700 text-white px-8 py-3 rounded shadow-sm hover:bg-neutral-800 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
