import React, { useState } from 'react';
import { BarChart3, ArrowLeft, Plus } from 'lucide-react';

const ProgressDashboard = ({ room, onBack }) => {
  const [progress, setProgress] = useState(60);
  const tasks = [
    { name: 'UI Design', percent: 80, assignee: 'Alice' },
    { name: 'Backend', percent: 40, assignee: 'Bob' },
    { name: 'Testing', percent: 0, assignee: 'You' },
  ];

  const logContribution = () => {
    setProgress((p) => Math.min(100, p + 10));
    tasks[2].percent = Math.min(100, tasks[2].percent + 20); // Mock your task
  };

  return (
    <div className="h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl h-full overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <button onClick={onBack} className="flex items-center gap-2 mb-4 text-sm hover:opacity-80">
            <ArrowLeft size={20} /> Back to Chat
          </button>
          <div className="flex items-center gap-4">
            <BarChart3 size={32} />
            <div>
              <h2 className="text-2xl font-bold">{room} Tracker</h2>
              <div className="flex items-center gap-2 text-3xl font-black text-green-400">
                {progress}%
                <div className="w-24 bg-white/30 rounded-full h-6 p-0.5">
                  <div className="bg-green-400 h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <h3 className="font-semibold text-lg">Tasks</h3>
          {tasks.map((task, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">{task.name}</span>
                <span className="text-sm text-gray-500">({task.assignee})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${task.percent}%` }} />
              </div>
              <span className="text-sm font-medium block mt-1">{task.percent}%</span>
            </div>
          ))}
          <button
            onClick={logContribution}
            className="w-full bg-green-500 text-white p-4 rounded-xl font-semibold hover:bg-green-600 flex items-center justify-center gap-2 mt-6"
          >
            <Plus size={20} /> Log Daily Contribution
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;