import HeroSection from "@/components/HeroSection";
import DisplayCard from "@/components/DisplayCard";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { STORIES, BLOGS } from "@/lib/data";

export default function Home() {
  // Use first 3 stories (projects) as featured
  const FEATURED_PROJECTS = STORIES.slice(0, 3);

  // Latest 3 blog posts
  const LATEST_POSTS = [...BLOGS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="py-24 px-6 md:px-12 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 md:mb-0 text-neutral-900 dark:text-neutral-100 leading-tight">
              Featured <br /> <span className="italic text-neutral-600 dark:text-neutral-400">Projects</span>
            </h2>
            <p className="max-w-md text-neutral-800 dark:text-neutral-300 text-sm leading-relaxed">
              A selection of our defining work, demonstrating our commitment to innovation, sustainability, and aesthetic purity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {FEATURED_PROJECTS.map((project) => (
              <DisplayCard key={project.id} {...project} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link
              href="/works"
              className="inline-block border-b border-black dark:border-white pb-1 uppercase text-xs tracking-widest text-neutral-900 dark:text-white transition-colors hover:text-neutral-500 dark:hover:text-neutral-300"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 md:px-12 bg-neutral-900 text-neutral-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono text-neutral-400 mb-6 block uppercase tracking-widest">Our Philosophy</span>
          <h3 className="text-3xl md:text-5xl font-serif italic leading-tight mb-8">
            &ldquo;Architecture is the learned game, correct and magnificent, of forms assembled in the light.&rdquo;
          </h3>
          <Link href="/about" className="inline-block bg-white text-black px-8 py-3 rounded-full text-sm font-medium transition-colors hover:bg-neutral-200">
            Read Our Vision
          </Link>
        </div>
      </section>

      {/* Latest Blog Posts — only shown when posts exist */}
      {LATEST_POSTS.length > 0 && (
        <section className="py-24 px-6 md:px-12 bg-white dark:bg-neutral-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 block">From the Studio</span>
                <h2 className="text-4xl md:text-5xl font-serif text-neutral-900 dark:text-neutral-100 leading-tight">
                  Latest <br /> <span className="italic text-neutral-600 dark:text-neutral-400">Insights</span>
                </h2>
              </div>
              <p className="max-w-sm text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed md:text-right mt-6 md:mt-0">
                Thoughts on design, process, and the art of shaping spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {LATEST_POSTS.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <div className="mt-20 text-center">
              <Link
                href="/blog"
                className="inline-block border-b border-black dark:border-white pb-1 uppercase text-xs tracking-widest text-neutral-900 dark:text-white transition-colors hover:text-neutral-500 dark:hover:text-neutral-300"
              >
                View All Posts
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
