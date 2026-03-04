import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, Mail, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Custom Cursor ---
const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" }),
      yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    const interactives = document.querySelectorAll('a, button, .magnetic');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 2.5, backgroundColor: 'transparent', border: '1px solid #FAF8F5', duration: 0.3 }));
      el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, backgroundColor: '#FAF8F5', border: 'none', duration: 0.3 }));
    });

    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-background pointer-events-none z-[10000] hidden md:block mix-blend-difference"
    />
  );
};

// --- Diagnostic Shuffler Text ---
const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const intervalRef = useRef(null);

  const scramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setDisplayText(prev =>
        prev.split('').map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <span onMouseEnter={scramble} className="cursor-default inline-block">
      {displayText}
    </span>
  );
};

// --- Telemetry Typewriter ---
const TypewriterText = ({ text, className = "" }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    const chars = text.split('');
    el.innerHTML = '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        chars.forEach((char, i) => {
          setTimeout(() => {
            el.innerHTML += char;
          }, i * 30);
        });
      },
      once: true
    });
  }, [text]);

  return <span ref={textRef} className={`font-data text-accent text-sm tracking-widest uppercase ${className}`}></span>;
};

// --- Navbar ---
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 mix-blend-difference flex justify-between items-center">
      <div className="font-sans font-bold text-xl tracking-tighter text-background">
        TENEX
      </div>
      <div className="hidden md:flex gap-8 items-center font-data text-xs uppercase tracking-widest text-background">
        <a href="#philosophy" className="hover:text-accent transition-colors">Philosophy</a>
        <a href="#protocol" className="hover:text-accent transition-colors">Protocol</a>
        <a href="#work" className="hover:text-accent transition-colors">Work</a>
      </div>
      <button className="magnetic font-sans text-sm font-medium border border-background/20 text-background px-6 py-2 rounded-full hover:bg-background hover:text-primary transition-all duration-500">
        Initiate Sequence
      </button>
    </nav>
  );
};

// --- Hero Section ---
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
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-dark -z-10"></div>

      <div className="max-w-6xl mx-auto w-full flex flex-col items-start gap-8 z-10">
        <div className="hero-elem">
          <TypewriterText text="[ SYS.INIT. / TENEX_V1.0 ]" />
        </div>

        <h1 className="hero-elem font-drama text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] text-background max-w-5xl">
          We don't just build.<br />
          <span className="italic text-slate">We execute.</span>
        </h1>

        <p className="hero-elem font-sans text-lg md:text-xl text-background/60 max-w-2xl leading-relaxed mt-4">
          <ScrambleText text="Tenex is a product studio engineering high-velocity solutions. Rapid prototyping and execution for teams that demand absolute speed without compromising quality." />
        </p>

        <div className="hero-elem mt-8">
          <button className="magnetic group flex items-center gap-4 bg-accent text-primary px-8 py-4 rounded-full font-sans font-semibold text-lg hover:bg-background transition-colors duration-500">
            Book a Build Sprint
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-12 hero-elem">
        <div className="animate-bounce mt-4 opacity-50">
          <div className="w-[1px] h-16 bg-background"></div>
        </div>
      </div>
    </section>
  );
};

// --- Values Section ---
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
            <div key={i} className="flex flex-col gap-6 border-t border-background/10 pt-8 group cursor-default">
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

// --- Manifesto / Philosophy ---
const Philosophy = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const words = textRef.current.querySelectorAll('.word');
    gsap.fromTo(words,
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
  }, []);

  const text = "Tenex sits at the intersection of speed and quality. Our 10x mindset ensures we are not iterating incrementally, but leapfrogging the obvious to build category-defining products. We move forward decisively. Once a decision is made, we execute with extreme precision.";

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

// --- Stacked Cards Protocol ---
const Protocol = () => {
  const containerRef = useRef(null);

  const cards = [
    { title: "Rapid Prototyping", text: "Validate immediately through high-fidelity working prototypes rather than endless slides." },
    { title: "Internal Systems", text: "Company-building infrastructure, tools, and platforms designed to compound velocity." },
    { title: "External Projects", text: "Client work and product experiments delivered with uncompromising quality standards." }
  ];

  useEffect(() => {
    // Basic sticky scrolling logic via CSS sticky, but enhanced with GSAP for fade/scale if desired.
    // CSS sticky achieves the "stacking" effect elegantly.
  }, []);

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
              className="sticky top-32 w-full min-h-[50vh] bg-[#1A1A22] rounded-3xl p-8 md:p-16 flex flex-col justify-between border border-background/5 shadow-2xl transition-transform"
              style={{ zIndex: i }}
            >
              <div className="font-data text-accent text-xl">0{i + 1}</div>
              <div>
                <h3 className="font-drama text-4xl md:text-6xl text-background mb-6"><ScrambleText text={c.title} /></h3>
                <p className="font-sans text-lg md:text-2xl text-background/60 max-w-2xl leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Founders / Team ---
const Founders = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-primary border-t border-background/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div>
          <TypewriterText text="TEAM // 9_NODES" />
          <h2 className="font-drama text-5xl md:text-7xl text-background mt-6">Co-Founders</h2>
          <p className="font-sans text-background/60 mt-4 text-xl">Building together since 2023.</p>
        </div>
        <div className="grid grid-cols-3 gap-0 border border-background/10">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-20 h-20 md:w-32 md:h-32 border border-background/10 flex items-center justify-center filter grayscale hover:grayscale-0 transition-all duration-500 bg-dark hover:bg-slate/80">
              <span className="font-data text-xs text-background/30">F{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact / Footer ---
const Footer = () => {
  return (
    <footer className="bg-dark pt-32 pb-12 px-6 md:px-12 border-t border-background/5">
      <div className="max-w-6xl mx-auto flex flex-col gap-24">
        <div className="flex flex-col items-start gap-8">
          <h2 className="font-drama text-6xl md:text-9xl text-background leading-[0.9]">
            Ready to <br /><span className="italic text-accent">Execute?</span>
          </h2>
          <button className="magnetic flex items-center gap-4 bg-background text-primary px-8 py-4 rounded-full font-sans font-bold text-lg hover:bg-accent hover:text-primary transition-colors duration-500 mt-8">
            Initiate Contact
            <Mail className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 font-data text-xs uppercase tracking-widest text-background/40">
          <div className="flex flex-col gap-2">
            <span className="text-accent">LOCATION</span>
            <span>Global Operations</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-accent">SOCIAL</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-background transition-colors">Twitter</a>
              <a href="#" className="hover:text-background transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-background transition-colors">GitHub</a>
            </div>
          </div>
          <div>
            &copy; {new Date().getFullYear()} TENEX. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="relative w-full bg-primary min-h-screen selection:bg-accent selection:text-primary">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Founders />
      <Footer />
    </div>
  );
}

export default App;
