import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Projects from './pages/projects/Projects';
import Conferences from './pages/conferences/Conferences';
import Publications from './pages/publications/Publications';
import Reports from './pages/reports/Reports';
import Documents from './pages/documents/Documents';
import Profile from './pages/users/Profile';
import ProjectCreate from './pages/projects/ProjectCreate';
import ProjectDetail from './pages/projects/ProjectDetail';
import ConferenceCreate from './pages/conferences/ConferenceCreate';
import ConferenceEdit from './pages/conferences/ConferenceEdit';
import ConferenceDetail from './pages/conferences/ConferenceDetail';
import PublicationCreate from './pages/publications/PublicationCreate';
import PublicationDetail from './pages/publications/PublicationDetail';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/create" element={<ProjectCreate />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="conferences" element={<Conferences />} />
            <Route path="conferences/create" element={<ConferenceCreate />} />
            <Route path="conferences/:id/edit" element={<ConferenceEdit />} />
            <Route path="conferences/:id" element={<ConferenceDetail />} />
            <Route path="publications" element={<Publications />} />
            <Route path="publications/create" element={<PublicationCreate />} />
            <Route path="publications/:id" element={<PublicationDetail />} />
            <Route path="reports" element={<Reports />} />
            <Route path="documents" element={<Documents />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
