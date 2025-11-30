// Mock auth service with comprehensive role-based accounts
export const authService = {
    login: async (username, password) => {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = mockUsers.find(u => u.username === username && u.password === password);

                if (user) {
                    // Return user info without password
                    const { password, ...userInfo } = user;
                    resolve(userInfo);
                } else {
                    reject(new Error('Tên đăng nhập hoặc mật khẩu không đúng'));
                }
            }, 800);
        });
    },

    logout: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    },
};

// Mock Data for all roles
const mockUsers = [
    {
        id: 1,
        username: 'admin',
        password: '123',
        fullName: 'Nguyễn Quản Trị',
        role: 'admin', // 1. Quản trị hệ thống
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff',
        department: 'Phòng Công nghệ thông tin'
    },
    {
        id: 2,
        username: 'lecturer',
        password: '123',
        fullName: 'TS. Trần Giáo Viên',
        role: 'lecturer', // 2. Giáo viên / Đơn vị đề xuất
        avatar: 'https://ui-avatars.com/api/?name=Lecturer&background=random',
        department: 'Khoa Công nghệ phần mềm'
    },
    {
        id: 3,
        username: 'staff',
        password: '123',
        fullName: 'Lê Cán Bộ',
        role: 'staff', // 3. Cán bộ (Phòng Đào tạo/Hành chính)
        avatar: 'https://ui-avatars.com/api/?name=Staff&background=random',
        department: 'Phòng Quản lý Khoa học'
    },
    {
        id: 4,
        username: 'leader',
        password: '123',
        fullName: 'PGS.TS Phạm Lãnh Đạo',
        role: 'leader', // 4. Lãnh đạo Nhà trường
        avatar: 'https://ui-avatars.com/api/?name=Leader&background=random',
        department: 'Ban Giám hiệu'
    },
    {
        id: 5,
        username: 'expert',
        password: '123',
        fullName: 'GS. Vũ Chuyên Gia',
        role: 'expert', // 5. Chuyên gia / Hội đồng
        avatar: 'https://ui-avatars.com/api/?name=Expert&background=random',
        department: 'Hội đồng Khoa học'
    },
    {
        id: 6,
        username: 'accountant',
        password: '123',
        fullName: 'Đỗ Kế Toán',
        role: 'accountant', // 6. Kế toán
        avatar: 'https://ui-avatars.com/api/?name=Accountant&background=random',
        department: 'Phòng Tài chính Kế toán'
    },
    {
        id: 7,
        username: 'organizer',
        password: '123',
        fullName: 'Phạm Ban Tổ Chức',
        role: 'organizer', // 7. Ban Tổ chức (Hội thảo)
        avatar: 'https://ui-avatars.com/api/?name=Organizer&background=random',
        department: 'Phòng Tổ chức Sự kiện'
    },
    {
        id: 8,
        username: 'attendee',
        password: '123',
        fullName: 'Hoàng Sinh Viên',
        role: 'attendee', // 8. Người tham dự
        avatar: 'https://ui-avatars.com/api/?name=Attendee&background=random',
        department: 'Lớp KTPM 2021'
    }
];
