// Mock project service with localStorage persistence

const PROJECTS_STORAGE_KEY = 'mock_projects';

// Initial mock data
const initialProjects = [
    {
        id: 1,
        title: 'Nghiên cứu ứng dụng AI trong chẩn đoán bệnh phổi',
        code: 'DT-2024001',
        leader: 'TS. Trần Khoa Học',
        field: 'cntt',
        type: 'cap_truong',
        status: 'Đang thực hiện',
        statusColor: 'bg-blue-100 text-blue-800',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        budget: '500000000',
        objectives: 'Xây dựng mô hình Deep Learning chẩn đoán bệnh phổi qua ảnh X-quang với độ chính xác > 90%.',
        content: '1. Thu thập dữ liệu ảnh X-quang.\n2. Tiền xử lý dữ liệu.\n3. Xây dựng và huấn luyện mô hình.\n4. Đánh giá và tối ưu hóa.\n5. Xây dựng ứng dụng demo.',
        members: [
            { name: 'TS. Trần Khoa Học', role: 'Chủ nhiệm' },
            { name: 'ThS. Nguyễn Văn B', role: 'Thư ký' },
            { name: 'KS. Lê Văn C', role: 'Thành viên' }
        ],
        documents: [
            { name: 'Thuyet_minh_de_tai.pdf', date: '01/01/2024', size: '2.5 MB' },
            { name: 'Hop_dong_trien_khai.pdf', date: '15/01/2024', size: '1.2 MB' }
        ]
    },
    {
        id: 2,
        title: 'Xây dựng hệ thống quản lý giao thông thông minh',
        code: 'DT-2024002',
        leader: 'PGS.TS Phạm Lãnh Đạo',
        field: 'cntt',
        type: 'cap_bo',
        status: 'Chờ duyệt',
        statusColor: 'bg-yellow-100 text-yellow-800',
        startDate: '2024-02-15',
        endDate: '2025-02-15',
        budget: '1200000000',
        objectives: 'Tối ưu hóa luồng giao thông tại các ngã tư trọng điểm.',
        content: 'Nghiên cứu giải thuật điều khiển đèn tín hiệu thích ứng.',
        members: [
            { name: 'PGS.TS Phạm Lãnh Đạo', role: 'Chủ nhiệm' }
        ],
        documents: []
    },
    {
        id: 3,
        title: 'Phát triển vật liệu mới từ rác thải nhựa',
        code: 'DT-2023015',
        leader: 'TS. Nguyễn Vật Liệu',
        field: 'moitruong',
        type: 'cap_truong',
        status: 'Đã nghiệm thu',
        statusColor: 'bg-green-100 text-green-800',
        startDate: '2023-06-01',
        endDate: '2024-06-01',
        budget: '300000000',
        objectives: 'Tái chế rác thải nhựa thành vật liệu xây dựng.',
        content: 'Quy trình xử lý nhiệt và ép khuôn.',
        members: [
            { name: 'TS. Nguyễn Vật Liệu', role: 'Chủ nhiệm' }
        ],
        documents: [
            { name: 'Bao_cao_nghiem_thu.pdf', date: '01/06/2024', size: '5.0 MB' }
        ]
    }
];

const getProjects = () => {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(initialProjects));
        return initialProjects;
    }
    return JSON.parse(stored);
};

export const projectService = {
    getAll: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getProjects());
            }, 500);
        });
    },

    getById: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const projects = getProjects();
                const project = projects.find(p => p.id === parseInt(id));
                if (project) {
                    resolve(project);
                } else {
                    reject(new Error('Không tìm thấy dự án'));
                }
            }, 500);
        });
    },

    create: async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const projects = getProjects();
                const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;

                const newProject = {
                    id: newId,
                    code: `DT-${2024000 + newId}`,
                    status: 'Chờ thẩm định',
                    statusColor: 'bg-gray-100 text-gray-800',
                    documents: [],
                    ...data
                };

                const updatedProjects = [newProject, ...projects];
                localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
                resolve(newProject);
            }, 1000);
        });
    },

    update: async (id, data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const projects = getProjects();
                const index = projects.findIndex(p => p.id === parseInt(id));
                if (index !== -1) {
                    const updatedProject = { ...projects[index], ...data };
                    projects[index] = updatedProject;
                    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
                    resolve(updatedProject);
                } else {
                    reject(new Error('Không tìm thấy dự án'));
                }
            }, 800);
        });
    },

    // Helper to reset data
    resetData: () => {
        localStorage.removeItem(PROJECTS_STORAGE_KEY);
        window.location.reload();
    }
};
