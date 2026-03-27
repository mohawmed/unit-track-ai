import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { teamService } from '../../services/api';
import StudentChat from '../student/StudentChat';
import { Loader2, Users } from 'lucide-react';

export default function AssistantChat() {
  const { user } = useApp();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await teamService.getAll();
      // Assistants usually monitor all teams or specific ones. Showing all for now.
      setTeams(res.data);
      if (res.data.length > 0) setSelectedTeam(res.data[0]);
    } catch (err) {
      console.error("Failed to fetch assistant teams", err);
      const mockTeams = [
        { id: 'T201', name: 'Gamma Project', project_title: 'Mobile App' },
        { id: 'T202', name: 'Delta Project', project_title: 'Data Science' }
      ];
      setTeams(mockTeams);
      setSelectedTeam(mockTeams[0]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-full gap-4 animate-fade-in">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex flex-col gap-2">
        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-2 px-1">
          <Users className="w-5 h-5 text-emerald-500" /> All Teams
        </h3>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-hide">
          {teams.map(team => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                selectedTeam?.id === team.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700'
              }`}
            >
              <p className="font-semibold text-sm truncate">{team.name}</p>
              <p className={`text-xs truncate mt-0.5 ${selectedTeam?.id === team.id ? 'text-emerald-200' : 'text-slate-400'}`}>
                {team.project_title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 min-w-0 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
        {selectedTeam ? (
          <div className="h-full relative [&>div]:h-full [&>div]:p-4 [&>div]:mb-0 [&>div>div:first-child]:shadow-none [&>div>div:first-child]:border-b [&>div>div:first-child]:border-slate-100 [&>div>div:first-child]:dark:border-slate-700 [&>div>div:first-child]:rounded-none [&>div>div:first-child]:pb-4">
            <StudentChat teamId={selectedTeam.id} teamName={`${selectedTeam.name} - ${selectedTeam.project_title}`} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Users className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm">Select a team to view chat</p>
          </div>
        )}
      </div>
    </div>
  );
}
