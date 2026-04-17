import React, { useState } from "react";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import ProgressDashboard from "./components/ProgressDashboard";
import AttendanceDashboard from "./components/AttendanceDashboard";

function App() {
  const [screen, setScreen] = useState('login');
  const [data, setData] = useState({ user: '', room: '' });

  const join = (d) => {
    setData(d);
    setScreen('chat');
  };

  if (screen === 'login') return <Login onJoin={join} />;
  if (screen === 'progress') return <ProgressDashboard room={data.room} onBack={() => setScreen('chat')} />;
  if (screen === 'attendance') return <AttendanceDashboard room={data.room} onBack={() => setScreen('chat')} />;
  
  return (
    <div style={{position: 'relative'}}>
      <ChatRoom user={data.user} room={data.room} onLeave={() => setScreen('login')} />
      
      {/* FAB Buttons - Fixed Position */}
      <button 
        onClick={() => setScreen('progress')}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          background: '#3b82f6', color: 'white', width: '60px', height: '60px',
          borderRadius: '50%', border: 'none', fontSize: '1.5rem', cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(59,130,246,0.4)', zIndex: 1000
        }}
        title="Project Progress"
      >
        📊
      </button>
      <button 
        onClick={() => setScreen('attendance')}
        style={{
          position: 'fixed', bottom: '2rem', right: '10rem',
          background: '#10b981', color: 'white', width: '60px', height: '60px',
          borderRadius: '50%', border: 'none', fontSize: '1.5rem', cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(16,185,129,0.4)', zIndex: 1000
        }}
        title="Attendance"
      >
        👥
      </button>
    </div>
  );
}

export default App;