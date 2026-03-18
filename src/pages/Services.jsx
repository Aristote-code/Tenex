import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleText, TypewriterText } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".fade-up",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".services-hero",
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const services = [
        {
            id: "01",
            title: "Rapid Prototyping",
            desc: "Validate immediately through high-fidelity interactive prototypes. We turn ideas into testable interfaces in days, not months."
        },
        {
            id: "02",
            title: "Web & Mobile Development",
            desc: "Full-stack engineering for scale. We build robust architectures using React, Next.js, and React Native for performance and reliability."
        },
        {
            id: "03",
            title: "Cloud Infrastructure",
            desc: "Architecting and maintaining secure, scalable cloud systems on AWS and Azure with automated CI/CD pipelines."
        },
        {
            id: "04",
            title: "UI/UX Design",
            desc: "Creating the look, feel, and branding of interfaces that obscure the line between engineering and art. Premium digital experiences."
        }
    ];

    return (
        <div ref={containerRef} className="w-full bg-background text-primary min-h-screen pt-40 pb-32 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Hero */}
                <section className="services-hero mb-24">
                    <TypewriterText text="/ SERVICES_MATRIX" />
                    <h1 className="font-display font-medium text-6xl md:text-8xl mt-6 fade-up">
                        What We <span className="italic text-accent">Build</span>
                    </h1>
                    <p className="font-sans text-xl md:text-2xl text-primary/70 max-w-2xl mt-8 leading-relaxed fade-up">
                        We are a 10x execution team providing end-to-end digital architecture for the top 1% of the web.
                    </p>
                </section>

                {/* Services Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {services.map((service) => (
                        <div key={service.id} className="fade-up relative p-8 md:p-12 border border-primary/10 rounded-2xl bg-white hover:border-accent/30 transition-colors duration-500 overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                            
                            <div className="font-mono text-accent text-sm font-bold mb-8">SYS_VAR: {service.id}</div>
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-6">
                                <ScrambleText text={service.title} />
                            </h2>
                            <p className="font-sans text-lg text-primary/70 leading-relaxed font-medium">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Services;
