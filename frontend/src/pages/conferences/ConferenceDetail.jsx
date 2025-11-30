import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, FileText, Download, Clock, User, Users, DollarSign } from 'lucide-react';
import { conferenceService } from '../../services/conferenceService';
import Button from '../../components/common/Button';

const ConferenceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [conference, setConference] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConference = async () => {
            try {
                const data = await conferenceService.getById(id);
                setConference(data);
            } catch (error) {
                console.error("Error fetching conference:", error);
                navigate('/conferences');
            } finally {
                setLoading(false);
            }
        };

        fetchConference();
    }, [id, navigate]);

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Đang tải thông tin hội thảo...</div>;
    }

    if (!conference) {
        return null;
    }

    const renderTabContent = () => {
        if (activeTab === 'overview') {
            return (
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Mục tiêu</h3>
                        <p className="text-gray-600 leading-relaxed">{conference.objectives}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Chương trình</h3>
                        <div className="text-gray-600 leading-relaxed whitespace-pre-line">{conference.agenda}</div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Đơn vị tổ chức</h3>
                        <p className="text-gray-600">{conference.organizer}</p>
                    </div>
                </div>
            );
        }

        if (activeTab === 'guests') {
            return (
                <div>
                    <h3 className="font-bold text-gray-900 mb-4">Danh sách khách mời</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3">Họ và tên</th>
                                    <th className="px-4 py-3">Đơn vị</th>
                                    <th className="px-4 py-3">Vai trò</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {conference.guests && conference.guests.length > 0 ? (
                                    conference.guests.map((guest, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-3 font-medium text-gray-900">{guest.name}</td>
                                            <td className="px-4 py-3">{guest.affiliation}</td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                                    {guest.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                                            Chưa có thông tin khách mời
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        if (activeTab === 'budget') {
            return (
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 mb-4">Tổng quan Kinh phí</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">Kinh phí dự kiến</p>
                            <p className="text-xl font-bold text-blue-900 mt-1">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(conference.budget)}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">Đã chi tiêu</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">0 ₫</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-700">Còn lại</p>
                            <p className="text-xl font-bold text-green-900 mt-1">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(conference.budget)}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        if (activeTab === 'documents') {
            return (
                <div>
                    <h3 className="font-bold text-gray-900 mb-4">Tài liệu hội thảo</h3>
                    <div className="space-y-3">
                        {conference.documents && conference.documents.length > 0 ? (
                            conference.documents.map((doc, idx) => (
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

        if (activeTab === 'reviews') {
            return (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Clock size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Chưa có báo cáo</h3>
                    <p className="text-gray-500">Hội thảo chưa diễn ra hoặc chưa có báo cáo tổng kết.</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start gap-4 flex-1">
                    <Link to="/conferences" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors mt-1">
                        <ArrowLeft size={20} />
                    </Link>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${conference.statusColor}`}>
                                {conference.status}
                            </span>
                            <span className="text-sm text-gray-500 font-mono">{conference.code}</span>
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                {conference.type}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{conference.title}</h1>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-primary" />
                                <span>{conference.startDate} - {conference.endDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-primary" />
                                <span>{conference.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={16} className="text-primary" />
                                <span>{conference.participants} người tham dự</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary">Xuất PDF</Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex gap-6">
                    {['overview', 'guests', 'budget', 'documents', 'reviews'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab === 'overview' && 'Tổng quan'}
                            {tab === 'guests' && 'Khách mời'}
                            {tab === 'budget' && 'Kinh phí'}
                            {tab === 'documents' && 'Tài liệu'}
                            {tab === 'reviews' && 'Báo cáo'}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[400px]">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default ConferenceDetail;
