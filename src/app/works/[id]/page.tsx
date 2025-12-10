import { STORIES } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
    return STORIES.map((story) => ({
        id: story.id,
    }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
    const project = STORIES.find((s) => s.id === params.id);

    if (!project) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white">
            {/* Hero Header for Article */}
            <div className="relative h-[60vh] bg-neutral-100 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-stone-300 animate-pulse" /> {/* Placeholder Image */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <span className="inline-block border border-black px-4 py-1 text-xs uppercase tracking-widest mb-6">
                        {project.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-4 leading-tight">
                        {project.title}
                    </h1>
                    <time className="text-neutral-500 font-mono text-xs uppercase block">
                        Completed {project.date}
                    </time>
                </div>
            </div>

            <div className="max-w-3xl mx-auto py-24 px-6">
                <div
                    className="prose prose-neutral prose-lg prose-headings:font-serif prose-p:font-light prose-p:leading-loose first-letter:text-5xl first-letter:font-serif first-letter:mr-2 first-letter:float-left"
                    dangerouslySetInnerHTML={{ __html: project.content }}
                />

                <hr className="my-16 border-neutral-200" />

                <div className="flex justify-between items-center">
                    <Link href="/works" className="text-sm uppercase tracking-widest hover:text-neutral-500 transition-colors">
                        ← Back to Projects
                    </Link>
                </div>
            </div>
        </article>
    );
}
