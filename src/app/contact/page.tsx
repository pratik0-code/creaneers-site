export default function ContactPage() {
    return (
        <div className="bg-background min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">

            <div className="flex-1">
                <h1 className="text-5xl md:text-7xl font-serif mb-12 text-neutral-900 dark:text-white">Contact Us</h1>
                <p className="text-lg font-light text-neutral-800 dark:text-neutral-200 max-w-md mb-12">
                    Ready to build something extraordinary? Let's start the conversation.
                </p>

                <div className="space-y-8">
                    <div>
                        <span className="block text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">Inquiries</span>
                        <a href="mailto:info@creaneers.com" className="text-xl border-b border-black dark:border-white pb-1 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">info@creaneers.com</a>
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">Headquarters</span>
                        <p className="text-xl font-light text-neutral-900 dark:text-neutral-100">
                            Create Tower, 5th Floor<br />
                            Connaught Place, New Delhi<br />
                            India
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-neutral-50 dark:bg-neutral-900 p-8 md:p-12">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">Name</label>
                        <input type="text" id="name" className="w-full bg-white dark:bg-neutral-800 border-none p-4 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-neutral-900 dark:text-white" placeholder="Your Name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">Email</label>
                        <input type="email" id="email" className="w-full bg-white dark:bg-neutral-800 border-none p-4 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-neutral-900 dark:text-white" placeholder="your@email.com" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">Project Details</label>
                        <textarea id="message" rows={6} className="w-full bg-white dark:bg-neutral-800 border-none p-4 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-neutral-900 dark:text-white" placeholder="Tell us about your project..."></textarea>
                    </div>
                    <button type="button" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 uppercase text-xs tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors w-full md:w-auto">
                        Submit Inquiry
                    </button>
                </form>
            </div>
        </div>
    );
}
