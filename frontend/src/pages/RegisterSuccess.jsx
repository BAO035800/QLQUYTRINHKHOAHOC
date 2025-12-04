import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';

const RegisterSuccess = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: 450, padding: '3rem', textAlign: 'center' }}>
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
                    <Mail size={40} />
                </div>

                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                    Kiểm tra Email của bạn
                </h2>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                    Chúng tôi đã gửi một liên kết xác thực đến địa chỉ email của bạn.
                    Vui lòng kiểm tra hộp thư đến (và cả thư mục Spam) để kích hoạt tài khoản.
                </p>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Sau khi xác thực, bạn có thể đăng nhập vào hệ thống.
                    </p>
                </div>

                <Link to="/login" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem' }}>
                    Quay lại trang Đăng nhập <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                </Link>
            </div>
        </div>
    );
};

export default RegisterSuccess;
