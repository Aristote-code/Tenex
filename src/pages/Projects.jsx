import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrambleText, TypewriterText } from '../components/ui';
import { projectsData } from '../data/projects';

const Projects = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.from('.project-card', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="pt-40 pb-32 px-6 md:px-12 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="mb-20">
                    <TypewriterText text="/ INITIATIVES_INDEX" />
                    <h1 className="font-drama text-6xl md:text-8xl text-background mt-6">
                        <span className="italic text-accent">Selected</span> Work
                    </h1>
                    <p className="font-sans text-xl text-background/60 max-w-2xl mt-8 leading-relaxed">
                        Archive of our most impactful deployments. We engineer systems that define categories and outpace the obvious.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {projectsData.map((p, i) => (
                        <Link to={`/work/${p.slug}`} key={i} className="project-card group cursor-pointer block">
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl mb-8 border border-accent/20 orange-border-glow">
                                <div className="absolute inset-0 bg-dark/40 group-hover:bg-transparent z-10 transition-colors duration-500"></div>
                                <img src={p.heroImage} alt={p.title} className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" />
                            </div>

                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="font-drama text-4xl text-background mb-4"><ScrambleText text={p.title} /></h3>
                                    <div className="flex items-center gap-3 font-data text-accent text-xs uppercase tracking-widest mb-4">
                                        <span>{p.type}</span>
                                        <span className="w-1 h-1 bg-accent/40 rounded-full"></span>
                                        <span>{p.timeline}</span>
                                    </div>
                                    <p className="font-sans text-background/60 leading-relaxed max-w-md">{p.overview}</p>
                                </div>

                                <div className="w-12 h-12 shrink-0 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors duration-300 mt-2">
                                    <ArrowRight className="w-5 h-5 -rotate-45" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
