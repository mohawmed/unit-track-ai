import React from 'react';
import { MOCK_TEAMS } from '../../data/mockData';
import { Trophy, Medal, Star, TrendingUp, Zap, Award } from 'lucide-react';

const rankConfig = [
  { rank: 1, icon: '🥇', color: 'from-amber-400 to-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800' },
  { rank: 2, icon: '🥈', color: 'from-slate-400 to-slate-600', bg: 'bg-slate-50 dark:bg-slate-700/30', border: 'border-slate-200 dark:border-slate-700' },
  { rank: 3, icon: '🥉', color: 'from-orange-400 to-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800' },
];

export default function StudentLeaderboard() {
  const team = MOCK_TEAMS.find(t => t.id === 'team-001');
  const sorted = [...(team?.students || [])].sort((a, b) => b.score - a.score);
  const currentStudentId = 'stu-001';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top 3 Podium */}
      <div className="card">
        <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-500" /> Team Alpha Leaderboard</h3>
        <div className="flex items-end justify-center gap-4 mb-8">
          {sorted.slice(0, 3).map((member, i) => {
            const actualRank = i === 0 ? 1 : i === 1 ? 2 : 3;
            const podiumHeight = actualRank === 1 ? 'h-28' : actualRank === 2 ? 'h-20' : 'h-16';
            const order = actualRank === 1 ? 'order-2' : actualRank === 2 ? 'order-1' : 'order-3';
            const cfg = rankConfig[actualRank - 1];
            return (
              <div key={member.id} className={`flex flex-col items-center ${order}`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-2 border-4 border-white dark:border-slate-800 shadow-lg">
                  {member.name.charAt(0)}
                </div>
                <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm text-center">{member.name.split(' ')[0]}</p>
                <p className="text-xs font-bold text-slate-500 mb-2">{member.score} pts</p>
                <div className={`${podiumHeight} w-20 bg-gradient-to-t ${cfg.color} rounded-t-xl flex items-start justify-center pt-2`}>
                  <span className="text-2xl">{cfg.icon}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Ranking List */}
      <div className="card">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Full Rankings</h3>
        <div className="space-y-3">
          {sorted.map((member, i) => {
            const isMe = member.id === currentStudentId;
            return (
              <div key={member.id} className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${isMe ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800' : 'hover:bg-slate-50 dark:hover:bg-slate-700/40'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-slate-300 text-slate-700' : i === 2 ? 'bg-orange-400 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>{i + 1}</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{member.name}</p>
                    {isMe && <span className="badge badge-blue text-xs">You</span>}
                  </div>
                  <div className="flex-1 mt-1.5">
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${member.score}%` }} /></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800 dark:text-white">{member.score}</p>
                  <p className="text-xs text-slate-400">{member.tasksCompleted}/{member.tasksTotal} tasks</p>
                </div>
                {i === 0 && <Star className="w-5 h-5 text-amber-400 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="card">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-purple-500" /> My Achievements</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: '🚀', label: 'Fast Starter', desc: 'Completed task in first week', unlocked: true },
            { icon: '🔥', label: 'On Fire', desc: '3 tasks in a row', unlocked: true },
            { icon: '💡', label: 'Creative', desc: 'Best rated submission', unlocked: false },
            { icon: '⚡', label: 'Sprint Master', desc: 'No delayed tasks', unlocked: false },
          ].map(b => (
            <div key={b.label} className={`p-3 rounded-xl text-center border ${b.unlocked ? 'border-purple-100 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20' : 'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 opacity-50'}`}>
              <div className="text-3xl mb-1">{b.icon}</div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{b.label}</p>
              <p className="text-xs text-slate-400">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
