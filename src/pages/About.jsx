import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleText } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".fade-up",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    stagger: 0.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".about-hero",
                        start: "top 80%",
                    }
                }
            );

            gsap.fromTo(".line-draw",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.5,
                    ease: "power4.inOut",
                    transformOrigin: "left center",
                    scrollTrigger: {
                        trigger: ".mission-section",
                        start: "top 70%"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full bg-primary text-background min-h-screen pt-32 pb-24">
            {/* Hero */}
            <section className="about-hero px-6 md:px-12 flex flex-col gap-8 mb-32">
                <p className="font-data text-accent text-sm tracking-widest uppercase fade-up">01. Identity</p>
                <h1 className="font-drama text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] uppercase fade-up">
                    <ScrambleText text="We Are" /> <br />
                    <span className="italic text-accent">Tenex</span>
                </h1>
                <div className="max-w-2xl mt-12 fade-up">
                    <p className="font-sans text-xl md:text-3xl text-background/80 leading-relaxed">
                        A specialized digital architecture firm building scalable, high-performance interfaces for the top 1% of the web. We obscure the line between engineering and art.
                    </p>
                </div>
            </section>

            {/* Mission / Details */}
            <section className="mission-section px-6 md:px-12 mb-32">
                <div className="w-full h-[1px] bg-background/20 mb-16 line-draw"></div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4 font-data text-accent text-sm tracking-widest uppercase">
                        The Details
                    </div>
                    <div className="md:col-span-8 flex flex-col gap-12 font-sans text-lg text-background/70 leading-relaxed">
                        <p className="fade-up">
                            Founded on the principle that digital experiences should be both hyper-functional
                            and visually arresting, TENEX operates strictly at the bleeding edge. We don't just
                            write code; we construct digital monoliths designed to outlast the rapid churn of
                            the modern web.
                        </p>
                        <p className="fade-up">
                            Our team is composed of elite engineers, visionary designers, and relentless problem
                            solvers. We work exclusively with clients who understand that investing in a
                            premium digital presence is non-negotiable in an attention-scarce economy.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="flex flex-col gap-4 border-l border-accent/20 pl-6 fade-up">
                                <h3 className="font-bold text-background uppercase tracking-wider">Engineering</h3>
                                <p className="text-sm">React, WebGL, GSAP, Architecture, Data Visualization, Performance Tuning.</p>
                            </div>
                            <div className="flex flex-col gap-4 border-l border-accent/20 pl-6 fade-up">
                                <h3 className="font-bold text-background uppercase tracking-wider">Design</h3>
                                <p className="text-sm">UI/UX, 3D Prototyping, Motion Graphics, Aesthetic Direction, Brutalist Architecture.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Images / Atmosphere */}
            <section className="px-6 md:px-12 fade-up">
                <div className="w-full aspect-[21/9] bg-dark overflow-hidden relative group magnetic" data-cursor-bound="true">
                    <img
                        src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
                        alt="TENEX Atmosphere"
                        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out opacity-60 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-1000"></div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="font-data text-accent tracking-widest uppercase bg-dark/80 px-4 py-2 rounded-full border border-accent/30 backdrop-blur-sm">Explore Depth</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
