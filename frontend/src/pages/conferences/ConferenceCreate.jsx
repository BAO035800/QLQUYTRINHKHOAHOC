import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { conferenceService } from '../../services/conferenceService';
import { useAuth } from '../../context/AuthContext';

const ConferenceCreate = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        type: 'Trong nước',
        startDate: '',
        endDate: '',
        location: '',
        organizer: user?.department || '',
        budget: '',
        participants: '',
        objectives: '',
        agenda: '',
        guests: [{ name: '', affiliation: '', role: 'Diễn giả' }]
    });

    const [loading, setLoading] = useState(false);

    const addGuest = () => {
        setFormData({
            ...formData,
            guests: [...formData.guests, { name: '', affiliation: '', role: 'Diễn giả' }]
        });
    };

    const handleGuestChange = (index, key, value) => {
        const newGuests = formData.guests.map((guest, i) => {
            if (i === index) {
                return { ...guest, [key]: value };
            }
            return guest;
        });
        setFormData({ ...formData, guests: newGuests });
    };

    const removeGuest = (index) => {
        const newGuests = formData.guests.filter((_, i) => i !== index);
        setFormData({ ...formData, guests: newGuests });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await conferenceService.create({
                ...formData,
                participants: parseInt(formData.participants) || 0,
                budget: parseFloat(formData.budget) || 0
            });

            alert('Tạo hội thảo thành công!');
            navigate('/conferences');
        } catch (error) {
            console.error("Error creating conference:", error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => navigate('/conferences')}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-4"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tạo Hội thảo Mới</h1>
                    <p className="text-gray-500">Điền thông tin tổ chức hội thảo, hội nghị khoa học</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Thông tin chung */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">1. Thông tin chung</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Input
                                label="Tên hội thảo"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Nhập tên hội thảo"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Loại hội thảo</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="Trong nước">Trong nước</option>
                                <option value="Quốc tế">Quốc tế</option>
                            </select>
                        </div>
                        <Input
                            label="Đơn vị tổ chức"
                            value={formData.organizer}
                            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                            placeholder="Tên đơn vị tổ chức"
                        />
                        <Input
                            label="Ngày bắt đầu"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            required
                        />
                        <Input
                            label="Ngày kết thúc"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            required
                        />
                        <div className="md:col-span-2">
                            <Input
                                label="Địa điểm"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="Địa điểm tổ chức"
                                required
                            />
                        </div>
                        <Input
                            label="Số lượng người tham dự (dự kiến)"
                            type="number"
                            value={formData.participants}
                            onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                            placeholder="Ví dụ: 100"
                        />
                        <Input
                            label="Kinh phí dự kiến (VNĐ)"
                            type="number"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            placeholder="Ví dụ: 50000000"
                        />
                    </div>
                </div>

                {/* Nội dung */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">2. Nội dung & Mục tiêu</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mục tiêu</label>
                            <textarea
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary h-32"
                                placeholder="Mô tả mục tiêu của hội thảo..."
                                value={formData.objectives}
                                onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chương trình</label>
                            <textarea
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary h-48"
                                placeholder="Mô tả chương trình chi tiết..."
                                value={formData.agenda}
                                onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Khách mời */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4 border-b pb-2">
                        <h2 className="text-lg font-bold text-gray-900">3. Danh sách khách mời</h2>
                        <Button type="button" variant="secondary" size="sm" onClick={addGuest}>
                            <Plus size={16} /> Thêm khách mời
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {formData.guests.map((guest, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Họ và tên"
                                        value={guest.name}
                                        onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Input
                                        placeholder="Đơn vị"
                                        value={guest.affiliation}
                                        onChange={(e) => handleGuestChange(index, 'affiliation', e.target.value)}
                                    />
                                </div>
                                <div className="w-40">
                                    <select
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                        value={guest.role}
                                        onChange={(e) => handleGuestChange(index, 'role', e.target.value)}
                                    >
                                        <option value="Keynote Speaker">Keynote Speaker</option>
                                        <option value="Chủ tọa">Chủ tọa</option>
                                        <option value="Diễn giả">Diễn giả</option>
                                        <option value="Chuyên gia">Chuyên gia</option>
                                    </select>
                                </div>
                                {formData.guests.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeGuest(index)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors mt-1"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="secondary" onClick={() => navigate('/conferences')}>
                        Hủy bỏ
                    </Button>
                    <Button type="submit" disabled={loading} className="flex items-center gap-2">
                        {loading ? 'Đang tạo...' : <><Save size={18} /> Tạo hội thảo</>}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ConferenceCreate;
