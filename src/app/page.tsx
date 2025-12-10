import HeroSection from "@/components/HeroSection";
import StoryCard from "@/components/StoryCard";
import Link from "next/link";
import { STORIES } from "@/lib/data";

export default function Home() {
  // Use first 3 stories (projects) as featured
  const FEATURED_PROJECTS = STORIES.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="py-24 px-6 md:px-12 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 md:mb-0 text-neutral-900 dark:text-neutral-100">
              Featured <br /> <span className="italic text-neutral-600 dark:text-neutral-400">Projects</span>
            </h2>
            <p className="max-w-md text-neutral-800 dark:text-neutral-300 text-sm leading-relaxed">
              A selection of our defining work, demonstrating our commitment to innovation, sustainability, and aesthetic purity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {FEATURED_PROJECTS.map((project) => (
              <StoryCard key={project.id} {...project} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link
              href="/works"
              className="inline-block border-b border-black dark:border-white pb-1 uppercase text-xs tracking-widest hover:text-neutral-500 dark:hover:text-neutral-300 transition-colors text-neutral-900 dark:text-white"
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
            "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
          </h3>
          <Link href="/about" className="inline-block bg-white text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors">
            Read Our Vision
          </Link>
        </div>
      </section>
    </div>
  );
}
