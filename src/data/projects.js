export const projectsData = [
    {
        id: 1,
        slug: 'nexus',
        title: 'Nexus',
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
        id: 2,
        slug: 'aura',
        title: 'Aura',
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
        id: 3,
        slug: 'onyx',
        title: 'Onyx',
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
