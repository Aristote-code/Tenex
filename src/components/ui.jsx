import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrambleText = ({ text }) => {
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

export const TypewriterText = ({ text, className = "" }) => {
    const textRef = useRef(null);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;
        const chars = text.split('');
        el.innerHTML = '';

        const st = ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => {
                chars.forEach((char, i) => {
                    setTimeout(() => {
                        if (el) el.innerHTML += char;
                    }, i * 30);
                });
            },
            once: true
        });

        return () => {
            st.kill();
        }
    }, [text]);

    return <span ref={textRef} className={`font-data text-accent text-sm tracking-widest uppercase ${className}`}></span>;
};
