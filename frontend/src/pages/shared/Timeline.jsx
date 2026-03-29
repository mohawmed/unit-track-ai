import React, { useState, useEffect } from 'react';
import { teamService } from '../../services/api';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, Flag, Users, Briefcase, Plus, Loader2, ChevronRight } from 'lucide-react';

export default function Timeline({ teamId: propTeamId }) {
  const { user } = useApp();
  const activeTeamId = propTeamId || user?.teamId;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTeamId) fetchTimeline();
  }, [activeTeamId]);

  const fetchTimeline = async () => {
    try {
      const res = await teamService.getTimeline(activeTeamId);
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch timeline", err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'deadline': return <Clock className="w-4 h-4" />;
      case 'milestone': return <Flag className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      default: return <Briefcase className="w-4 h-4" />;
    }
  };

  if (loading) return (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Calendar className="w-7 h-7 text-blue-600" /> الجدول الزمني للمشروع
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">تتبع المواعيد النهائية وأهم محطات العمل.</p>
        </div>
        
        {(user.role === 'professor' || user.role === 'admin') && (
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 font-bold text-sm">
            <Plus className="w-4 h-4" /> إضافة حدث
          </button>
        )}
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
        {items.map((item, idx) => (
          <div key={item.id} className="relative flex items-start gap-8 group">
            {/* Timeline Dot */}
            <div className={`absolute left-0 mt-1.5 w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center z-10 shadow-md transition-transform group-hover:scale-110`} style={{ backgroundColor: item.color, color: '#fff' }}>
              {getTypeIcon(item.type)}
            </div>

            {/* Content Card */}
            <div className="ml-12 flex-1 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:border-blue-200 dark:hover:border-blue-900/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 flex items-center gap-1.5 w-fit">
                  {item.type}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <Calendar className="w-3.5 h-3.5" /> {new Date(item.date).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description || 'لا يوجد وصف متاح.'}
              </p>

              {item.status && (
                <div className="mt-4 flex items-center gap-2">
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {item.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ'}
                  </div>
                </div>
              )}
            </div>
            
            <div className="hidden md:flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>لا توجد أحداث مجدولة بعد لهذا الفريق.</p>
          </div>
        )}
      </div>
    </div>
  );
}
