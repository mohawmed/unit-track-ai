import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { professorService } from '../../services/api';
import { Users, TrendingUp, CheckCircle2, Clock, ChevronRight, Loader2 } from 'lucide-react';

export default function ProfessorDashboard() {
  const { user } = useApp();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchTeams();
    }
  }, [user]);

  const fetchTeams = async () => {
    try {
      const res = await professorService.getTeams(user.id);
      // Map API response to UI model if fields differ
      const mappedTeams = res.data.map(t => ({
        id: t.id,
        name: t.name,
        projectTitle: t.project_title,
        progress: t.progress,
        color: t.color,
        emoji: t.emoji,
        studentsCount: t.students?.length || 0
      }));
      setTeams(mappedTeams);
    } catch (err) {
      console.error("Failed to fetch professor teams", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="h-64 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
        <p className="text-purple-100 text-sm mb-1">Welcome Professor</p>
        <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
        <p className="text-purple-200">You are supervising {teams.length} teams this semester.</p>
        <div className="flex gap-4 mt-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">📊 {teams.length} Active Teams</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">⭐ Rating: {user?.rating || 4.8}/5</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Students', value: teams.reduce((s, t) => s + (t.studentsCount || 0), 0), color: 'bg-purple-500' },
          { icon: CheckCircle2, label: 'Tasks Created', value: 18, color: 'bg-emerald-500' },
          { icon: Clock, label: 'Avg Progress', value: `${Math.round(teams.reduce((s, t) => s + t.progress, 0) / (teams.length || 1))}%`, color: 'bg-amber-500' },
          { icon: TrendingUp, label: 'Active Status', value: 'Healthy', color: 'bg-blue-500' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-800 dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Assigned Teams</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {teams.map(team => (
            <Link key={team.id} to={`/professor/team/${team.id}`}
              className="card hover:shadow-card-hover transition-all group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: team.color + '20' }}>
                  {team.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 dark:text-white truncate">{team.name}</p>
                  <p className="text-xs text-slate-400 truncate">{team.projectTitle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Progress</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{team.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${team.progress}%`, background: team.color }} />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-700 mt-2">
                <span className="text-xs text-slate-400 font-medium">Click to manage tasks</span>
                <span className="text-xs text-slate-400">{team.studentsCount} Students</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
