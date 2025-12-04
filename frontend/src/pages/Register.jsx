import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Lock, User, Mail } from 'lucide-react';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Mật khẩu nhập lại không khớp');
            return;
        }

        console.log("RegisterPage: submitting form", { fullName, email });
        const result = await register(fullName, email, password);
        console.log("RegisterPage: register result", result);
        if (result.success) {
            navigate('/register-success');
        } else {
            setError(result.error || 'Đăng ký thất bại. Vui lòng thử lại.');
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
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Đăng ký</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Tạo tài khoản mới</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {error && (
                        <div style={{
                            padding: '0.75rem',
                            background: '#fee2e2',
                            color: '#991b1b',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{ position: 'relative' }}>
                        <User size={20} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-light)' }} />
                        <input
                            type="text"
                            placeholder="Họ và tên"
                            className="input"
                            style={{ paddingLeft: '2.5rem' }}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Mail size={20} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-light)' }} />
                        <input
                            type="email"
                            placeholder="Email"
                            className="input"
                            style={{ paddingLeft: '2.5rem' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={20} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-light)' }} />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="input"
                            style={{ paddingLeft: '2.5rem' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={20} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-light)' }} />
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            className="input"
                            style={{ paddingLeft: '2.5rem' }}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.75rem' }}>
                        Đăng ký
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Đã có tài khoản? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
