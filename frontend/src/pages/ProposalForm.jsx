
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { PROPOSAL_STATUS } from '../data/mockData';
import { Save, ArrowLeft, FileText, Send } from 'lucide-react';

const ProposalForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addProposal, updateProposal, getProposalById } = useData();

    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        field: '',
        budget: '',
        description: '',
        status: PROPOSAL_STATUS.DRAFT
    });

    useEffect(() => {
        if (isEditMode) {
            const proposal = getProposalById(id);
            if (proposal) {
                // Check permission: Only author can edit, and only if DRAFT or REVISION_REQUIRED
                if (proposal.authorId !== user.id) {
                    alert('Bạn không có quyền chỉnh sửa đề xuất này');
                    navigate('/proposals');
                    return;
                }
                if (proposal.status !== 'DRAFT' && proposal.status !== 'REVISION_REQUIRED') {
                    alert('Không thể chỉnh sửa đề xuất ở trạng thái này');
                    navigate('/proposals');
                    return;
                }
                setFormData({
                    title: proposal.title,
                    field: proposal.field,
                    budget: proposal.budget,
                    description: proposal.description,
                    status: proposal.status
                });
            }
        }
    }, [id, isEditMode, getProposalById, user.id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            updateProposal(parseInt(id), formData);
        } else {
            addProposal({
                ...formData,
                authorId: user.id,
                councilId: null
            });
        }

        navigate('/proposals');
    };

    return (
        <div className="container" style={{ maxWidth: 800 }}>
            <button onClick={() => navigate(-1)} className="btn-ghost" style={{ marginBottom: '1rem', paddingLeft: 0 }}>
                <ArrowLeft size={20} /> Quay lại
            </button>

            <div className="card">
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
                    {isEditMode ? 'Chỉnh sửa Đề xuất' : 'Tạo Đề xuất Mới'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Tên đề tài</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input"
                            required
                            placeholder="Nhập tên đề tài nghiên cứu..."
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Lĩnh vực</label>
                            <select
                                name="field"
                                value={formData.field}
                                onChange={handleChange}
                                className="input"
                                required
                            >
                                <option value="">-- Chọn lĩnh vực --</option>
                                <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                                <option value="Nông nghiệp">Nông nghiệp</option>
                                <option value="Y học">Y học</option>
                                <option value="Giáo dục">Giáo dục</option>
                                <option value="Kinh tế">Kinh tế</option>
                                <option value="Du lịch">Du lịch</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Kinh phí dự kiến</label>
                            <input
                                type="text"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="input"
                                placeholder="VD: 500.000.000 VNĐ"
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Mô tả / Tóm tắt</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="input"
                            rows="6"
                            style={{ resize: 'vertical' }}
                            placeholder="Mô tả mục tiêu, nội dung chính của đề tài..."
                        ></textarea>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Tài liệu đính kèm (Thuyết minh)</label>
                        <div style={{ border: '2px dashed var(--border)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center', background: '#f8fafc' }}>
                            <input
                                type="file"
                                id="file-upload"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    if (e.target.files[0]) {
                                        setFormData(prev => ({
                                            ...prev,
                                            files: [...(prev.files || []), e.target.files[0].name]
                                        }));
                                    }
                                }}
                            />
                            <label htmlFor="file-upload" className="btn btn-outline" style={{ cursor: 'pointer' }}>
                                <FileText size={18} /> Chọn tệp tin
                            </label>
                            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                                {formData.files && formData.files.map((file, idx) => (
                                    <span key={idx} style={{ fontSize: '0.9rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {file} <button type="button" onClick={() => setFormData(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== idx) }))} style={{ border: 'none', background: 'none', color: 'var(--danger)', cursor: 'pointer' }}>×</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => navigate('/proposals')} className="btn btn-outline">
                            Hủy bỏ
                        </button>

                        {/* Save Draft Button */}
                        <button type="submit" className="btn btn-outline" onClick={() => setFormData(prev => ({ ...prev, status: 'DRAFT' }))}>
                            <Save size={20} /> Lưu nháp
                        </button>

                        {/* Save & Submit Button */}
                        <button type="submit" className="btn btn-primary" onClick={() => setFormData(prev => ({ ...prev, status: 'SUBMITTED' }))}>
                            <Send size={20} /> Lưu & Gửi ngay
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProposalForm;
