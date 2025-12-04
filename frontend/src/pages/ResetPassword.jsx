import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Key, CheckCircle } from 'lucide-react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Extract access_token from URL hash
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.substring(1)); // Remove #
            const token = params.get('access_token');
            if (token) {
                setAccessToken(token);
            } else {
                setStatus('error');
                setMessage('Liên kết không hợp lệ hoặc đã hết hạn.');
            }
        } else {
            setStatus('error');
            setMessage('Không tìm thấy mã xác thực.');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        if (password !== confirmPassword) {
            setStatus('error');
            setMessage('Mật khẩu nhập lại không khớp.');
            return;
        }

        const success = await resetPassword(password, accessToken);
        if (success) {
            setStatus('success');
            setMessage('Mật khẩu đã được thay đổi thành công.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } else {
            setStatus('error');
            setMessage('Không thể đổi mật khẩu. Vui lòng thử lại.');
        }
    };

    if (status === 'success') {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
            }}>
                <div className="card" style={{ width: '100%', maxWidth: 400, padding: '3rem', textAlign: 'center' }}>
                    <div style={{
                        width: 80,
                        height: 80,
                        background: '#dcfce7',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#16a34a',
                        margin: '0 auto 1.5rem'
                    }}>
                        <CheckCircle size={40} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Thành công!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Mật khẩu của bạn đã được cập nhật. Đang chuyển hướng đến trang đăng nhập...
                    </p>
                    <Link to="/login" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Đăng nhập ngay
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: 400, padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: 64,
                        height: 64,
                        background: 'var(--primary)',
                        borderRadius: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        margin: '0 auto 1rem'
                    }}>
                        <Key size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Đặt lại mật khẩu</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Nhập mật khẩu mới của bạn</p>
                </div>

                {status === 'error' && !accessToken ? (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            background: '#fee2e2',
                            color: '#991b1b',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1.5rem'
                        }}>
                            {message}
                        </div>
                        <Link to="/forgot-password" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            Gửi lại yêu cầu
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {status === 'error' && (
                            <div style={{
                                padding: '0.75rem',
                                background: '#fee2e2',
                                color: '#991b1b',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.9rem'
                            }}>
                                {message}
                            </div>
                        )}

                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-light)' }} />
                            <input
                                type="password"
                                placeholder="Mật khẩu mới"
                                className="input"
                                style={{ paddingLeft: '2.5rem' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-light)' }} />
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu mới"
                                className="input"
                                style={{ paddingLeft: '2.5rem' }}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ marginTop: '1rem', padding: '0.75rem' }}
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
