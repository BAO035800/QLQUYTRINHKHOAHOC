import React, { useState } from 'react';
import { CheckCircle, XCircle, MessageSquare, X, Send } from 'lucide-react';
import Button from './Button';
import EmailNotification from './EmailNotification';
import SMSNotification from './SMSNotification';

const ApprovalModal = ({ conference, onClose, onApprove }) => {
    const [decision, setDecision] = useState('');
    const [comment, setComment] = useState('');
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showSMSModal, setShowSMSModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async () => {
        if (!decision) {
            alert('Vui lòng chọn quyết định!');
            return;
        }

        setProcessing(true);

        // Simulate processing
        setTimeout(() => {
            setProcessing(false);

            // UC02: Send notifications
            setShowEmailModal(true);
            setTimeout(() => {
                setShowEmailModal(false);
                setShowSMSModal(true);
                setTimeout(() => {
                    setShowSMSModal(false);
                    onApprove?.(decision, comment);
                    onClose();
                }, 2000);
            }, 2000);
        }, 1000);
    };

    const getDecisionColor = () => {
        switch (decision) {
            case 'approved': return 'bg-green-50 border-green-200';
            case 'rejected': return 'bg-red-50 border-red-200';
            case 'revision': return 'bg-yellow-50 border-yellow-200';
            default: return 'bg-gray-50 border-gray-200';
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Phê duyệt Hội thảo</h2>
                            <p className="text-sm text-gray-500 mt-1">UC02 - Lãnh đạo phê duyệt</p>
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
                        {/* Conference Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-bold text-gray-900 mb-2">{conference.title}</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                <div>
                                    <span className="font-medium">Mã:</span> {conference.code}
                                </div>
                                <div>
                                    <span className="font-medium">Loại:</span> {conference.type}
                                </div>
                                <div>
                                    <span className="font-medium">Thời gian:</span> {conference.startDate} - {conference.endDate}
                                </div>
                                <div>
                                    <span className="font-medium">Địa điểm:</span> {conference.location}
                                </div>
                                <div className="col-span-2">
                                    <span className="font-medium">Đơn vị:</span> {conference.organizer}
                                </div>
                                <div className="col-span-2">
                                    <span className="font-medium">Kinh phí:</span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(conference.budget)}
                                </div>
                            </div>
                        </div>

                        {/* Decision Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Quyết định phê duyệt *
                            </label>
                            <div className="space-y-2">
                                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${decision === 'approved' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                                    <input
                                        type="radio"
                                        name="decision"
                                        value="approved"
                                        checked={decision === 'approved'}
                                        onChange={(e) => setDecision(e.target.value)}
                                        className="w-4 h-4 text-green-600"
                                    />
                                    <CheckCircle className={`${decision === 'approved' ? 'text-green-600' : 'text-gray-400'}`} size={20} />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">Đồng ý</p>
                                        <p className="text-sm text-gray-500">Phê duyệt đề xuất hội thảo</p>
                                    </div>
                                </label>

                                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${decision === 'revision' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300'}`}>
                                    <input
                                        type="radio"
                                        name="decision"
                                        value="revision"
                                        checked={decision === 'revision'}
                                        onChange={(e) => setDecision(e.target.value)}
                                        className="w-4 h-4 text-yellow-600"
                                    />
                                    <MessageSquare className={`${decision === 'revision' ? 'text-yellow-600' : 'text-gray-400'}`} size={20} />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">Yêu cầu bổ sung</p>
                                        <p className="text-sm text-gray-500">Cần chỉnh sửa, bổ sung thông tin</p>
                                    </div>
                                </label>

                                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${decision === 'rejected' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
                                    <input
                                        type="radio"
                                        name="decision"
                                        value="rejected"
                                        checked={decision === 'rejected'}
                                        onChange={(e) => setDecision(e.target.value)}
                                        className="w-4 h-4 text-red-600"
                                    />
                                    <XCircle className={`${decision === 'rejected' ? 'text-red-600' : 'text-gray-400'}`} size={20} />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">Không đồng ý</p>
                                        <p className="text-sm text-gray-500">Từ chối đề xuất hội thảo</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ý kiến góp ý {decision === 'revision' && <span className="text-red-500">*</span>}
                            </label>
                            <textarea
                                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors h-32 ${getDecisionColor()}`}
                                placeholder={
                                    decision === 'approved' ? 'Nhập ý kiến (không bắt buộc)...' :
                                        decision === 'revision' ? 'Nhập chi tiết những điểm cần bổ sung, chỉnh sửa...' :
                                            decision === 'rejected' ? 'Nhập lý do từ chối...' :
                                                'Nhập ý kiến của bạn...'
                                }
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>

                        {/* BR2: Workflow info */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Quy trình (BR2):</span> Sau khi phê duyệt, hệ thống sẽ tự động:
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1 ml-4">
                                <li>Gửi email thông báo đến người đề xuất</li>
                                <li>Gửi SMS xác nhận</li>
                                <li>Cập nhật trạng thái hội thảo</li>
                                <li>Ghi nhận vào lịch sử phê duyệt</li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={processing || !decision || (decision === 'revision' && !comment.trim())}
                            className="flex items-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Xác nhận phê duyệt
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* UC02: Notifications */}
            {showEmailModal && (
                <EmailNotification
                    recipient={conference.submittedBy || 'Người đề xuất'}
                    subject={`Kết quả phê duyệt: ${conference.title}`}
                    onClose={() => setShowEmailModal(false)}
                />
            )}

            {showSMSModal && (
                <SMSNotification
                    phoneNumber="0912345678"
                    message={`Hội thảo ${conference.code} đã được ${decision === 'approved' ? 'phê duyệt' : decision === 'rejected' ? 'từ chối' : 'yêu cầu bổ sung'}. Vui lòng kiểm tra email.`}
                    onClose={() => setShowSMSModal(false)}
                />
            )}
        </>
    );
};

export default ApprovalModal;
