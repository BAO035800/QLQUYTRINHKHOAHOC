import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Lock, User, AlertCircle } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(username, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-gray-900">Đăng nhập hệ thống</h1>
                    <p className="text-gray-500 mt-2">Quản lý quy trình khoa học</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-danger p-3 rounded-lg mb-6 flex items-center gap-2 text-sm">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Tên đăng nhập"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập tên đăng nhập"
                        required
                        icon={User}
                    />

                    <Input
                        label="Mật khẩu"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        required
                    />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                            <span className="text-gray-600">Ghi nhớ đăng nhập</span>
                        </label>
                        <a href="#" className="text-primary hover:underline font-medium">Quên mật khẩu?</a>
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-3 text-base"
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p className="mb-2 font-medium">Tài khoản demo (Mật khẩu: 123):</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <code className="bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200" onClick={() => { setUsername('admin'); setPassword('123') }}>admin (Quản trị hệ thống)</code>
                        <code className="bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200" onClick={() => { setUsername('lecturer'); setPassword('123') }}>lecturer (Giảng viên/Đề xuất)</code>
                        <code className="bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200" onClick={() => { setUsername('staff'); setPassword('123') }}>staff (Cán bộ quản lý)</code>
                        <code className="bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200" onClick={() => { setUsername('leader'); setPassword('123') }}>leader (Lãnh đạo/Duyệt)</code>
                        <code className="bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200" onClick={() => { setUsername('expert'); setPassword('123') }}>expert (Chuyên gia/Hội đồng)</code>
                        <code className="bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200" onClick={() => { setUsername('accountant'); setPassword('123') }}>accountant (Kế toán)</code>
                        <code className="bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200" onClick={() => { setUsername('organizer'); setPassword('123') }}>organizer (Ban tổ chức)</code>
                        <code className="bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200" onClick={() => { setUsername('attendee'); setPassword('123') }}>attendee (Sinh viên/Tham dự)</code>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
