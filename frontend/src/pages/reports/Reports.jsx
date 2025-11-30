import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import Button from '../../components/common/Button';

const Reports = () => {
    const [reportType, setReportType] = useState('projects');
    const [dateRange, setDateRange] = useState('thisYear');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleExport = (format) => {
        alert(`Xuất báo cáo ${reportType} dạng ${format.toUpperCase()} (Chức năng mock)`);
    };

    const handleGenerate = () => {
        alert('Tạo báo cáo (Chức năng mock)');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
                <p className="text-gray-500">Tạo và xuất các báo cáo tổng hợp</p>
            </div>

            {/* Report Configuration */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Cấu hình báo cáo</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Report Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Loại báo cáo
                        </label>
                        <select
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                        >
                            <option value="projects">Dự án nghiên cứu</option>
                            <option value="conferences">Hội thảo</option>
                            <option value="publications">Bài báo khoa học</option>
                            <option value="budget">Kinh phí</option>
                            <option value="overall">Tổng hợp</option>
                        </select>
                    </div>

                    {/* Date Range */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Khoảng thời gian
                        </label>
                        <select
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="thisMonth">Tháng này</option>
                            <option value="thisQuarter">Quý này</option>
                            <option value="thisYear">Năm nay</option>
                            <option value="lastYear">Năm trước</option>
                            <option value="custom">Tùy chỉnh</option>
                        </select>
                    </div>

                    {/* Custom Date Range */}
                    {dateRange === 'custom' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Từ ngày
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Đến ngày
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-6 flex gap-3">
                    <Button onClick={handleGenerate} className="flex items-center gap-2">
                        <FileText size={18} />
                        Tạo báo cáo
                    </Button>
                </div>
            </div>

            {/* Report Preview */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Xem trước báo cáo</h2>
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => handleExport('pdf')}>
                            <Download size={16} className="mr-1" />
                            PDF
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => handleExport('excel')}>
                            <Download size={16} className="mr-1" />
                            Excel
                        </Button>
                    </div>
                </div>

                {/* Mock Report Content */}
                <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 min-h-[400px]">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            BÁO CÁO {reportType.toUpperCase()}
                        </h3>
                        <p className="text-gray-600">
                            {dateRange === 'thisYear' ? 'Năm 2024' :
                                dateRange === 'thisMonth' ? 'Tháng 12/2024' :
                                    dateRange === 'custom' && startDate && endDate ? `${startDate} - ${endDate}` :
                                        'Khoảng thời gian được chọn'}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-600 mb-1">Tổng số</p>
                                <p className="text-3xl font-bold text-gray-900">24</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-600 mb-1">Đang thực hiện</p>
                                <p className="text-3xl font-bold text-blue-600">15</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-600 mb-1">Đã hoàn thành</p>
                                <p className="text-3xl font-bold text-green-600">9</p>
                            </div>
                        </div>

                        {/* Sample Table */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium text-gray-700">STT</th>
                                        <th className="px-4 py-3 text-left font-medium text-gray-700">Tên</th>
                                        <th className="px-4 py-3 text-left font-medium text-gray-700">Trạng thái</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700">Kinh phí</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="px-4 py-3">1</td>
                                        <td className="px-4 py-3">Dự án mẫu 1</td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                                Hoàn thành
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">50,000,000 ₫</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">2</td>
                                        <td className="px-4 py-3">Dự án mẫu 2</td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                                Đang thực hiện
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">80,000,000 ₫</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">3</td>
                                        <td className="px-4 py-3">Dự án mẫu 3</td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                                Đang thực hiện
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">120,000,000 ₫</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="text-center text-sm text-gray-500 italic">
                            Đây là bản xem trước mẫu. Dữ liệu thực tế sẽ được tạo khi bạn nhấn "Tạo báo cáo".
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
