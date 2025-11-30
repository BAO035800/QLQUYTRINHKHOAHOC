import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Users = () => {
    const [users, setUsers] = useState([
        { id: 1, username: 'admin', fullName: 'Nguyễn Văn Quản Trị', role: 'Quản trị viên', email: 'admin@uni.edu.vn', status: 'active' },
        { id: 2, username: 'scientist', fullName: 'TS. Trần Khoa Học', role: 'Nhà khoa học', email: 'khoahoc@uni.edu.vn', status: 'active' },
        { id: 3, username: 'giangvien', fullName: 'Lê Văn Giảng', role: 'Giảng viên', email: 'giang@uni.edu.vn', status: 'inactive' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Người dùng</h1>
                    <p className="text-gray-500">Quản lý tài khoản và phân quyền hệ thống</p>
                </div>
                <Button>
                    <Plus size={20} /> Thêm người dùng
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, email..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <select className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary">
                        <option value="">Tất cả vai trò</option>
                        <option value="admin">Quản trị viên</option>
                        <option value="scientist">Nhà khoa học</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Họ và tên</th>
                                <th className="px-6 py-4">Tên đăng nhập</th>
                                <th className="px-6 py-4">Vai trò</th>
                                <th className="px-6 py-4">Trạng thái</th>
                                <th className="px-6 py-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                {user.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{user.fullName}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{user.username}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'Quản trị viên' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-600' : 'bg-gray-500'}`}></span>
                                            {user.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-500 hover:text-danger hover:bg-danger/10 rounded transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                    <p>Hiển thị 3 trên 3 kết quả</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Trước</button>
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Sau</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
