// Mock publication service with localStorage persistence

const PUBLICATIONS_STORAGE_KEY = 'mock_publications';

// Initial mock data
const initialPublications = [
    {
        id: 1,
        title: 'Deep Learning Approaches for Software Bug Detection',
        authors: ['Nguyễn Văn A', 'Trần Thị B', 'John Smith'],
        journal: 'IEEE Transactions on Software Engineering',
        year: 2024,
        volume: '50',
        issue: '3',
        pages: '245-260',
        doi: '10.1109/TSE.2024.001',
        status: 'Đã xuất bản',
        statusColor: 'bg-green-100 text-green-800',
        type: 'Journal',
        citations: 15,
        impactFactor: 6.5,
        quartile: 'Q1',
        abstract: 'This paper presents a novel deep learning approach for automatically detecting software bugs in source code. Our method achieves 92% accuracy on benchmark datasets.',
        keywords: ['Deep Learning', 'Software Engineering', 'Bug Detection', 'AI']
    },
    {
        id: 2,
        title: 'Blockchain Technology in Financial Services: A Survey',
        authors: ['Lê Văn C', 'Phạm Thị D'],
        journal: 'Journal of Financial Technology',
        year: 2023,
        volume: '12',
        issue: '2',
        pages: '89-105',
        doi: '10.1016/jft.2023.045',
        status: 'Đã xuất bản',
        statusColor: 'bg-green-100 text-green-800',
        type: 'Journal',
        citations: 28,
        impactFactor: 4.2,
        quartile: 'Q2',
        abstract: 'A comprehensive survey of blockchain applications in the financial sector, covering cryptocurrencies, smart contracts, and decentralized finance.',
        keywords: ['Blockchain', 'Fintech', 'Cryptocurrency', 'DeFi']
    },
    {
        id: 3,
        title: 'Machine Learning for Environmental Monitoring',
        authors: ['Hoàng Văn E', 'Nguyễn Thị F', 'Dr. Jane Doe'],
        journal: 'Environmental Science & Technology',
        year: 2024,
        volume: '58',
        issue: '1',
        pages: '112-128',
        doi: '10.1021/est.2024.012',
        status: 'Đang biên tập',
        statusColor: 'bg-yellow-100 text-yellow-800',
        type: 'Journal',
        citations: 5,
        impactFactor: 8.1,
        quartile: 'Q1',
        abstract: 'We propose a machine learning framework for real-time environmental monitoring using IoT sensors and cloud computing.',
        keywords: ['Machine Learning', 'Environment', 'IoT', 'Monitoring']
    },
    {
        id: 4,
        title: 'AI-Powered Healthcare Diagnosis System',
        authors: ['Trần Văn G'],
        journal: 'Proceedings of International Conference on AI in Healthcare',
        year: 2024,
        volume: '',
        issue: '',
        pages: '45-52',
        doi: '10.1145/icaih.2024.089',
        status: 'Đã xuất bản',
        statusColor: 'bg-green-100 text-green-800',
        type: 'Conference',
        citations: 3,
        impactFactor: null,
        quartile: 'N/A',
        abstract: 'An AI system for automated medical diagnosis using computer vision and natural language processing.',
        keywords: ['AI', 'Healthcare', 'Diagnosis', 'Computer Vision']
    }
];

// Helper functions
const getPublications = () => {
    const stored = localStorage.getItem(PUBLICATIONS_STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem(PUBLICATIONS_STORAGE_KEY, JSON.stringify(initialPublications));
    return initialPublications;
};

export const publicationService = {
    // Get all publications
    getAll: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getPublications());
            }, 500);
        });
    },

    // Get publication by ID
    getById: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const publications = getPublications();
                const publication = publications.find(p => p.id === parseInt(id));
                if (publication) {
                    resolve(publication);
                } else {
                    reject(new Error('Không tìm thấy bài báo'));
                }
            }, 500);
        });
    },

    // Create new publication
    create: async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const publications = getPublications();
                const newId = publications.length > 0 ? Math.max(...publications.map(p => p.id)) + 1 : 1;

                const newPublication = {
                    id: newId,
                    status: 'Đang biên tập',
                    statusColor: 'bg-yellow-100 text-yellow-800',
                    citations: 0,
                    ...data
                };

                const updatedPublications = [newPublication, ...publications];
                localStorage.setItem(PUBLICATIONS_STORAGE_KEY, JSON.stringify(updatedPublications));
                resolve(newPublication);
            }, 1000);
        });
    },

    // Update publication
    update: async (id, data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const publications = getPublications();
                const index = publications.findIndex(p => p.id === parseInt(id));

                if (index !== -1) {
                    publications[index] = { ...publications[index], ...data };
                    localStorage.setItem(PUBLICATIONS_STORAGE_KEY, JSON.stringify(publications));
                    resolve(publications[index]);
                } else {
                    reject(new Error('Không tìm thấy bài báo'));
                }
            }, 1000);
        });
    },

    // Delete publication
    delete: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const publications = getPublications();
                const filtered = publications.filter(p => p.id !== parseInt(id));
                localStorage.setItem(PUBLICATIONS_STORAGE_KEY, JSON.stringify(filtered));
                resolve();
            }, 500);
        });
    },

    // Reset to initial data
    resetData: () => {
        localStorage.setItem(PUBLICATIONS_STORAGE_KEY, JSON.stringify(initialPublications));
    }
};
