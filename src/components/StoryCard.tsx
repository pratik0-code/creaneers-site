import Link from 'next/link';

interface StoryCardProps {
    id: string;
    title: string;
    category: string;
    excerpt: string;
    imageUrl?: string; // Optional for now
}

export default function StoryCard({ id, title, category, excerpt }: StoryCardProps) {
    return (
        <Link href={`/works/${id}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-4">
                {/* Placeholder for image */}
                <div className="absolute inset-0 bg-stone-200 dark:bg-neutral-800 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-light italic">
                    Image
                </div>

                <div className="absolute top-4 left-4 bg-white dark:bg-neutral-900 px-3 py-1 text-xs uppercase tracking-widest font-medium dark:text-white">
                    {category}
                </div>
            </div>

            <h3 className="text-xl font-serif font-medium mb-2 group-hover:underline decoration-1 underline-offset-4 transition-all text-neutral-900 dark:text-white">
                {title}
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed line-clamp-2">
                {excerpt}
            </p>
        </Link>
    );
}
