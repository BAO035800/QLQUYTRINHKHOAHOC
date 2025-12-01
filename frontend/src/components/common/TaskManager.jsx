import React, { useState } from 'react';
import { Plus, Trash2, CheckSquare, Square, Clock, User, AlertCircle } from 'lucide-react';
import Button from './Button';

const TaskManager = ({ conferenceId, onClose }) => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Chuẩn bị hội trường', category: 'Hậu cần', assignee: '', deadline: '', status: 'pending', priority: 'high' },
        { id: 2, title: 'Thiết lập hệ thống âm thanh', category: 'Kỹ thuật', assignee: '', deadline: '', status: 'pending', priority: 'high' },
        { id: 3, title: 'Thiết kế backdrop, banner', category: 'Truyền thông', assignee: '', deadline: '', status: 'pending', priority: 'medium' },
        { id: 4, title: 'Chuẩn bị tài liệu phát cho khách', category: 'Hậu cần', assignee: '', deadline: '', status: 'pending', priority: 'medium' },
    ]);

    const [newTask, setNewTask] = useState({
        title: '',
        category: 'Hậu cần',
        assignee: '',
        deadline: '',
        priority: 'medium'
    });

    const categories = ['Hậu cần', 'Kỹ thuật', 'Truyền thông', 'Tài chính', 'Khác'];
    const priorities = {
        high: { label: 'Cao', color: 'bg-red-100 text-red-700' },
        medium: { label: 'Trung bình', color: 'bg-yellow-100 text-yellow-700' },
        low: { label: 'Thấp', color: 'bg-green-100 text-green-700' }
    };

    const addTask = () => {
        if (!newTask.title.trim()) {
            alert('Vui lòng nhập tên công việc!');
            return;
        }

        const task = {
            id: Date.now(),
            ...newTask,
            status: 'pending'
        };

        setTasks([...tasks, task]);
        setNewTask({
            title: '',
            category: 'Hậu cần',
            assignee: '',
            deadline: '',
            priority: 'medium'
        });
    };

    const toggleTaskStatus = (id) => {
        setTasks(tasks.map(task =>
            task.id === id
                ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
                : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const updateTask = (id, field, value) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, [field]: value } : task
        ));
    };

    const getTaskStats = () => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'completed').length;
        const pending = total - completed;
        const overdue = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed').length;

        return { total, completed, pending, overdue };
    };

    const stats = getTaskStats();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <CheckSquare className="text-primary" size={24} />
                        Quản lý Công việc (BR3)
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Lập tasks: hậu cần, âm thanh, truyền thông...</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-700 font-medium">Tổng số</p>
                    <p className="text-2xl font-bold text-blue-900 mt-1">{stats.total}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-700 font-medium">Hoàn thành</p>
                    <p className="text-2xl font-bold text-green-900 mt-1">{stats.completed}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="text-sm text-yellow-700 font-medium">Đang làm</p>
                    <p className="text-2xl font-bold text-yellow-900 mt-1">{stats.pending}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-red-700 font-medium">Quá hạn</p>
                    <p className="text-2xl font-bold text-red-900 mt-1">{stats.overdue}</p>
                </div>
            </div>

            {/* Add New Task */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Thêm công việc mới</h3>
                <div className="grid grid-cols-12 gap-3">
                    <input
                        type="text"
                        placeholder="Tên công việc *"
                        className="col-span-4 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                    <select
                        className="col-span-2 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                        value={newTask.category}
                        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Người phụ trách"
                        className="col-span-2 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                        value={newTask.assignee}
                        onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    />
                    <input
                        type="date"
                        className="col-span-2 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                        value={newTask.deadline}
                        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    />
                    <select
                        className="col-span-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    >
                        <option value="high">Cao</option>
                        <option value="medium">TB</option>
                        <option value="low">Thấp</option>
                    </select>
                    <Button
                        type="button"
                        size="sm"
                        onClick={addTask}
                        className="col-span-1"
                    >
                        <Plus size={16} />
                    </Button>
                </div>
            </div>

            {/* Task List */}
            <div className="space-y-2">
                <h3 className="font-bold text-gray-900 mb-3">Danh sách công việc</h3>
                {tasks.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <CheckSquare size={48} className="mx-auto mb-3 text-gray-300" />
                        <p>Chưa có công việc nào</p>
                    </div>
                ) : (
                    tasks.map(task => {
                        const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'completed';

                        return (
                            <div
                                key={task.id}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${task.status === 'completed'
                                        ? 'bg-green-50 border-green-200'
                                        : isOverdue
                                            ? 'bg-red-50 border-red-200'
                                            : 'bg-white border-gray-200 hover:border-primary'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleTaskStatus(task.id)}
                                    className="flex-shrink-0"
                                >
                                    {task.status === 'completed' ? (
                                        <CheckSquare className="text-green-600" size={20} />
                                    ) : (
                                        <Square className="text-gray-400 hover:text-primary" size={20} />
                                    )}
                                </button>

                                <div className="flex-1 grid grid-cols-12 gap-3 items-center">
                                    <div className="col-span-4">
                                        <p className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                            {task.title}
                                        </p>
                                        <span className="text-xs text-gray-500">{task.category}</span>
                                    </div>

                                    <div className="col-span-2">
                                        <input
                                            type="text"
                                            placeholder="Người phụ trách"
                                            className="w-full px-2 py-1 text-sm rounded border border-gray-200 focus:outline-none focus:border-primary"
                                            value={task.assignee}
                                            onChange={(e) => updateTask(task.id, 'assignee', e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <input
                                            type="date"
                                            className="w-full px-2 py-1 text-sm rounded border border-gray-200 focus:outline-none focus:border-primary"
                                            value={task.deadline}
                                            onChange={(e) => updateTask(task.id, 'deadline', e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${priorities[task.priority].color}`}>
                                            {priorities[task.priority].label}
                                        </span>
                                    </div>

                                    <div className="col-span-2 flex items-center gap-2 justify-end">
                                        {isOverdue && (
                                            <AlertCircle className="text-red-500" size={16} title="Quá hạn" />
                                        )}
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Category Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3">Theo danh mục</h3>
                <div className="grid grid-cols-5 gap-3">
                    {categories.map(category => {
                        const categoryTasks = tasks.filter(t => t.category === category);
                        const completed = categoryTasks.filter(t => t.status === 'completed').length;

                        return (
                            <div key={category} className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm font-medium text-gray-700">{category}</p>
                                <p className="text-lg font-bold text-gray-900 mt-1">
                                    {completed}/{categoryTasks.length}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TaskManager;
