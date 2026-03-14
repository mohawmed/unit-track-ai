import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService, teamService } from '../../services/api';
import { Star, Users, ChevronRight, BarChart2, Settings, Shield, Loader2 } from 'lucide-react';

const colorByIdx = ['from-blue-500 to-blue-600', 'from-purple-500 to-purple-600', 'from-emerald-500 to-emerald-600', 'from-orange-500 to-orange-600'];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsRes, teamsRes] = await Promise.all([
        adminService.getStats(),
        teamService.getAll()
      ]);
      setStats(statsRes.data);
      setTeams(teamsRes.data);
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="h-64 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2"><Shield className="w-6 h-6" /> Admin Dashboard</h2>
          <p className="text-orange-200">Full system overview — {stats?.total_teams} teams, {stats?.total_users} users</p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-4xl font-bold">{stats?.total_users}</p>
          <p className="text-orange-200 text-sm">Total Active Users</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: stats?.total_users, color: 'text-blue-600' },
          { label: 'Total Teams', value: stats?.total_teams, color: 'text-purple-600' },
          { label: 'Total Tasks', value: stats?.total_tasks, color: 'text-emerald-600' },
          { label: 'Avg Progress', value: `${Math.round(stats?.avg_progress || 0)}%`, color: 'text-amber-600' },
        ].map(s => (
          <div key={s.label} className={`card text-center`}>
            <div className={`text-2xl font-bold ${s.color} dark:text-white`}>{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Professors Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 dark:text-white">Active Supervisors</h3>
          <Link to="/admin/users" className="text-blue-600 hover:underline text-xs">View all users</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {/* We can fetch users later if needed, for now showing a summary from stats */}
           <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-center">
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{stats?.total_users}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Total Users</p>
           </div>
           <p className="col-span-full text-center text-xs text-slate-400 mt-2">All system members are managed through the Users module.</p>
        </div>
      </div>

      {/* Teams Overview */}
      <div className="card">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">All Teams Overview</h3>
        <div className="space-y-3">
          {teams.map(team => (
            <div key={team.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
              <div className="text-2xl flex-shrink-0">{team.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{team.name} — {team.project_title}</p>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{team.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="h-full rounded-full transition-all" style={{ width: `${team.progress}%`, background: team.color }} />
                </div>
              </div>
              <span className={`badge text-xs hidden sm:flex ${team.progress >= 70 ? 'badge-green' : team.progress >= 50 ? 'badge-yellow' : 'badge-red'}`}>
                {team.progress >= 70 ? 'On Track' : team.progress >= 50 ? 'Moderate' : 'Needs Help'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
