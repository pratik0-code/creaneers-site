import StoryCard from "@/components/DisplayCard";
import { STORIES } from "@/lib/data";

export default function WorksPage() {
    return (
        <div className="bg-background min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-20">
                    <h1 className="text-5xl md:text-7xl font-serif mb-6 text-neutral-900 dark:text-neutral-100">Our Projects</h1>
                    <p className="max-w-xl text-neutral-800 dark:text-neutral-300 text-lg font-light">
                        A diverse portfolio of architectural interventions, from private residences to urban landmarks, each a unique response to context and client.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {STORIES.map((project) => (
                        <StoryCard key={project.id} {...project} />
                    ))}
                </div>
            </div>
        </div>
    );
}
