import React from 'react';
import { MOCK_TASKS, PROGRESS_HISTORY } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FileDown, TrendingUp } from 'lucide-react';

export default function StudentReports() {
  const tasks = MOCK_TASKS.filter(t => t.teamId === 'team-001');
  const completed = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Project Report</h2>
          <p className="text-sm text-slate-500 mt-0.5">AI-Powered Library System — Team Alpha</p>
        </div>
        <button className="btn-primary text-sm"><FileDown className="w-4 h-4" /> Export PDF</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: tasks.length, color: 'bg-blue-500' },
          { label: 'Completed', value: completed.length, color: 'bg-emerald-500' },
          { label: 'Avg Score', value: `${Math.round(completed.reduce((s, t) => s + (t.score || 0), 0) / (completed.length || 1))}/100`, color: 'bg-purple-500' },
          { label: 'Progress', value: '68%', color: 'bg-amber-500' },
        ].map(s => (
          <div key={s.label} className={`card text-center`}>
            <div className={`text-2xl font-bold ${s.color === 'bg-blue-500' ? 'text-blue-600' : s.color === 'bg-emerald-500' ? 'text-emerald-600' : s.color === 'bg-purple-500' ? 'text-purple-600' : 'text-amber-600'}`}>{s.value}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-blue-500" /> Weekly Progress</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={PROGRESS_HISTORY} barSize={32}>
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Bar dataKey="progress" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Progress %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Task Table */}
      <div className="card">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Task Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <th className="pb-3 font-semibold">Task</th>
                <th className="pb-3 font-semibold">Deadline</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Score</th>
                <th className="pb-3 font-semibold">Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {tasks.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 font-medium text-slate-700 dark:text-slate-200">{t.title}</td>
                  <td className="py-3 text-slate-400">{t.deadline}</td>
                  <td className="py-3">
                    <span className={`badge text-xs ${t.status === 'completed' ? 'badge-green' : t.status === 'in_progress' ? 'badge-yellow' : 'bg-slate-100 text-slate-500'}`}>
                      {t.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-slate-700 dark:text-slate-200">{t.score ? `${t.score}/100` : '—'}</td>
                  <td className="py-3 text-slate-400 text-xs max-w-xs truncate">{t.feedback || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
