import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const titles = {
  '/assistant': 'Supervisor Dashboard',
  '/assistant/chat': 'Team Chat',
  '/assistant/ai': 'AI Assistant',
  '/assistant/timeline': 'Project Timeline',
};

export default function AssistantLayout() {
  const { pathname } = useLocation();
  const base = '/' + pathname.split('/').slice(1, 3).join('/');
  const title = titles[base] || 'Supervisor Portal';
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
