import React from 'react';

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                    <h3 className="text-gray-500 text-sm font-medium">Tổng số dự án</h3>
                    <p className="text-3xl font-bold text-primary mt-2">12</p>
                </div>
                <div className="card">
                    <h3 className="text-gray-500 text-sm font-medium">Hội thảo sắp tới</h3>
                    <p className="text-3xl font-bold text-secondary mt-2">3</p>
                </div>
                <div className="card">
                    <h3 className="text-gray-500 text-sm font-medium">Bài báo công bố</h3>
                    <p className="text-3xl font-bold text-success mt-2">28</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
