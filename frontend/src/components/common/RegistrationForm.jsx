import React, { useState } from 'react';
import { UserPlus, Mail, Phone, Building, User, Send, CheckCircle, X, Upload, Download } from 'lucide-react';
import Button from './Button';

const RegistrationForm = ({ conference, onClose, onRegister }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        position: '',
        participationType: 'attendee',
        dietaryRequirements: '',
        accommodation: false,
        transportation: false
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);

            // Auto close after 3 seconds
            setTimeout(() => {
                onRegister?.(formData);
                onClose();
            }, 3000);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h2>
                    <p className="text-gray-600 mb-4">
                        Cảm ơn bạn đã đăng ký tham dự hội thảo
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-sm text-blue-900 font-medium">
                            📧 Email xác nhận đã được gửi đến: {formData.email}
                        </p>
                        <p className="text-sm text-blue-700 mt-2">
                            📱 SMS thông báo đã được gửi đến: {formData.phone}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">
                        Vui lòng kiểm tra email để nhận mã QR tham dự
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Đăng ký tham dự</h2>
                            <p className="text-blue-100 mt-1">BR4 - Form đăng ký online</p>
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
                            📅 {conference.startDate} - {conference.endDate} | 📍 {conference.location}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Personal Info */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="text-primary" size={20} />
                            Thông tin cá nhân
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Họ và tên *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                    placeholder="Nguyễn Văn A"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Số điện thoại *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                    placeholder="0912345678"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Đơn vị công tác *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                    placeholder="Tên công ty/trường"
                                    value={formData.organization}
                                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Chức vụ
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                    placeholder="Giảng viên, Sinh viên, Nhà nghiên cứu..."
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Participation Type */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Hình thức tham gia</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="radio"
                                    name="participationType"
                                    value="attendee"
                                    checked={formData.participationType === 'attendee'}
                                    onChange={(e) => setFormData({ ...formData, participationType: e.target.value })}
                                    className="w-4 h-4 text-primary"
                                />
                                <div>
                                    <p className="font-medium text-gray-900">Người tham dự</p>
                                    <p className="text-sm text-gray-500">Tham dự và lắng nghe các báo cáo</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="radio"
                                    name="participationType"
                                    value="presenter"
                                    checked={formData.participationType === 'presenter'}
                                    onChange={(e) => setFormData({ ...formData, participationType: e.target.value })}
                                    className="w-4 h-4 text-primary"
                                />
                                <div>
                                    <p className="font-medium text-gray-900">Báo cáo viên</p>
                                    <p className="text-sm text-gray-500">Trình bày nghiên cứu tại hội thảo</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Additional Services */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Dịch vụ bổ sung</h3>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.accommodation}
                                    onChange={(e) => setFormData({ ...formData, accommodation: e.target.checked })}
                                    className="w-4 h-4 text-primary rounded"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Hỗ trợ chỗ ở</p>
                                    <p className="text-sm text-gray-500">BTC hỗ trợ đặt phòng khách sạn</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.transportation}
                                    onChange={(e) => setFormData({ ...formData, transportation: e.target.checked })}
                                    className="w-4 h-4 text-primary rounded"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Hỗ trợ đưa đón</p>
                                    <p className="text-sm text-gray-500">Xe đưa đón từ sân bay/ga</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Dietary Requirements */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Yêu cầu đặc biệt (ăn chay, dị ứng thực phẩm...)
                        </label>
                        <textarea
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary h-24"
                            placeholder="Nhập yêu cầu của bạn..."
                            value={formData.dietaryRequirements}
                            onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                        ></textarea>
                    </div>

                    {/* BR4: Auto notification info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-900 font-medium mb-2">📧 Sau khi đăng ký:</p>
                        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                            <li>Email xác nhận sẽ được gửi tự động</li>
                            <li>SMS thông báo sẽ được gửi đến số điện thoại</li>
                            <li>Mã QR tham dự sẽ được gửi qua email</li>
                        </ul>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Đăng ký ngay
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
