import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Mail, Menu, X } from 'lucide-react';

const GlobalContext = createContext(null);
export const useGlobal = () => useContext(GlobalContext);

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
                    el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 2.5, backgroundColor: 'transparent', border: '1px solid #FF2E2E', duration: 0.3 }));
                    el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, backgroundColor: '#FF2E2E', border: 'none', duration: 0.3 }));
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
    const global = useGlobal();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    if (!global) return null;

    const navLinks = [
        { label: 'Work', url: '/work' },
        { label: 'Services', url: '/services' },
        { label: 'About', url: '/about' },
        { label: 'Contact', url: '/contact' }
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 border-b border-primary/5 bg-background/80 backdrop-blur-md flex justify-between items-center">
            <Link to="/" className="font-sans font-bold text-xl tracking-tighter text-primary hover:text-accent transition-colors z-50">
                {global.brandName || 'TENEX'}
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8 items-center font-mono text-xs uppercase tracking-widest text-primary/80">
                {navLinks.map((link, i) => (
                    <Link key={i} to={link.url} className="hover:text-accent transition-colors">{link.label}</Link>
                ))}
            </div>
            
            <Link to="/contact" className="hidden md:block magnetic font-sans text-sm font-semibold border border-primary/20 text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-background transition-all duration-500">
                {global.ctaText || 'Initiate Sequence'}
            </Link>

            {/* Mobile Toggle */}
            <button 
                className="md:hidden z-50 text-primary hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-background flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                {navLinks.map((link, i) => (
                    <Link 
                        key={i} 
                        to={link.url} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-display text-4xl text-primary hover:text-accent transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
                <Link 
                    to="/contact" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-8 font-sans font-bold text-lg bg-accent text-white px-8 py-4 rounded-full hover:bg-glow transition-colors"
                >
                    {global.ctaText || 'Initiate Sequence'}
                </Link>
            </div>
        </nav>
    );
};

const Footer = () => {
    const global = useGlobal();
    if (!global) return null;

    const headlineParts = (global.footerHeadline || 'Ready to Execute?').split(' ');
    const lastWord = headlineParts.pop();
    const firstWords = headlineParts.join(' ');

    return (
        <footer className="relative bg-surface pt-32 pb-12 px-6 md:px-12 border-t border-primary/5 overflow-hidden mt-24">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(255,46,46,0.1) 0%, transparent 70%)' }}></div>
            <div className="max-w-6xl mx-auto flex flex-col gap-24 relative z-10">
                <div className="flex flex-col items-start gap-8">
                    <h2 className="font-display text-6xl md:text-9xl text-primary leading-[0.9]">
                        {firstWords} <br /><span className="italic text-accent">{lastWord}</span>
                    </h2>
                    <Link to="/contact" className="magnetic flex items-center gap-4 bg-accent text-white px-8 py-4 rounded-full font-sans font-bold text-lg hover:bg-glow transition-colors duration-500 mt-8 w-fit">
                        {global.footerCtaText || "Initiate Contact"}
                        <Mail className="w-5 h-5" />
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 font-mono text-xs uppercase tracking-widest text-primary/60">
                    <div className="flex flex-col gap-2">
                        <span className="text-accent font-bold">LOCATION</span>
                        <span>{global.footerLocation}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-accent font-bold">SOCIAL</span>
                        <div className="flex gap-6">
                            <a href="https://twitter.com/tenex" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Twitter</a>
                            <a href="https://linkedin.com/company/tenex" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
                            <a href="https://github.com/tenex" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">GitHub</a>
                        </div>
                    </div>
                    <div>
                        &copy; {new Date().getFullYear()} {global.footerCopyright}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const Layout = () => {
    const [globalData, setGlobalData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:1337/api/global?populate=*')
            .then(res => res.json())
            .then(json => {
                if (json && json.data) {
                    setGlobalData(json.data);
                }
            })
            .catch(err => console.error('Failed to fetch global config:', err));
    }, []);

    return (
        <GlobalContext.Provider value={globalData}>
            <div className="relative w-full bg-background text-primary min-h-screen selection:bg-accent selection:text-white">
                <CustomCursor />
                <Navbar />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </GlobalContext.Provider>
    );
};

export default Layout;
