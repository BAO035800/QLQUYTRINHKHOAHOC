import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, RefreshCw, Calendar, MapPin, Users, DollarSign, Edit, Trash2 } from 'lucide-react';
import { conferenceService } from '../../services/conferenceService';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

const Conferences = () => {
  const navigate = useNavigate();
  const { canCreateConference, canManageConference } = useAuth();
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadConferences();
  }, []);

  const loadConferences = async () => {
    setLoading(true);
    try {
      const data = await conferenceService.getAll();
      setConferences(data);
    } catch (error) {
      console.error("Failed to load conferences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Bạn có chắc chắn muốn reset dữ liệu về mặc định?')) {
      conferenceService.resetData();
      loadConferences();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hội thảo này?')) {
      try {
        await conferenceService.delete(id);
        loadConferences();
      } catch (error) {
        console.error("Failed to delete conference:", error);
      }
    }
  };

  const filteredConferences = conferences.filter(conference => {
    const matchesSearch = conference.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conference.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || conference.status === filterStatus;
    const matchesType = filterType === 'all' || conference.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Hội thảo</h1>
          <p className="text-gray-500">Danh sách các hội thảo, hội nghị khoa học</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleResetData} title="Reset dữ liệu mẫu">
            <RefreshCw size={18} />
          </Button>
          {canCreateConference() && (
            <Link to="/conferences/create">
              <Button className="flex items-center gap-2">
                <Plus size={18} /> Tạo hội thảo mới
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hội thảo, mã số..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none bg-white"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Tất cả loại</option>
              <option value="Quốc tế">Quốc tế</option>
              <option value="Trong nước">Trong nước</option>
            </select>
          </div>
        </div>
        <div className="w-full md:w-48">
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Đang lên kế hoạch">Đang lên kế hoạch</option>
            <option value="Đang chuẩn bị">Đang chuẩn bị</option>
            <option value="Đang diễn ra">Đang diễn ra</option>
            <option value="Đã hoàn thành">Đã hoàn thành</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredConferences.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
              <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <p>Không tìm thấy hội thảo nào phù hợp.</p>
            </div>
          ) : (
            filteredConferences.map((conference) => (
              <div key={conference.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${conference.statusColor}`}>
                        {conference.status}
                      </span>
                      <span className="text-sm text-gray-500 font-mono">{conference.code}</span>
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                        {conference.type}
                      </span>
                    </div>
                    <Link to={`/conferences/${conference.id}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {conference.title}
                      </h3>
                    </Link>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mt-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{conference.startDate} - {conference.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{conference.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span>{conference.participants} người tham dự</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-gray-400" />
                        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(conference.budget)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/conferences/${conference.id}`}>
                      <Button variant="secondary" size="sm">Chi tiết</Button>
                    </Link>
                    {canManageConference() && (
                      <>
                        <Button variant="secondary" size="sm" className="text-blue-600 hover:bg-blue-50">
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(conference.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Conferences;
