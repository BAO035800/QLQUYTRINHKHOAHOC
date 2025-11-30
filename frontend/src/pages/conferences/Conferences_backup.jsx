import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, RefreshCw, FolderOpen, Calendar, User, DollarSign } from 'lucide-react';
import { projectService } from '../../services/projectService';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

const Projects = () => {
    const navigate = useNavigate();
    const { canCreate } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const data = await projectService.getAll();
            setProjects(data);
        } catch (error) {
            console.error("Failed to load projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleResetData = () => {
        if (window.confirm('Bạn có chắc chắn muốn reset dữ liệu về mặc định? Dữ liệu hiện tại sẽ bị mất.')) {
            projectService.resetData();
            loadProjects();
        }
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Đề tài Khoa học</h1>
                    <p className="text-gray-500">Danh sách các đề tài, dự án nghiên cứu</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={handleResetData} title="Reset dữ liệu mẫu">
                        <RefreshCw size={18} />
                    </Button>
                    {canCreate() && (
                        <Link to="/projects/create">
                            <Button className="flex items-center gap-2">
                                <Plus size={18} /> Đề xuất mới
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên đề tài, mã số..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-64">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none bg-white"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="Chờ thẩm định">Chờ thẩm định</option>
                            <option value="Đang thực hiện">Đang thực hiện</option>
                            <option value="Đã nghiệm thu">Đã nghiệm thu</option>
                            <option value="Hủy bỏ">Hủy bỏ</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Project List */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Đang tải dữ liệu...</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
                            <FolderOpen className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                            <p>Không tìm thấy dự án nào phù hợp.</p>
                        </div>
                    ) : (
                        filteredProjects.map((project) => (
                            <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${project.statusColor}`}>
                                                {project.status}
                                            </span>
                                            <span className="text-sm text-gray-500 font-mono">{project.code}</span>
                                        </div>
                                        <Link to={`/projects/${project.id}`}>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                        </Link>
                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mt-3">
                                            <div className="flex items-center gap-2">
                                                <User size={16} className="text-gray-400" />
                                                <span>CN: {project.leader || 'Chưa cập nhật'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-gray-400" />
                                                <span>{project.startDate} - {project.endDate}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <DollarSign size={16} className="text-gray-400" />
                                                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(project.budget)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link to={`/projects/${project.id}`}>
                                            <Button variant="secondary" size="sm">Chi tiết</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Projects;
