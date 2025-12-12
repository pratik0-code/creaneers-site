"use client";

import { useState } from "react";

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("https://formsubmit.co/ajax/studio.creaneers@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    }

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
                        <a href="mailto:studio.creaneers@gmail.com" className="text-xl border-b border-black dark:border-white pb-1 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">studio.creaneers@gmail.com</a>
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">Headquarters</span>
                        <p className="text-xl font-light text-neutral-900 dark:text-neutral-100">
                            Itahari, Nepal
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-neutral-50 dark:bg-neutral-900 p-8 md:p-12">
                {status === 'success' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
                        <div className="text-4xl text-green-500">✓</div>
                        <h3 className="text-2xl font-serif text-neutral-900 dark:text-white">Message Sent</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">Thank you for reaching out. We'll get back to you shortly.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-6 text-xs uppercase tracking-widest border-b border-black dark:border-white pb-1 text-neutral-900 dark:text-white"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input type="hidden" name="_subject" value="New Inquiry from Creaneers Website" />
                        <input type="hidden" name="_template" value="table" />
                        <input type="hidden" name="_captcha" value="false" />

                        <div>
                            <label htmlFor="name" className="block text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">Name</label>
                            <input required name="name" type="text" id="name" className="w-full bg-white dark:bg-neutral-800 border-none p-4 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-neutral-900 dark:text-white" placeholder="Your Name" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">Email</label>
                            <input required name="email" type="email" id="email" className="w-full bg-white dark:bg-neutral-800 border-none p-4 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-neutral-900 dark:text-white" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">Project Details</label>
                            <textarea required name="message" id="message" rows={6} className="w-full bg-white dark:bg-neutral-800 border-none p-4 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-neutral-900 dark:text-white" placeholder="Tell us about your project..."></textarea>
                        </div>

                        {status === 'error' && (
                            <p className="text-red-500 text-sm">Something went wrong. Please try again or email us directly.</p>
                        )}

                        <button
                            disabled={status === 'submitting'}
                            type="submit"
                            className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 uppercase text-xs tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
