import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const currentUser = authService.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error('Auth init failed', error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (username, password) => {
        const userData = await authService.login(username, password);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        localStorage.removeItem('user');
    };

    // --- Permission Logic ---

    const ROLE_PERMISSIONS = {
        admin: [
            'manage_users', 'manage_categories', 'manage_projects_all', 'manage_councils', 'view_reports_all',
            'view_finance', 'manage_events_all'
        ],
        lecturer: [
            'create_proposal', 'edit_own_proposal', 'view_own_profile', 'manage_own_publications', 'view_projects_own'
        ],
        staff: [
            'review_preliminary', 'manage_lists', 'assign_council', 'view_reports_staff', 'view_projects_all'
        ],
        leader: [
            'approve_final', 'view_reports_leader', 'view_projects_all'
        ],
        expert: [
            'grade_proposal', 'view_assigned_proposal'
        ],
        accountant: [
            'view_finance', 'manage_payments', 'view_reports_finance'
        ],
        organizer: [
            'manage_event', 'check_in_qr', 'view_events_assigned'
        ],
        attendee: [
            'register_event', 'check_in_qr_self', 'download_documents'
        ]
    };

    const hasPermission = (permission) => {
        if (!user) return false;
        const userPermissions = ROLE_PERMISSIONS[user.role] || [];
        return userPermissions.includes(permission) || user.role === 'admin'; // Admin has all permissions implicitly if not listed? No, let's be explicit or allow override.
    };

    // Helper functions for UI
    const isAdmin = () => user?.role === 'admin';
    const isLecturer = () => user?.role === 'lecturer';
    const isStaff = () => user?.role === 'staff';
    const isLeader = () => user?.role === 'leader';
    const isExpert = () => user?.role === 'expert';
    const isAccountant = () => user?.role === 'accountant';
    const isOrganizer = () => user?.role === 'organizer';
    const isAttendee = () => user?.role === 'attendee';

    // Feature-specific checks
    const canManageUsers = () => hasPermission('manage_users');

    // Project/Proposal Permissions
    const canCreateProject = () => hasPermission('create_proposal');
    const canEditProject = (project) => {
        if (isAdmin()) return true;
        if (isLecturer()) {
            // Check ownership (mock logic: assume if it's their project)
            // In real app, check project.createdBy === user.id
            // For mock, we allow editing if status is 'Draft' or 'Correction Required'
            return project?.status === 'Đang soạn thảo' || project?.status === 'Yêu cầu chỉnh sửa';
        }
        return false;
    };
    const canDeleteProject = () => isAdmin(); // Only admin can delete for now
    const canApproveProject = () => isLeader() || isStaff(); // Staff preliminary, Leader final
    const canGradeProject = () => isExpert();

    // Conference Permissions
    const canCreateConference = () => isAdmin() || isOrganizer() || isLecturer(); // Lecturers can propose
    const canManageConference = () => isAdmin() || isOrganizer();

    // Finance Permissions
    const canViewFinance = () => isAdmin() || isAccountant() || isLeader();

    // Report Permissions
    const canViewReports = () => isAdmin() || isLeader() || isStaff() || isAccountant();

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            loading,
            isAuthenticated: !!user,
            hasPermission,
            isAdmin, isLecturer, isStaff, isLeader, isExpert, isAccountant, isOrganizer, isAttendee,
            canManageUsers,
            canCreateProject,
            canEditProject,
            canDeleteProject,
            canApproveProject,
            canGradeProject,
            canCreateConference,
            canManageConference,
            canViewFinance,
            canViewReports
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
