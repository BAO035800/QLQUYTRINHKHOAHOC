
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import { ArrowLeft, Users, FileText, CheckSquare, MessageSquare, Edit2 } from 'lucide-react';

// Progress Stepper Component
const ProgressStepper = ({ status }) => {
    const steps = [
        { id: 'DRAFT', label: 'Khởi tạo' },
        { id: 'SUBMITTED', label: 'Chờ xử lý' },
        { id: 'UNDER_REVIEW', label: 'Đang đánh giá' },
        { id: 'APPROVED', label: 'Đã duyệt' },
        { id: 'WAITING_CONTRACT', label: 'Ký HĐ' },
        { id: 'IN_PROGRESS', label: 'Thực hiện' },
        { id: 'ACCEPTANCE_BASE', label: 'NT Cơ sở' },
        { id: 'ACCEPTANCE_OFFICIAL', label: 'NT Chính thức' },
        { id: 'COMPLETED', label: 'Hoàn thành' }
    ];

    const getCurrentStepIndex = () => {
        if (status === 'REVISION_REQUIRED') return 1; // Treat as Submitted/Processing
        if (status === 'REJECTED') return -1;
        return steps.findIndex(s => s.id === status);
    };

    const currentStep = getCurrentStepIndex();

    return (
        <div className="card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: 800 }}>
                {steps.map((step, index) => {
                    const isCompleted = index <= currentStep;
                    const isCurrent = index === currentStep;
                    return (
                        <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative' }}>
                            <div style={{
                                width: 30,
                                height: 30,
                                borderRadius: '50%',
                                background: isCompleted ? 'var(--primary)' : '#e2e8f0',
                                color: isCompleted ? 'white' : '#94a3b8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                zIndex: 2,
                                border: isCurrent ? '3px solid #bfdbfe' : 'none'
                            }}>
                                {index + 1}
                            </div>
                            <span style={{
                                fontSize: '0.75rem',
                                marginTop: '0.5rem',
                                fontWeight: isCurrent ? 700 : 500,
                                color: isCompleted ? 'var(--text-main)' : 'var(--text-light)'
                            }}>
                                {step.label}
                            </span>
                            {index < steps.length - 1 && (
                                <div style={{
                                    position: 'absolute',
                                    top: 15,
                                    left: '50%',
                                    width: '100%',
                                    height: 2,
                                    background: index < currentStep ? 'var(--primary)' : '#e2e8f0',
                                    zIndex: 1
                                }} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ProposalDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getProposalById, councils, assignCouncilToProposal, addReview, updateProposal, users } = useData();

    const proposal = getProposalById(id);
    const [selectedCouncil, setSelectedCouncil] = useState('');

    // Review Form State
    const [reviewScore, setReviewScore] = useState('');
    const [reviewComment, setReviewComment] = useState('');

    if (!proposal) return <div>Không tìm thấy đề xuất</div>;

    const handleAssignCouncil = () => {
        if (selectedCouncil) {
            assignCouncilToProposal(proposal.id, selectedCouncil);
            alert('Đã phân công hội đồng thành công!');
        }
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        addReview(proposal.id, {
            expertId: user.id,
            expertName: user.fullName,
            score: parseInt(reviewScore),
            comment: reviewComment,
            date: new Date().toISOString().split('T')[0]
        });
        setReviewScore('');
        setReviewComment('');
        alert('Đã gửi đánh giá thành công!');
    };

    const isManager = user.role === 'QL';
    const isExpert = user.role === 'CHUYEN_GIA';
    const isAuthor = user.id === proposal.authorId;

    // Check if current expert is in the council and hasn't reviewed yet
    const assignedCouncil = proposal.councilId ? councils.find(c => c.id === proposal.councilId) : null;
    const isAssignedExpert = isExpert && assignedCouncil?.members.some(m => m.userId === user.id);
    const hasReviewed = isExpert && proposal.reviews?.some(r => r.expertId === user.id);

    // Calculate Average Score
    const avgScore = proposal.reviews?.length
        ? (proposal.reviews.reduce((acc, curr) => acc + curr.score, 0) / proposal.reviews.length).toFixed(1)
        : null;

    return (
        <div className="container" style={{ maxWidth: 1000 }}>
            <button onClick={() => navigate(-1)} className="btn-ghost" style={{ marginBottom: '1rem', paddingLeft: 0 }}>
                <ArrowLeft size={20} /> Quay lại
            </button>

            <ProgressStepper status={proposal.status} />

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Main Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>{proposal.title}</h1>
                            <StatusBadge status={proposal.status} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            <div><strong>Lĩnh vực:</strong> {proposal.field}</div>
                            <div><strong>Kinh phí:</strong> {proposal.budget}</div>
                            <div><strong>Ngày tạo:</strong> {proposal.createdAt}</div>
                            <div><strong>Chủ nhiệm:</strong> {isAuthor ? 'Tôi' : `ID: ${proposal.authorId}`}</div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Mô tả chi tiết</h3>
                            <p style={{ lineHeight: 1.6, color: 'var(--text-main)' }}>{proposal.description}</p>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <CheckSquare size={24} /> Kết quả Đánh giá
                            </h3>
                            {proposal.councilId && (
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    <strong>Hội đồng:</strong> {councils.find(c => c.id === proposal.councilId)?.name}
                                </div>
                            )}
                        </div>

                        {/* Member Review Status List (Visible to Manager and Author) */}
                        {proposal.councilId && (
                            <div style={{ marginBottom: '1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                {councils.find(c => c.id === proposal.councilId)?.members?.length > 0 ? (
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                        <thead style={{ background: '#f8fafc' }}>
                                            <tr>
                                                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>Thành viên Hội đồng</th>
                                                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>Vai trò</th>
                                                <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>Trạng thái</th>
                                                <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>Điểm</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {councils.find(c => c.id === proposal.councilId)?.members.map(member => {
                                                const expertUser = users.find(u => u.id === member.userId);
                                                const review = proposal.reviews?.find(r => r.expertId === member.userId);
                                                return (
                                                    <tr key={member.userId} style={{ borderBottom: '1px solid var(--border)' }}>
                                                        <td style={{ padding: '0.75rem' }}>{expertUser?.fullName || `ID: ${member.userId}`}</td>
                                                        <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{member.role}</td>
                                                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                                            {review ? (
                                                                <span className="badge badge-green">Đã đánh giá</span>
                                                            ) : (
                                                                <span className="badge badge-yellow">Chờ đánh giá</span>
                                                            )}
                                                        </td>
                                                        <td style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>
                                                            {review ? review.score : '-'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--danger)' }}>
                                        Hội đồng này chưa có thành viên nào. Vui lòng cập nhật hội đồng.
                                    </div>
                                )}
                            </div>
                        )}

                        {avgScore && (
                            <div style={{ marginBottom: '1rem' }}>
                                <span className={`badge ${parseFloat(avgScore) >= 50 ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '1rem' }}>
                                    Điểm TB: {avgScore} - {parseFloat(avgScore) >= 50 ? 'ĐẠT' : 'KHÔNG ĐẠT'}
                                </span>
                            </div>
                        )}

                        {proposal.reviews && proposal.reviews.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {proposal.reviews.map((review, idx) => (
                                    <div key={idx} style={{ padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 600 }}>{review.expertName || `Chuyên gia #${review.expertId}`}</span>
                                            <span className="badge badge-blue">{review.score}/100</span>
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)' }}>{review.comment}</p>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>{review.date}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Chưa có đánh giá nào.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Workflow Actions */}
                    <div className="card" style={{ borderColor: 'var(--secondary)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Xử lý Quy trình</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {/* Scientist Actions */}
                            {isAuthor && proposal.status === 'DRAFT' && (
                                <button className="btn btn-primary" onClick={() => {
                                    if (window.confirm('Xác nhận gửi đề xuất?')) updateProposal(proposal.id, { status: 'SUBMITTED' });
                                }}>
                                    Gửi đề xuất
                                </button>
                            )}

                            {isAuthor && proposal.status === 'REVISION_REQUIRED' && (
                                <>
                                    <button className="btn btn-outline" onClick={() => navigate(`/proposals/edit/${proposal.id}`)}>
                                        <Edit2 size={16} /> Chỉnh sửa Thuyết minh
                                    </button>
                                    <button className="btn btn-primary" onClick={() => {
                                        if (window.confirm('Xác nhận gửi lại thuyết minh?')) updateProposal(proposal.id, { status: 'SUBMITTED' });
                                    }}>
                                        Gửi lại thuyết minh
                                    </button>
                                </>
                            )}

                            {/* Manager Actions */}
                            {isManager && proposal.status === 'UNDER_REVIEW' && (
                                <>
                                    <div style={{ padding: '0.75rem', background: '#eff6ff', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                                        Hệ thống sẽ tự động duyệt hoặc từ chối dựa trên kết quả đánh giá của Hội đồng.
                                    </div>
                                    {/* Manual override buttons hidden or moved to advanced options if needed */}
                                    <button className="btn btn-primary" style={{ background: 'var(--warning)' }} onClick={() => {
                                        if (window.confirm('Yêu cầu tác giả chỉnh sửa?')) updateProposal(proposal.id, { status: 'REVISION_REQUIRED' });
                                    }}>
                                        Yêu cầu sửa chữa
                                    </button>
                                </>
                            )}

                            {isManager && proposal.status === 'APPROVED' && (
                                <button className="btn btn-primary" onClick={() => {
                                    if (window.confirm('Chuyển sang trạng thái chờ ký hợp đồng?')) updateProposal(proposal.id, { status: 'WAITING_CONTRACT' });
                                }}>
                                    Chuẩn bị Hợp đồng
                                </button>
                            )}

                            {isManager && proposal.status === 'WAITING_CONTRACT' && (
                                <button className="btn btn-primary" onClick={() => {
                                    if (window.confirm('Xác nhận đã ký hợp đồng và triển khai?')) updateProposal(proposal.id, { status: 'IN_PROGRESS' });
                                }}>
                                    Ký HĐ & Triển khai
                                </button>
                            )}

                            {isManager && proposal.status === 'IN_PROGRESS' && (
                                <button className="btn btn-primary" style={{ background: 'var(--warning)' }} onClick={() => {
                                    if (window.confirm('Tiến hành nghiệm thu cấp cơ sở?')) updateProposal(proposal.id, { status: 'ACCEPTANCE_BASE' });
                                }}>
                                    Nghiệm thu Cấp cơ sở
                                </button>
                            )}

                            {isManager && proposal.status === 'ACCEPTANCE_BASE' && (
                                <button className="btn btn-primary" style={{ background: 'var(--warning)' }} onClick={() => {
                                    if (window.confirm('Tiến hành nghiệm thu chính thức?')) updateProposal(proposal.id, { status: 'ACCEPTANCE_OFFICIAL' });
                                }}>
                                    Nghiệm thu Chính thức
                                </button>
                            )}

                            {isManager && proposal.status === 'ACCEPTANCE_OFFICIAL' && (
                                <button className="btn btn-primary" style={{ background: 'var(--success)' }} onClick={() => {
                                    if (window.confirm('Xác nhận hoàn thành đề tài?')) updateProposal(proposal.id, { status: 'COMPLETED' });
                                }}>
                                    Hoàn thành Đề tài
                                </button>
                            )}

                            {/* Default message if no actions available */}
                            {!((isAuthor && (proposal.status === 'DRAFT' || proposal.status === 'REVISION_REQUIRED')) ||
                                (isManager && ['UNDER_REVIEW', 'APPROVED', 'WAITING_CONTRACT', 'IN_PROGRESS', 'ACCEPTANCE_BASE', 'ACCEPTANCE_OFFICIAL'].includes(proposal.status))) && (
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                        Không có hành động khả dụng ở trạng thái này.
                                    </span>
                                )}
                        </div>
                    </div>

                    {/* Manager Actions: Assign Council */}
                    {isManager && (
                        <div className="card" style={{ borderColor: 'var(--primary-light)' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Users size={18} /> Phân công Hội đồng
                            </h3>

                            {proposal.councilId ? (
                                <div className="badge badge-blue" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
                                    Đã phân công: Hội đồng #{proposal.councilId}
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <select
                                        className="input"
                                        value={selectedCouncil}
                                        onChange={(e) => setSelectedCouncil(e.target.value)}
                                    >
                                        <option value="">-- Chọn Hội đồng --</option>
                                        {councils.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    <button onClick={handleAssignCouncil} className="btn btn-primary" disabled={!selectedCouncil}>
                                        Xác nhận phân công
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Expert Actions: Submit Review */}
                    {isAssignedExpert && !hasReviewed && (
                        <div className="card" style={{ borderColor: 'var(--success)' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MessageSquare size={18} /> Gửi Đánh giá
                            </h3>

                            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Điểm số (0-100)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        className="input"
                                        value={reviewScore}
                                        onChange={(e) => setReviewScore(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Nhận xét</label>
                                    <textarea
                                        className="input"
                                        rows="3"
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ background: 'var(--success)' }}>
                                    Gửi kết quả
                                </button>
                            </form>
                        </div>
                    )}

                    {isAssignedExpert && hasReviewed && (
                        <div className="card" style={{ borderColor: 'var(--success)', background: '#f0fdf4' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--success)' }}>
                                <CheckSquare size={18} /> Đã đánh giá
                            </h3>
                            <p style={{ fontSize: '0.9rem' }}>Bạn đã hoàn thành đánh giá cho đề xuất này.</p>
                        </div>
                    )}

                    {/* General Info */}
                    <div className="card">
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Tài liệu đính kèm</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {proposal.files && proposal.files.length > 0 ? (
                                proposal.files.map((file, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--primary)', cursor: 'pointer' }}>
                                        <FileText size={16} /> {file}
                                    </div>
                                ))
                            ) : (
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Không có tài liệu</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalDetail;
