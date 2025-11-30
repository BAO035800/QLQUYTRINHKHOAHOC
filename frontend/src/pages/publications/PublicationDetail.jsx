import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Award, TrendingUp, ExternalLink, Tag } from 'lucide-react';
import { publicationService } from '../../services/publicationService';
import Button from '../../components/common/Button';

const PublicationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [publication, setPublication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const data = await publicationService.getById(id);
                setPublication(data);
            } catch (error) {
                console.error("Error fetching publication:", error);
                navigate('/publications');
            } finally {
                setLoading(false);
            }
        };

        fetchPublication();
    }, [id, navigate]);

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Đang tải thông tin bài báo...</div>;
    }

    if (!publication) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
                <Link to="/publications" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors mt-1">
                    <ArrowLeft size={20} />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${publication.statusColor}`}>
                            {publication.status}
                        </span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {publication.type}
                        </span>
                        {publication.quartile !== 'N/A' && (
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${publication.quartile === 'Q1' ? 'bg-purple-100 text-purple-700' :
                                    publication.quartile === 'Q2' ? 'bg-indigo-100 text-indigo-700' :
                                        'bg-gray-100 text-gray-700'
                                }`}>
                                {publication.quartile}
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">{publication.title}</h1>
                    <p className="text-gray-700 mb-4">{publication.authors.join(', ')}</p>
                </div>
            </div>

            {/* Publication Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin xuất bản</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500 mb-1">Tạp chí / Hội nghị</p>
                        <p className="font-medium text-gray-900">{publication.journal}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 mb-1">Năm xuất bản</p>
                        <p className="font-medium text-gray-900">{publication.year}</p>
                    </div>
                    {publication.volume && (
                        <div>
                            <p className="text-gray-500 mb-1">Volume / Issue</p>
                            <p className="font-medium text-gray-900">
                                Vol. {publication.volume}{publication.issue && ` (${publication.issue})`}
                            </p>
                        </div>
                    )}
                    {publication.pages && (
                        <div>
                            <p className="text-gray-500 mb-1">Trang</p>
                            <p className="font-medium text-gray-900">{publication.pages}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-gray-500 mb-1">DOI</p>
                        <a
                            href={`https://doi.org/${publication.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary hover:underline flex items-center gap-1"
                        >
                            {publication.doi}
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <TrendingUp className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Trích dẫn</p>
                            <p className="text-2xl font-bold text-gray-900">{publication.citations}</p>
                        </div>
                    </div>
                </div>
                {publication.impactFactor && (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <Award className="text-purple-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Impact Factor</p>
                                <p className="text-2xl font-bold text-gray-900">{publication.impactFactor}</p>
                            </div>
                        </div>
                    </div>
                )}
                {publication.quartile !== 'N/A' && (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <BookOpen className="text-green-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Quartile</p>
                                <p className="text-2xl font-bold text-gray-900">{publication.quartile}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Abstract */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Tóm tắt</h2>
                <p className="text-gray-700 leading-relaxed">{publication.abstract}</p>
            </div>

            {/* Keywords */}
            {publication.keywords && publication.keywords.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Tag size={18} />
                        Từ khóa
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {publication.keywords.map((keyword, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
                <Button variant="secondary">Xuất trích dẫn</Button>
                <Button>Xem toàn văn</Button>
            </div>
        </div>
    );
};

export default PublicationDetail;
