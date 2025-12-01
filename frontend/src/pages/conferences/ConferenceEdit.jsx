import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Trash2, Save, ArrowLeft, Upload, X, FileText, AlertCircle } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { conferenceService } from '../../services/conferenceService';
import { useAuth } from '../../context/AuthContext';

const ConferenceEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        type: 'Trong nước',
        startDate: '',
        endDate: '',
        location: '',
        organizer: '',
        budget: '',
        participants: '',
        objectives: '',
        agenda: '',
        guests: [],
        attachments: [],
        organizingTeam: []
    });

    useEffect(() => {
        const loadConference = async () => {
            try {
                const data = await conferenceService.getById(id);
                setFormData({
                    title: data.title || '',
                    type: data.type || 'Trong nước',
                    startDate: data.startDate || '',
                    endDate: data.endDate || '',
                    location: data.location || '',
                    organizer: data.organizer || '',
                    budget: data.budget || '',
                    participants: data.participants || '',
                    objectives: data.objectives || '',
                    agenda: data.agenda || '',
                    guests: data.guests || [],
                    attachments: data.attachments || [],
                    organizingTeam: data.organizingTeam || []
                });
            } catch (error) {
                console.error("Error loading conference:", error);
                alert('Không tìm thấy hội thảo!');
                navigate('/conferences');
            } finally {
                setLoading(false);
            }
        };

        loadConference();
    }, [id, navigate]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Vui lòng nhập tên hội thảo';
        if (!formData.startDate) newErrors.startDate = 'Vui lòng chọn ngày bắt đầu';
        if (!formData.endDate) newErrors.endDate = 'Vui lòng chọn ngày kết thúc';
        if (!formData.location.trim()) newErrors.location = 'Vui lòng nhập địa điểm';
        if (!formData.objectives.trim()) newErrors.objectives = 'Vui lòng nhập mục tiêu';

        if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
            newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

    const addTeamMember = () => {
        setFormData({
            ...formData,
            organizingTeam: [...formData.organizingTeam, { name: '', role: '' }]
        });
    };

    const handleTeamChange = (index, key, value) => {
        const newTeam = formData.organizingTeam.map((member, i) => {
            if (i === index) {
                return { ...member, [key]: value };
            }
            return member;
        });
        setFormData({ ...formData, organizingTeam: newTeam });
    };

    const removeTeamMember = (index) => {
        const newTeam = formData.organizingTeam.filter((_, i) => i !== index);
        setFormData({ ...formData, organizingTeam: newTeam });
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newAttachments = files.map(file => ({
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            type: file.type,
            uploadDate: new Date().toLocaleDateString('vi-VN')
        }));

        setFormData({
            ...formData,
            attachments: [...formData.attachments, ...newAttachments]
        });
    };

    const removeAttachment = (index) => {
        const newAttachments = formData.attachments.filter((_, i) => i !== index);
        setFormData({ ...formData, attachments: newAttachments });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }

        setSaving(true);

        try {
            await conferenceService.update(id, {
                ...formData,
                participants: parseInt(formData.participants) || 0,
                budget: parseFloat(formData.budget) || 0
            });

            alert('Cập nhật hội thảo thành công!');
            navigate(`/conferences/${id}`);
        } catch (error) {
            console.error("Error updating conference:", error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Đang tải thông tin...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/conferences/${id}`)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa Hội thảo</h1>
                        <p className="text-gray-500">FR01 - Cập nhật thông tin đề xuất</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Thông tin chung */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                        <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                        Thông tin chung
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Input
                                label="Tên hội thảo *"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Nhập tên đầy đủ của hội thảo"
                                required
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Loại hội thảo *</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="Trong nước">Trong nước</option>
                                <option value="Quốc tế">Quốc tế</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Seminar">Seminar</option>
                            </select>
                        </div>
                        <Input
                            label="Đơn vị tổ chức *"
                            value={formData.organizer}
                            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                            placeholder="Tên đơn vị tổ chức"
                        />
                        <Input
                            label="Thời gian bắt đầu *"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            required
                        />
                        <Input
                            label="Thời gian kết thúc *"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            required
                        />
                        {errors.endDate && <p className="text-red-500 text-sm mt-1 md:col-span-2">{errors.endDate}</p>}
                        <div className="md:col-span-2">
                            <Input
                                label="Địa điểm *"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="Địa điểm tổ chức chi tiết"
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
                            label="Kinh phí dự kiến (VNĐ) *"
                            type="number"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            placeholder="Ví dụ: 50000000"
                        />
                    </div>
                </div>

                {/* Mục tiêu & Chương trình */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                        <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                        Mục tiêu & Chương trình
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mục tiêu *</label>
                            <textarea
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary h-32"
                                placeholder="Mô tả mục tiêu, ý nghĩa của hội thảo..."
                                value={formData.objectives}
                                onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                            ></textarea>
                            {errors.objectives && <p className="text-red-500 text-sm mt-1">{errors.objectives}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chương trình chi tiết</label>
                            <textarea
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary h-48"
                                placeholder="Mô tả chương trình theo từng ngày, phiên..."
                                value={formData.agenda}
                                onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Danh sách diễn giả */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4 border-b pb-2">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                            Danh sách diễn giả / Khách mời
                        </h2>
                        <Button type="button" variant="secondary" size="sm" onClick={addGuest}>
                            <Plus size={16} /> Thêm
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {formData.guests.map((guest, index) => (
                            <div key={index} className="flex gap-4 items-start p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Họ và tên *"
                                        value={guest.name}
                                        onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Input
                                        placeholder="Đơn vị / Chức danh"
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

                {/* Validation Notice */}
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <p className="font-medium text-red-900">Vui lòng kiểm tra lại thông tin:</p>
                            <ul className="list-disc list-inside text-sm text-red-700 mt-1">
                                {Object.values(errors).map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Submit Actions */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                    <Button type="button" variant="secondary" onClick={() => navigate(`/conferences/${id}`)}>
                        Hủy bỏ
                    </Button>
                    <Button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2"
                    >
                        {saving ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Đang lưu...
                            </>
                        ) : (
                            <>
                                <Save size={18} /> Lưu thay đổi
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ConferenceEdit;
