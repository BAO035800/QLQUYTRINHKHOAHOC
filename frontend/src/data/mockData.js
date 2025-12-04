
export const USERS = [
    {
        id: 1,
        username: 'nvkh1',
        password: '123',
        fullName: 'Nguyễn Văn Khoa Học',
        role: 'NVKH', // Nhà khoa học
        email: 'nvkh1@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+Khoa+Hoc&background=0D8ABC&color=fff'
    },
    {
        id: 2,
        username: 'ql1',
        password: '123',
        fullName: 'Trần Quản Lý',
        role: 'QL', // Cán bộ quản lý
        email: 'ql1@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Tran+Quan+Ly&background=random'
    },
    {
        id: 3,
        username: 'cg1',
        password: '123',
        fullName: 'Lê Chuyên Gia',
        role: 'CHUYEN_GIA', // Chuyên gia
        email: 'cg1@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Le+Chuyen+Gia&background=random'
    },
    {
        id: 4,
        username: 'admin',
        password: '123',
        fullName: 'Admin System',
        role: 'ADMIN',
        email: 'admin@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=000&color=fff'
    }
];

export const PROPOSAL_STATUS = {
    DRAFT: 'DRAFT', // Nháp
    SUBMITTED: 'SUBMITTED', // Đã gửi / Chờ phân công
    UNDER_REVIEW: 'UNDER_REVIEW', // Đang đánh giá
    REVISION_REQUIRED: 'REVISION_REQUIRED', // Yêu cầu sửa chữa
    APPROVED: 'APPROVED', // Đã duyệt / Chờ ký hợp đồng
    WAITING_CONTRACT: 'WAITING_CONTRACT', // Chờ ký hợp đồng
    IN_PROGRESS: 'IN_PROGRESS', // Đang thực hiện (Đề tài)
    ACCEPTANCE_BASE: 'ACCEPTANCE_BASE', // Nghiệm thu cấp cơ sở
    ACCEPTANCE_OFFICIAL: 'ACCEPTANCE_OFFICIAL', // Nghiệm thu chính thức
    COMPLETED: 'COMPLETED', // Đã hoàn thành
    REJECTED: 'REJECTED' // Không đạt
};

export const PROPOSALS = [
    {
        id: 101,
        title: 'Nghiên cứu ứng dụng Blockchain trong truy xuất nguồn gốc nông sản',
        authorId: 1,
        field: 'Công nghệ thông tin',
        budget: '500.000.000 VNĐ',
        status: PROPOSAL_STATUS.SUBMITTED,
        createdAt: '2023-10-15',
        description: 'Đề tài nhằm xây dựng hệ thống truy xuất nguồn gốc minh bạch...',
        files: ['thuyet_minh_v1.pdf'],
        councilId: null,
        reviews: []
    },
    {
        id: 102,
        title: 'Phát triển giống lúa chịu mặn cho vùng ĐBSCL',
        authorId: 1,
        field: 'Nông nghiệp',
        budget: '1.200.000.000 VNĐ',
        status: PROPOSAL_STATUS.IN_PROGRESS,
        createdAt: '2023-01-10',
        startDate: '2023-06-01',
        endDate: '2025-06-01',
        description: 'Nghiên cứu lai tạo giống lúa mới...',
        files: ['thuyet_minh_final.pdf', 'hop_dong.pdf'],
        councilId: 201,
        reviews: [
            { expertId: 3, score: 85, comment: 'Đề tài có tính thực tiễn cao.', result: 'Dat' }
        ]
    },
    {
        id: 103,
        title: 'Xây dựng mô hình du lịch sinh thái bền vững',
        authorId: 1,
        field: 'Du lịch',
        budget: '300.000.000 VNĐ',
        status: PROPOSAL_STATUS.DRAFT,
        createdAt: '2023-11-20',
        description: 'Mô hình thử nghiệm tại Vườn quốc gia...',
        files: [],
        councilId: null,
        reviews: []
    }
];

export const COUNCILS = [
    {
        id: 201,
        name: 'Hội đồng Nông nghiệp & Sinh học',
        members: [
            { userId: 3, role: 'Chủ tịch' },
            { userId: 2, role: 'Thư ký' } // Giả sử QL cũng tham gia hỗ trợ
        ]
    },
    {
        id: 202,
        name: 'Hội đồng Công nghệ thông tin',
        members: [
            { userId: 3, role: 'Ủy viên' }
        ]
    }
];

export const NOTIFICATIONS = [
    {
        id: 1,
        userId: 1,
        message: 'Đề xuất "Nghiên cứu Blockchain" đã được tiếp nhận.',
        read: false,
        date: '2023-10-16'
    },
    {
        id: 2,
        userId: 3,
        message: 'Bạn được mời tham gia Hội đồng đánh giá đề tài 102.',
        read: true,
        date: '2023-02-15'
    }
];
