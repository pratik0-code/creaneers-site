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
        id: "baral_residence",
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
            "/images/projects/Baral_Residence/6217.jpg",
            "/images/projects/Baral_Residence/6216.png",
            "/images/projects/Baral_Residence/6215.jpg"

        ]
    },
    {
        id: "itahari_interior",
        title: "Itahari Interior",
        category: "Interior",
        excerpt: "A contemporary interior project located at Itahari.",
        content: `
      <p>A thoughtfully crafted interior where modern design meets warmth and elegance, enhanced by refined materials, natural light, and subtle detailing.</p>
    `,
        date: "",
        siteArea: "1050 sq.ft.",
        imageUrl: "/images/projects/itahari interior/living.png",
        images: [
            "/images/projects/itahari interior/living.png",
            "/images/projects/itahari interior/living2.png",
            "/images/projects/itahari interior/kit2.png",
            "/images/projects/itahari interior/kit5.png",
            "/images/projects/itahari interior/kitchen3.png",
            "/images/projects/itahari interior/bedroom2.png"


        ]
    },
];
