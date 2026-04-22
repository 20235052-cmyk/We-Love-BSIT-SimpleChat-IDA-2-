import React, { useState, useEffect } from 'react';

const AttendanceTracker = ({ users }) => {
  const [attendanceLog, setAttendanceLog] = useState([]);
  useEffect(() => {
    const now = new Date();
    const newEntry = {
      id: Date.now(),
      users: users.map(u => u.name),
      timestamp: now,
      duration: 'Active'
    };
    setAttendanceLog(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10
  }, [users]);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center glow">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Attendance
          </h3>
          <div className="text-sm opacity-75">{users.length} active</div>
        </div>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {users.map((user, idx) => (
          <div key={user.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl glow border border-green-500/20">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-sm glow">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white truncate">{user.name}</div>
              <div className="text-xs opacity-75">Joined now • Active</div>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full glow"></div>
          </div>
        ))}
      </div>
      {attendanceLog.length > 0 && (
        <div className="text-xs text-cyan-400 p-3 bg-gray-800/30 rounded-xl border border-cyan-500/20">
          📊 {attendanceLog[0].users.length} users marked present at {attendanceLog[0].timestamp.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};
export default AttendanceTracker;