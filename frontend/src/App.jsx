
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerificationSuccess from './pages/VerificationSuccess';

import Dashboard from './pages/Dashboard';
import ProposalsPage from './pages/ProposalsPage';
import ProposalForm from './pages/ProposalForm';
import ProposalDetail from './pages/ProposalDetail';
import ProfilePage from './pages/ProfilePage';
import CouncilPage from './pages/CouncilPage';
import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-success" element={<RegisterSuccess />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verification-success" element={<VerificationSuccess />} />
            {/* Handle hash routing from Supabase */}
            <Route path="/#access_token*" element={<VerificationSuccess />} />

            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />

              {/* Proposal Routes */}
              <Route path="proposals" element={<ProposalsPage />} />
              <Route path="proposals/new" element={<ProposalForm />} />
              <Route path="proposals/edit/:id" element={<ProposalForm />} />
              <Route path="proposals/:id" element={<ProposalDetail />} />

              <Route path="projects" element={<div className="card"><h2>Đề tài đang thực hiện (Đang phát triển)</h2></div>} />

              {/* Manager Routes */}
              <Route path="manage-proposals" element={<ProposalsPage />} />
              <Route path="manage-projects" element={<div className="card"><h2>Quản lý Đề tài (Đang phát triển)</h2></div>} />
              <Route path="councils" element={<CouncilPage />} />

              {/* Expert Routes */}
              <Route path="reviews" element={<ProposalsPage />} /> {/* Expert reuses list to see assigned proposals */}

              {/* Other Routes */}
              <Route path="profile" element={<ProfilePage />} />

              <Route path="users" element={<div className="card"><h2>Quản lý Người dùng (Đang phát triển)</h2></div>} />
              <Route path="settings" element={<div className="card"><h2>Cấu hình hệ thống (Đang phát triển)</h2></div>} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
