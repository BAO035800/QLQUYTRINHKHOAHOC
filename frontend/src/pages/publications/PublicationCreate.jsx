import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { publicationService } from '../../services/publicationService';

const PublicationCreate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        authors: [''],
        journal: '',
        year: new Date().getFullYear(),
        volume: '',
        issue: '',
        pages: '',
        doi: '',
        type: 'Journal',
        impactFactor: '',
        quartile: 'Q1',
        abstract: '',
        keywords: ['']
    });

    const [loading, setLoading] = useState(false);

    const addAuthor = () => {
        setFormData({ ...formData, authors: [...formData.authors, ''] });
    };

    const handleAuthorChange = (index, value) => {
        const newAuthors = [...formData.authors];
        newAuthors[index] = value;
        setFormData({ ...formData, authors: newAuthors });
    };

    const removeAuthor = (index) => {
        const newAuthors = formData.authors.filter((_, i) => i !== index);
        setFormData({ ...formData, authors: newAuthors });
    };

    const addKeyword = () => {
        setFormData({ ...formData, keywords: [...formData.keywords, ''] });
    };

    const handleKeywordChange = (index, value) => {
        const newKeywords = [...formData.keywords];
        newKeywords[index] = value;
        setFormData({ ...formData, keywords: newKeywords });
    };

    const removeKeyword = (index) => {
        const newKeywords = formData.keywords.filter((_, i) => i !== index);
        setFormData({ ...formData, keywords: newKeywords });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const cleanedData = {
                ...formData,
                authors: formData.authors.filter(a => a.trim() !== ''),
                keywords: formData.keywords.filter(k => k.trim() !== ''),
                impactFactor: formData.impactFactor ? parseFloat(formData.impactFactor) : null,
                year: parseInt(formData.year)
            };

            await publicationService.create(cleanedData);
            alert('Thêm bài báo thành công!');
            navigate('/publications');
        } catch (error) {
            console.error("Error creating publication:", error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => navigate('/publications')}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-4"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Thêm Bài báo Mới</h1>
                    <p className="text-gray-500">Nhập thông tin công trình nghiên cứu đã xuất bản</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">1. Thông tin cơ bản</h2>
                    <div className="space-y-4">
                        <Input
                            label="Tiêu đề bài báo"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Nhập tiêu đề đầy đủ"
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tác giả</label>
                            {formData.authors.map((author, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <Input
                                        placeholder={`Tác giả ${index + 1}`}
                                        value={author}
                                        onChange={(e) => handleAuthorChange(index, e.target.value)}
                                        required={index === 0}
                                    />
                                    {formData.authors.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeAuthor(index)}
                                            className="p-2 text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="secondary" size="sm" onClick={addAuthor}>
                                <Plus size={16} /> Thêm tác giả
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Publication Details */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">2. Thông tin xuất bản</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Loại</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="Journal">Journal</option>
                                <option value="Conference">Conference</option>
                            </select>
                        </div>
                        <Input
                            label="Tạp chí / Hội nghị"
                            value={formData.journal}
                            onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                            required
                        />
                        <Input
                            label="Năm xuất bản"
                            type="number"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            required
                        />
                        <Input
                            label="Volume"
                            value={formData.volume}
                            onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        />
                        <Input
                            label="Issue"
                            value={formData.issue}
                            onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                        />
                        <Input
                            label="Trang"
                            value={formData.pages}
                            onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                            placeholder="Ví dụ: 123-145"
                        />
                        <Input
                            label="DOI"
                            value={formData.doi}
                            onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                            placeholder="10.xxxx/xxxxx"
                            required
                        />
                        <Input
                            label="Impact Factor"
                            type="number"
                            step="0.1"
                            value={formData.impactFactor}
                            onChange={(e) => setFormData({ ...formData, impactFactor: e.target.value })}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quartile</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                value={formData.quartile}
                                onChange={(e) => setFormData({ ...formData, quartile: e.target.value })}
                            >
                                <option value="Q1">Q1</option>
                                <option value="Q2">Q2</option>
                                <option value="Q3">Q3</option>
                                <option value="Q4">Q4</option>
                                <option value="N/A">N/A</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Abstract & Keywords */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">3. Tóm tắt & Từ khóa</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tóm tắt</label>
                            <textarea
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary h-32"
                                placeholder="Tóm tắt nội dung bài báo..."
                                value={formData.abstract}
                                onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Từ khóa</label>
                            {formData.keywords.map((keyword, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <Input
                                        placeholder={`Từ khóa ${index + 1}`}
                                        value={keyword}
                                        onChange={(e) => handleKeywordChange(index, e.target.value)}
                                    />
                                    {formData.keywords.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeKeyword(index)}
                                            className="p-2 text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="secondary" size="sm" onClick={addKeyword}>
                                <Plus size={16} /> Thêm từ khóa
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="secondary" onClick={() => navigate('/publications')}>
                        Hủy bỏ
                    </Button>
                    <Button type="submit" disabled={loading} className="flex items-center gap-2">
                        {loading ? 'Đang lưu...' : <><Save size={18} /> Lưu bài báo</>}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PublicationCreate;
