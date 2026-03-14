import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { userService } from '../../services/api';
import { Bell, CheckCheck, Trash2, Star, Clock, CheckCircle2, MessageSquare, Loader2 } from 'lucide-react';

const typeConfig = {
  feedback: { icon: MessageSquare, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  deadline: { icon: Clock, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  task: { icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' },
  score: { icon: Star, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
};

export default function StudentNotifications() {
  const { user, setNotifications } = useApp();
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchNotifs();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchNotifs = async () => {
    try {
      const res = await userService.getNotifications(user.id);
      setNotifs(res.data);
      setNotifications(res.data.filter(n => !n.read).length);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = () => {
    setNotifs(n => n.map(x => ({ ...x, read: true })));
    setNotifications(0);
    // TODO: Add API call for mark all read
  };

  const dismiss = (id) => {
    setNotifs(n => n.filter(x => x.id !== id));
    // TODO: Add API call for dismiss
  };

  if (loading) return (
    <div className="h-64 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-500" /> Notifications
          <span className="badge badge-blue">{notifs.filter(n => !n.read).length} new</span>
        </h2>
        <button onClick={markAllRead} className="btn-secondary text-sm">
          <CheckCheck className="w-4 h-4" /> Mark all read
        </button>
      </div>

      <div className="space-y-3">
        {notifs.map(notif => {
          const cfg = typeConfig[notif.type] || typeConfig.feedback;
          const Icon = cfg.icon;
          return (
            <div key={notif.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${!notif.read ? 'bg-white dark:bg-slate-800 border-blue-100 dark:border-blue-900 shadow-card' : 'bg-slate-50 dark:bg-slate-800/50 border-transparent'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">{notif.title}</p>
                  {!notif.read && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{notif.message}</p>
                <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
              </div>
              <button onClick={() => dismiss(notif.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-300 hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
        {notifs.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">All caught up!</p>
            <p className="text-sm">No notifications to show</p>
          </div>
        )}
      </div>
    </div>
  );
}
