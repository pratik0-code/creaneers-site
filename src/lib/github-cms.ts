import { Octokit } from '@octokit/rest';

const REPO_OWNER = 'pratik0-code';
const REPO_NAME = 'creaneers-site';
const BRANCH = 'main'; // default branch

let octokit: Octokit | null = null;

export const initGitHub = (token: string) => {
    octokit = new Octokit({ auth: token });
};

// Fetch current data.json from GitHub
export const fetchProjects = async () => {
    if (!octokit) throw new Error("GitHub not initialized");
    try {
        const { data } = await octokit.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: 'src/lib/data.json',
            ref: BRANCH,
        });

        if ('content' in data && data.content) {
            const decoded = atob(data.content);
            return {
                content: JSON.parse(decoded),
                sha: data.sha
            };
        }
        return { content: [], sha: undefined };
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw new Error("Could not fetch projects. Are you sure your token is correct?");
    }
};

// Upload an image to GitHub
export const uploadImage = async (fileBase64: string, path: string) => {
    if (!octokit) throw new Error("GitHub not initialized");
    // Strip the "data:image/...;base64," part
    const content = fileBase64.split(',')[1];

    try {
        const { data } = await octokit.repos.createOrUpdateFileContents({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path,
            message: `Upload image: ${path}`,
            content,
            branch: BRANCH,
        });
        return data.content?.path || path;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Failed to upload image.");
    }
};

// Update data.json with new projects
export const updateProjects = async (projects: any[], sha?: string) => {
    if (!octokit) throw new Error("GitHub not initialized");
    
    const content = btoa(JSON.stringify(projects, null, 4));

    try {
        await octokit.repos.createOrUpdateFileContents({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: 'src/lib/data.json',
            message: 'Update projects data via Admin Panel',
            content,
            sha,
            branch: BRANCH,
        });
    } catch (error) {
        console.error("Error updating data.json:", error);
        throw new Error("Failed to save project data.");
    }
};
