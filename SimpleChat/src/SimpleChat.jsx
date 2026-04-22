import React, { useState, useEffect, useRef } from 'react';
import './App.css';
function SimpleChat() {
  const [currentView, setCurrentView] = useState('home');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [usersOnline, setUsersOnline] = useState([]);
  const messagesEndRef = useRef(null);
  const HomePage = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      if (username && room) {
        setUser({ name: username, id: Date.now() });
        setCurrentRoom(room);
        setCurrentView('chat');
        setUsersOnline([username]);
        setMessages([{ id: 1, user: 'SYSTEM', message: `🔥 WELCOME TO ${room.toUpperCase()} 🔥`, timestamp: new Date(), type: 'system' }]);
      }
    };
    return (
      <div className="container cyber-glow-red pulse-red" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div className="text-center mb-12">
          <h1 className="text-7xl font-black neon-red mb-6 pulse-red drop-shadow-2xl">
            SIMPLECHAT+
          </h1>
          <p className="text-2xl neon-white mb-8 opacity-90 tracking-wider text-readable">
            CYBERPUNK COLLAB FOR BSIT WARRIORS
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xl font-bold neon-cyan mb-4 cyber-glow-cyan text-readable">
              ⚡ CYBER ID
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full cyber-glow-red text-lg text-readable placeholder-gray-300"
              placeholder="Enter your cyber handle..."
              required
            />
          </div>  
          <div>
            <label className="block text-xl font-bold neon-cyan mb-4 cyber-glow-cyan text-readable">
              🔴 CHATROOM
            </label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full cyber-glow-red text-lg text-readable placeholder-gray-300"
              placeholder="BSIT-3A / GROUP-ALPHA / HACKER-ZONE"
              required
            />
          </div>    
          <button
            type="submit"
            className="w-full btn-red cyber-glow-red text-xl font-black py-6 uppercase tracking-wider shadow-2xl text-white hover:text-white"
          >
            🚀 ENTER CYBERSPACE
          </button>
        </form>
        <div className="mt-16 pt-12 border-t-2 border-red-500/50 text-center">
          <p className="text-xl neon-white mb-6 text-readable opacity-90">QUICK ACCESS ROOMS</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['BSIT-3A', 'GROUP-ALPHA', 'CODE-WARZ', 'HACK-NIGHT'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRoom(r);
                  setUsername(`CYBER${Math.floor(Math.random() * 999)}`);
                  setTimeout(() => document.querySelector('form')?.requestSubmit(), 100);
                }}
                className="p-6 bg-black/70 hover:bg-red-500/30 border-2 border-red-500/70 hover:border-red-500 cyber-glow-red hover:scale-105 transition-all duration-300 font-bold uppercase text-lg text-white hover:text-white"
              >
                #{r}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  const ChatRoom = () => {
    const sendMessage = (e) => {
      e.preventDefault();
      if (newMessage.trim()) {
        const message = {
          id: Date.now(),
          user: user.name,
          message: newMessage,
          timestamp: new Date(),
          type: 'user'
        };
        setMessages(prev => [...prev, message]);
        setNewMessage('');
      }
    };
    const leaveRoom = () => {
      setCurrentRoom(null);
      setUser(null);
      setCurrentView('home');
      setMessages([]);
    };
    const MessageBubble = ({ message }) => (
      <div className={`flex ${message.type === 'system' ? 'justify-center' : message.user === user.name ? 'justify-end' : 'justify-start'} mb-6`}>
        {message.type !== 'system' && message.user !== user.name && (
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-lg font-black neon-cyan cyber-glow-red mr-4 shadow-2xl">
            {message.user.charAt(0)}
          </div>
        )}
        <div className={`max-w-md p-6 rounded-3xl shadow-2xl text-readable ${
          message.type === 'system' 
            ? 'bg-gradient-to-r from-black/80 to-gray-900/70 border-2 border-red-500/80 cyber-glow-red text-center' 
            : message.user === user.name 
            ? 'bg-gradient-to-br from-red-500/90 via-pink-500/90 to-red-600/90 cyber-glow-red shadow-red-500/50 text-white' 
            : 'bg-gradient-to-br from-gray-900/90 to-black/90 border-2 border-red-500/60 cyber-glow-red text-white'
        }`}>
          {message.type !== 'system' && (
            <div className="text-sm font-bold neon-cyan mb-3 uppercase tracking-wider opacity-95 text-readable">
              {message.user}
            </div>
          )}
          <div className="text-lg leading-relaxed text-readable">{message.message}</div>
          <div className="text-sm neon-white mt-4 font-mono opacity-90 text-readable">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-black/98 backdrop-blur-3xl border-b-2 border-red-500 p-8 cyber-glow-red pulse-red">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-black neon-red drop-shadow-2xl pulse-red text-readable">
                # {currentRoom.toUpperCase()}
              </h1>
              <div className="flex items-center gap-6 mt-2 text-xl neon-white text-readable">
                <div className="flex items-center gap-2 neon-cyan cyber-glow-cyan">
                  <div className="w-4 h-4 bg-red-500 rounded-full cyber-glow-red pulse-red"></div>
                  <span>{usersOnline.length} CYBERNAUTS ONLINE</span>
                </div>
              </div>
            </div>
            <button
              onClick={leaveRoom}
              className="px-8 py-4 bg-black/80 border-2 border-red-500/80 hover:border-red-500 cyber-glow-red neon-white font-black uppercase tracking-wider hover:scale-110 transition-all duration-300 shadow-2xl text-readable"
            >
              EXIT MATRIX
            </button>
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden">
          {/* Messages */}
          <div className="flex-1 flex flex-col p-8">
            <div className="flex-1 overflow-y-auto space-y-6 pr-6 pb-24" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <form onSubmit={sendMessage} className="mt-8 pt-8 border-t-2 border-red-500/60">
              <div className="flex gap-4 items-end">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="TRANSMIT MESSAGE... CTRL+ENTER"
                  className="flex-1 cyber-glow-red text-lg py-6 px-8 font-mono text-readable placeholder-gray-400"
                  onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && sendMessage(e)}
                />
                <button
                  type="submit"
                  className="w-20 h-20 btn-red cyber-glow-red shadow-2xl hover:scale-125 font-black text-2xl flex items-center justify-center text-white"
                >
                  ➤
                </button>
              </div>
              <div className="text-lg neon-cyan mt-4 opacity-90 font-mono text-readable">
                AUTO-ATTENDANCE ACTIVE | PROGRESS TRACKING ONLINE
              </div>
            </form>
          </div>
          {/* Sidebar */}
          <div className="w-96 border-l-2 border-red-500/60 bg-black/95 backdrop-blur-3xl p-8 cyber-glow-red overflow-y-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-black neon-cyan mb-6 cyber-glow-cyan uppercase tracking-wider text-readable">
                  👥 CYBERNAUTS
                </h3>
                <div className="space-y-4">
                  {usersOnline.map(u => (
                    <div key={u} className="flex items-center gap-4 p-5 bg-black/70 border-2 border-red-500/50 hover:border-red-500 cyber-glow-red hover:scale-105 transition-all duration-300 rounded-2xl shadow-2xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl font-black neon-cyan cyber-glow-red shadow-2xl">
                        {u.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-xl neon-white text-readable">{u}</div>
                        <div className="text-lg opacity-80 font-mono text-readable">ONLINE</div>
                      </div>
                      <div className="w-4 h-4 bg-red-500 rounded-full cyber-glow-red pulse-red"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black neon-red mb-6 cyber-glow-red uppercase tracking-wider text-readable">
                  📊 MISSION STATUS
                </h3>
                <div className="space-y-4">
                  {[
                    {name: 'FRONTEND MATRIX', perc: 85, color: 'from-red-500 to-pink-500'},
                    {name: 'BACKEND CORE', perc: 60, color: 'from-cyan-500 to-blue-500'},
                    {name: 'DATABASE VAULT', perc: 35, color: 'from-purple-500 to-violet-500'}
                  ].map((task, i) => (
                    <div key={i} className="p-6 bg-black/80 border-2 border-red-500/50 rounded-2xl cyber-glow-red hover:scale-105 transition-all">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-black text-xl neon-white text-readable">{task.name}</span>
                        <span className="font-black text-2xl neon-red text-readable">{task.perc}%</span>
                      </div>
                      <div className="bg-black/60 rounded-full h-5 border border-red-500/50 overflow-hidden">
                        <div 
                          className={`h-5 rounded-full cyber-glow-red transition-all duration-1000 ${task.color}`}
                          style={{width: `${task.perc}%`}}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className="app">
      <div className="app-content p-8">
        {currentView === 'home' ? <HomePage /> : <ChatRoom />}
      </div>
    </div>
  );
}
export default SimpleChat;