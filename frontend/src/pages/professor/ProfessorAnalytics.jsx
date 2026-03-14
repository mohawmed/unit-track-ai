import React from 'react';
import { MOCK_TEAMS, PROGRESS_HISTORY } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { TrendingUp, Users, CheckCircle2, AlertTriangle, FileDown } from 'lucide-react';

const teamProgressData = MOCK_TEAMS.map(t => ({ name: t.name, progress: t.progress, students: t.students.length }));

export default function ProfessorAnalytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Teams Analytics</h2>
        <button className="btn-primary text-sm"><FileDown className="w-4 h-4" /> Export Report</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Students', value: MOCK_TEAMS.reduce((s,t) => s + t.students.length, 0), color: 'bg-purple-500' },
          { icon: CheckCircle2, label: 'Avg Progress', value: `${Math.round(MOCK_TEAMS.reduce((s,t) => s + t.progress, 0) / MOCK_TEAMS.length)}%`, color: 'bg-emerald-500' },
          { icon: TrendingUp, label: 'Best Team', value: MOCK_TEAMS.sort((a,b) => b.progress - a.progress)[0].name.split(' ')[1], color: 'bg-blue-500' },
          { icon: AlertTriangle, label: 'Needs Attention', value: MOCK_TEAMS.filter(t => t.progress < 50).length, color: 'bg-amber-500' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0`}><Icon className="w-5 h-5 text-white" /></div>
              <div><p className="text-xl font-bold text-slate-800 dark:text-white">{s.value}</p><p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p></div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Progress Bar */}
        <div className="card">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">Team Progress Comparison</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={teamProgressData} barSize={40}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Bar dataKey="progress" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Progress %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Progress Line */}
        <div className="card">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">Overall Progress Timeline</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={PROGRESS_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Line type="monotone" dataKey="progress" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} name="Progress %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Teams Detail Table */}
      <div className="card">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Teams Detail</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-400 border-b border-slate-100 dark:border-slate-700">
              <th className="pb-3 font-semibold">Team</th>
              <th className="pb-3 font-semibold">Project</th>
              <th className="pb-3 font-semibold">Students</th>
              <th className="pb-3 font-semibold">Progress</th>
              <th className="pb-3 font-semibold">Status</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {MOCK_TEAMS.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 font-semibold text-slate-700 dark:text-slate-200">{t.emoji} {t.name}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400">{t.projectTitle}</td>
                  <td className="py-3 text-slate-700 dark:text-slate-200">{t.students.length}</td>
                  <td className="py-3 w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 progress-bar"><div className="progress-fill" style={{ width: `${t.progress}%`, background: t.color }} /></div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{t.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`badge text-xs ${t.progress >= 70 ? 'badge-green' : t.progress >= 50 ? 'badge-yellow' : 'badge-red'}`}>
                      {t.progress >= 70 ? 'On Track' : t.progress >= 50 ? 'Moderate' : 'Needs Help'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
