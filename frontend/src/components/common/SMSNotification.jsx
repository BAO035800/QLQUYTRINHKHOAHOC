import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle, X } from 'lucide-react';
import Button from './Button';

const SMSNotification = ({ phoneNumber, message, onClose }) => {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        setSending(true);
        // Simulate sending SMS
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setTimeout(() => {
                onClose?.();
            }, 2000);
        }, 1500);
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

                {!sent ? (
                    <>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <MessageSquare className="text-green-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Gửi thông báo SMS</h3>
                                <p className="text-sm text-gray-500">Hệ thống tự động</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Số điện thoại:</label>
                                <p className="text-gray-900">{phoneNumber}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Nội dung:</label>
                                <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900">
                                    {message}
                                </div>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                                <p>📱 SMS sẽ được gửi qua cổng SMS Gateway</p>
                                <p className="text-xs text-blue-600 mt-1">
                                    (Demo: Không gửi SMS thật)
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={handleSend}
                            disabled={sending}
                            className="w-full flex items-center justify-center gap-2"
                        >
                            {sending ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    Đang gửi...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Gửi SMS
                                </>
                            )}
                        </Button>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="text-green-600" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Đã gửi thành công!</h3>
                        <p className="text-gray-600">SMS đã được gửi đến {phoneNumber}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SMSNotification;
