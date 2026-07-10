import { Octokit } from '@octokit/rest';
import type { RestEndpointMethodTypes } from '@octokit/rest';

type TreeItem = RestEndpointMethodTypes["git"]["createTree"]["parameters"]["tree"][number];

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

export interface FileToUpload {
    path: string;
    base64: string;
}

// Batch update images and data.json into a SINGLE commit to prevent traffic jams
export const saveProjectBatch = async (projects: object[], files: FileToUpload[]) => {
    if (!octokit) throw new Error("GitHub not initialized");

    try {
        // 1. Get latest commit SHA
        const { data: refData } = await octokit.git.getRef({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            ref: `heads/${BRANCH}`,
        });
        const latestCommitSha = refData.object.sha;

        // 2. Get base tree SHA
        const { data: commitData } = await octokit.git.getCommit({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            commit_sha: latestCommitSha,
        });
        const baseTreeSha = commitData.tree.sha;

        // 3. Create Blobs for files
        const treeItems: TreeItem[] = [];

        // Upload images
        for (const file of files) {
            const content = file.base64.includes(',') ? file.base64.split(',')[1] : file.base64;
            const { data: blobData } = await octokit.git.createBlob({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                content,
                encoding: "base64",
            });
            treeItems.push({
                path: file.path,
                mode: "100644",
                type: "blob",
                sha: blobData.sha,
            });
        }

        // Upload data.json
        const jsonContent = JSON.stringify(projects, null, 4);
        const { data: jsonBlobData } = await octokit.git.createBlob({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            content: jsonContent,
            encoding: "utf-8",
        });
        treeItems.push({
            path: 'src/lib/data.json',
            mode: "100644",
            type: "blob",
            sha: jsonBlobData.sha,
        });

        // 4. Create New Tree
        const { data: newTreeData } = await octokit.git.createTree({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            base_tree: baseTreeSha,
            tree: treeItems,
        });

        // 5. Create Commit
        const { data: newCommitData } = await octokit.git.createCommit({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            message: "Update project data via Admin Panel (Batch)",
            tree: newTreeData.sha,
            parents: [latestCommitSha],
        });

        // 6. Update Ref
        await octokit.git.updateRef({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            ref: `heads/${BRANCH}`,
            sha: newCommitData.sha,
        });

    } catch (error) {
        console.error("Error batch updating project:", error);
        throw new Error("Failed to batch save project data to GitHub.");
    }
};

// @deprecated - Use saveProjectBatch instead
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const uploadImage = async (_fileBase64: string, _path: string) => {
    throw new Error("uploadImage is deprecated. Use saveProjectBatch.");
};

// @deprecated - Use saveProjectBatch instead
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateProjects = async (_projects: object[], _sha?: string) => {
    throw new Error("updateProjects is deprecated. Use saveProjectBatch.");
};

// ─── Blog CMS ────────────────────────────────────────────────────────────────

/** Fetch current blogs.json from GitHub.
 *  Returns { content: [], sha: undefined } if the file doesn't exist yet (404). */
export const fetchBlogs = async () => {
    if (!octokit) throw new Error("GitHub not initialized");
    try {
        const { data } = await octokit.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: 'src/lib/blogs.json',
            ref: BRANCH,
        });

        if ('content' in data && data.content) {
            const decoded = atob(data.content);
            return {
                content: JSON.parse(decoded),
                sha: data.sha,
            };
        }
        return { content: [], sha: undefined };
    } catch (error: unknown) {
        // If the file simply doesn't exist yet on GitHub, return an empty list
        // instead of crashing — the first saveBlogBatch call will create it.
        if (
            error instanceof Error &&
            'status' in (error as { status?: number }) &&
            (error as { status?: number }).status === 404
        ) {
            return { content: [], sha: undefined };
        }
        console.error("Error fetching blogs:", error);
        throw new Error("Could not fetch blogs. Are you sure your token is correct?");
    }
};

/** Batch save blogs.json + optional cover image into a single commit */
export const saveBlogBatch = async (blogs: object[], files: FileToUpload[]) => {
    if (!octokit) throw new Error("GitHub not initialized");

    try {
        // 1. Latest commit SHA
        const { data: refData } = await octokit.git.getRef({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            ref: `heads/${BRANCH}`,
        });
        const latestCommitSha = refData.object.sha;

        // 2. Base tree SHA
        const { data: commitData } = await octokit.git.getCommit({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            commit_sha: latestCommitSha,
        });
        const baseTreeSha = commitData.tree.sha;

        // 3. Create blobs
        const treeItems: TreeItem[] = [];

        for (const file of files) {
            const content = file.base64.includes(',') ? file.base64.split(',')[1] : file.base64;
            const { data: blobData } = await octokit.git.createBlob({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                content,
                encoding: "base64",
            });
            treeItems.push({
                path: file.path,
                mode: "100644",
                type: "blob",
                sha: blobData.sha,
            });
        }

        // blogs.json blob
        const jsonContent = JSON.stringify(blogs, null, 4);
        const { data: jsonBlobData } = await octokit.git.createBlob({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            content: jsonContent,
            encoding: "utf-8",
        });
        treeItems.push({
            path: 'src/lib/blogs.json',
            mode: "100644",
            type: "blob",
            sha: jsonBlobData.sha,
        });

        // 4. Create tree
        const { data: newTreeData } = await octokit.git.createTree({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            base_tree: baseTreeSha,
            tree: treeItems,
        });

        // 5. Create commit
        const { data: newCommitData } = await octokit.git.createCommit({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            message: "Update blog data via Admin Panel",
            tree: newTreeData.sha,
            parents: [latestCommitSha],
        });

        // 6. Update ref
        await octokit.git.updateRef({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            ref: `heads/${BRANCH}`,
            sha: newCommitData.sha,
        });

    } catch (error) {
        console.error("Error batch updating blogs:", error);
        throw new Error("Failed to save blog data to GitHub.");
    }
};

