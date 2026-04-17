import React, { useState } from 'react';
import { LogInIcon, SearchIcon } from 'lucide-react'; // Fallback icons

const Login = ({ onJoin }) => {
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const mockRooms = ['BSIT 301 Classroom', 'Group Proj: WebApp', 'CyberSec Lab'];

  const handleJoin = (selectedRoom = room) => {
    if (user && selectedRoom) {
      onJoin({ user, room: selectedRoom });
    }
  };

  return (
    <div style={{
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', 
      padding: '1rem'
    }}>
      <div style={{
        background: 'white', 
        padding: '2rem', 
        borderRadius: '1rem', 
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)', 
        maxWidth: '400px', 
        width: '100%'
      }}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <LogInIcon style={{width: 48, height: 48, margin: '0 auto 1rem', color: '#3b82f6'}} />
          <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem'}}>SimpleChat+</h1>
          <p style={{color: '#6b7280', margin: 0}}>Join class or project room</p>
        </div>
        <input
          style={{
            width: '100%', padding: '1rem', border: '1px solid #d1d5db', borderRadius: '0.75rem', 
            marginBottom: '1rem', fontSize: '1rem', boxSizing: 'border-box'
          }}
          placeholder="Your Name (e.g., John)"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <div style={{position: 'relative', marginBottom: '1rem'}}>
          <input
            style={{
              width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid #d1d5db', 
              borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box'
            }}
            placeholder="Search Rooms..."
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <SearchIcon style={{
            position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', 
            width: 20, height: 20, color: '#9ca3af'
          }} />
        </div>
        <div style={{maxHeight: '10rem', overflowY: 'auto', marginBottom: '1.5rem'}}>
          {mockRooms
            .filter((r) => r.toLowerCase().includes(room.toLowerCase()))
            .map((r, i) => (
              <button
                key={i}
                onClick={() => handleJoin(r)}
                style={{
                  width: '100%', padding: '0.75rem', background: '#f9fafb', 
                  border: '1px solid #e5e7eb', borderRadius: '0.75rem', 
                  textAlign: 'left', marginBottom: '0.5rem', cursor: 'pointer',
                  fontSize: '0.95rem'
                }}
              >
                {r}
              </button>
            ))}
        </div>
        <button
          onClick={() => handleJoin()}
          disabled={!user || !room}
          style={{
            width: '100%', background: '#3b82f6', color: 'white', padding: '1rem', 
            borderRadius: '0.75rem', fontWeight: '600', fontSize: '1rem', border: 'none',
            cursor: user && room ? 'pointer' : 'not-allowed', opacity: user && room ? 1 : 0.6
          }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Login;