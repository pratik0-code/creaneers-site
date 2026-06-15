import storiesData from './data.json';

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
}

export const STORIES: Story[] = storiesData as Story[];

