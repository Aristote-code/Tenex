import type { Core } from '@strapi/strapi';

const originalProjects = [
    {
        title: 'Nexus',
        slug: 'nexus',
        type: 'Fintech Platform',
        heroImage: '/images/project_1_1772633258112.png',
        overview: 'A next-generation trading platform prioritizing sub-millisecond execution and real-time analytics.',
        challenge: 'Traditional fintech platforms are bloated with legacy architecture, leading to high latency and poor user experience for institutional traders. The client needed a platform that could handle high-frequency data streams without degrading UI performance.',
        solution: 'We engineered a high-throughput websocket-driven architecture that bypasses standard HTTP polling. The frontend utilizes WebGL and heavily optimized React components to render thousands of real-time market data points with zero dropped frames.',
        techStack: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'WebGL'],
        role: 'Full-cycle Product Development',
        timeline: '12 Weeks'
    },
    {
        title: 'Aura',
        slug: 'aura',
        type: 'AI Infrastructure',
        heroImage: '/images/project_2_1772633274878.png',
        overview: 'Distributed machine learning pipeline dashboard for managing clustered compute nodes.',
        challenge: 'Managing and monitoring distributed GPU clusters is notoriously difficult. Our client required a centralized command center to visualize cluster health, model training progress, and resource allocation across multiple data centers.',
        solution: 'We designed a modular, dark-mode-first dashboard that focuses explicitly on data density. By implementing aggressive data virtualization and streaming telemetry, we built an interface that feels instantly responsive even when processing logs from thousands of concurrent nodes.',
        techStack: ['Next.js', 'Go', 'GraphQL', 'ClickHouse', 'Tailwind CSS'],
        role: 'UI/UX Design & Frontend Engineering',
        timeline: '8 Weeks'
    },
    {
        title: 'Onyx',
        slug: 'onyx',
        type: 'Enterprise System',
        heroImage: '/images/project_3_1772633294372.png',
        overview: 'Secure, zero-trust enterprise resource planning system for aerospace logistics.',
        challenge: 'Aerospace manufacturing requires meticulous tracking of millions of components across a global supply chain. Existing solutions were prone to synchronization errors and lacked the stringent security requirements needed for defense contractors.',
        solution: 'We delivered a zero-trust architecture system utilizing end-to-end encryption. The interface was stripped down to absolute essentials to minimize cognitive load on operators, resulting in a 40% reduction in training time and near-zero data entry errors.',
        techStack: ['React', 'Python', 'PostgreSQL', 'Redis', 'Docker'],
        role: 'System Architecture & Fullstack Development',
        timeline: '16 Weeks'
    }
];

const globalSeedData = {
    brandName: 'TENEX',
    ctaText: 'Initiate Sequence',
    footerHeadline: 'Ready to Execute?',
    footerCtaText: 'Initiate Contact',
    footerLocation: 'Global Operations',
    footerCopyright: 'TENEX. ALL RIGHTS RESERVED.',
    navLinks: [
        { label: 'About', url: '/about' },
        { label: 'Work', url: '/work' },
        { label: 'Philosophy', url: '/#philosophy' },
        { label: 'Protocol', url: '/#protocol' },
    ],
    socialLinks: [
        { label: 'Twitter', url: '#' },
        { label: 'LinkedIn', url: '#' },
        { label: 'GitHub', url: '#' },
    ],
};

const homePageSeedData = {
    heroSubtitle: '[ SYS.INIT. / TENEX_V1.0 ]',
    heroHeadline: "We don't just build.\nWe execute.",
    heroDescription: 'High-velocity product studio. Rapid prototyping. Absolute execution.',
    heroButtonText: 'Book a Build Sprint',
    features: [
        { num: '01', title: 'Speed', desc: 'Fast delivery, rapid iteration, execution-first.' },
        { num: '02', title: 'Quality', desc: 'High standards, systems over shortcuts.' },
        { num: '03', title: '10x Mindset', desc: 'Exponential thinking, building for scale.' },
    ],
    manifestoSubtitle: '/ Manifesto',
    manifestoText: "Decisive execution. Exponential thinking. Category-defining products. We don't iterate incrementally. We leapfrog.",
    protocolSubtitle: 'PROTOCOL.ENGAGE()',
    protocolHeadline: 'The Tenex Approach',
    coreProcess: [
        { title: 'Rapid Prototyping', text: 'Validate immediately through high-fidelity prototypes.', image: '/images/protocol_1_1772633314036.png' },
        { title: 'Internal Systems', text: 'Infrastructure and tools designed to compound velocity.', image: '/images/protocol_2_1772633339745.png' },
        { title: 'External Projects', text: 'Client work delivered with uncompromising standards.', image: '/images/protocol_3_1772633358698.png' },
    ],
    foundersSubtitle: 'TEAM // 9_NODES',
    foundersHeadline: 'Co-Founders',
    foundersDescription: 'Building together since 2023.',
    founderCount: 9,
};

const aboutPageSeedData = {
    heroSubtitle: '01. Identity',
    heroHeadline: 'We Are\nTenex',
    heroDescription: 'A specialized digital architecture firm building scalable, high-performance interfaces for the top 1% of the web. We obscure the line between engineering and art.',
    missionSubtitle: 'The Details',
    missionTextParagraph1: "Founded on the principle that digital experiences should be both hyper-functional and visually arresting, TENEX operates strictly at the bleeding edge. We don't just write code; we construct digital monoliths designed to outlast the rapid churn of the modern web.",
    missionTextParagraph2: 'Our team is composed of elite engineers, visionary designers, and relentless problem solvers. We work exclusively with clients who understand that investing in a premium digital presence is non-negotiable in an attention-scarce economy.',
    engineeringFeatures: 'React, WebGL, GSAP, Architecture, Data Visualization, Performance Tuning.',
    designFeatures: 'UI/UX, 3D Prototyping, Motion Graphics, Aesthetic Direction, Brutalist Architecture.',
    atmosphereImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
};

async function ensurePublicPermissions(strapi: Core.Strapi, actions: string[]) {
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
    if (!publicRole) return;
    for (const action of actions) {
        const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({ where: { action, role: publicRole.id } });
        if (!existing) {
            await strapi.db.query('plugin::users-permissions.permission').create({
                data: { action, role: publicRole.id }
            });
        }
    }
}

export default {
    register(/* { strapi }: { strapi: Core.Strapi } */) {},

    async bootstrap({ strapi }: { strapi: Core.Strapi }) {
        try {
            // ── Seed Projects ──
            const existingProjects = await strapi.documents('api::project.project').findMany();
            if (existingProjects.length === 0) {
                console.log('Seeding initial projects...');
                for (const p of originalProjects) {
                    await strapi.documents('api::project.project').create({ data: p });
                }
                console.log('Projects seeded successfully.');
            }

            // ── Seed Global ──
            const existingGlobal = await strapi.documents('api::global.global').findFirst();
            if (!existingGlobal) {
                console.log('Seeding Global content...');
                await strapi.documents('api::global.global').create({ data: globalSeedData as any });
                console.log('Global content seeded.');
            }

            // ── Seed Home Page ──
            const existingHome = await strapi.documents('api::home-page.home-page').findFirst();
            if (!existingHome) {
                console.log('Seeding Home Page content...');
                await strapi.documents('api::home-page.home-page').create({ data: homePageSeedData as any });
                console.log('Home Page content seeded.');
            }

            // ── Seed About Page ──
            const existingAbout = await strapi.documents('api::about-page.about-page').findFirst();
            if (!existingAbout) {
                console.log('Seeding About Page content...');
                await strapi.documents('api::about-page.about-page').create({ data: aboutPageSeedData as any });
                console.log('About Page content seeded.');
            }

            // ── Public Permissions ──
            await ensurePublicPermissions(strapi, [
                'api::project.project.find',
                'api::project.project.findOne',
                'api::global.global.find',
                'api::home-page.home-page.find',
                'api::about-page.about-page.find',
            ]);
            console.log('Public permissions updated successfully.');

        } catch (err) {
            console.error('Error in bootstrap:', err);
        }
    },
};
