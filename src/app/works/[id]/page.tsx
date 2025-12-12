import { STORIES } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
    return STORIES.map((story) => ({
        id: story.id,
    }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = STORIES.find((s) => s.id === id);

    if (!project) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-background">
            {/* Hero Header for Article */}
            <div className="relative h-[60vh] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-stone-300 dark:bg-neutral-800 animate-pulse" /> {/* Placeholder Image */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <span className="inline-block border border-black dark:border-white px-4 py-1 text-xs uppercase tracking-widest mb-6 dark:text-white">
                        {project.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-4 leading-tight dark:text-white">
                        {project.title}
                    </h1>
                    <time className="text-neutral-500 dark:text-neutral-400 font-mono text-xs uppercase block">
                        Completed {project.date}
                    </time>
                    {project.siteArea && (
                        <div className="text-neutral-500 dark:text-neutral-400 font-mono text-xs uppercase block mt-2">
                            Site Area: {project.siteArea}
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-3xl mx-auto py-24 px-6">
                <div
                    className="prose prose-neutral prose-lg prose-headings:font-serif prose-p:font-light prose-p:leading-loose first-letter:text-5xl first-letter:font-serif first-letter:mr-2 first-letter:float-left dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: project.content }}
                />

                <hr className="my-16 border-neutral-200 dark:border-neutral-800" />

                {/* Project Collage */}
                {project.images && project.images.length > 0 && (
                    <div className="mb-16 space-y-4">
                        <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-8">Project Gallery</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.images.map((img, idx) => (
                                <div key={idx} className={`relative overflow-hidden group ${idx % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}>
                                    <img
                                        src={img}
                                        alt={`${project.title} image ${idx + 1}`}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 filter grayscale-0 md:grayscale md:hover:grayscale-0"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <Link href="/works" className="text-sm uppercase tracking-widest hover:text-neutral-500 dark:text-white dark:hover:text-neutral-400 transition-colors">
                        ← Back to Projects
                    </Link>
                </div>
            </div>
        </article>
    );
}
