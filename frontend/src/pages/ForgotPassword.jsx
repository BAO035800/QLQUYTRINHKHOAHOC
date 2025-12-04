import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');
    const { forgotPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        const success = await forgotPassword(email);
        if (success) {
            setStatus('success');
            setMessage('Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn.');
        } else {
            setStatus('error');
            setMessage('Không thể gửi yêu cầu. Vui lòng kiểm tra lại email.');
        }
    };

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
                        <BookOpen size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Quên mật khẩu?</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Nhập email để nhận hướng dẫn đặt lại mật khẩu</p>
                </div>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            background: '#dcfce7',
                            color: '#16a34a',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1.5rem'
                        }}>
                            {message}
                        </div>
                        <Link to="/login" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            Quay lại đăng nhập
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
                            <Mail size={20} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-light)' }} />
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="input"
                                style={{ paddingLeft: '2.5rem' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={status === 'loading'}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ marginTop: '1rem', padding: '0.75rem' }}
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Đang gửi...' : 'Gửi yêu cầu'}
                        </button>

                        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                            <Link to="/login" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                fontWeight: 500
                            }}>
                                <ArrowLeft size={16} /> Quay lại đăng nhập
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
