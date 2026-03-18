import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleText } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:1337/api/about-page')
            .then(res => res.json())
            .then(json => {
                if (json && json.data) {
                    setData(json.data);
                }
            })
            .catch(err => console.error('Failed to fetch about page:', err));
    }, []);

    useLayoutEffect(() => {
        if (!data) return;

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
    }, [data]);

    if (!data) return null;

    const headlineLines = (data.heroHeadline || '').split('\n');

    return (
        <div ref={containerRef} className="w-full bg-primary text-background min-h-screen pt-32 pb-24">
            {/* Hero */}
            <section className="about-hero px-6 md:px-12 flex flex-col gap-8 mb-32">
                <p className="font-mono text-accent text-sm tracking-widest uppercase fade-up">{data.heroSubtitle}</p>
                <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] uppercase fade-up">
                    <ScrambleText text={headlineLines[0] || ''} /> <br />
                    <span className="italic text-accent">{headlineLines[1] || ''}</span>
                </h1>
                <div className="max-w-2xl mt-12 fade-up">
                    <p className="font-sans text-xl md:text-3xl text-background/80 leading-relaxed">
                        {data.heroDescription}
                    </p>
                </div>
            </section>

            {/* Mission / Details */}
            <section className="mission-section px-6 md:px-12 mb-32">
                <div className="w-full h-[1px] bg-background/20 mb-16 line-draw"></div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4 font-mono text-accent text-sm tracking-widest uppercase">
                        {data.missionSubtitle}
                    </div>
                    <div className="md:col-span-8 flex flex-col gap-12 font-sans text-lg text-background/70 leading-relaxed">
                        <p className="fade-up">
                            {data.missionTextParagraph1}
                        </p>
                        <p className="fade-up">
                            {data.missionTextParagraph2}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="flex flex-col gap-4 border-l border-accent/20 pl-6 fade-up">
                                <h3 className="font-bold text-background uppercase tracking-wider">Engineering</h3>
                                <p className="text-sm">{data.engineeringFeatures}</p>
                            </div>
                            <div className="flex flex-col gap-4 border-l border-accent/20 pl-6 fade-up">
                                <h3 className="font-bold text-background uppercase tracking-wider">Design</h3>
                                <p className="text-sm">{data.designFeatures}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Images / Atmosphere */}
            <section className="px-6 md:px-12 fade-up">
                <div className="w-full aspect-[21/9] bg-dark overflow-hidden relative group magnetic" data-cursor-bound="true">
                    <img
                        src="/atmosphere.png"
                        alt="TENEX Atmosphere"
                        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out opacity-60 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-1000"></div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="font-mono text-accent tracking-widest uppercase bg-dark/80 px-4 py-2 rounded-full border border-accent/30 backdrop-blur-sm">Explore Depth</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
