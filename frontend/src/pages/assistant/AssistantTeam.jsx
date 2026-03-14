import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_TEAMS, MOCK_TASKS } from '../../data/mockData';
import { ArrowLeft, ThumbsUp, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export default function AssistantTeam() {
  const { teamId } = useParams();
  const team = MOCK_TEAMS.find(t => t.id === teamId) || MOCK_TEAMS[0];
  const tasks = MOCK_TASKS.filter(t => t.teamId === team.id);
  const [notes, setNotes] = useState({});

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link to="/assistant" className="btn-secondary text-sm"><ArrowLeft className="w-4 h-4" /> Back</Link>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{team.emoji} {team.name} — Monitoring</h2>
          <p className="text-sm text-slate-500">{team.projectTitle}</p>
        </div>
      </div>

      {/* Students Progress */}
      <div className="card">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Student Progress</h3>
        <div className="space-y-4">
          {team.students.map(student => (
            <div key={student.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                {student.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-700 dark:text-slate-200">{student.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 progress-bar"><div className="progress-fill" style={{ width: `${student.score}%` }} /></div>
                  <span className="text-xs text-slate-500">{student.tasksCompleted}/{student.tasksTotal}</span>
                </div>
              </div>
              <span className="font-bold text-slate-700 dark:text-white">{student.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Task Review - tasks in_progress need assistant review */}
      <div className="card">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Tasks Awaiting Review</h3>
        <div className="space-y-3">
          {tasks.filter(t => t.status === 'in_progress').map(task => (
            <div key={task.id} className="border border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">{task.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Due: {task.deadline}</p>
                </div>
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
              </div>
              <input
                placeholder="Add your review notes..."
                value={notes[task.id] || ''}
                onChange={e => setNotes(n => ({ ...n, [task.id]: e.target.value }))}
                className="input text-sm mb-2"
              />
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" /> Approve for Professor
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> Request Changes
                </button>
              </div>
            </div>
          ))}
          {tasks.filter(t => t.status === 'in_progress').length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No tasks awaiting review</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
