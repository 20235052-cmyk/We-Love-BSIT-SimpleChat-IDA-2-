import React, { useState } from 'react';
import './App.css';
let HomePage;
try {
  HomePage = require('./components/HomePage').default;
} catch (e) {
  console.log('HomePage not found yet - create it first');
}
function SimpleChat() {
  const [currentView, setCurrentView] = useState('home');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [user, setUser] = useState(null);

  const joinRoom = (roomName, username) => {
    setUser({ name: username, id: Date.now() });
    setCurrentRoom(roomName);
    setCurrentView('chat');
  };
  const ChatPlaceholder = () => (
    <div className="container glow" style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center">
        <div className="text-6xl mb-4">🚀</div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
          Chat Room Coming Soon!
        </h2>
        <p className="text-xl opacity-75 mb-8">Create ChatRoom.jsx to unlock full cyberpunk chat</p>
        <button
          onClick={() => setCurrentView('home')}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-xl glow transition-all duration-300 hover:scale-105"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
  return (
    <div className="app">
      <div className="app-content">
        {currentView === 'home' ? (
          HomePage ? (
            <HomePage onJoinRoom={joinRoom} />
          ) : (
            <div className="container glow text-center">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
                SimpleChat+
              </h1>
              <p className="text-xl opacity-75 mb-8">Create src/components/HomePage.jsx to get started 🚀</p>
            </div>
          )
        ) : (
          <ChatPlaceholder />
        )}
      </div>
    </div>
  );
}
export default SimpleChat;