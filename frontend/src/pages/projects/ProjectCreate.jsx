import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, Upload, ArrowLeft } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { projectService } from '../../services/projectService';
import { useAuth } from '../../context/AuthContext';

// Dữ liệu khởi tạo cho Form
const initialFormData = {
    title: '',
    field: '', // Lĩnh vực
    type: 'cap_truong', // Loại đề tài mặc định
    startDate: '',
    endDate: '',
    budget: '',
    objectives: '', // Mục tiêu
    content: '', // Nội dung thực hiện
    // Thành viên: Luôn có ít nhất 1 thành viên (Chủ nhiệm)
    members: [{ name: '', role: 'Chủ nhiệm' }],
    files: [], // Tài liệu đính kèm (chỉ là ví dụ, logic xử lý file sẽ phức tạp hơn)
};

const ProjectCreate = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Initialize form data with current user as leader if available
    const [formData, setFormData] = useState({
        ...initialFormData,
        members: [{ name: user?.fullName || '', role: 'Chủ nhiệm' }]
    });
    const [loading, setLoading] = useState(false);

    // --- Xử lý Thành viên ---

    // Thêm thành viên mới (mặc định là "Thành viên")
    const addMember = () => {
        setFormData({
            ...formData,
            members: [...formData.members, { name: '', role: 'Thành viên' }],
        });
    };

    // Thay đổi thông tin của thành viên theo index
    const handleMemberChange = (index, key, value) => {
        const newMembers = formData.members.map((member, i) => {
            if (i === index) {
                return { ...member, [key]: value };
            }
            return member;
        });
        setFormData({ ...formData, members: newMembers });
    };

    // Xóa thành viên theo index (Không xóa Chủ nhiệm - index 0)
    const removeMember = (index) => {
        if (index === 0) return; // Không xóa Chủ nhiệm
        const newMembers = formData.members.filter((_, i) => i !== index);
        setFormData({ ...formData, members: newMembers });
    };

    // --- Xử lý Submit Form ---

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log("Dữ liệu đề xuất:", formData);

        try {
            // Use projectService to create project
            await projectService.create({
                ...formData,
                leader: formData.members.find(m => m.role === 'Chủ nhiệm')?.name || 'Chưa cập nhật',
            });

            // Simulate API delay if needed, but projectService already has some delay
            // await new Promise(resolve => setTimeout(resolve, 1500));

            alert('Gửi đề xuất thành công!');
            navigate('/projects');

        } catch (error) {
            console.error("Lỗi gửi đề xuất:", error);
            alert('Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => navigate('/projects')}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-4"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button >
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Đề xuất Dự án Mới</h1>
                    <p className="text-gray-500">Điền thông tin thuyết minh đề tài nghiên cứu khoa học</p>
                </div>
            </div >

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Thông tin chung */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">1. Thông tin chung</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Input
                                label="Tên đề tài"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Nhập tên đề tài nghiên cứu"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lĩnh vực nghiên cứu</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                value={formData.field}
                                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                            >
                                <option value="">Chọn lĩnh vực</option>
                                <option value="cntt">Công nghệ thông tin</option>
                                <option value="kinhte">Kinh tế</option>
                                <option value="moitruong">Môi trường</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Loại đề tài</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="cap_truong">Cấp Trường</option>
                                <option value="cap_bo">Cấp Bộ</option>
                                <option value="cap_nhanuoc">Cấp Nhà nước</option>
                            </select>
                        </div>
                        <Input
                            label="Thời gian bắt đầu (dự kiến)"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        />
                        <Input
                            label="Thời gian kết thúc (dự kiến)"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        />
                        <div className="md:col-span-2">
                            <Input
                                label="Kinh phí đề xuất (VNĐ)"
                                type="number"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                placeholder="Ví dụ: 50000000"
                            />
                        </div>
                    </div>
                </div>

                {/* Nội dung chi tiết */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">2. Nội dung & Mục tiêu</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mục tiêu nghiên cứu</label>
                            <textarea
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary h-32"
                                placeholder="Mô tả mục tiêu của đề tài..."
                                value={formData.objectives}
                                onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung thực hiện</label>
                            <textarea
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary h-48"
                                placeholder="Mô tả chi tiết nội dung, phương pháp nghiên cứu..."
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Thành viên tham gia */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4 border-b pb-2">
                        <h2 className="text-lg font-bold text-gray-900">3. Thành viên tham gia</h2>
                        <Button type="button" variant="secondary" size="sm" onClick={addMember}>
                            <Plus size={16} /> Thêm thành viên
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {formData.members.map((member, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <Input
                                        placeholder={index === 0 ? "Họ và tên (Chủ nhiệm)" : "Họ và tên"}
                                        value={member.name}
                                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                        // Chủ nhiệm luôn bắt buộc phải có tên
                                        required={index === 0}
                                    />
                                </div>
                                <div className="w-48">
                                    <select
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                        value={member.role}
                                        onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                                        // Chủ nhiệm không thể thay đổi vai trò
                                        disabled={index === 0}
                                    >
                                        <option value="Chủ nhiệm">Chủ nhiệm</option>
                                        <option value="Thành viên">Thành viên</option>
                                        <option value="Thư ký">Thư ký</option>
                                        <option value="Cố vấn">Cố vấn</option>
                                    </select>
                                </div>
                                {index > 0 && ( // Chỉ hiển thị nút xóa cho các thành viên từ vị trí thứ 2 trở đi
                                    <button
                                        type="button"
                                        onClick={() => removeMember(index)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors mt-1"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tài liệu đính kèm */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">4. Tài liệu đính kèm</h2>
                    {/* Bạn cần thêm logic xử lý file (ví dụ: state 'files' và hàm handleFileUpload) */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        {/* Thêm Input type file để thực sự upload */}
                        <input type="file" id="file-upload" className="hidden" />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                            <p className="text-gray-600 font-medium">Kéo thả file thuyết minh vào đây hoặc click để chọn</p>
                            <p className="text-xs text-gray-400 mt-1">Hỗ trợ định dạng: .doc, .docx, .pdf (Tối đa 10MB)</p>
                        </label>
                    </div>
                    {/* Thêm khu vực hiển thị file đã upload nếu cần */}
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="secondary" onClick={() => navigate('/projects')}>
                        Hủy bỏ
                    </Button>
                    <Button type="submit" disabled={loading} className="flex items-center gap-2">
                        {loading ? 'Đang gửi...' : <><Save size={18} /> Gửi đề xuất</>}
                    </Button>
                </div>
            </form>
        </div >
    );
};

export default ProjectCreate;