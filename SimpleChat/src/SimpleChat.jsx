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
        setMessages([{ id: 1, user: 'System', message: `Welcome to ${room}! 🚀`, timestamp: new Date(), type: 'system' }]);
      }
    };
    return (
      <div className="container glow" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            SimpleChat+
          </h1>
          <p className="text-xl text-cyan-300 mb-8 opacity-80">
            Real-time collaboration for BSIT students
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 focus:outline-none glow"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2">Room Name</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full p-4 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 focus:outline-none glow"
              placeholder="BSIT-3A, Group-Project"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 px-6 rounded-xl glow-red shadow-2xl transition-all duration-300 hover:scale-105"
          >
            🚀 Join Room
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
    const leaveRoom = () => {
      setCurrentRoom(null);
      setUser(null);
      setCurrentView('home');
      setMessages([]);
    };
    const MessageBubble = ({ message }) => (
      <div className={`flex ${message.type === 'system' ? 'justify-center' : message.user === user.name ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-xs lg:max-w-md p-4 rounded-2xl ${
          message.type === 'system' 
            ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-cyan-500/30 glow' 
            : message.user === user.name 
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white glow-red shadow-2xl' 
            : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white glow'
        }`}>
          {message.type !== 'system' && (
            <div className="text-xs opacity-80 mb-1 font-semibold">{message.user}</div>
          )}
          <div>{message.message}</div>
          <div className="text-xs opacity-60 mt-2">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
    return (
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl border-b border-cyan-500/30 p-6 glow sticky top-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                # {currentRoom}
              </h1>
              <div className="text-cyan-400 mt-1">3 online • Attendance tracked</div>
            </div>
            <button
              onClick={leaveRoom}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-bold rounded-xl glow-red hover:scale-105"
            >
              ← Leave
            </button>
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden p-6">
          {/* Messages */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-2 pr-4 pb-20" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <form onSubmit={sendMessage} className="mt-6 pt-6 border-t border-cyan-500/20">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type message... (Ctrl+Enter)"
                  className="flex-1 bg-gray-900/70 border border-cyan-500/40 rounded-2xl p-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30 glow"
                  onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && sendMessage(e)}
                />
                <button
                  type="submit"
                  className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl glow-red hover:scale-110 flex items-center justify-center"
                >
                  ➤
                </button>
              </div>
            </form>
          </div>
          {/* Sidebar */}
          <div className="w-80 border-l border-cyan-500/20 bg-gray-900/50 p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-4">👥 Online</h3>
                <div className="space-y-2">
                  {usersOnline.map(u => (
                    <div key={u} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl glow border border-green-500/20">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold glow">
                        {u.charAt(0)}
                      </div>
                      <span>{u}</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full glow ml-auto"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">📊 Progress</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-800/50 rounded-xl border border-purple-500/20">
                    <div className="font-semibold mb-1">Frontend UI</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full glow" style={{width: '75%'}}></div>
                    </div>
                    <div className="text-right text-xs text-purple-400 mt-1">75%</div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-xl border border-purple-500/20">
                    <div className="font-semibold mb-1">Backend API</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full glow" style={{width: '40%'}}></div>
                    </div>
                    <div className="text-right text-xs text-purple-400 mt-1">40%</div>
                  </div>
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
      <div className="app-content">
        {currentView === 'home' ? <HomePage /> : <ChatRoom />}
      </div>
    </div>
  );
}
export default SimpleChat;