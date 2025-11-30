import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Download, Clock, User } from 'lucide-react';
import { projectService } from '../../services/projectService';
import Button from '../../components/common/Button';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await projectService.getById(id);
                setProject(data);
            } catch (error) {
                console.error("Error fetching project:", error);
                // navigate('/projects'); // Optional: redirect on error
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id, navigate]);

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Đang tải dữ liệu dự án...</div>;
    }

    if (!project) {
        return <div className="p-6 text-center text-red-500">Không tìm thấy dự án này.</div>;
    }

    // Hàm render nội dung tab dựa trên state activeTab
    const renderTabContent = () => {
        // --- Tab 1: Tổng quan ---
        if (activeTab === 'overview') {
            return (
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Mục tiêu nghiên cứu</h3>
                        <p className="text-gray-600 leading-relaxed">{project.objectives}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Nội dung thực hiện</h3>
                        <div className="text-gray-600 leading-relaxed whitespace-pre-line">{project.content}</div>
                    </div>
                </div>
            );
        }

        // --- Tab 2: Thành viên ---
        if (activeTab === 'members') {
            return (
                <div>
                    <h3 className="font-bold text-gray-900 mb-4">Danh sách thành viên</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3">Họ và tên</th>
                                    <th className="px-4 py-3">Vai trò</th>
                                    <th className="px-4 py-3">Đơn vị công tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {project.members.map((member, idx) => (
                                    <tr key={idx}>
                                        <td className="px-4 py-3 font-medium text-gray-900">{member.name}</td>
                                        <td className="px-4 py-3">{member.role}</td>
                                        <td className="px-4 py-3">Khoa CNTT</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        // --- Tab 3: Kinh phí ---
        if (activeTab === 'budget') {
            return (
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 mb-4">Tổng quan Kinh phí</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">Kinh phí đề xuất</p>
                            <p className="text-xl font-bold text-blue-900 mt-1">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(project.budget)}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">Kinh phí đã giải ngân</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">0 ₫</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-700">Kinh phí còn lại</p>
                            <p className="text-xl font-bold text-green-900 mt-1">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(project.budget)}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        // --- Tab 4: Tài liệu ---
        if (activeTab === 'documents') {
            return (
                <div>
                    <h3 className="font-bold text-gray-900 mb-4">Tài liệu dự án</h3>
                    <div className="space-y-3">
                        {project.documents && project.documents.length > 0 ? (
                            project.documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <FileText className="text-primary" size={20} />
                                        <div>
                                            <p className="font-medium text-gray-900">{doc.name}</p>
                                            <p className="text-xs text-gray-500">{doc.date} • {doc.size}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-500 hover:text-primary hover:bg-white rounded-full transition-all shadow-sm">
                                        <Download size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm italic">Chưa có tài liệu nào.</p>
                        )}
                    </div>
                </div>
            );
        }

        // --- Tab 5: Đánh giá & Nghiệm thu ---
        if (activeTab === 'reviews') {
            return (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Clock size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Chưa có đánh giá</h3>
                    <p className="text-gray-500">Dự án đang trong quá trình thực hiện, chưa có biên bản nghiệm thu.</p>
                </div>
            );
        }

        return null;
    };


    return (
        <div className="max-w-6xl mx-auto space-y-6">

            {/* Header / Project Info */}
            <div className="flex items-start justify-between mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start gap-4 flex-1">
                    {/* Nút quay lại */}
                    <Link to="/projects" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors mt-1">
                        <ArrowLeft size={20} />
                    </Link>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            {/* Trạng thái */}
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.statusColor}`}>
                                {project.status}
                            </span>
                            {/* Mã dự án */}
                            <span className="text-sm text-gray-500 font-mono">{project.code}</span>
                        </div>
                        {/* Tên đề tài */}
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h1>

                        {/* Thông tin nhanh */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-primary" />
                                <span>{project.startDate} - {project.endDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-primary" />
                                <span>Chủ nhiệm: {project.members.find(m => m.role === 'Chủ nhiệm')?.name || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-primary" />
                                <span>{project.type} ({project.field})</span>
                            </div>
                        </div>
                    </div >
                </div>
                {/* Khu vực nút hành động */}
                <div className="flex gap-2">
                    <Button variant="secondary">Xuất PDF</Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mt-6">
                <nav className="flex gap-6">
                    {['overview', 'members', 'budget', 'documents', 'reviews'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab === 'overview' && 'Tổng quan'}
                            {tab === 'members' && 'Thành viên'}
                            {tab === 'budget' && 'Kinh phí'}
                            {tab === 'documents' && 'Tài liệu'}
                            {tab === 'reviews' && 'Đánh giá & Nghiệm thu'}
                        </button>
                    ))}
                </nav>
            </div >

            {/* Content */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[400px]">
                {renderTabContent()}
            </div >
        </div >
    );
};

export default ProjectDetail;