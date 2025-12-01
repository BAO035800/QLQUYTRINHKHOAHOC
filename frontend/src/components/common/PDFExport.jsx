import React, { useState } from 'react';
import { FileText, Download, CheckCircle, X } from 'lucide-react';
import Button from './Button';

const PDFExport = ({ title, content, onClose }) => {
    const [exporting, setExporting] = useState(false);
    const [exported, setExported] = useState(false);

    const handleExport = () => {
        setExporting(true);
        // Simulate PDF generation
        setTimeout(() => {
            setExporting(false);
            setExported(true);
            setTimeout(() => {
                onClose?.();
            }, 2000);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                {!exported ? (
                    <>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <FileText className="text-red-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Xuất báo cáo PDF</h3>
                                <p className="text-sm text-gray-500">Tạo file PDF</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Tên file:</label>
                                <p className="text-gray-900">{title}.pdf</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Nội dung:</label>
                                <p className="text-sm text-gray-600">{content}</p>
                            </div>
                            <div className="p-3 bg-amber-50 rounded-lg text-sm text-amber-700">
                                <p>📄 Sử dụng thư viện jsPDF hoặc PDFKit</p>
                                <p className="text-xs text-amber-600 mt-1">
                                    (Demo: Mô phỏng xuất PDF)
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={handleExport}
                            disabled={exporting}
                            className="w-full flex items-center justify-center gap-2"
                        >
                            {exporting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    Đang tạo PDF...
                                </>
                            ) : (
                                <>
                                    <Download size={18} />
                                    Xuất PDF
                                </>
                            )}
                        </Button>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="text-green-600" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Xuất thành công!</h3>
                        <p className="text-gray-600">File PDF đã được tạo và tải xuống</p>
                        <p className="text-sm text-gray-500 mt-2">{title}.pdf</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PDFExport;
