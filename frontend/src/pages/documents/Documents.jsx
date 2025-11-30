import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, FileText, Download, Trash2, Upload, Grid, List } from 'lucide-react';
import { documentService } from '../../services/documentService';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

const Documents = () => {
    const { isAdmin, isLecturer, isStaff } = useAuth();
    // Define permissions based on roles
    const canUpload = isAdmin() || isLecturer() || isStaff();
    const canDelete = isAdmin();

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [viewMode, setViewMode] = useState('list');

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        setLoading(true);
        try {
            const data = await documentService.getAll();
            setDocuments(data);
        } catch (error) {
            console.error("Failed to load documents:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleResetData = () => {
        if (window.confirm('Bạn có chắc chắn muốn reset dữ liệu về mặc định?')) {
            documentService.resetData();
            loadDocuments();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) {
            try {
                await documentService.delete(id);
                loadDocuments();
            } catch (error) {
                console.error("Failed to delete document:", error);
            }
        }
    };

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const getFileIcon = (type) => {
        return <FileText className="text-blue-500" size={24} />;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Tài liệu</h1>
                    <p className="text-gray-500">Thư viện tài liệu nghiên cứu và hành chính</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={handleResetData} title="Reset dữ liệu mẫu">
                        <RefreshCw size={18} />
                    </Button>
                    {canUpload && (
                        <Button className="flex items-center gap-2">
                            <Upload size={18} /> Tải lên
                        </Button>
                    )}
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên tài liệu, tag..."
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
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="all">Tất cả danh mục</option>
                            <option value="Thuyết minh">Thuyết minh</option>
                            <option value="Báo cáo">Báo cáo</option>
                            <option value="Hội thảo">Hội thảo</option>
                            <option value="Bài báo">Bài báo</option>
                            <option value="Hợp đồng">Hợp đồng</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <List size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <Grid size={20} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Đang tải dữ liệu...</p>
                </div>
            ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
                    {filteredDocuments.length === 0 ? (
                        <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
                            <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                            <p>Không tìm thấy tài liệu nào phù hợp.</p>
                        </div>
                    ) : (
                        filteredDocuments.map((doc) => (
                            viewMode === 'grid' ? (
                                <div key={doc.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="mb-3">
                                            {getFileIcon(doc.type)}
                                        </div>
                                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{doc.name}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{doc.size} • {doc.uploadDate}</p>
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs mb-3">
                                            {doc.category}
                                        </span>
                                        <div className="flex gap-2 w-full">
                                            <button className="flex-1 p-2 text-primary hover:bg-primary/10 rounded transition-colors">
                                                <Download size={16} className="mx-auto" />
                                            </button>
                                            {canDelete && (
                                                <button
                                                    onClick={() => handleDelete(doc.id)}
                                                    className="flex-1 p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    <Trash2 size={16} className="mx-auto" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div key={doc.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            {getFileIcon(doc.type)}
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">{doc.name}</h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                    <span>{doc.size}</span>
                                                    <span>•</span>
                                                    <span>{doc.uploadDate}</span>
                                                    <span>•</span>
                                                    <span>{doc.uploadedBy}</span>
                                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                                                        {doc.category}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                    {doc.tags.map((tag, idx) => (
                                                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 text-primary hover:bg-primary/10 rounded transition-colors">
                                                <Download size={18} />
                                            </button>
                                            {canDelete && (
                                                <button
                                                    onClick={() => handleDelete(doc.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Documents;
