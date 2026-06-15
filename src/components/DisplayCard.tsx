import Link from 'next/link';
import Image from 'next/image';

interface DisplayCardProps {
    id: string;
    title: string;
    category: string;
    excerpt: string;
    imageUrl?: string;
    images?: string[];
    status?: 'completed' | 'ongoing' | 'idea';
}

export default function DisplayCard({ id, title, category, excerpt, imageUrl, images, status }: DisplayCardProps) {
    const displayImage = imageUrl || (images && images.length > 0 ? images[0] : null);

    return (
        <Link href={`/works/${id}`} className="block no-underline cursor-pointer group">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-4">
                {displayImage ? (
                    <Image
                        src={displayImage}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                ) : (
                    <>
                        {/* Placeholder for image */}
                        <div className="absolute inset-0 bg-stone-200 dark:bg-neutral-800 transition-transform duration-700 ease-in-out group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-light italic">
                            Image
                        </div>
                    </>
                )}

                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <span className="bg-white dark:bg-neutral-900 px-3 py-1 text-xs uppercase tracking-widest font-medium text-neutral-900 dark:text-white w-fit">
                        {category}
                    </span>
                    {status && status !== 'completed' && (
                        <span className={`px-3 py-1 text-xs uppercase tracking-widest font-medium w-fit ${status === 'ongoing' ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/80 dark:text-amber-100' : 'bg-blue-100 text-blue-900 dark:bg-blue-900/80 dark:text-blue-100'}`}>
                            {status}
                        </span>
                    )}
                </div>
            </div>

            <h3 className="text-xl font-serif font-medium mb-2 text-neutral-900 dark:text-white transition-all duration-200 decoration-1 underline-offset-4 group-hover:underline">
                {title}
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed line-clamp-2">
                {excerpt}
            </p>
        </Link>
    );
}
