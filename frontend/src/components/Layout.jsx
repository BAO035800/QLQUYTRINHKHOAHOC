
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();

    // Map paths to titles
    const getTitle = () => {
        const path = location.pathname;
        if (path === '/') return 'Tổng quan';
        if (path.includes('/proposals')) return 'Quản lý Đề xuất';
        if (path.includes('/projects')) return 'Đề tài Đang thực hiện';
        if (path.includes('/reviews')) return 'Thẩm định & Đánh giá';
        if (path.includes('/councils')) return 'Hội đồng & Chuyên gia';
        if (path.includes('/users')) return 'Quản lý Người dùng';
        return 'Dashboard';
    };

    return (
        <div className="layout">
            <Sidebar />
            <main className="main-content animate-fade-in">
                <Header title={getTitle()} />
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
