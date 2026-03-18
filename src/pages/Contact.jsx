import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send } from 'lucide-react';
import { TypewriterText } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".fade-up",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for form submission
        alert("Transmission initiated. We will securely process your request.");
    };

    return (
        <div ref={containerRef} className="w-full bg-surface text-primary min-h-screen pt-40 pb-32 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* Left Info Column */}
                    <div className="lg:col-span-5 flex flex-col gap-12">
                        <div className="fade-up">
                            <TypewriterText text="/ COMMUNICATION_LINK" />
                            <h1 className="font-display font-medium text-5xl md:text-7xl mt-6">
                                Initiate <br /><span className="italic text-accent">Contact</span>
                            </h1>
                            <p className="font-sans text-lg text-primary/70 mt-6 leading-relaxed font-medium">
                                Ready for 10x execution? Secure a channel with our architecture team to discuss your next deployment.
                            </p>
                        </div>

                        <div className="flex flex-col gap-8 mt-4 fade-up">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-accent shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-mono text-xs uppercase tracking-widest text-primary/50 mb-1">Direct Line</h3>
                                    <p className="font-sans font-bold text-lg">hello@tenex.dev</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-accent shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-mono text-xs uppercase tracking-widest text-primary/50 mb-1">Base</h3>
                                    <p className="font-sans font-bold text-lg">Global Operations</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Column */}
                    <div className="lg:col-span-7 fade-up">
                        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl border border-primary/10 shadow-xl flex flex-col gap-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-xs uppercase tracking-widest text-primary/60">Entity Name</label>
                                    <input required type="text" className="bg-surface/50 border border-primary/10 rounded-lg px-4 py-3 font-sans focus:outline-none focus:border-accent focus:bg-white transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-xs uppercase tracking-widest text-primary/60">Comm Channel</label>
                                    <input required type="email" className="bg-surface/50 border border-primary/10 rounded-lg px-4 py-3 font-sans focus:outline-none focus:border-accent focus:bg-white transition-colors" placeholder="john@company.com" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-xs uppercase tracking-widest text-primary/60">Organization</label>
                                <input type="text" className="bg-surface/50 border border-primary/10 rounded-lg px-4 py-3 font-sans focus:outline-none focus:border-accent focus:bg-white transition-colors" placeholder="Acme Corp" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-xs uppercase tracking-widest text-primary/60">Transmission Payload</label>
                                <textarea required rows="5" className="bg-surface/50 border border-primary/10 rounded-lg px-4 py-3 font-sans focus:outline-none focus:border-accent focus:bg-white transition-colors resize-none" placeholder="Describe your project requirements..."></textarea>
                            </div>

                            <button type="submit" className="magnetic mt-4 group flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-sans font-bold hover:bg-accent transition-colors duration-500 w-full md:w-auto self-start">
                                Send Payload
                                <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
