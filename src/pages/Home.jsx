import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrambleText, TypewriterText } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ data }) => {
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

    const headlineLines = (data.heroHeadline || '').split('\n');

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-surface -z-10"></div>
            <div className="absolute inset-0 glow-red opacity-50 -z-10 pointer-events-none"></div>
            <div className="shimmer-line left-1/3 h-64 top-0" style={{ animationDelay: '0s' }}></div>
            <div className="shimmer-line left-2/3 h-48 top-0" style={{ animationDelay: '1.5s' }}></div>

            <div className="max-w-6xl mx-auto w-full flex flex-col items-start gap-8 z-10">
                <div className="hero-elem">
                    <TypewriterText text={data.heroSubtitle} />
                </div>

                <h1 className="hero-elem font-display text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] text-primary max-w-5xl">
                    {headlineLines[0]}<br />
                    <span className="italic text-accent">{headlineLines[1]}</span>
                </h1>

                <p className="hero-elem font-sans text-lg md:text-xl text-primary/70 max-w-2xl leading-relaxed mt-4 font-medium">
                    <ScrambleText text={data.heroDescription} />
                </p>

                <div className="hero-elem mt-8">
                    <Link to="/contact" className="magnetic group flex w-fit items-center gap-4 bg-accent text-white px-8 py-4 rounded-full font-sans font-bold text-lg hover:bg-glow transition-colors duration-500 shadow-lg shadow-accent/20">
                        {data.heroButtonText || "Book a Build Sprint"}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
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

const Features = ({ features }) => {
    return (
        <section className="py-32 px-6 md:px-12 bg-card border-y border-primary/5">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((f, i) => (
                        <div key={i} className="flex flex-col gap-6 pt-8 group cursor-default relative">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/10 group-hover:bg-accent transition-colors duration-500"></div>
                            <div className="font-mono text-accent text-xs font-bold">SYS_VAR: {f.num}</div>
                            <h3 className="font-display text-3xl text-primary font-bold"><ScrambleText text={f.title} /></h3>
                            <p className="font-sans text-primary/70 leading-relaxed font-medium">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Philosophy = ({ data }) => {
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

    return (
        <section id="philosophy" className="py-48 px-6 md:px-12 bg-surface">
            <div className="max-w-5xl mx-auto">
                <p className="font-mono text-accent font-bold text-sm mb-12 uppercase tracking-widest block">{data.manifestoSubtitle}</p>
                <h2 ref={textRef} className="font-display font-medium text-4xl md:text-6xl lg:text-7xl text-primary leading-tight">
                    {(data.manifestoText || '').split(' ').map((word, i) => (
                        <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
                    ))}
                </h2>
            </div>
        </section>
    );
};

const Protocol = ({ data }) => {
    const cards = data.coreProcess || [];

    return (
        <section id="protocol" className="relative py-32 px-6 md:px-12 bg-background border-y border-primary/5">
            <div className="max-w-6xl mx-auto">
                <div className="mb-24">
                    <TypewriterText text={data.protocolSubtitle} />
                    <h2 className="font-display font-bold text-5xl md:text-7xl text-primary mt-6">{data.protocolHeadline}</h2>
                </div>

                <div className="relative flex flex-col gap-24">
                    {cards.map((c, i) => (
                        <div
                            key={i}
                            className="sticky top-32 w-full min-h-[50vh] bg-card rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-primary/10 shadow-xl transition-all duration-500 red-border-glow overflow-hidden"
                            style={{ zIndex: i }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 glow-red-sm rounded-full pointer-events-none opacity-40"></div>

                            <div className="flex-1 flex flex-col justify-between h-full relative z-10 py-4">
                                <div className="font-mono text-accent font-bold text-xl mb-auto">0{i + 1}</div>
                                <div className="mt-16">
                                    <h3 className="font-display font-bold text-4xl md:text-6xl text-primary mb-6"><ScrambleText text={c.title} /></h3>
                                    <p className="font-sans font-medium text-lg md:text-2xl text-primary/70 max-w-xl leading-relaxed">{c.text}</p>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 h-[300px] md:h-[450px] relative rounded-2xl overflow-hidden border border-primary/10 z-10 shadow-inner">
                                <div className="absolute inset-0 bg-accent/5 mix-blend-multiply z-20 pointer-events-none"></div>
                                <img src={c.image} alt={c.title} className="w-full h-full object-cover grayscale-[20%] contrast-110 hover:grayscale-0 hover:scale-105 transition-all duration-700" />
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectsPreview = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:1337/api/projects')
            .then(res => res.json())
            .then(data => {
                if (data && data.data) {
                    setProjects(data.data.slice(0, 3));
                }
            })
            .catch(err => console.error("Failed to fetch projects:", err));
    }, []);

    return (
        <section id="work" className="py-32 px-6 md:px-12 bg-surface">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div>
                        <TypewriterText text="/ WORK - RECENT INITIATIVES" />
                        <h2 className="font-display font-bold text-5xl md:text-7xl text-primary mt-6">Selected Projects</h2>
                    </div>
                    <Link to="/work" className="magnetic flex items-center gap-3 font-sans text-sm font-bold uppercase tracking-wider text-accent border-b border-accent pb-1 hover:text-glow transition-colors">
                        View Archive <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <Link to={`/work/${p.slug}`} key={i} className="group cursor-pointer block">
                            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl mb-6 border border-primary/10 red-border-glow shadow-md">
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent z-10 transition-colors duration-500"></div>
                                <img src={p.heroImage} alt={p.title} className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="font-display font-bold text-3xl text-primary mb-1">{p.title}</h3>
                                    <p className="font-mono font-bold text-accent text-xs uppercase tracking-widest">{p.type}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
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

const Founders = ({ data }) => {
    const team = [
        { name: "Prince Ndanyuzwe", role: "CEO" },
        { name: "Dimitri Kwihangana", role: "CTO" },
        { name: "Kevin Nyiringango", role: "COO" },
        { name: "Elisa Niyogisubizo", role: "CFO & Marketing" },
        { name: "Aristote Gahima", role: "Product & Design" },
        { name: "Aristide Isingizwe", role: "Software Architect" },
        { name: "Johnson Tuyishime", role: "Eng Lead" },
        { name: "Ken Kalisa Ganza", role: "Cloud Eng" },
        { name: "Davy Mbuto", role: "Business Dev" }
    ];

    return (
        <section className="py-32 px-6 md:px-12 bg-card border-t border-primary/10">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
                <div className="lg:w-1/3">
                    <TypewriterText text={data.foundersSubtitle || "/ THE_CORE_TEAM"} />
                    <h2 className="font-display font-bold text-5xl md:text-7xl text-primary mt-6">{data.foundersHeadline || "9 Founders"}</h2>
                    <p className="font-sans text-primary/70 mt-4 text-xl font-medium">{data.foundersDescription || "A collective of builders focused on speed, quality, and 10x execution."}</p>
                </div>
                <div className="lg:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {team.map((member, i) => (
                        <div key={i} className="p-6 border border-primary/10 rounded-xl bg-background hover:border-accent/40 transition-colors duration-500 group cursor-default relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                            <h3 className="font-display font-bold text-xl text-primary mb-1">{member.name}</h3>
                            <p className="font-mono text-xs uppercase tracking-widest text-accent font-bold">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:1337/api/home-page?populate=*')
            .then(res => res.json())
            .then(json => {
                if (json && json.data) {
                    setPageData(json.data);
                }
            })
            .catch(err => console.error('Failed to fetch home page:', err));
    }, []);

    if (!pageData) return null;

    return (
        <>
            <Hero data={pageData} />
            <Features features={pageData.features || []} />
            <Philosophy data={pageData} />
            <Protocol data={pageData} />
            <ProjectsPreview />
            <Founders data={pageData} />
        </>
    );
};

export default Home;
