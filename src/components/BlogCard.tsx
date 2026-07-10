import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/data';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Link href={`/blog/${post.id}`} className="group block no-underline">
            <article className="h-full flex flex-col">
                {/* Cover Image */}
                <div className="relative aspect-[16/9] bg-neutral-100 dark:bg-neutral-900 overflow-hidden mb-6">
                    {post.coverImage ? (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center">
                            <svg className="w-12 h-12 text-neutral-400 dark:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                    )}
                    {/* Reading pill overlay */}
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 dark:bg-neutral-950/90 text-neutral-900 dark:text-white text-xs uppercase tracking-widest font-medium px-3 py-1 backdrop-blur-sm">
                            Insights
                        </span>
                    </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h2 className="font-serif text-xl md:text-2xl text-neutral-900 dark:text-white leading-snug mb-3 group-hover:opacity-70 transition-opacity">
                    {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed flex-1 mb-4">
                    {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <span>{post.author}</span>
                    <time dateTime={post.date}>{formattedDate}</time>
                </div>
            </article>
        </Link>
    );
}
