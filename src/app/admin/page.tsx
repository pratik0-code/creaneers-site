"use client";

import { useState, useEffect } from "react";
import { initGitHub, fetchProjects, uploadImage, updateProjects } from "@/lib/github-cms";
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

    const handleSaveProject = async () => {
        setLoading(true);
        setMessage("");
        try {
            const projectId = newProject.title?.toLowerCase().replace(/[^a-z0-9]+/g, '_') || `project_${Date.now()}`;
            
            let uploadedCover = "";
            const uploadedGallery: string[] = [];

            // Upload Cover Image
            if (coverImageFile) {
                const base64 = await fileToBase64(coverImageFile);
                const ext = coverImageFile.name.split('.').pop();
                const path = `public/images/projects/${projectId}/cover.${ext}`;
                await uploadImage(base64, path);
                uploadedCover = `/${path.replace('public/', '')}`;
            }

            // Upload Gallery Images
            for (let i = 0; i < galleryFiles.length; i++) {
                const file = galleryFiles[i];
                const base64 = await fileToBase64(file);
                const ext = file.name.split('.').pop();
                const path = `public/images/projects/${projectId}/gallery_${i + 1}.${ext}`;
                await uploadImage(base64, path);
                uploadedGallery.push(`/${path.replace('public/', '')}`);
            }

            // Create new project object
            const projectToSave: Story = {
                id: projectId,
                title: newProject.title || "Untitled",
                category: newProject.category || "Other",
                excerpt: newProject.excerpt || "",
                content: `<p>${newProject.content}</p>`,
                date: newProject.date || "",
                siteArea: newProject.siteArea || "",
                imageUrl: uploadedCover,
                images: [uploadedCover, ...uploadedGallery].filter(Boolean),
            };

            const updatedProjects = [projectToSave, ...projects];
            await updateProjects(updatedProjects, sha);

            // Refresh state
            const refreshed = await fetchProjects();
            setProjects(refreshed.content);
            setSha(refreshed.sha);
            
            setShowForm(false);
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
            <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-6">
                <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
                    <h1 className="text-3xl font-serif mb-6 text-center text-neutral-900">Admin Login</h1>
                    <p className="text-neutral-500 mb-6 text-sm text-center">
                        Enter your GitHub Personal Access Token to manage projects.
                    </p>
                    <input 
                        type="password" 
                        placeholder="GitHub PAT (ghp_...)" 
                        className="w-full border p-3 rounded mb-4 outline-none focus:ring-2 focus:ring-neutral-800"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <button 
                        onClick={() => handleLogin(token)}
                        disabled={loading || !token}
                        className="w-full bg-neutral-900 text-white p-3 rounded font-medium hover:bg-neutral-800 transition disabled:opacity-50"
                    >
                        {loading ? "Authenticating..." : "Login"}
                    </button>
                    {message && <p className="text-red-500 mt-4 text-center text-sm">{message}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-serif text-neutral-900">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="text-neutral-500 hover:text-neutral-900 underline text-sm">
                        Logout
                    </button>
                </div>

                {message && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                        {message}
                    </div>
                )}

                {!showForm ? (
                    <div>
                        <button 
                            onClick={() => setShowForm(true)}
                            className="bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-md hover:bg-neutral-800 transition mb-10 inline-block font-medium"
                        >
                            + Add New Project
                        </button>

                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-xl font-medium mb-6">Current Projects</h2>
                            {projects.length === 0 ? <p className="text-neutral-500">No projects found.</p> : (
                                <ul className="divide-y">
                                    {projects.map((p) => (
                                        <li key={p.id} className="py-4 flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-neutral-900">{p.title}</p>
                                                <p className="text-sm text-neutral-500">{p.category} • {p.date}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border p-6 md:p-10">
                        <h2 className="text-2xl font-serif mb-8 border-b pb-4">Add New Project</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Project Title</label>
                                <input type="text" className="w-full border p-3 rounded focus:ring-2 focus:ring-neutral-800 outline-none" 
                                    value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                                <select className="w-full border p-3 rounded focus:ring-2 focus:ring-neutral-800 outline-none"
                                    value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})}>
                                    <option>Residential</option>
                                    <option>Commercial</option>
                                    <option>Interior</option>
                                    <option>Public</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Year / Date</label>
                                <input type="text" className="w-full border p-3 rounded focus:ring-2 focus:ring-neutral-800 outline-none" 
                                    value={newProject.date} onChange={e => setNewProject({...newProject, date: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Site Area</label>
                                <input type="text" className="w-full border p-3 rounded focus:ring-2 focus:ring-neutral-800 outline-none" 
                                    value={newProject.siteArea} onChange={e => setNewProject({...newProject, siteArea: e.target.value})} placeholder="e.g. 1050 sq.ft." />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Short Excerpt (shows on home page)</label>
                            <textarea className="w-full border p-3 rounded focus:ring-2 focus:ring-neutral-800 outline-none h-24"
                                value={newProject.excerpt} onChange={e => setNewProject({...newProject, excerpt: e.target.value})} />
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Full Content / Description</label>
                            <textarea className="w-full border p-3 rounded focus:ring-2 focus:ring-neutral-800 outline-none h-40"
                                value={newProject.content} onChange={e => setNewProject({...newProject, content: e.target.value})} />
                        </div>

                        <div className="mb-8 bg-neutral-50 p-6 rounded-lg border">
                            <h3 className="font-medium mb-4">Images</h3>
                            <div className="mb-4">
                                <label className="block text-sm text-neutral-600 mb-2">Cover Image (Main Image)</label>
                                <input type="file" accept="image/*" className="w-full text-sm"
                                    onChange={e => setCoverImageFile(e.target.files?.[0] || null)} />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-600 mb-2">Gallery Images</label>
                                <input type="file" accept="image/*" multiple className="w-full text-sm"
                                    onChange={e => {
                                        if (e.target.files) setGalleryFiles(Array.from(e.target.files));
                                    }} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                onClick={handleSaveProject} 
                                disabled={loading || !newProject.title || !coverImageFile}
                                className="bg-neutral-900 text-white px-8 py-3 rounded shadow hover:bg-neutral-800 transition disabled:opacity-50 font-medium"
                            >
                                {loading ? "Uploading & Saving..." : "Save Project"}
                            </button>
                            <button 
                                onClick={() => setShowForm(false)} 
                                disabled={loading}
                                className="bg-white border text-neutral-700 px-8 py-3 rounded shadow-sm hover:bg-neutral-50 transition"
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
