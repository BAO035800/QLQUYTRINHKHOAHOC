
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Lock, User } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            navigate('/');
        } else {
            setError('Tên đăng nhập hoặc mật khẩu không đúng');
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
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Đăng nhập</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Hệ thống Quản lý Quy trình KH&CN</p>
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
                            placeholder="Tên đăng nhập"
                            className="input"
                            style={{ paddingLeft: '2.5rem' }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.75rem' }}>
                        Đăng nhập
                    </button>
                </form>

                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <p>Tài khoản demo:</p>
                    <ul style={{ listStyle: 'none', marginTop: '0.5rem' }}>
                        <li>• NVKH: <strong>nvkh1 / 123</strong></li>
                        <li>• Quản lý: <strong>ql1 / 123</strong></li>
                        <li>• Chuyên gia: <strong>cg1 / 123</strong></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Login;
