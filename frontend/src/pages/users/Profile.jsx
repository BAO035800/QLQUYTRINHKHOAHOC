import React from 'react';
import { useAuth } from '../../context/AuthContext';
import ScientificCV from '../../components/features/ScientificCV';
import { Mail, Phone, MapPin, Camera } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex items-end -mt-12 mb-6">
                        <div className="relative">
                            <img
                                src={user?.avatar || 'https://ui-avatars.com/api/?name=User'}
                                alt="Avatar"
                                className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-white"
                            />
                            <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-primary">
                                <Camera size={16} />
                            </button>
                        </div>
                        <div className="ml-6 mb-1 flex-1">
                            <h1 className="text-2xl font-bold text-gray-900">{user?.fullName}</h1>
                            <p className="text-gray-500">{user?.role === 'admin' ? 'Quản trị viên' : 'Nhà khoa học'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Mail size={18} />
                            <span>{user?.username}@university.edu.vn</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Phone size={18} />
                            <span>0987 654 321</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <MapPin size={18} />
                            <span>Khoa Công nghệ thông tin</span>
                        </div>
                    </div>
                </div>
            </div>

            <ScientificCV />
        </div>
    );
};

export default Profile;
