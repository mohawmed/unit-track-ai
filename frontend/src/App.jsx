import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import StudentLayout from './layouts/StudentLayout';
import ProfessorLayout from './layouts/ProfessorLayout';
import AssistantLayout from './layouts/AssistantLayout';
import AdminLayout from './layouts/AdminLayout';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentTasks from './pages/student/StudentTasks';
import StudentProgress from './pages/student/StudentProgress';
import StudentFiles from './pages/student/StudentFiles';
import StudentChat from './pages/student/StudentChat';
import StudentAI from './pages/student/StudentAI';
import StudentLeaderboard from './pages/student/StudentLeaderboard';
import StudentReports from './pages/student/StudentReports';
import StudentNotifications from './pages/student/StudentNotifications';

// Professor pages
import ProfessorDashboard from './pages/professor/ProfessorDashboard';
import ProfessorTeam from './pages/professor/ProfessorTeam';
import ProfessorChat from './pages/professor/ProfessorChat';
import ProfessorAnalytics from './pages/professor/ProfessorAnalytics';
import ProfessorAI from './pages/professor/ProfessorAI';

// Assistant pages
import AssistantDashboard from './pages/assistant/AssistantDashboard';
import AssistantTeam from './pages/assistant/AssistantTeam';
import AssistantChat from './pages/assistant/AssistantChat';
import AssistantAI from './pages/assistant/AssistantAI';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfessor from './pages/admin/AdminProfessor';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';
import ProfilePage from './pages/shared/ProfilePage';

function ProtectedRoute({ children, allowedRole }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== allowedRole) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  const { user } = useApp();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          user ? <Navigate to={`/${user.role}`} /> : <Navigate to="/login" />
        } />

        {/* Student Routes */}
        <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentLayout /></ProtectedRoute>}>
          <Route index element={<StudentDashboard />} />
          <Route path="tasks" element={<StudentTasks />} />
          <Route path="progress" element={<StudentProgress />} />
          <Route path="files" element={<StudentFiles />} />
          <Route path="chat" element={<StudentChat />} />
          <Route path="ai" element={<StudentAI />} />
          <Route path="leaderboard" element={<StudentLeaderboard />} />
          <Route path="reports" element={<StudentReports />} />
          <Route path="notifications" element={<StudentNotifications />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Professor Routes */}
        <Route path="/professor" element={<ProtectedRoute allowedRole="professor"><ProfessorLayout /></ProtectedRoute>}>
          <Route index element={<ProfessorDashboard />} />
          <Route path="team/:teamId" element={<ProfessorTeam />} />
          <Route path="chat" element={<ProfessorChat />} />
          <Route path="analytics" element={<ProfessorAnalytics />} />
          <Route path="ai" element={<ProfessorAI />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Assistant Routes */}
        <Route path="/assistant" element={<ProtectedRoute allowedRole="assistant"><AssistantLayout /></ProtectedRoute>}>
          <Route index element={<AssistantDashboard />} />
          <Route path="team/:teamId" element={<AssistantTeam />} />
          <Route path="chat" element={<AssistantChat />} />
          <Route path="ai" element={<AssistantAI />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="professor/:profId" element={<AdminProfessor />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
