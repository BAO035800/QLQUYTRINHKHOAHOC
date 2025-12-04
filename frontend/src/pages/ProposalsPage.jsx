
import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { Plus, Edit, Trash2, Eye, FileSignature, FileText } from 'lucide-react';

const ProposalsPage = () => {
    const { proposals, deleteProposal, councils } = useData();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Filter proposals based on role
    const myProposals = proposals.filter(p => {
        if (user.role === 'NVKH') return p.authorId === user.id;
        if (user.role === 'QL') return true;
        if (user.role === 'CHUYEN_GIA') {
            // Find councils where this expert is a member
            const myCouncilIds = councils
                .filter(c => c.members && c.members.some(m => m.userId === user.id))
                .map(c => c.id);
            // Show proposals assigned to these councils
            // Optionally filter by status (e.g., only UNDER_REVIEW or history)
            return myCouncilIds.includes(p.councilId) && p.status !== 'DRAFT';
        }
        return false;
    });

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đề xuất này không?')) {
            deleteProposal(id);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Danh sách Đề xuất</h2>
                {user.role === 'NVKH' && (
                    <button onClick={() => navigate('/proposals/new')} className="btn btn-primary">
                        <Plus size={20} /> Tạo đề xuất mới
                    </button>
                )}
            </div>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>ID</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Tên đề tài</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Lĩnh vực</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Kinh phí</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Trạng thái</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'right' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myProposals.length > 0 ? (
                            myProposals.map(proposal => (
                                <tr key={proposal.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>#{proposal.id}</td>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{proposal.title}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{proposal.field}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{proposal.budget}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <StatusBadge status={proposal.status} />
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <button
                                                className="btn-ghost"
                                                title={user.role === 'QL' ? "Xử lý hồ sơ" : "Xem chi tiết"}
                                                onClick={() => navigate(`/proposals/${proposal.id}`)}
                                            >
                                                {user.role === 'QL' ? <FileSignature size={18} /> : <FileText size={18} />}
                                            </button>

                                            {/* Only author can edit/delete if status is DRAFT or REVISION_REQUIRED */}
                                            {(user.role === 'NVKH' && (proposal.status === 'DRAFT' || proposal.status === 'REVISION_REQUIRED')) && (
                                                <>
                                                    <button
                                                        className="btn-ghost"
                                                        style={{ color: 'var(--primary)' }}
                                                        title="Chỉnh sửa"
                                                        onClick={() => navigate(`/proposals/edit/${proposal.id}`)}
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        className="btn-ghost"
                                                        style={{ color: 'var(--danger)' }}
                                                        title="Xóa"
                                                        onClick={() => handleDelete(proposal.id)}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    Chưa có đề xuất nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProposalsPage;
