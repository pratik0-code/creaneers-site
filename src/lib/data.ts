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

export const STORIES: Story[] = [
    {
        id: "1",
        title: "Baral Residence",
        category: "Residential",
        excerpt: "A contemporary residential project located at Itahari, Pachruki.",
        content: `
      <p>This residential project embodies modern living with its sleek design and functional layout. The architecture focuses on maximizing natural light and creating a seamless flow between each room.</p>
    `,
        date: "2024",
        siteArea: "1050 sq.ft.",
        imageUrl: "/images/projects/Baral_Residence/6216.png",
        images: [
            "/images/projects/Baral_Residence/6215.jpg",
            "/images/projects/Baral_Residence/6216.png",
            "/images/projects/Baral_Residence/6217.jpg"
        ]
    },
];
