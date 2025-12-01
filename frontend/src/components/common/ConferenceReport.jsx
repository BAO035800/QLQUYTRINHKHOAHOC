import React, { useState } from 'react';
import { FileText, Download, Users, DollarSign, Calendar, CheckCircle, TrendingUp, X } from 'lucide-react';
import Button from './Button';
import PDFExport from './PDFExport';

const ConferenceReport = ({ conference, onClose }) => {
    const [showPDFModal, setShowPDFModal] = useState(false);

    // BR6: Mock report data
    const reportData = {
        attendance: {
            registered: 150,
            attended: 142,
            rate: 94.7,
            byCategory: [
                { category: 'Giảng viên', count: 45 },
                { category: 'Sinh viên', count: 60 },
                { category: 'Doanh nghiệp', count: 25 },
                { category: 'Khác', count: 12 }
            ]
        },
        budget: {
            planned: conference.budget || 50000000,
            actual: 47500000,
            variance: -2500000,
            breakdown: [
                { item: 'Hội trường & Thiết bị', planned: 15000000, actual: 14500000 },
                { item: 'Ăn uống', planned: 20000000, actual: 19000000 },
                { item: 'Tài liệu & In ấn', planned: 5000000, actual: 5500000 },
                { item: 'Truyền thông', planned: 7000000, actual: 6000000 },
                { item: 'Khác', planned: 3000000, actual: 2500000 }
            ]
        },
        sessions: [
            { name: 'Phiên khai mạc', speakers: 3, attendees: 142, duration: '2h' },
            { name: 'Phiên chuyên đề 1: AI & ML', speakers: 5, attendees: 120, duration: '3h' },
            { name: 'Phiên chuyên đề 2: IoT', speakers: 4, attendees: 95, duration: '2.5h' },
            { name: 'Workshop thực hành', speakers: 2, attendees: 80, duration: '4h' },
            { name: 'Phiên bế mạc', speakers: 2, attendees: 135, duration: '1h' }
        ],
        feedback: {
            averageRating: 4.6,
            totalResponses: 128,
            ratings: [
                { aspect: 'Nội dung chương trình', rating: 4.7 },
                { aspect: 'Chất lượng diễn giả', rating: 4.8 },
                { aspect: 'Tổ chức & Logistics', rating: 4.5 },
                { aspect: 'Cơ sở vật chất', rating: 4.4 },
                { aspect: 'Tài liệu', rating: 4.6 }
            ]
        },
        documents: [
            { name: 'Biên bản hội thảo.pdf', type: 'Biên bản', size: '2.3 MB', date: '2024-11-30' },
            { name: 'Slide_Keynote_Speaker.pdf', type: 'Tài liệu', size: '15.8 MB', date: '2024-11-29' },
            { name: 'Danh_sach_tham_du.xlsx', type: 'Danh sách', size: '0.8 MB', date: '2024-11-30' },
            { name: 'Hinh_anh_su_kien.zip', type: 'Hình ảnh', size: '125 MB', date: '2024-11-30' }
        ]
    };

    const handleExportPDF = () => {
        setShowPDFModal(true);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full my-8 max-h-[95vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-primary to-blue-600 text-white p-6 rounded-t-xl z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Báo cáo Tổng kết Hội thảo</h2>
                                <p className="text-blue-100 mt-1">BR6 - Báo cáo & Tổng kết</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="mt-4 bg-white/10 rounded-lg p-3">
                            <p className="font-bold text-lg">{conference.title}</p>
                            <p className="text-sm text-blue-100 mt-1">
                                {conference.code} • {conference.startDate} - {conference.endDate}
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <Users className="text-blue-600" size={24} />
                                    <TrendingUp className="text-blue-600" size={16} />
                                </div>
                                <p className="text-sm text-blue-700 font-medium">Tỷ lệ tham dự</p>
                                <p className="text-3xl font-bold text-blue-900 mt-1">{reportData.attendance.rate}%</p>
                                <p className="text-xs text-blue-600 mt-1">{reportData.attendance.attended}/{reportData.attendance.registered} người</p>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <DollarSign className="text-green-600" size={24} />
                                    <CheckCircle className="text-green-600" size={16} />
                                </div>
                                <p className="text-sm text-green-700 font-medium">Kinh phí</p>
                                <p className="text-3xl font-bold text-green-900 mt-1">95%</p>
                                <p className="text-xs text-green-600 mt-1">Tiết kiệm 2.5 triệu</p>
                            </div>

                            <div className="bg-purple-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <Calendar className="text-purple-600" size={24} />
                                </div>
                                <p className="text-sm text-purple-700 font-medium">Phiên thảo luận</p>
                                <p className="text-3xl font-bold text-purple-900 mt-1">{reportData.sessions.length}</p>
                                <p className="text-xs text-purple-600 mt-1">16 diễn giả</p>
                            </div>

                            <div className="bg-yellow-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <FileText className="text-yellow-600" size={24} />
                                </div>
                                <p className="text-sm text-yellow-700 font-medium">Đánh giá TB</p>
                                <p className="text-3xl font-bold text-yellow-900 mt-1">{reportData.feedback.averageRating}/5</p>
                                <p className="text-xs text-yellow-600 mt-1">{reportData.feedback.totalResponses} phản hồi</p>
                            </div>
                        </div>

                        {/* Attendance Details */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="text-primary" size={20} />
                                Báo cáo Người tham dự
                            </h3>
                            <div className="grid grid-cols-4 gap-4">
                                {reportData.attendance.byCategory.map((cat, idx) => (
                                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600">{cat.category}</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{cat.count}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Budget Report */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <DollarSign className="text-primary" size={20} />
                                Báo cáo Kinh phí
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">Hạng mục</th>
                                            <th className="px-4 py-3 text-right font-medium text-gray-700">Dự kiến</th>
                                            <th className="px-4 py-3 text-right font-medium text-gray-700">Thực tế</th>
                                            <th className="px-4 py-3 text-right font-medium text-gray-700">Chênh lệch</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {reportData.budget.breakdown.map((item, idx) => {
                                            const variance = item.actual - item.planned;
                                            return (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 font-medium text-gray-900">{item.item}</td>
                                                    <td className="px-4 py-3 text-right text-gray-600">
                                                        {new Intl.NumberFormat('vi-VN').format(item.planned)} ₫
                                                    </td>
                                                    <td className="px-4 py-3 text-right text-gray-900 font-medium">
                                                        {new Intl.NumberFormat('vi-VN').format(item.actual)} ₫
                                                    </td>
                                                    <td className={`px-4 py-3 text-right font-medium ${variance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {variance > 0 ? '+' : ''}{new Intl.NumberFormat('vi-VN').format(variance)} ₫
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        <tr className="bg-gray-100 font-bold">
                                            <td className="px-4 py-3">Tổng cộng</td>
                                            <td className="px-4 py-3 text-right">
                                                {new Intl.NumberFormat('vi-VN').format(reportData.budget.planned)} ₫
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                {new Intl.NumberFormat('vi-VN').format(reportData.budget.actual)} ₫
                                            </td>
                                            <td className="px-4 py-3 text-right text-green-600">
                                                {new Intl.NumberFormat('vi-VN').format(reportData.budget.variance)} ₫
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Sessions */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="text-primary" size={20} />
                                Các Phiên Thảo luận
                            </h3>
                            <div className="space-y-3">
                                {reportData.sessions.map((session, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{session.name}</p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {session.speakers} diễn giả • {session.duration}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-primary">{session.attendees}</p>
                                            <p className="text-xs text-gray-500">người tham dự</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feedback */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Đánh giá của người tham dự</h3>
                            <div className="space-y-3">
                                {reportData.feedback.ratings.map((item, idx) => (
                                    <div key={idx}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm text-gray-700">{item.aspect}</span>
                                            <span className="text-sm font-bold text-gray-900">{item.rating}/5</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-primary h-2 rounded-full transition-all"
                                                style={{ width: `${(item.rating / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* BR6: Documents Archive */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText className="text-primary" size={20} />
                                Lưu trữ Tài liệu (BR6, BR7)
                            </h3>
                            <div className="space-y-2">
                                {reportData.documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <FileText className="text-blue-600" size={20} />
                                            <div>
                                                <p className="font-medium text-gray-900">{doc.name}</p>
                                                <p className="text-xs text-gray-500">{doc.type} • {doc.size} • {doc.date}</p>
                                            </div>
                                        </div>
                                        <Button variant="secondary" size="sm">
                                            <Download size={16} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-4 italic">
                                * Tài liệu hội thảo được lưu trữ tối thiểu 10 năm (NFR5)
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                        >
                            Đóng
                        </Button>
                        <Button
                            type="button"
                            onClick={handleExportPDF}
                            className="flex items-center gap-2"
                        >
                            <Download size={18} />
                            Xuất báo cáo PDF
                        </Button>
                    </div>
                </div>
            </div>

            {/* PDF Export Modal */}
            {showPDFModal && (
                <PDFExport
                    title={`Bao_cao_${conference.code}`}
                    content={`Báo cáo tổng kết hội thảo: ${conference.title}`}
                    onClose={() => setShowPDFModal(false)}
                />
            )}
        </>
    );
};

export default ConferenceReport;
