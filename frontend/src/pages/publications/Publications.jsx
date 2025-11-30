import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, RefreshCw, BookOpen, Award, TrendingUp, Edit, Trash2 } from 'lucide-react';
import { publicationService } from '../../services/publicationService';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

const Publications = () => {
    const { hasPermission, isAdmin } = useAuth();
    // Use 'manage_own_publications' permission or admin role
    const canManagePublications = hasPermission('manage_own_publications') || isAdmin();

    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterQuartile, setFilterQuartile] = useState('all');

    useEffect(() => {
        loadPublications();
    }, []);

    const loadPublications = async () => {
        setLoading(true);
        try {
            const data = await publicationService.getAll();
            setPublications(data);
        } catch (error) {
            console.error("Failed to load publications:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleResetData = () => {
        if (window.confirm('Bạn có chắc chắn muốn reset dữ liệu về mặc định?')) {
            publicationService.resetData();
            loadPublications();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài báo này?')) {
            try {
                await publicationService.delete(id);
                loadPublications();
            } catch (error) {
                console.error("Failed to delete publication:", error);
            }
        }
    };

    const filteredPublications = publications.filter(pub => {
        const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pub.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
            pub.doi.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || pub.type === filterType;
        const matchesQuartile = filterQuartile === 'all' || pub.quartile === filterQuartile;
        return matchesSearch && matchesType && matchesQuartile;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Bài báo Khoa học</h1>
                    <p className="text-gray-500">Danh sách các bài báo, công trình nghiên cứu</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={handleResetData} title="Reset dữ liệu mẫu">
                        <RefreshCw size={18} />
                    </Button>
                    {canManagePublications && (
                        <Link to="/publications/create">
                            <Button className="flex items-center gap-2">
                                <Plus size={18} /> Thêm bài báo
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tiêu đề, tác giả, DOI..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-48">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none bg-white"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">Tất cả loại</option>
                            <option value="Journal">Journal</option>
                            <option value="Conference">Conference</option>
                        </select>
                    </div>
                </div>
                <div className="w-full md:w-48">
                    <select
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none bg-white"
                        value={filterQuartile}
                        onChange={(e) => setFilterQuartile(e.target.value)}
                    >
                        <option value="all">Tất cả Quartile</option>
                        <option value="Q1">Q1</option>
                        <option value="Q2">Q2</option>
                        <option value="Q3">Q3</option>
                        <option value="Q4">Q4</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Đang tải dữ liệu...</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredPublications.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
                            <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                            <p>Không tìm thấy bài báo nào phù hợp.</p>
                        </div>
                    ) : (
                        filteredPublications.map((pub) => (
                            <div key={pub.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${pub.statusColor}`}>
                                                {pub.status}
                                            </span>
                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                                {pub.type}
                                            </span>
                                            {pub.quartile !== 'N/A' && (
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${pub.quartile === 'Q1' ? 'bg-purple-100 text-purple-700' :
                                                    pub.quartile === 'Q2' ? 'bg-indigo-100 text-indigo-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {pub.quartile}
                                                </span>
                                            )}
                                        </div>
                                        <Link to={`/publications/${pub.id}`}>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                                {pub.title}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {pub.authors.join(', ')}
                                        </p>
                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <BookOpen size={16} className="text-gray-400" />
                                                <span>{pub.journal}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{pub.year}</span>
                                                {pub.volume && <span>Vol. {pub.volume}</span>}
                                                {pub.issue && <span>({pub.issue})</span>}
                                            </div>
                                            {pub.impactFactor && (
                                                <div className="flex items-center gap-2">
                                                    <Award size={16} className="text-gray-400" />
                                                    <span>IF: {pub.impactFactor}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <TrendingUp size={16} className="text-gray-400" />
                                                <span>{pub.citations} trích dẫn</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link to={`/publications/${pub.id}`}>
                                            <Button variant="secondary" size="sm">Chi tiết</Button>
                                        </Link>
                                        {canManagePublications && (
                                            <>
                                                <Button variant="secondary" size="sm" className="text-blue-600 hover:bg-blue-50">
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="text-red-600 hover:bg-red-50"
                                                    onClick={() => handleDelete(pub.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </>
                                        )}
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

export default Publications;
