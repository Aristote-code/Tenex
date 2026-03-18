import React, { useEffect, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Mail } from 'lucide-react';

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

        const addHoverEffects = () => {
            const interactives = document.querySelectorAll('a, button, .magnetic');
            interactives.forEach(el => {
                if (!el.dataset.cursorBound) {
                    el.dataset.cursorBound = "true";
                    el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 2.5, backgroundColor: 'transparent', border: '1px solid #E8501A', duration: 0.3 }));
                    el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, backgroundColor: '#E8501A', border: 'none', duration: 0.3 }));
                }
            });
        };

        addHoverEffects();

        const observer = new MutationObserver(addHoverEffects);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-3 h-3 rounded-full bg-accent pointer-events-none z-[10000] hidden md:block"
        />
    );
};

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 border-b border-primary/5 bg-background/80 backdrop-blur-md flex justify-between items-center">
            <Link to="/" className="font-sans font-bold text-xl tracking-tighter text-primary hover:text-accent transition-colors">
                TENEX
            </Link>
            <div className="hidden md:flex gap-8 items-center font-mono text-xs uppercase tracking-widest text-primary/80">
                <Link to="/about" className="hover:text-accent transition-colors">About</Link>
                <Link to="/work" className="hover:text-accent transition-colors">Work</Link>
                <Link to="/#philosophy" className="hover:text-accent transition-colors">Philosophy</Link>
                <Link to="/#protocol" className="hover:text-accent transition-colors">Protocol</Link>
            </div>
            <button className="magnetic font-sans text-sm font-semibold border border-primary/20 text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-background transition-all duration-500">
                Initiate Sequence
            </button>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="relative bg-surface pt-32 pb-12 px-6 md:px-12 border-t border-primary/5 overflow-hidden mt-24">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(255,46,46,0.1) 0%, transparent 70%)' }}></div>
            <div className="max-w-6xl mx-auto flex flex-col gap-24 relative z-10">
                <div className="flex flex-col items-start gap-8">
                    <h2 className="font-display text-6xl md:text-9xl text-primary leading-[0.9]">
                        Ready to <br /><span className="italic text-accent">Execute?</span>
                    </h2>
                    <button className="magnetic flex items-center gap-4 bg-accent text-white px-8 py-4 rounded-full font-sans font-bold text-lg hover:bg-glow transition-colors duration-500 mt-8">
                        Initiate Contact
                        <Mail className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 font-mono text-xs uppercase tracking-widest text-primary/60">
                    <div className="flex flex-col gap-2">
                        <span className="text-accent font-bold">LOCATION</span>
                        <span>Global Operations</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-accent font-bold">SOCIAL</span>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-accent transition-colors">Twitter</a>
                            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-accent transition-colors">GitHub</a>
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

const Layout = () => {
    return (
        <div className="relative w-full bg-background text-primary min-h-screen selection:bg-accent selection:text-white">
            <CustomCursor />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
