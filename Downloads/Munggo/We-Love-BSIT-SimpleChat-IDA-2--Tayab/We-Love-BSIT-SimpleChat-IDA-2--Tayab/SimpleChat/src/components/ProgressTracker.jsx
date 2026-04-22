import React, { useState } from 'react';
const ProgressTracker = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Frontend UI', completed: true, user: 'John', progress: 100 },
    { id: 2, title: 'Backend API', completed: false, user: 'Jane', progress: 60 },
    { id: 3, title: 'Database Setup', completed: false, user: 'You', progress: 25 },
  ]);
  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed, progress: task.completed ? 0 : 100 } : task
    ));
  };
  const overallProgress = Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length);
  return (
    <div className="space-y-4 mt-8 pt-6 border-t border-cyan-500/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center glow">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Progress
          </h3>
          <div className="text-sm opacity-75">Project Tasks</div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="bg-gray-800/50 rounded-full h-3 border border-purple-500/30 overflow-hidden">
        <div 
          className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 glow rounded-full transition-all duration-700" 
          style={{ width: `${overallProgress}%` }}
        />
      </div>
      <div className="text-sm font-bold text-purple-400">{overallProgress}% Complete</div>
      {/* Tasks List */}
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {tasks.map((task) => (
          <div key={task.id} className="p-3 bg-gray-800/50 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-sm flex items-center justify-center transition-all duration-300 ${
                    task.completed 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 glow shadow-lg' 
                      : 'border-2 border-gray-600/50 hover:border-purple-500/50'
                  }`}
                >
                  {task.completed && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <div>
                  <div className={`font-semibold ${task.completed ? 'text-green-400 line-through opacity-75' : 'text-white'}`}>
                    {task.title}
                  </div>
                  <div className="text-xs opacity-75">{task.user}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-purple-400">{task.progress}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProgressTracker;