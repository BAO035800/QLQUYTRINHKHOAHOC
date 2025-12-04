
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { PROPOSALS, PROPOSAL_STATUS } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const StatCard = ({ icon, label, value, color }) => (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: color + '20',
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {icon}
        </div>
        <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label}</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useAuth();

    // Filter proposals based on role
    const myProposals = PROPOSALS.filter(p => {
        if (user.role === 'NVKH') return p.authorId === user.id;
        if (user.role === 'QL') return true; // Manager sees all
        if (user.role === 'CHUYEN_GIA') return p.councilId && p.councilId === 201; // Mock logic for expert
        return false;
    });

    const stats = {
        total: myProposals.length,
        pending: myProposals.filter(p => p.status === PROPOSAL_STATUS.SUBMITTED).length,
        active: myProposals.filter(p => p.status === PROPOSAL_STATUS.IN_PROGRESS).length,
        completed: myProposals.filter(p => p.status === PROPOSAL_STATUS.COMPLETED).length
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <StatCard icon={<FileText />} label="Tổng số đề xuất" value={stats.total} color="var(--primary)" />
                <StatCard icon={<Clock />} label="Chờ duyệt" value={stats.pending} color="var(--warning)" />
                <StatCard icon={<CheckCircle />} label="Đang thực hiện" value={stats.active} color="var(--success)" />
                <StatCard icon={<AlertCircle />} label="Cần chỉnh sửa" value={0} color="var(--danger)" />
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Hoạt động gần đây</h3>
                    <button className="btn-ghost" style={{ fontSize: '0.9rem' }}>Xem tất cả</button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Tên đề tài</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Lĩnh vực</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Ngày tạo</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myProposals.map(proposal => (
                            <tr key={proposal.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', fontWeight: 500 }}>{proposal.title}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{proposal.field}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{proposal.createdAt}</td>
                                <td style={{ padding: '1rem' }}>
                                    <StatusBadge status={proposal.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
