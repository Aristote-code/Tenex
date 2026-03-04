import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrambleText, TypewriterText } from '../components/ui';
import { projectsData } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-elem', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out',
                delay: 0.2
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-dark -z-10"></div>
            <div className="absolute inset-0 glow-orange -z-10 pointer-events-none"></div>
            <div className="shimmer-line left-1/3 h-64 top-0" style={{ animationDelay: '0s' }}></div>
            <div className="shimmer-line left-2/3 h-48 top-0" style={{ animationDelay: '1.5s' }}></div>

            <div className="max-w-6xl mx-auto w-full flex flex-col items-start gap-8 z-10">
                <div className="hero-elem">
                    <TypewriterText text="[ SYS.INIT. / TENEX_V1.0 ]" />
                </div>

                <h1 className="hero-elem font-drama text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] text-background max-w-5xl">
                    We don't just build.<br />
                    <span className="italic text-accent">We execute.</span>
                </h1>

                <p className="hero-elem font-sans text-lg md:text-xl text-background/60 max-w-2xl leading-relaxed mt-4">
                    <ScrambleText text="High-velocity product studio. Rapid prototyping. Absolute execution." />
                </p>

                <div className="hero-elem mt-8">
                    <button className="magnetic group flex items-center gap-4 bg-accent text-primary px-8 py-4 rounded-full font-sans font-semibold text-lg hover:bg-glow transition-colors duration-500">
                        Book a Build Sprint
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            <div className="absolute bottom-12 left-6 md:left-12 hero-elem">
                <div className="animate-bounce mt-4 opacity-50">
                    <div className="w-[1px] h-16 bg-accent"></div>
                </div>
            </div>
        </section>
    );
};

const Features = () => {
    const features = [
        { num: "01", title: "Speed", desc: "Fast delivery, rapid iteration, execution-first." },
        { num: "02", title: "Quality", desc: "High standards, systems over shortcuts." },
        { num: "03", title: "10x Mindset", desc: "Exponential thinking, building for scale." }
    ];

    return (
        <section className="py-32 px-6 md:px-12 bg-dark">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((f, i) => (
                        <div key={i} className="flex flex-col gap-6 border-t border-accent/30 pt-8 group cursor-default hover:border-accent/70 transition-colors duration-500">
                            <div className="font-data text-accent text-xs">SYS_VAR: {f.num}</div>
                            <h3 className="font-drama text-3xl text-background"><ScrambleText text={f.title} /></h3>
                            <p className="font-sans text-background/50 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Philosophy = () => {
    const textRef = useRef(null);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;
        const words = el.querySelectorAll('.word');
        const st = gsap.fromTo(words,
            { opacity: 0.1, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 70%',
                    end: 'bottom 40%',
                    scrub: 1
                }
            }
        );
        return () => {
            if (st.scrollTrigger) st.scrollTrigger.kill();
            st.kill();
        }
    }, []);

    const text = "Decisive execution. Exponential thinking. Category-defining products. We don't iterate incrementally. We leapfrog.";

    return (
        <section id="philosophy" className="py-48 px-6 md:px-12 bg-primary">
            <div className="max-w-5xl mx-auto">
                <p className="font-data text-accent text-sm mb-12 uppercase tracking-widest block">/ Manifesto</p>
                <h2 ref={textRef} className="font-drama text-4xl md:text-6xl lg:text-7xl text-background leading-tight">
                    {text.split(' ').map((word, i) => (
                        <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
                    ))}
                </h2>
            </div>
        </section>
    );
};

const Protocol = () => {
    const cards = [
        { title: "Rapid Prototyping", text: "Validate immediately through high-fidelity prototypes.", img: "/images/protocol_1_1772633314036.png" },
        { title: "Internal Systems", text: "Infrastructure and tools designed to compound velocity.", img: "/images/protocol_2_1772633339745.png" },
        { title: "External Projects", text: "Client work delivered with uncompromising standards.", img: "/images/protocol_3_1772633358698.png" }
    ];

    return (
        <section id="protocol" className="relative py-24 px-6 md:px-12 bg-dark">
            <div className="max-w-6xl mx-auto">
                <div className="mb-24">
                    <TypewriterText text="PROTOCOL.ENGAGE()" />
                    <h2 className="font-drama text-5xl md:text-7xl text-background mt-6">The Tenex Approach</h2>
                </div>

                <div className="relative flex flex-col gap-24">
                    {cards.map((c, i) => (
                        <div
                            key={i}
                            className="sticky top-32 w-full min-h-[50vh] bg-surface rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-accent/20 shadow-2xl transition-all duration-500 orange-border-glow overflow-hidden"
                            style={{ zIndex: i }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 glow-orange-sm rounded-full pointer-events-none"></div>

                            <div className="flex-1 flex flex-col justify-between h-full relative z-10 py-4">
                                <div className="font-data text-accent text-xl mb-auto">0{i + 1}</div>
                                <div className="mt-16">
                                    <h3 className="font-drama text-4xl md:text-6xl text-background mb-6"><ScrambleText text={c.title} /></h3>
                                    <p className="font-sans text-lg md:text-2xl text-background/60 max-w-xl leading-relaxed">{c.text}</p>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 h-[300px] md:h-[450px] relative rounded-2xl overflow-hidden border border-background/10 z-10">
                                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay z-20 pointer-events-none"></div>
                                <img src={c.img} alt={c.title} className="w-full h-full object-cover grayscale-[50%] contrast-125 hover:grayscale-0 hover:scale-105 transition-all duration-700" />
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectsPreview = () => {
    const projects = projectsData.slice(0, 3);

    return (
        <section id="work" className="py-32 px-6 md:px-12 bg-primary">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div>
                        <TypewriterText text="/ WORK - RECENT INITIATIVES" />
                        <h2 className="font-drama text-5xl md:text-7xl text-background mt-6">Selected Projects</h2>
                    </div>
                    <Link to="/work" className="magnetic flex items-center gap-3 font-sans text-sm font-bold uppercase tracking-wider text-accent border-b border-accent pb-1 hover:text-glow transition-colors">
                        View Archive <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <Link to={`/work/${p.slug}`} key={i} className="group cursor-pointer block">
                            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl mb-6 border border-accent/20 orange-border-glow">
                                <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent z-10 transition-colors duration-500"></div>
                                <img src={p.heroImage} alt={p.title} className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="font-drama text-3xl text-background mb-1">{p.title}</h3>
                                    <p className="font-data text-accent text-xs uppercase tracking-widest">{p.type}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                                    <ArrowRight className="w-4 h-4 -rotate-45" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Founders = () => {
    return (
        <section className="py-32 px-6 md:px-12 bg-primary border-t border-accent/20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                <div>
                    <TypewriterText text="TEAM // 9_NODES" />
                    <h2 className="font-drama text-5xl md:text-7xl text-background mt-6">Co-Founders</h2>
                    <p className="font-sans text-background/60 mt-4 text-xl">Building together since 2023.</p>
                </div>
                <div className="grid grid-cols-3 gap-0 border border-accent/20">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-20 h-20 md:w-32 md:h-32 border border-accent/10 flex items-center justify-center transition-all duration-500 bg-dark hover:bg-surface hover:border-accent/40">
                            <span className="font-data text-xs text-accent/40 group-hover:text-accent">F{i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    return (
        <>
            <Hero />
            <Features />
            <Philosophy />
            <Protocol />
            <ProjectsPreview />
            <Founders />
        </>
    );
};

export default Home;
