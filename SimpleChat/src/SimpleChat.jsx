import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
function SimpleChat() {
  const [currentView, setCurrentView] = useState('home');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [usersOnline, setUsersOnline] = useState([]);
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);
  const HomePage = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const usernameRef = useRef(null);
    const roomRef = useRef(null);
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
          <h1 className="text-7xl font-black" style={{ 
            color: '#ff0080', 
            textShadow: '0 0 20px #ff0080, 0 0 40px #ff0080, 0 1px 0 #000',
            fontWeight: '900'
          }}>
            SIMPLECHAT+
          </h1>
          <p className="text-2xl" style={{ color: '#ffffff', textShadow: '0 1px 3px #000' }}>
            CYBERPUNK COLLAB FOR BSIT WARRIORS
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xl font-bold" style={{ color: '#00ffff', textShadow: '0 0 15px #00ffff' }}>
              ⚡ CYBER ID
            </label>
            <input
              ref={usernameRef}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full cyber-glow-red"
              style={{ 
                color: '#ffffff', 
                background: 'rgba(20,0,40,0.9)',
                border: '2px solid rgba(255,0,100,0.8)',
                fontSize: '18px'
              }}
              placeholder="Enter your cyber handle..."
              required
              autoComplete="off"
            />
          </div>          
          <div>
            <label className="block text-xl font-bold" style={{ color: '#00ffff', textShadow: '0 0 15px #00ffff' }}>
              🔴 CHATROOM
            </label>
            <input
              ref={roomRef}
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full cyber-glow-red"
              style={{ 
                color: '#ffffff', 
                background: 'rgba(20,0,40,0.9)',
                border: '2px solid rgba(255,0,100,0.8)',
                fontSize: '18px'
              }}
              placeholder="BSIT-3A / GROUP-ALPHA / HACKER-ZONE"
              required
              autoComplete="off"
            />
          </div>         
          <button
            type="submit"
            className="w-full btn-red cyber-glow-red text-xl font-black py-6 uppercase tracking-wider shadow-2xl"
            style={{ color: '#ffffff' }}
          >
            🚀 ENTER CYBERSPACE
          </button>
        </form>
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
    const handleMessageChange = useCallback((e) => {
      setNewMessage(e.target.value);
    }, []);
    const leaveRoom = () => {
      setCurrentRoom(null);
      setUser(null);
      setCurrentView('home');
      setMessages([]);
    };
    const MessageBubble = ({ message }) => (
      <div className={`flex ${message.type === 'system' ? 'justify-center' : message.user === user.name ? 'justify-end' : 'justify-start'} mb-6`}>
        {message.type !== 'system' && message.user !== user.name && (
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-lg font-black shadow-2xl mr-4" 
               style={{ 
                 boxShadow: '0 0 20px rgba(255,0,100,0.8)',
                 border: '2px solid rgba(255,0,100,0.5)'
               }}>
            <span style={{ color: '#00ffff', textShadow: '0 0 10px #00ffff' }}>{message.user.charAt(0)}</span>
          </div>
        )}
        <div className={`max-w-md p-6 rounded-3xl shadow-2xl ${message.user === user.name ? 'cyber-glow-red' : 'border-2 border-red-500/50 cyber-glow-red'}`} 
             style={{ 
               background: message.user === user.name ? 'linear-gradient(135deg, rgba(255,0,100,0.9), rgba(255,50,150,0.9))' : 'rgba(20,0,40,0.95)',
               color: '#ffffff',
               borderColor: 'rgba(255,0,100,0.6)'
             }}>
          {message.type !== 'system' && (
            <div className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#00ffff' }}>
              {message.user}
            </div>
          )}
          <div className="text-lg leading-relaxed" style={{ color: '#ffffff' }}>{message.message}</div>
          <div className="text-sm font-mono mt-4" style={{ color: '#cccccc' }}>
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
    return (
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-black/95 backdrop-blur-xl border-b-2 border-red-500/80 p-8 cyber-glow-red" style={{ boxShadow: '0 0 30px rgba(255,0,100,0.5)' }}>
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <h1 className="text-5xl font-black" style={{ 
                color: '#ff0080', 
                textShadow: '0 0 25px #ff0080, 0 0 50px #ff0080'
              }}>
                # {currentRoom?.toUpperCase()}
              </h1>
              <div className="flex items-center gap-6 mt-2 text-xl" style={{ color: '#ffffff' }}>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full cyber-glow-red" style={{ boxShadow: '0 0 15px #ff0080' }}></div>
                  <span>{usersOnline.length} CYBERNAUTS ONLINE</span>
                </div>
              </div>
            </div>
            <button
              onClick={leaveRoom}
              className="px-8 py-4 bg-black/80 border-2 border-red-500/80 hover:border-red-500 cyber-glow-red font-black uppercase tracking-wider hover:scale-110 transition-all duration-300 shadow-2xl"
              style={{ color: '#ffffff' }}
            >
              EXIT MATRIX
            </button>
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden">
          {/* Messages */}
          <div className="flex-1 flex flex-col p-8 overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-6 pr-6 pb-24" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* FIXED Input */}
            <form onSubmit={sendMessage} className="mt-8 pt-8 border-t-2 border-red-500/50">
              <div className="flex gap-4 items-end">
                <input
                  ref={messageInputRef}
                  type="text"
                  value={newMessage}
                  onChange={handleMessageChange}
                  placeholder="TRANSMIT MESSAGE... CTRL+ENTER"
                  className="flex-1 cyber-glow-red"
                  style={{ 
                    color: '#ffffff !important',
                    background: 'rgba(15,0,30,0.95)',
                    border: '2px solid rgba(255,0,100,0.9)',
                    fontSize: '18px',
                    padding: '20px 24px',
                    fontFamily: 'monospace'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      sendMessage(e);
                    }
                  }}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="w-20 h-20 btn-red cyber-glow-red shadow-2xl hover:scale-125 font-black text-2xl flex items-center justify-center"
                  style={{ 
                    color: '#ffffff',
                    background: 'linear-gradient(45deg, #ff0080, #ff4060)'
                  }}
                >
                  ➤
                </button>
              </div>
              <div className="text-lg" style={{ color: '#00ffff' }}>
                AUTO-ATTENDANCE ACTIVE | PROGRESS TRACKING ONLINE
              </div>
            </form>
          </div>
          {/* Sidebar */}
          <div className="w-96 border-l-2 border-red-500/60 bg-black/90 backdrop-blur-xl p-8 cyber-glow-red overflow-y-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-black" style={{ color: '#00ffff', textShadow: '0 0 20px #00ffff' }}>
                  👥 CYBERNAUTS
                </h3>
                <div className="space-y-4 mt-6">
                  {usersOnline.map(u => (
                    <div key={u} className="flex items-center gap-4 p-5 bg-black/70 border-2 border-red-500/50 hover:border-red-500 cyber-glow-red hover:scale-105 transition-all duration-300 rounded-2xl shadow-2xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl" 
                           style={{ boxShadow: '0 0 25px rgba(255,0,100,0.8)' }}>
                        <span style={{ color: '#00ffff', fontSize: '24px', fontWeight: 'bold' }}>{u.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-xl" style={{ color: '#ffffff' }}>{u}</div>
                        <div className="text-lg" style={{ color: '#cccccc' }}>ONLINE</div>
                      </div>
                      <div className="w-4 h-4 bg-red-500 rounded-full cyber-glow-red" style={{ boxShadow: '0 0 15px #ff0080' }}></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black" style={{ color: '#ff0080', textShadow: '0 0 20px #ff0080' }}>
                  📊 MISSION STATUS
                </h3>
                <div className="space-y-4 mt-6">
                  {[
                    {name: 'FRONTEND MATRIX', perc: 85, color: 'linear-gradient(90deg, #ff0080, #ff4080)'},
                    {name: 'BACKEND CORE', perc: 60, color: 'linear-gradient(90deg, #00ffff, #40c0ff)'},
                    {name: 'DATABASE VAULT', perc: 35, color: 'linear-gradient(90deg, #8b00ff, #c040ff)'}
                  ].map((task, i) => (
                    <div key={i} className="p-6 bg-black/80 border-2 border-red-500/50 rounded-2xl cyber-glow-red hover:scale-105 transition-all">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-black text-xl" style={{ color: '#ffffff' }}>{task.name}</span>
                        <span className="font-black text-2xl" style={{ color: '#ff0080' }}>{task.perc}%</span>
                      </div>
                      <div className="bg-black/60 rounded-full h-5 border border-red-500/50 overflow-hidden">
                        <div 
                          className="h-5 rounded-full cyber-glow-red transition-all duration-1000"
                          style={{ 
                            width: `${task.perc}%`,
                            background: task.color,
                            boxShadow: '0 0 15px currentColor'
                          }}
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