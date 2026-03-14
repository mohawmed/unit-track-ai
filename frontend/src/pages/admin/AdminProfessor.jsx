import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROFESSORS, MOCK_TEAMS } from '../../data/mockData';
import { ArrowLeft, Star, Users, ChevronRight } from 'lucide-react';

export default function AdminProfessor() {
  const { profId } = useParams();
  const prof = MOCK_PROFESSORS.find(p => p.id === profId) || MOCK_PROFESSORS[0];
  const teams = MOCK_TEAMS.filter(t => t.professorId === prof.id);

  return (
    <div className="space-y-6 animate-fade-in">
      <Link to="/admin" className="btn-secondary text-sm inline-flex"><ArrowLeft className="w-4 h-4" /> Back to Overview</Link>

      {/* Professor Card */}
      <div className="card flex items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow shadow-blue-200 dark:shadow-blue-900">
          {prof.name.split(' ').pop().charAt(0)}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{prof.name}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{prof.email}</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Supervisor: {prof.assistantName}</p>
          <div className="flex items-center gap-1 mt-2">
            {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= Math.round(prof.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}
            <span className="text-sm text-slate-500 ml-1">{prof.rating} rating</span>
          </div>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{teams.length}</p>
          <p className="text-slate-400 text-sm">Teams</p>
        </div>
      </div>

      {/* Teams */}
      <div>
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Teams Under {prof.name.split(' ').pop()}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {teams.map(team => (
            <div key={team.id} className="card hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: team.color + '20' }}>{team.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 dark:text-white truncate">{team.name}</p>
                  <p className="text-xs text-slate-400 truncate">{team.projectTitle}</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between mb-1"><span className="text-xs text-slate-500">Progress</span><span className="text-sm font-bold text-slate-700 dark:text-slate-200">{team.progress}%</span></div>
                <div className="progress-bar"><div className="h-full rounded-full" style={{ width: `${team.progress}%`, background: team.color }} /></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {team.students.slice(0,4).map(s => (
                    <div key={s.id} className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-white text-xs font-bold" style={{ background: team.color }}>{s.name.charAt(0)}</div>
                  ))}
                </div>
                <span className="text-xs text-slate-400"><Users className="w-3.5 h-3.5 inline mr-1" />{team.students.length} students</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
