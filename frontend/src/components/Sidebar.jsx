
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    BookOpen,
    CheckSquare,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const { user, logout } = useAuth();

    const getNavItems = () => {
        const common = [
            { icon: <LayoutDashboard size={20} />, label: 'Tổng quan', path: '/' },
        ];

        if (user?.role === 'NVKH') {
            return [
                ...common,
                { icon: <FileText size={20} />, label: 'Đề xuất của tôi', path: '/proposals' },
                { icon: <BookOpen size={20} />, label: 'Đề tài đang thực hiện', path: '/projects' },
                { icon: <Users size={20} />, label: 'Lý lịch khoa học', path: '/profile' },
            ];
        }

        if (user?.role === 'QL') {
            return [
                ...common,
                { icon: <FileText size={20} />, label: 'Quản lý Đề xuất', path: '/manage-proposals' },
                { icon: <BookOpen size={20} />, label: 'Quản lý Đề tài', path: '/manage-projects' },
                { icon: <Users size={20} />, label: 'Hội đồng & Chuyên gia', path: '/councils' },
            ];
        }

        if (user?.role === 'CHUYEN_GIA') {
            return [
                ...common,
                { icon: <CheckSquare size={20} />, label: 'Thẩm định & Đánh giá', path: '/reviews' },
            ];
        }

        if (user?.role === 'ADMIN') {
            return [
                ...common,
                { icon: <Users size={20} />, label: 'Quản lý Người dùng', path: '/users' },
                { icon: <Settings size={20} />, label: 'Cấu hình hệ thống', path: '/settings' },
            ];
        }

        return common;
    };

    return (
        <div className="sidebar">
            <div className="p-6 border-b border-gray-200 flex items-center gap-3" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <BookOpen size={20} />
                </div>
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>SciMan Pro</span>
            </div>

            <nav style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {getNavItems().map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? 'nav-item active' : 'nav-item'
                        }
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                            background: isActive ? '#eff6ff' : 'transparent',
                            fontWeight: isActive ? 600 : 500,
                            transition: 'var(--transition)'
                        })}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>


        </div>
    );
};

export default Sidebar;
