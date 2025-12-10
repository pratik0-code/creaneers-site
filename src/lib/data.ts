export interface Story {
    id: string;
    title: string;
    category: string;
    excerpt: string;
    content: string; // HTML or Markdown content
    date: string;
    imageUrl?: string;
    images?: string[];
}

export const STORIES: Story[] = [
    {
        id: "1",
        title: "The Glass House",
        category: "Residential",
        excerpt: "A transparent dialogue between nature and living space, blurring the lines between indoors and the forest edge.",
        content: `
      <p>Perched on the edge of a dense pine forest, The Glass House is an experiment in invisibility. The concept was simple: to build a home that disappears into its surroundings.</p>
      <p>Constructed primarily of steel and floor-to-ceiling glass, the structure reflects the changing seasons. In winter, it is a snow-covered sculpture; in summer, it dissolves into the greenery.</p>
      <h3>Sustainable Integration</h3>
      <p>The house utilizes passive solar heating and rainwater harvesting, ensuring its footprint is as light as its visual presence.</p>
    `,
        date: "2023",
        images: [
            "https://images.unsplash.com/photo-1518005020951-ecc8e54333b0?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2000&auto=format&fit=crop"
        ]
    },
    {
        id: "2",
        title: "Urban Sanctuary",
        category: "Interior",
        excerpt: "A minimalist retreat in the heart of the chaotic city, designed to be a haven of silence and light.",
        content: `
      <p>In the bustling center of the metropolis, silence is the ultimate luxury. Urban Sanctuary reimagines a heritage apartment as a monolithic, meditative space.</p>
      <p>Using a palette of limestone, warm oak, and shadow, we created a sequence of spaces that compress and release the inhabitant, washing away the noise of the city.</p>
    `,
        date: "2024",
        images: [
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1616137466211-f939a420be63?q=80&w=2000&auto=format&fit=crop"
        ]
    },
    {
        id: "3",
        title: "Vertical Forest",
        category: "Commercial",
        excerpt: "Reimagining the corporate workspace as a living ecosystem, integrating biophilic design at every level.",
        content: `
      <p>The Vertical Forest headquarters challenges the sterile norm of office towers. Here, every floor spills out onto lush green terraces, providing workers with fresh air and a connection to nature.</p>
      <p>The façade itself acts as a vertical garden, filtering pollutants and regulating the building's temperature naturally.</p>
    `,
        date: "2023",
        images: [
            "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
        ]
    },
    {
        id: "4",
        title: "Dune Pavilion",
        category: "Landscape",
        excerpt: "A temporary structure in the desert, sculpted from the very sand it stands upon.",
        content: `<p>Commissioned for an art festival, the Dune Pavilion explores the impermanence of architecture. Built using compacted sand and bio-binders, it will eventually return to the earth, leaving no trace.</p>`,
        date: "2024",
        images: [
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519967982293-12a81878a846?q=80&w=2000&auto=format&fit=crop"
        ]
    },
    {
        id: "5",
        title: "The Concrete Canvas",
        category: "Cultural",
        excerpt: "A modern art gallery designed not just to house art, but to be a piece of art itself.",
        content: `<p>With its brutalist forms and dramatic play of light, The Concrete Canvas serves as a neutral yet powerful backdrop for contemporary installations.</p>`,
        date: "2022",
        images: [
            "https://images.unsplash.com/photo-1518998053901-5348d3969104?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1561053720-76cd737025d8?q=80&w=2000&auto=format&fit=crop"
        ]
    }
];
