import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const VerificationSuccess = () => {
    // Optional: Parse hash if we want to auto-login or verify token
    // But for now, just showing the success page is enough as the user clicked the link.
    // The link from email usually contains access_token in hash.

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
                    <ShieldCheck size={40} />
                </div>

                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                    Xác minh thành công!
                </h2>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                    Email của bạn đã được xác minh thành công. Tài khoản của bạn hiện đã sẵn sàng để sử dụng.
                </p>

                <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid #bbf7d0' }}>
                    <p style={{ fontSize: '0.9rem', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={16} />
                        Tài khoản đã được kích hoạt
                    </p>
                </div>

                <Link to="/login" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem' }}>
                    Đăng nhập ngay <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                </Link>
            </div>
        </div>
    );
};

export default VerificationSuccess;
