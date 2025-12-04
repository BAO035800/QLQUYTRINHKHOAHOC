import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';

const RegisterScientist = () => {
    const { user, logout } = useAuth(); // Assuming we might need to refresh token or re-login to update role
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('/api/users/register-scientist', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || 'Failed to register');
            }

            setSuccess(true);
            // Optionally force logout to refresh roles or trigger a profile re-fetch
            // For now, show success message
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
                <div className="card" style={{ maxWidth: 500, margin: '0 auto', padding: '3rem' }}>
                    <div style={{ color: '#16a34a', marginBottom: '1rem' }}>
                        <CheckCircle size={64} />
                    </div>
                    <h2>Đăng ký thành công!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Bạn đã trở thành Nhà khoa học. Vui lòng đăng nhập lại để cập nhật quyền hạn.
                    </p>
                    <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-primary">
                        Đăng nhập lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <div className="card" style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: 64, height: 64, background: '#eff6ff', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
                        color: 'var(--primary)'
                    }}>
                        <GraduationCap size={32} />
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Đăng ký làm Nhà khoa học</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Tham gia vào hệ thống nghiên cứu, gửi đề xuất và quản lý đề tài.
                    </p>
                </div>

                {error && (
                    <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1rem' }}>
                        {error}
                    </div>
                )}

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Quyền lợi:</h3>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        <li>Gửi đề xuất đề tài nghiên cứu mới.</li>
                        <li>Được tham gia làm chủ nhiệm hoặc thành viên đề tài.</li>
                        <li>Cập nhật lý lịch khoa học và hồ sơ chuyên gia.</li>
                    </ul>
                </div>

                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem' }}
                >
                    {loading ? 'Đang xử lý...' : 'Xác nhận Đăng ký'} <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                </button>
            </div>
        </div>
    );
};

export default RegisterScientist;
