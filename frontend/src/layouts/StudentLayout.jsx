import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const titles = {
  '/student': 'My Dashboard',
  '/student/tasks': 'Task Board',
  '/student/progress': 'Progress Tracker',
  '/student/files': 'Files & Submissions',
  '/student/chat': 'Team Chat',
  '/student/ai': 'AI Assistant',
  '/student/leaderboard': 'Leaderboard',
  '/student/reports': 'Reports',
  '/student/notifications': 'Notifications',
};

export default function StudentLayout() {
  const { pathname } = useLocation();
  const title = titles[pathname] || 'UniTrack AI';
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
