import { BLOGS } from '@/lib/data';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | CREANEERS Design and Consult',
    description: 'Insights, ideas, and perspectives on architecture, design, and the built environment — from the minds at CREANEERS.',
};

export default function BlogPage() {
    const published = [...BLOGS].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="bg-white dark:bg-neutral-950 min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">

                {/* Page Header */}
                <header className="mb-20 border-b border-neutral-100 dark:border-neutral-800 pb-12">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4 block">
                                From the Studio
                            </span>
                            <h1 className="text-5xl md:text-7xl font-serif text-neutral-900 dark:text-white leading-none">
                                Insights
                            </h1>
                        </div>
                        <p className="max-w-sm text-neutral-600 dark:text-neutral-400 text-sm font-light leading-relaxed md:text-right">
                            Perspectives on architecture, design thinking, and the spaces we create.
                        </p>
                    </div>
                </header>

                {/* Blog Grid */}
                {published.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <svg className="w-16 h-16 text-neutral-300 dark:text-neutral-700 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <p className="text-neutral-400 dark:text-neutral-600 font-light text-lg mb-2">No posts yet</p>
                        <p className="text-neutral-300 dark:text-neutral-700 text-sm">Check back soon for articles from the studio.</p>
                    </div>
                ) : (
                    <>
                        {/* Featured — first post large */}
                        {published.length > 0 && (
                            <div className="mb-16">
                                <Link href={`/blog/${published[0].id}`} className="group block no-underline">
                                    <article className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                                        <div className="relative aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                                            {published[0].coverImage ? (
                                                <img
                                                    src={published[0].coverImage}
                                                    alt={published[0].title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700" />
                                            )}
                                        </div>
                                        <div>
                                            <span className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4 block">
                                                Featured
                                            </span>
                                            {published[0].tags && published[0].tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {published[0].tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white leading-tight mb-4 group-hover:opacity-70 transition-opacity">
                                                {published[0].title}
                                            </h2>
                                            <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
                                                {published[0].excerpt}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                                                <span>{published[0].author}</span>
                                                <span>·</span>
                                                <time dateTime={published[0].date}>
                                                    {new Date(published[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </time>
                                            </div>
                                            <span className="mt-6 inline-block border-b border-black dark:border-white pb-0.5 text-xs uppercase tracking-widest text-neutral-900 dark:text-white group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
                                                Read Article
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                            </div>
                        )}

                        {/* Rest of posts */}
                        {published.length > 1 && (
                            <>
                                <div className="border-t border-neutral-100 dark:border-neutral-800 mb-16" />
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                                    {published.slice(1).map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
