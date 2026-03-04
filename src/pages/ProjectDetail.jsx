import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ScrambleText, TypewriterText } from '../components/ui';
import { projectsData } from '../data/projects';

const ProjectDetail = () => {
    const { slug } = useParams();
    const project = projectsData.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return <Navigate to="/work" replace />;
    }

    return (
        <div className="pt-32 pb-32 min-h-screen">
            {/* Hero Image Header */}
            <div className="px-6 md:px-12 mb-12">
                <Link to="/work" className="magnetic inline-flex items-center gap-2 font-data text-xs uppercase tracking-widest text-background/50 hover:text-accent transition-colors mb-12">
                    <ArrowLeft className="w-4 h-4" /> Back to Archive
                </Link>

                <div className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <TypewriterText text={`/ PROJECT: ${project.slug.toUpperCase()}`} />
                        <h1 className="font-drama text-6xl md:text-9xl text-background mt-4 mb-8">
                            {project.title}
                        </h1>
                        <p className="font-sans text-2xl text-background/80 max-w-3xl leading-relaxed">
                            {project.overview}
                        </p>
                    </div>
                </div>
            </div>

            {/* Full width image */}
            <div className="w-full h-[50vh] md:h-[70vh] relative mb-24 border-y border-accent/20">
                <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover grayscale-[20%]" />
                <div className="absolute inset-0 bg-dark/20 mix-blend-overlay"></div>
            </div>

            {/* Detail Grid */}
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

                    {/* Sidebar Info */}
                    <div className="md:col-span-4 flex flex-col gap-12 font-data text-sm tracking-widest uppercase">
                        <div className="flex flex-col gap-3">
                            <span className="text-accent">Type</span>
                            <span className="text-background">{project.type}</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-accent">Role</span>
                            <span className="text-background">{project.role}</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-accent">Timeline</span>
                            <span className="text-background">{project.timeline}</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-accent">Tech Stack</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.techStack.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 border border-accent/30 rounded-full text-xs text-background/80">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-8 flex flex-col gap-16">

                        <div>
                            <h2 className="font-drama text-4xl text-background mb-6"><ScrambleText text="The Challenge" /></h2>
                            <p className="font-sans text-xl text-background/70 leading-relaxed">
                                {project.challenge}
                            </p>
                        </div>

                        <div className="w-full h-[1px] bg-accent/20"></div>

                        <div>
                            <h2 className="font-drama text-4xl text-background mb-6"><ScrambleText text="The Solution" /></h2>
                            <p className="font-sans text-xl text-background/70 leading-relaxed">
                                {project.solution}
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProjectDetail;
