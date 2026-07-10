import { BLOGS } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return BLOGS.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const post = BLOGS.find((p) => p.id === id);
    if (!post) return {};
    return {
        title: `${post.title} | CREANEERS Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { id } = await params;
    const post = BLOGS.find((p) => p.id === id);

    if (!post) notFound();

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="min-h-screen bg-white dark:bg-neutral-950">

            {/* Hero */}
            <div className="relative h-[55vh] min-h-[400px] bg-neutral-100 dark:bg-neutral-900 overflow-hidden flex items-end">
                {post.coverImage ? (
                    <>
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950" />
                )}

                <div className="relative z-10 max-w-4xl mx-auto w-full px-6 md:px-12 pb-16 pt-32">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="border border-white/40 text-white/80 text-xs uppercase tracking-widest px-3 py-1 backdrop-blur-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-3 text-xs text-white/60 uppercase tracking-wider">
                        <span>{post.author}</span>
                        <span>·</span>
                        <time dateTime={post.date}>{formattedDate}</time>
                    </div>
                </div>
            </div>

            {/* Article Body */}
            <div className="max-w-3xl mx-auto py-24 px-6 md:px-12">

                {/* Excerpt / lead */}
                <p className="text-xl md:text-2xl font-serif italic text-neutral-600 dark:text-neutral-400 leading-relaxed mb-12 border-l-4 border-neutral-200 dark:border-neutral-700 pl-6">
                    {post.excerpt}
                </p>

                {/* Rich content */}
                <div
                    className="prose prose-neutral dark:prose-invert prose-lg prose-headings:font-serif prose-p:font-light prose-p:leading-loose prose-a:text-neutral-900 dark:prose-a:text-white prose-a:underline max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer */}
                <div className="mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-1">Written by</span>
                        <span className="font-medium text-neutral-900 dark:text-white">{post.author}</span>
                    </div>
                    <Link
                        href="/blog"
                        className="text-sm uppercase tracking-widest text-neutral-900 dark:text-white border-b border-black dark:border-white pb-0.5 hover:opacity-60 transition-opacity"
                    >
                        ← Back to Insights
                    </Link>
                </div>
            </div>
        </article>
    );
}
