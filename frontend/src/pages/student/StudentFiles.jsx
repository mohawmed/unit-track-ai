import React, { useState } from 'react';
import { Upload, FileText, File, Trash2, Download, CheckCircle2 } from 'lucide-react';

const mockFiles = [
  { id: 1, name: 'Research_Analysis_v2.pdf', task: 'Research & Analysis', size: '2.4 MB', date: '2026-03-05', type: 'pdf', status: 'approved' },
  { id: 2, name: 'System_Architecture.docx', task: 'System Design', size: '1.1 MB', date: '2026-03-12', type: 'doc', status: 'approved' },
  { id: 3, name: 'UI_Mockups.zip', task: 'UI/UX Prototype', size: '8.7 MB', date: '2026-03-18', type: 'zip', status: 'pending' },
];

const typeIcon = { pdf: '📄', doc: '📝', zip: '📦', ppt: '📊', default: '📁' };

export default function StudentFiles() {
  const [files, setFiles] = useState(mockFiles);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    const newFiles = dropped.map((f, i) => ({
      id: Date.now() + i, name: f.name, task: 'General', size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0], type: f.name.split('.').pop(), status: 'pending'
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Upload Area */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
          dragging ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-600 hover:border-blue-300 hover:bg-slate-50 dark:hover:bg-slate-700/30'
        }`}
      >
        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Upload className="w-7 h-7 text-blue-500" />
        </div>
        <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">Drop files here or click to upload</p>
        <p className="text-sm text-slate-400">Supports PDF, DOC, DOCX, ZIP, PPT up to 50MB</p>
        <label className="mt-4 inline-block btn-primary text-sm cursor-pointer">
          <input type="file" className="hidden" multiple onChange={e => {
            const picked = Array.from(e.target.files).map((f, i) => ({
              id: Date.now() + i, name: f.name, task: 'General', size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
              date: new Date().toISOString().split('T')[0], type: f.name.split('.').pop(), status: 'pending'
            }));
            setFiles(prev => [...prev, ...picked]);
          }} />
          Browse Files
        </label>
      </div>

      {/* File List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 dark:text-white">Submitted Files</h3>
          <span className="badge badge-blue">{files.length} files</span>
        </div>
        <div className="space-y-2">
          {files.map(file => (
            <div key={file.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors group">
              <div className="text-2xl flex-shrink-0">{typeIcon[file.type] || typeIcon.default}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm truncate">{file.name}</p>
                <p className="text-xs text-slate-400">{file.task} · {file.size} · {file.date}</p>
              </div>
              <span className={`badge text-xs hidden sm:flex ${file.status === 'approved' ? 'badge-green' : 'badge-yellow'}`}>
                {file.status === 'approved' ? <><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</> : '⏳ Pending'}
              </span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500"><Download className="w-4 h-4" /></button>
                <button onClick={() => setFiles(f => f.filter(x => x.id !== file.id))} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
