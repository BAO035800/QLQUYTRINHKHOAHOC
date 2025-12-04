
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Search } from 'lucide-react';

const Header = ({ title }) => {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = React.useState(false);

    return (
        <header className="header">
            <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{title}</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Chào mừng trở lại, {user?.fullName}
                </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="input"
                        style={{ paddingLeft: '2.5rem', width: 250 }}
                    />
                </div>

                <button className="btn-ghost" style={{ position: 'relative', padding: 8 }}>
                    <Bell size={20} />
                    <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: 'var(--danger)', borderRadius: '50%' }}></span>
                </button>

                <div
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', position: 'relative' }}
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <img
                        src={user?.avatar}
                        alt="Avatar"
                        style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid var(--border)' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.fullName}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user?.role}</span>
                    </div>

                    {showDropdown && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '0.5rem',
                            background: 'white',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-md)',
                            width: '200px',
                            zIndex: 100
                        }}>
                            <button
                                onClick={logout}
                                className="btn-ghost"
                                style={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    color: 'var(--danger)',
                                    padding: '0.75rem 1rem'
                                }}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
