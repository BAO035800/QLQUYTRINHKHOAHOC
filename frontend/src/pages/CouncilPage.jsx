
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Users, Plus, Trash2 } from 'lucide-react';

const CouncilPage = () => {
    const { councils, addCouncil, deleteCouncil, users } = useData();
    const [showForm, setShowForm] = useState(false);
    const [newCouncilName, setNewCouncilName] = useState('');
    const [selectedExperts, setSelectedExperts] = useState([]);

    const availableExperts = users.filter(u => u.role === 'CHUYEN_GIA');

    const toggleExpert = (id) => {
        setSelectedExperts(prev =>
            prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
        );
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newCouncilName.trim()) return;

        const members = selectedExperts.map(eid => ({
            userId: eid,
            role: 'Thành viên' // Default role
        }));

        addCouncil({
            name: newCouncilName,
            members: members
        });
        setNewCouncilName('');
        setSelectedExperts([]);
        setShowForm(false);
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Quản lý Hội đồng Đánh giá</h2>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    <Plus size={20} /> Tạo Hội đồng mới
                </button>
            </div>

            {showForm && (
                <div className="card" style={{ marginBottom: '2rem', background: '#f0f9ff', borderColor: '#bae6fd' }}>
                    <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Tên Hội đồng</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Nhập tên hội đồng (VD: Hội đồng CNTT 2024)"
                                value={newCouncilName}
                                onChange={(e) => setNewCouncilName(e.target.value)}
                                autoFocus
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Chọn thành viên (Chuyên gia)</label>
                            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.5rem' }}>
                                {availableExperts.length > 0 ? (
                                    availableExperts.map(expert => (
                                        <div key={expert.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0' }}>
                                            <input
                                                type="checkbox"
                                                id={`expert-${expert.id}`}
                                                checked={selectedExperts.includes(expert.id)}
                                                onChange={() => toggleExpert(expert.id)}
                                            />
                                            <label htmlFor={`expert-${expert.id}`} style={{ cursor: 'pointer' }}>
                                                {expert.fullName} ({expert.email})
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Không có chuyên gia nào khả dụng.</div>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Đã chọn: {selectedExperts.length} chuyên gia
                            </span>
                            <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Hủy</button>
                            <button type="submit" className="btn btn-primary" disabled={selectedExperts.length === 0}>
                                Lưu Hội đồng
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>ID</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Tên Hội đồng</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Số lượng thành viên</th>
                            <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {councils.map(council => (
                            <tr key={council.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>#{council.id}</td>
                                <td style={{ padding: '1rem', fontWeight: 500 }}>{council.name}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Users size={16} />
                                        {council.members?.length || 0} thành viên
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button
                                        className="btn-ghost"
                                        style={{ color: 'var(--danger)' }}
                                        onClick={() => {
                                            if (window.confirm('Bạn có chắc chắn muốn xóa hội đồng này?')) deleteCouncil(council.id);
                                        }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CouncilPage;
