import React, { useState } from 'react';
import { Upload, Download, FileSpreadsheet, Users, CheckCircle, AlertCircle, X, Mail } from 'lucide-react';
import Button from './Button';

const GuestImport = ({ onClose, onImport }) => {
    const [file, setFile] = useState(null);
    const [importing, setImporting] = useState(false);
    const [imported, setImported] = useState(false);
    const [previewData, setPreviewData] = useState([]);
    const [sendEmail, setSendEmail] = useState(true);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            // Simulate parsing Excel file
            setTimeout(() => {
                const mockData = [
                    { name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0912345678', organization: 'ĐH Bách Khoa', role: 'Diễn giả' },
                    { name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0987654321', organization: 'ĐH Quốc Gia', role: 'Khách mời' },
                    { name: 'Lê Văn C', email: 'levanc@email.com', phone: '0901234567', organization: 'Viện Khoa học', role: 'Chuyên gia' },
                    { name: 'Phạm Thị D', email: 'phamthid@email.com', phone: '0909876543', organization: 'ĐH Sư phạm', role: 'Diễn giả' },
                    { name: 'Hoàng Văn E', email: 'hoangvane@email.com', phone: '0912348765', organization: 'Công ty ABC', role: 'Khách mời' },
                ];
                setPreviewData(mockData);
            }, 500);
        }
    };

    const handleImport = () => {
        setImporting(true);

        // Simulate import process
        setTimeout(() => {
            setImporting(false);
            setImported(true);

            // Auto close after showing success
            setTimeout(() => {
                onImport?.(previewData, sendEmail);
                onClose();
            }, 3000);
        }, 2000);
    };

    const downloadTemplate = () => {
        // Simulate downloading template
        alert('Đang tải xuống file mẫu Excel...\n\nFile mẫu bao gồm các cột:\n- Họ và tên\n- Email\n- Số điện thoại\n- Đơn vị\n- Vai trò');
    };

    if (imported) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Import thành công!</h2>
                    <p className="text-gray-600 mb-4">
                        Đã import {previewData.length} khách mời vào hệ thống
                    </p>
                    {sendEmail && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-900 font-medium flex items-center justify-center gap-2">
                                <Mail size={16} />
                                Đang gửi email mời tự động...
                            </p>
                            <p className="text-xs text-blue-700 mt-2">
                                {previewData.length} email sẽ được gửi trong vài phút tới
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <FileSpreadsheet className="text-primary" size={24} />
                            Import Danh sách Khách mời
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">BR4 - Import danh sách từ file Excel</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-bold text-blue-900 mb-2">Hướng dẫn:</h3>
                        <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                            <li>Tải xuống file mẫu Excel</li>
                            <li>Điền thông tin khách mời vào file</li>
                            <li>Tải file lên hệ thống</li>
                            <li>Kiểm tra và xác nhận import</li>
                        </ol>
                    </div>

                    {/* Download Template */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="text-green-600" size={32} />
                            <div>
                                <p className="font-medium text-gray-900">File mẫu Excel</p>
                                <p className="text-sm text-gray-500">Danh_sach_khach_moi_mau.xlsx</p>
                            </div>
                        </div>
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={downloadTemplate}
                            className="flex items-center gap-2"
                        >
                            <Download size={16} />
                            Tải xuống
                        </Button>
                    </div>

                    {/* Upload File */}
                    <div>
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-12 h-12 text-gray-400 mb-3" />
                                {file ? (
                                    <>
                                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {(file.size / 1024).toFixed(2)} KB • Click để chọn file khác
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-500">
                                            <span className="font-semibold">Click để tải lên</span> hoặc kéo thả file vào đây
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">Excel (.xlsx, .xls) - Max 5MB</p>
                                    </>
                                )}
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept=".xlsx,.xls"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    {/* Preview Data */}
                    {previewData.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <Users size={20} className="text-primary" />
                                    Xem trước ({previewData.length} người)
                                </h3>
                            </div>

                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="overflow-x-auto max-h-64">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700">STT</th>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700">Họ và tên</th>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700">Email</th>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700">Điện thoại</th>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700">Đơn vị</th>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700">Vai trò</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {previewData.map((guest, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                                                    <td className="px-4 py-3 font-medium text-gray-900">{guest.name}</td>
                                                    <td className="px-4 py-3 text-gray-600">{guest.email}</td>
                                                    <td className="px-4 py-3 text-gray-600">{guest.phone}</td>
                                                    <td className="px-4 py-3 text-gray-600">{guest.organization}</td>
                                                    <td className="px-4 py-3">
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                                            {guest.role}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Email Option */}
                            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={sendEmail}
                                        onChange={(e) => setSendEmail(e.target.checked)}
                                        className="mt-1 w-4 h-4 text-primary rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-yellow-900">Gửi email mời tự động (BR4)</p>
                                        <p className="text-sm text-yellow-700 mt-1">
                                            Hệ thống sẽ tự động gửi email mời tham dự kèm link đăng ký cho {previewData.length} khách mời
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={importing}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="button"
                        onClick={handleImport}
                        disabled={importing || previewData.length === 0}
                        className="flex items-center gap-2"
                    >
                        {importing ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Đang import...
                            </>
                        ) : (
                            <>
                                <Upload size={18} />
                                Import {previewData.length} khách mời
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default GuestImport;
