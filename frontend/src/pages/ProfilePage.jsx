
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Award, BookOpen, Edit2, Save } from 'lucide-react';

const ProfilePage = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: '0912345678',
        degree: 'Tiến sĩ',
        specialization: 'Khoa học máy tính',
        workplace: 'Đại học Công nghệ',
        bio: 'Chuyên gia nghiên cứu về Trí tuệ nhân tạo và Dữ liệu lớn với hơn 10 năm kinh nghiệm.'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // In a real app, this would call an API to update the user profile
        setIsEditing(false);
        alert('Cập nhật thông tin thành công!');
    };

    return (
        <div className="container" style={{ maxWidth: 800 }}>
            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Lý lịch khoa học</h2>
                    <button
                        className={`btn ${isEditing ? 'btn-primary' : 'btn-outline'}`}
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    >
                        {isEditing ? <><Save size={18} /> Lưu thay đổi</> : <><Edit2 size={18} /> Chỉnh sửa</>}
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src={user?.avatar}
                            alt="Avatar"
                            style={{ width: 120, height: 120, borderRadius: '50%', border: '4px solid var(--border)', marginBottom: '1rem' }}
                        />
                        <div className="badge badge-blue">{user?.role}</div>
                    </div>

                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Họ và tên</label>
                            {isEditing ? (
                                <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} className="input" />
                            ) : (
                                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{profile.fullName}</div>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Email</label>
                            {isEditing ? (
                                <input type="email" name="email" value={profile.email} onChange={handleChange} className="input" />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Mail size={16} /> {profile.email}
                                </div>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Học vị</label>
                            {isEditing ? (
                                <select name="degree" value={profile.degree} onChange={handleChange} className="input">
                                    <option>Cử nhân</option>
                                    <option>Thạc sĩ</option>
                                    <option>Tiến sĩ</option>
                                    <option>Phó Giáo sư</option>
                                    <option>Giáo sư</option>
                                </select>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Award size={16} /> {profile.degree}
                                </div>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Chuyên ngành</label>
                            {isEditing ? (
                                <input type="text" name="specialization" value={profile.specialization} onChange={handleChange} className="input" />
                            ) : (
                                <div>{profile.specialization}</div>
                            )}
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Đơn vị công tác</label>
                            {isEditing ? (
                                <input type="text" name="workplace" value={profile.workplace} onChange={handleChange} className="input" />
                            ) : (
                                <div>{profile.workplace}</div>
                            )}
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Giới thiệu bản thân</label>
                            {isEditing ? (
                                <textarea name="bio" value={profile.bio} onChange={handleChange} className="input" rows="4"></textarea>
                            ) : (
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{profile.bio}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <BookOpen size={24} /> Các công trình nghiên cứu đã công bố
                </h3>

                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Chức năng đang được phát triển. Dữ liệu sẽ được đồng bộ từ cơ sở dữ liệu bài báo khoa học.
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
