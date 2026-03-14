import React, { useState } from 'react';
import { Settings, Bell, Shield, Palette, Database, ChevronRight, ToggleLeft, ToggleRight } from 'lucide-react';

const sections = [
  { icon: Bell, label: 'Notifications', settings: [
    { label: 'Email notifications', desc: 'Send emails for task updates', enabled: true },
    { label: 'Deadline alerts', desc: 'Alert 3 days before deadlines', enabled: true },
    { label: 'System announcements', desc: 'Platform-wide notifications', enabled: false },
  ]},
  { icon: Shield, label: 'Security', settings: [
    { label: 'Two-factor authentication', desc: 'Require 2FA for all users', enabled: false },
    { label: 'Session timeout', desc: 'Auto-logout after 30 min inactivity', enabled: true },
  ]},
  { icon: Palette, label: 'Appearance', settings: [
    { label: 'Dark mode default', desc: 'Enable dark mode by default', enabled: false },
    { label: 'Compact view', desc: 'Reduce card spacing', enabled: false },
  ]},
  { icon: Database, label: 'Data', settings: [
    { label: 'Auto-backup', desc: 'Daily automatic data backup', enabled: true },
    { label: 'Analytics tracking', desc: 'Track user activity for analytics', enabled: true },
  ]},
];

export default function AdminSettings() {
  const [settings, setSettings] = useState(() => {
    const s = {};
    sections.forEach(sec => sec.settings.forEach(st => { s[st.label] = st.enabled; }));
    return s;
  });

  const toggle = (label) => setSettings(s => ({ ...s, [label]: !s[label] }));

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2"><Settings className="w-5 h-5" /> System Settings</h2>
      {sections.map(sec => {
        const Icon = sec.icon;
        return (
          <div key={sec.label} className="card">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Icon className="w-4 h-4 text-blue-500" /> {sec.label}
            </h3>
            <div className="space-y-3">
              {sec.settings.map(st => (
                <div key={st.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-200 text-sm">{st.label}</p>
                    <p className="text-xs text-slate-400">{st.desc}</p>
                  </div>
                  <button onClick={() => toggle(st.label)} className="flex-shrink-0 ml-4">
                    {settings[st.label]
                      ? <ToggleRight className="w-8 h-8 text-blue-500" />
                      : <ToggleLeft className="w-8 h-8 text-slate-300 dark:text-slate-600" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="card border-red-100 dark:border-red-900">
        <h3 className="font-bold text-red-600 mb-3">Danger Zone</h3>
        <div className="space-y-2">
          <button className="w-full text-left p-3 rounded-xl border border-red-100 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-red-600 font-medium transition-colors flex items-center justify-between">
            Reset all user passwords <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-full text-left p-3 rounded-xl border border-red-100 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-red-600 font-medium transition-colors flex items-center justify-between">
            Archive all completed projects <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button className="btn-primary w-full justify-center">Save All Settings</button>
    </div>
  );
}
