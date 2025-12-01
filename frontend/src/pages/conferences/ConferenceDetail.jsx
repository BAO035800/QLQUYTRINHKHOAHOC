import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, FileText, Download, Clock, Users, DollarSign, QrCode, Scan, CheckSquare, UserPlus, Upload, BarChart3, Edit } from 'lucide-react';
import { conferenceService } from '../../services/conferenceService';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';
import TaskManager from '../../components/common/TaskManager';
import RegistrationForm from '../../components/common/RegistrationForm';
import GuestImport from '../../components/common/GuestImport';
import ConferenceReport from '../../components/common/ConferenceReport';
import ApprovalModal from '../../components/common/ApprovalModal';
import BudgetManager from '../../components/common/BudgetManager';

const ConferenceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isOrganizer, isAdmin, isAttendee, isLeader, isAccountant, canEditConference } = useAuth();
    const [conference, setConference] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [showScanner, setShowScanner] = useState(false);
    const [scanResult, setScanResult] = useState(null);

    // BR modals
    const [showTaskManager, setShowTaskManager] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showGuestImport, setShowGuestImport] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [showBudgetManager, setShowBudgetManager] = useState(false);

    useEffect(() => {
        const fetchConference = async () => {
            try {
                const data = await conferenceService.getById(id);
                setConference(data);
            } catch (error) {
                console.error("Error fetching conference:", error);
                navigate('/conferences');
            } finally {
                setLoading(false);
            }
        };

        fetchConference();
    }, [id, navigate]);

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Đang tải thông tin hội thảo...</div>;
    }

    if (!conference) {
        return null;
    }

    const handleSimulateScan = () => {
        setScanResult({
            name: 'Nguyễn Văn A',
            id: 'SV001',
            time: new Date().toLocaleTimeString()
        });
    };

    const renderTabContent = () => {
        if (activeTab === 'overview') {
            return (
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Mục tiêu</h3>
                        <p className="text-gray-600 leading-relaxed">{conference.objectives}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Chương trình</h3>
                        <div className="text-gray-600 leading-relaxed whitespace-pre-line">{conference.agenda}</div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Đơn vị tổ chức</h3>
                        <p className="text-gray-600">{conference.organizer}</p>
                    </div>
                </div>
            );
        }

        if (activeTab === 'guests') {
            return (
                <div>
                    <h3 className="font-bold text-gray-900 mb-4">Danh sách khách mời</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3">Họ và tên</th>
                                    <th className="px-4 py-3">Đơn vị</th>
                                    <th className="px-4 py-3">Vai trò</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {conference.guests && conference.guests.length > 0 ? (
                                    conference.guests.map((guest, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-3 font-medium text-gray-900">{guest.name}</td>
                                            <td className="px-4 py-3">{guest.affiliation}</td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                                    {guest.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                                            Chưa có thông tin khách mời
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        if (activeTab === 'budget') {
            return (
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Tổng quan Kinh phí</h3>
                        {(isAdmin() || isAccountant()) && (
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setShowBudgetManager(true)}
                                className="flex items-center gap-2"
                            >
                                <DollarSign size={16} />
                                Quản lý chi tiết (FR09)
                            </Button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">Kinh phí dự kiến</p>
                            <p className="text-xl font-bold text-blue-900 mt-1">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(conference.budget)}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">Đã chi tiêu</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">0 ₫</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-700">Còn lại</p>
                            <p className="text-xl font-bold text-green-900 mt-1">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(conference.budget)}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        if (activeTab === 'documents') {
            return (
                <div>
                    <h3 className="font-bold text-gray-900 mb-4">Tài liệu hội thảo</h3>
                    <div className="space-y-3">
                        {conference.documents && conference.documents.length > 0 ? (
                            conference.documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <FileText className="text-primary" size={20} />
                                        <div>
                                            <p className="font-medium text-gray-900">{doc.name}</p>
                                            <p className="text-xs text-gray-500">{doc.date} • {doc.size}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-500 hover:text-primary hover:bg-white rounded-full transition-all shadow-sm">
                                        <Download size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm italic">Chưa có tài liệu nào.</p>
                        )}
                    </div>
                </div>
            );
        }

        if (activeTab === 'reviews') {
            return (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Clock size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Chưa có báo cáo</h3>
                    <p className="text-gray-500">Hội thảo chưa diễn ra hoặc chưa có báo cáo tổng kết.</p>
                </div>
            );
        }

        // FR07: QR Check-in tab
        if (activeTab === 'checkin') {
            if (isAdmin() || isOrganizer()) {
                return (
                    <div className="flex flex-col items-center justify-center py-8">
                        <h3 className="font-bold text-gray-900 mb-2">Quét mã QR Check-in</h3>
                        <p className="text-gray-500 mb-6">Sử dụng camera để quét mã QR của khách mời</p>

                        {!showScanner ? (
                            <Button onClick={() => setShowScanner(true)} className="flex items-center gap-2">
                                <Scan size={20} /> Bắt đầu quét
                            </Button>
                        ) : (
                            <div className="w-full max-w-md bg-black rounded-xl overflow-hidden relative aspect-square flex items-center justify-center">
                                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                                    <div className="w-64 h-64 border-2 border-primary rounded-lg relative">
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
                                        <div className="absolute top-0 left-0 w-full h-0.5 bg-primary animate-scan"></div>
                                    </div>
                                </div>

                                {!scanResult ? (
                                    <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                                        <Button variant="secondary" onClick={handleSimulateScan}>
                                            Mô phỏng quét thành công
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 bg-white p-6 flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                            <QrCode size={32} />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">Check-in Thành công!</h4>
                                        <p className="text-gray-600 mb-4">
                                            Khách mời: <span className="font-bold text-gray-900">{scanResult.name}</span><br />
                                            MS: {scanResult.id}<br />
                                            Thời gian: {scanResult.time}
                                        </p>
                                        <Button onClick={() => setScanResult(null)}>Quét tiếp</Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            }

            // Attendee view - show their QR code
            return (
                <div className="flex flex-col items-center justify-center py-8">
                    <h3 className="font-bold text-gray-900 mb-2">Vé tham dự của bạn</h3>
                    <p className="text-gray-500 mb-6">Vui lòng xuất trình mã QR này tại quầy check-in</p>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <QRCodeSVG
                            value={JSON.stringify({
                                userId: user?.id,
                                conferenceId: conference.id,
                                timestamp: new Date().toISOString()
                            })}
                            size={200}
                            level="H"
                            includeMargin={true}
                        />
                    </div>

                    <div className="mt-6 text-center">
                        <p className="font-bold text-gray-900">{user?.fullName}</p>
                        <p className="text-sm text-gray-500">{user?.department}</p>
                        <div className="mt-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium inline-block">
                            Đã đăng ký
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start gap-4 flex-1">
                    <Link to="/conferences" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors mt-1">
                        <ArrowLeft size={20} />
                    </Link>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${conference.statusColor}`}>
                                {conference.status}
                            </span>
                            <span className="text-sm text-gray-500 font-mono">{conference.code}</span>
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                {conference.type}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{conference.title}</h1>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-primary" />
                                <span>{conference.startDate} - {conference.endDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-primary" />
                                <span>{conference.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={16} className="text-primary" />
                                <span>{conference.participants} người tham dự</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                    {/* FR01: Edit button */}
                    {canEditConference() && (
                        <Button
                            variant="secondary"
                            onClick={() => navigate(`/conferences/${id}/edit`)}
                            className="flex items-center gap-2"
                        >
                            <Edit size={18} />
                            Chỉnh sửa
                        </Button>
                    )}

                    {/* BR2: Approval for Leader */}
                    {isLeader() && conference.status === 'Chờ duyệt' && (
                        <Button
                            onClick={() => setShowApprovalModal(true)}
                            className="flex items-center gap-2"
                        >
                            <CheckSquare size={18} />
                            Phê duyệt (BR2)
                        </Button>
                    )}

                    {/* BR3: Task Management */}
                    {(isAdmin() || isOrganizer()) && (
                        <Button
                            variant="secondary"
                            onClick={() => setShowTaskManager(true)}
                            className="flex items-center gap-2"
                        >
                            <CheckSquare size={18} />
                            Quản lý Tasks
                        </Button>
                    )}

                    {/* BR4: Guest Import */}
                    {(isAdmin() || isOrganizer()) && (
                        <Button
                            variant="secondary"
                            onClick={() => setShowGuestImport(true)}
                            className="flex items-center gap-2"
                        >
                            <Upload size={18} />
                            Import khách mời
                        </Button>
                    )}

                    {/* BR4: Registration Form */}
                    <Button
                        variant="secondary"
                        onClick={() => setShowRegistrationForm(true)}
                        className="flex items-center gap-2"
                    >
                        <UserPlus size={18} />
                        Đăng ký tham dự
                    </Button>

                    {/* BR6: Report */}
                    {(isAdmin() || isOrganizer() || isLeader()) && conference.status === 'Đã hoàn thành' && (
                        <Button
                            variant="secondary"
                            onClick={() => setShowReport(true)}
                            className="flex items-center gap-2"
                        >
                            <BarChart3 size={18} />
                            Báo cáo tổng kết
                        </Button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex gap-6 overflow-x-auto">
                    {['overview', 'guests', 'budget', 'documents', 'reviews', 'checkin'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab === 'overview' && 'Tổng quan'}
                            {tab === 'guests' && 'Khách mời'}
                            {tab === 'budget' && 'Kinh phí'}
                            {tab === 'documents' && 'Tài liệu'}
                            {tab === 'reviews' && 'Báo cáo'}
                            {tab === 'checkin' && (
                                <span className="flex items-center gap-2">
                                    <QrCode size={16} />
                                    Check-in
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[400px]">
                {renderTabContent()}
            </div>

            {/* BR Modals */}
            {showApprovalModal && (
                <ApprovalModal
                    conference={conference}
                    onClose={() => setShowApprovalModal(false)}
                    onApprove={(decision, comment) => {
                        console.log('Approved:', decision, comment);
                        setConference({
                            ...conference,
                            status: decision === 'approved' ? 'Đã duyệt' : decision === 'rejected' ? 'Từ chối' : 'Cần bổ sung',
                            statusColor: decision === 'approved' ? 'bg-green-100 text-green-800' : decision === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        });
                    }}
                />
            )}

            {showTaskManager && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="relative w-full max-w-6xl my-8">
                        <button
                            onClick={() => setShowTaskManager(false)}
                            className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
                        >
                            <ArrowLeft size={20} className="rotate-180" />
                        </button>
                        <TaskManager conferenceId={conference.id} onClose={() => setShowTaskManager(false)} />
                    </div>
                </div>
            )}

            {showRegistrationForm && (
                <RegistrationForm
                    conference={conference}
                    onClose={() => setShowRegistrationForm(false)}
                    onRegister={(data) => {
                        console.log('Registration:', data);
                    }}
                />
            )}

            {showGuestImport && (
                <GuestImport
                    onClose={() => setShowGuestImport(false)}
                    onImport={(guests, sendEmail) => {
                        console.log('Imported guests:', guests, 'Send email:', sendEmail);
                    }}
                />
            )}

            {showReport && (
                <ConferenceReport
                    conference={conference}
                    onClose={() => setShowReport(false)}
                />
            )}

            {showBudgetManager && (
                <BudgetManager
                    conference={conference}
                    onClose={() => setShowBudgetManager(false)}
                />
            )}
        </div>
    );
};

export default ConferenceDetail;
