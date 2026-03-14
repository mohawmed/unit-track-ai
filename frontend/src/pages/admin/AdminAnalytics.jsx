import React from 'react';
import { MOCK_TEAMS, MOCK_PROFESSORS, PROGRESS_HISTORY } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { FileDown } from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
const teamProgress = MOCK_TEAMS.map(t => ({ name: t.name.split(' ')[1], progress: t.progress }));
const profRatings = MOCK_PROFESSORS.map(p => ({ name: p.name.split(' ').pop(), rating: p.rating }));

export default function AdminAnalytics() {
  const total = MOCK_TEAMS.reduce((s, t) => s + t.students.length, 0);
  const pieData = MOCK_TEAMS.map(t => ({ name: t.name, value: t.students.length }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">System Analytics</h2>
        <button className="btn-primary text-sm"><FileDown className="w-4 h-4" /> Export</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Progress */}
        <div className="card">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">Teams Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={teamProgress} barSize={40}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Bar dataKey="progress" radius={[6, 6, 0, 0]} name="Progress %">
                {teamProgress.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Students per Team Pie */}
        <div className="card">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">Students Distribution</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="60%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="text-sm text-slate-600 dark:text-slate-300 flex-1">{item.name}</span>
                  <span className="font-bold text-slate-800 dark:text-white text-sm">{item.value}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-between">
                <span className="text-sm text-slate-500">Total</span>
                <span className="font-bold text-slate-800 dark:text-white">{total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professor Ratings */}
        <div className="card">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">Professor Ratings</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={profRatings} barSize={36}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Bar dataKey="rating" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Rating" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Activity */}
        <div className="card">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">Platform Activity (Weeks)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={PROGRESS_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Line type="monotone" dataKey="tasks" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} name="Tasks Done" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
