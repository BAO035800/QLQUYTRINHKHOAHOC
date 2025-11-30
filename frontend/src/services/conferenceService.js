// Mock conference service with localStorage persistence

const CONFERENCES_STORAGE_KEY = 'mock_conferences';

// Initial mock data
const initialConferences = [
    {
        id: 1,
        code: 'HT-2024-001',
        title: 'Hội thảo Khoa học Quốc tế về Trí tuệ Nhân tạo và Ứng dụng',
        type: 'Quốc tế',
        startDate: '2024-12-15',
        endDate: '2024-12-17',
        location: 'Hà Nội, Việt Nam',
        organizer: 'Trường Đại học Bách Khoa Hà Nội',
        status: 'Đang chuẩn bị',
        statusColor: 'bg-blue-100 text-blue-800',
        budget: 200000000,
        participants: 150,
        objectives: 'Tạo diễn đàn trao đổi nghiên cứu về AI, Machine Learning và ứng dụng trong các lĩnh vực công nghiệp.',
        agenda: `Ngày 1: Khai mạc và các báo cáo chính
Ngày 2: Các phiên thảo luận chuyên đề
Ngày 3: Workshop và bế mạc`,
        guests: [
            { name: 'Prof. John Smith', affiliation: 'MIT, USA', role: 'Keynote Speaker' },
            { name: 'Dr. Nguyễn Văn A', affiliation: 'ĐHBK Hà Nội', role: 'Chủ tọa' },
            { name: 'Dr. Trần Thị B', affiliation: 'ĐH Quốc Gia HN', role: 'Diễn giả' }
        ],
        documents: [
            { name: 'Chương trình hội thảo.pdf', date: '2024-11-20', size: '1.2 MB' },
            { name: 'Danh sách khách mời.xlsx', date: '2024-11-25', size: '0.5 MB' }
        ]
    },
    {
        id: 2,
        code: 'HT-2024-002',
        title: 'Hội nghị Khoa học Công nghệ Môi trường',
        type: 'Trong nước',
        startDate: '2024-11-10',
        endDate: '2024-11-11',
        location: 'TP. Hồ Chí Minh',
        organizer: 'Viện Môi trường và Tài nguyên',
        status: 'Đã hoàn thành',
        statusColor: 'bg-green-100 text-green-800',
        budget: 80000000,
        participants: 80,
        objectives: 'Chia sẻ các nghiên cứu mới về bảo vệ môi trường và phát triển bền vững.',
        agenda: `Ngày 1: Báo cáo tổng quan và thảo luận
Ngày 2: Tham quan thực địa`,
        guests: [
            { name: 'PGS.TS Lê Văn C', affiliation: 'Viện MT&TN', role: 'Chủ tọa' },
            { name: 'TS. Phạm Thị D', affiliation: 'ĐH Khoa học Tự nhiên', role: 'Diễn giả' }
        ],
        documents: [
            { name: 'Báo cáo tổng kết.pdf', date: '2024-11-15', size: '2.8 MB' }
        ]
    },
    {
        id: 3,
        code: 'HT-2025-001',
        title: 'Workshop Blockchain và Fintech',
        type: 'Trong nước',
        startDate: '2025-02-20',
        endDate: '2025-02-20',
        location: 'Đà Nẵng',
        organizer: 'Khoa CNTT - ĐHBK Hà Nội',
        status: 'Đang lên kế hoạch',
        statusColor: 'bg-yellow-100 text-yellow-800',
        budget: 50000000,
        participants: 60,
        objectives: 'Giới thiệu công nghệ Blockchain và ứng dụng trong lĩnh vực tài chính.',
        agenda: `Buổi sáng: Giới thiệu lý thuyết
Buổi chiều: Thực hành và demo`,
        guests: [
            { name: 'Mr. Nguyễn Văn E', affiliation: 'VietcomBank', role: 'Chuyên gia' },
            { name: 'Dr. Hoàng Văn F', affiliation: 'ĐHBK HN', role: 'Diễn giả' }
        ],
        documents: []
    }
];

// Helper functions
const getConferences = () => {
    const stored = localStorage.getItem(CONFERENCES_STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem(CONFERENCES_STORAGE_KEY, JSON.stringify(initialConferences));
    return initialConferences;
};

export const conferenceService = {
    // Get all conferences
    getAll: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getConferences());
            }, 500);
        });
    },

    // Get conference by ID
    getById: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const conferences = getConferences();
                const conference = conferences.find(c => c.id === parseInt(id));
                if (conference) {
                    resolve(conference);
                } else {
                    reject(new Error('Không tìm thấy hội thảo'));
                }
            }, 500);
        });
    },

    // Create new conference
    create: async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const conferences = getConferences();
                const newId = conferences.length > 0 ? Math.max(...conferences.map(c => c.id)) + 1 : 1;
                const year = new Date().getFullYear();

                const newConference = {
                    id: newId,
                    code: `HT-${year}-${String(newId).padStart(3, '0')}`,
                    status: 'Đang lên kế hoạch',
                    statusColor: 'bg-yellow-100 text-yellow-800',
                    participants: 0,
                    documents: [],
                    ...data
                };

                const updatedConferences = [newConference, ...conferences];
                localStorage.setItem(CONFERENCES_STORAGE_KEY, JSON.stringify(updatedConferences));
                resolve(newConference);
            }, 1000);
        });
    },

    // Update conference
    update: async (id, data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const conferences = getConferences();
                const index = conferences.findIndex(c => c.id === parseInt(id));

                if (index !== -1) {
                    conferences[index] = { ...conferences[index], ...data };
                    localStorage.setItem(CONFERENCES_STORAGE_KEY, JSON.stringify(conferences));
                    resolve(conferences[index]);
                } else {
                    reject(new Error('Không tìm thấy hội thảo'));
                }
            }, 1000);
        });
    },

    // Delete conference
    delete: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const conferences = getConferences();
                const filtered = conferences.filter(c => c.id !== parseInt(id));
                localStorage.setItem(CONFERENCES_STORAGE_KEY, JSON.stringify(filtered));
                resolve();
            }, 500);
        });
    },

    // Reset to initial data
    resetData: () => {
        localStorage.setItem(CONFERENCES_STORAGE_KEY, JSON.stringify(initialConferences));
    }
};
