import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

const ScientificCV = ({ initialData, readOnly = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState(initialData || {
        degree: 'Tiến sĩ',
        academicRank: 'Phó Giáo sư',
        specialization: 'Khoa học máy tính',
        researchInterests: 'Trí tuệ nhân tạo, Học máy, Xử lý ngôn ngữ tự nhiên',
        publications: [
            { id: 1, title: 'Nghiên cứu ứng dụng AI trong y tế', year: 2023, journal: 'Tạp chí KHCN' },
            { id: 2, title: 'Xây dựng hệ thống gợi ý thông minh', year: 2022, journal: 'Hội thảo Quốc gia CNTT' }
        ]
    });

    const handleSave = () => {
        // Call API to save
        setIsEditing(false);
        console.log('Saved data:', data);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-gray-900">Lý lịch khoa học</h2>
                {!readOnly && (
                    <Button
                        variant={isEditing ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    >
                        {isEditing ? <><Save size={16} /> Lưu thay đổi</> : <><Edit2 size={16} /> Chỉnh sửa</>}
                    </Button>
                )}
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Học vị"
                        value={data.degree}
                        disabled={!isEditing}
                        onChange={(e) => setData({ ...data, degree: e.target.value })}
                    />
                    <Input
                        label="Học hàm"
                        value={data.academicRank}
                        disabled={!isEditing}
                        onChange={(e) => setData({ ...data, academicRank: e.target.value })}
                    />
                    <Input
                        label="Chuyên môn"
                        value={data.specialization}
                        disabled={!isEditing}
                        onChange={(e) => setData({ ...data, specialization: e.target.value })}
                    />
                    <Input
                        label="Lĩnh vực nghiên cứu"
                        value={data.researchInterests}
                        disabled={!isEditing}
                        onChange={(e) => setData({ ...data, researchInterests: e.target.value })}
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">Công trình công bố ({data.publications.length})</h3>
                        {isEditing && (
                            <Button variant="ghost" size="sm" className="text-primary">
                                <Plus size={16} /> Thêm mới
                            </Button>
                        )}
                    </div>

                    <div className="space-y-3">
                        {data.publications.map((pub) => (
                            <div key={pub.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg group">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{pub.title}</p>
                                    <p className="text-sm text-gray-500">{pub.journal} • {pub.year}</p>
                                </div>
                                {isEditing && (
                                    <button className="text-gray-400 hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScientificCV;
