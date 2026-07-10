import storiesData from './data.json';
import blogsData from './blogs.json';

export interface Story {
    id: string;
    title: string;
    category: string;
    excerpt: string;
    content: string; // HTML or Markdown content
    date: string;
    imageUrl?: string;
    images?: string[];
    siteArea?: string;
    status?: 'completed' | 'ongoing' | 'idea';
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;      // rich HTML content
    author: string;
    date: string;         // ISO date string e.g. "2026-07-10"
    coverImage?: string;  // optional cover image path
    tags?: string[];
}

export const STORIES: Story[] = storiesData as Story[];
export const BLOGS: BlogPost[] = blogsData as BlogPost[];
