import React, { useState } from 'react';
import { DollarSign, Plus, Trash2, CheckCircle, X, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import Button from './Button';

const BudgetManager = ({ conference, onClose }) => {
    const [expenses, setExpenses] = useState([
        { id: 1, category: 'Hội trường & Thiết bị', amount: 14500000, description: 'Thuê hội trường 3 ngày', date: '2024-11-20', status: 'approved', approvedBy: 'Kế toán trưởng' },
        { id: 2, category: 'Ăn uống', amount: 19000000, description: 'Tiệc buffet 150 người x 3 ngày', date: '2024-11-21', status: 'approved', approvedBy: 'Kế toán trưởng' },
        { id: 3, category: 'Tài liệu & In ấn', amount: 5500000, description: 'In tài liệu, backdrop, banner', date: '2024-11-22', status: 'pending', approvedBy: '' },
    ]);

    const [newExpense, setNewExpense] = useState({
        category: 'Hội trường & Thiết bị',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    const categories = [
        'Hội trường & Thiết bị',
        'Ăn uống',
        'Tài liệu & In ấn',
        'Truyền thông',
        'Vận chuyển',
        'Lưu trú',
        'Khác'
    ];

    const plannedBudget = conference?.budget || 50000000;
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const approvedExpenses = expenses.filter(e => e.status === 'approved').reduce((sum, exp) => sum + exp.amount, 0);
    const pendingExpenses = expenses.filter(e => e.status === 'pending').reduce((sum, exp) => sum + exp.amount, 0);
    const remaining = plannedBudget - approvedExpenses;
    const usagePercent = (approvedExpenses / plannedBudget * 100).toFixed(1);

    const addExpense = () => {
        if (!newExpense.amount || !newExpense.description) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const expense = {
            id: Date.now(),
            ...newExpense,
            amount: parseFloat(newExpense.amount),
            status: 'pending',
            approvedBy: ''
        };

        setExpenses([...expenses, expense]);
        setNewExpense({
            category: 'Hội trường & Thiết bị',
            amount: '',
            description: '',
            date: new Date().toISOString().split('T')[0]
        });
    };

    const approveExpense = (id) => {
        setExpenses(expenses.map(exp =>
            exp.id === id
                ? { ...exp, status: 'approved', approvedBy: 'Kế toán trưởng' }
                : exp
        ));
    };

    const rejectExpense = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn từ chối khoản chi này?')) {
            setExpenses(expenses.map(exp =>
                exp.id === id
                    ? { ...exp, status: 'rejected', approvedBy: 'Kế toán trưởng' }
                    : exp
            ));
        }
    };

    const deleteExpense = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khoản chi này?')) {
            setExpenses(expenses.filter(exp => exp.id !== id));
        }
    };

    const getCategoryTotal = (category) => {
        return expenses
            .filter(e => e.category === category && e.status === 'approved')
            .reduce((sum, exp) => sum + exp.amount, 0);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full my-8 max-h-[95vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-xl z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <DollarSign size={28} />
                                Quản lý Kinh phí
                            </h2>
                            <p className="text-green-100 mt-1">FR09 - Quản lý kinh phí chi tiết (Kế toán)</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="mt-4 bg-white/10 rounded-lg p-3">
                        <p className="font-bold text-lg">{conference?.title}</p>
                        <p className="text-sm text-green-100 mt-1">{conference?.code}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Budget Overview */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                            <p className="text-sm text-blue-700 font-medium">Ngân sách dự kiến</p>
                            <p className="text-2xl font-bold text-blue-900 mt-1">
                                {new Intl.NumberFormat('vi-VN').format(plannedBudget)} ₫
                            </p>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                            <p className="text-sm text-green-700 font-medium">Đã phê duyệt</p>
                            <p className="text-2xl font-bold text-green-900 mt-1">
                                {new Intl.NumberFormat('vi-VN').format(approvedExpenses)} ₫
                            </p>
                            <p className="text-xs text-green-600 mt-1">{usagePercent}% ngân sách</p>
                        </div>

                        <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
                            <p className="text-sm text-yellow-700 font-medium">Chờ duyệt</p>
                            <p className="text-2xl font-bold text-yellow-900 mt-1">
                                {new Intl.NumberFormat('vi-VN').format(pendingExpenses)} ₫
                            </p>
                        </div>

                        <div className={`rounded-lg p-4 border-2 ${remaining >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                            <p className={`text-sm font-medium ${remaining >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                                Còn lại
                            </p>
                            <p className={`text-2xl font-bold mt-1 flex items-center gap-2 ${remaining >= 0 ? 'text-emerald-900' : 'text-red-900'}`}>
                                {remaining >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                {new Intl.NumberFormat('vi-VN').format(Math.abs(remaining))} ₫
                            </p>
                        </div>
                    </div>

                    {/* Add New Expense */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-3">Thêm khoản chi mới</h3>
                        <div className="grid grid-cols-12 gap-3">
                            <select
                                className="col-span-3 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                value={newExpense.category}
                                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Số tiền (VNĐ)"
                                className="col-span-2 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Mô tả chi tiết"
                                className="col-span-4 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                value={newExpense.description}
                                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                            />
                            <input
                                type="date"
                                className="col-span-2 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                value={newExpense.date}
                                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                            />
                            <Button
                                type="button"
                                size="sm"
                                onClick={addExpense}
                                className="col-span-1"
                            >
                                <Plus size={16} />
                            </Button>
                        </div>
                    </div>

                    {/* Expense List */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-3">Danh sách chi tiêu</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b-2 border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium text-gray-700">Ngày</th>
                                        <th className="px-4 py-3 text-left font-medium text-gray-700">Danh mục</th>
                                        <th className="px-4 py-3 text-left font-medium text-gray-700">Mô tả</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700">Số tiền</th>
                                        <th className="px-4 py-3 text-center font-medium text-gray-700">Trạng thái</th>
                                        <th className="px-4 py-3 text-center font-medium text-gray-700">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {expenses.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-12 text-center text-gray-500">
                                                Chưa có khoản chi nào
                                            </td>
                                        </tr>
                                    ) : (
                                        expenses.map(expense => (
                                            <tr key={expense.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-gray-600">{expense.date}</td>
                                                <td className="px-4 py-3">
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                                        {expense.category}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-900">{expense.description}</td>
                                                <td className="px-4 py-3 text-right font-bold text-gray-900">
                                                    {new Intl.NumberFormat('vi-VN').format(expense.amount)} ₫
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    {expense.status === 'approved' && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                                            <CheckCircle size={14} />
                                                            Đã duyệt
                                                        </span>
                                                    )}
                                                    {expense.status === 'pending' && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                                                            <AlertCircle size={14} />
                                                            Chờ duyệt
                                                        </span>
                                                    )}
                                                    {expense.status === 'rejected' && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                                                            <X size={14} />
                                                            Từ chối
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {expense.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => approveExpense(expense.id)}
                                                                    className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                                                                    title="Phê duyệt"
                                                                >
                                                                    <CheckCircle size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => rejectExpense(expense.id)}
                                                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                                    title="Từ chối"
                                                                >
                                                                    <X size={18} />
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => deleteExpense(expense.id)}
                                                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                            title="Xóa"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Category Breakdown */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-3">Chi tiết theo danh mục (Đã phê duyệt)</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {categories.map(category => {
                                const total = getCategoryTotal(category);
                                return (
                                    <div key={category} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                        <p className="text-xs text-gray-600 mb-1">{category}</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            {new Intl.NumberFormat('vi-VN').format(total)} ₫
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Warning if over budget */}
                    {remaining < 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="font-medium text-red-900">Cảnh báo: Vượt ngân sách!</p>
                                <p className="text-sm text-red-700 mt-1">
                                    Chi tiêu đã vượt quá ngân sách dự kiến {new Intl.NumberFormat('vi-VN').format(Math.abs(remaining))} ₫.
                                    Vui lòng xem xét điều chỉnh hoặc xin bổ sung ngân sách.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end">
                    <Button onClick={onClose}>
                        Đóng
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BudgetManager;
