import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    FileText,
    Calendar,
    BookOpen,
    BarChart2,
    FolderOpen,
    Settings,
    LogOut
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { user, logout, canManageUsers, canViewReports, isAttendee } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        {
            icon: LayoutDashboard,
            label: 'Dashboard',
            path: '/',
            visible: true
        },
        {
            icon: Users,
            label: 'Người dùng',
            path: '/users',
            visible: canManageUsers()
        },
        {
            icon: FileText,
            label: 'Dự án NCKH',
            path: '/projects',
            visible: !isAttendee()
        },
        {
            icon: Calendar,
            label: 'Hội thảo',
            path: '/conferences',
            visible: true
        },
        {
            icon: BookOpen,
            label: 'Bài báo',
            path: '/publications',
            visible: !isAttendee()
        },
        {
            icon: BarChart2,
            label: 'Báo cáo',
            path: '/reports',
            visible: canViewReports()
        },
        {
            icon: FolderOpen,
            label: 'Tài liệu',
            path: '/documents',
            visible: true
        },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-30">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-2xl font-heading font-bold text-primary flex items-center gap-2">
                    <span className="text-3xl">🔬</span> QLKH
                </h1>
                {user && (
                    <div className="mt-2 text-xs text-gray-500 font-medium px-1 py-0.5 bg-gray-100 rounded inline-block">
                        {user.role === 'admin' ? 'Quản trị viên' :
                            user.role === 'lecturer' ? 'Giảng viên' :
                                user.role === 'staff' ? 'Cán bộ' :
                                    user.role === 'leader' ? 'Lãnh đạo' :
                                        user.role === 'expert' ? 'Chuyên gia' :
                                            user.role === 'accountant' ? 'Kế toán' :
                                                user.role === 'organizer' ? 'Ban Tổ chức' : 'Người tham dự'}
                    </div>
                )}
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navItems.filter(item => item.visible).map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )
                        }
                    >
                        <item.icon size={20} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-danger hover:bg-red-50 w-full transition-colors"
                >
                    <LogOut size={20} />
                    Đăng xuất
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
