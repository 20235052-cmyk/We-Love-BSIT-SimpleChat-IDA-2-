import React, { useState, useEffect, useRef } from 'react';
import './App.css'; 
import ChatRoom from './components/ChatRoom';
import HomePage from './components/HomePage';
import AttendanceTracker from './components/AttendanceTracker';
import ProgressTracker from './components/ProgressTracker';
function SimpleChat() {  
  const [currentView, setCurrentView] = useState('home');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [progress, setProgress] = useState([]);
  const joinRoom = (roomName, username) => {
    setUser({ name: username, id: Date.now() });
    setCurrentRoom(roomName);
    setCurrentView('chat');
  };
  const leaveRoom = () => {
    setCurrentRoom(null);
    setUser(null);
    setCurrentView('home');
  };
  return (
    <div className="app">
      <div className="app-content">
        {currentView === 'home' && (
          <HomePage onJoinRoom={joinRoom} />
        )}  
        {currentView === 'chat' && currentRoom && (
          <ChatRoom
            room={currentRoom}
            user={user}
            onLeaveRoom={leaveRoom}
            attendance={attendance}
            progress={progress}
          />
        )}
      </div>
    </div>
  );
}
export default SimpleChat;