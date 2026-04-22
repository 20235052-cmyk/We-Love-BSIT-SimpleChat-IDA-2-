import React, { useState, useEffect, useRef } from 'react';
import AttendanceTracker from './AttendanceTracker';
import ProgressTracker from './ProgressTracker';
const ChatRoom = ({ room, user, onLeaveRoom, attendance, progress }) => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'System', message: `Welcome to ${room}! 🚀`, timestamp: new Date(), type: 'system' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [usersOnline, setUsersOnline] = useState([user]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
  const MessageBubble = ({ message }) => (
    <div className={`flex ${message.type === 'system' ? 'justify-center' : message.user === user.name ? 'justify-end' : 'justify-start'} mb-4`}>
      {message.type !== 'system' && message.user !== user.name && (
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold glow mr-3">
          {message.user.charAt(0)}
        </div>
      )}
      <div className={`max-w-xs lg:max-w-md p-4 rounded-2xl ${message.type === 'system' 
        ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-cyan-500/30 glow' 
        : message.user === user.name 
        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white glow-red shadow-2xl' 
        : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white glow'
      }`}>
        {message.type !== 'system' && (
          <div className="text-xs opacity-80 mb-1 font-semibold">
            {message.user}
          </div>
        )}
        <div>{message.message}</div>
        <div className="text-xs opacity-60 mt-2">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl border-b border-cyan-500/30 p-6 glow sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              # {room}
            </h1>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <div className="w-3 h-3 bg-green-400 rounded-full glow"></div>
                <span>{usersOnline.length} online</span>
              </div>
              <div className="text-sm opacity-75">BSIT Collaboration Hub</div>
            </div>
          </div>
          <button
            onClick={onLeaveRoom}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-bold rounded-xl glow-red transition-all duration-300 hover:scale-105 shadow-xl"
          >
            ← Leave
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-2 pr-4" style={{ scrollbarWidth: 'thin' }}>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Message Input */}
          <form onSubmit={sendMessage} className="mt-6 pt-6 border-t border-cyan-500/20">
            <div className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message... (Ctrl+Enter)"
                className="flex-1 bg-gray-900/70 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30 focus:outline-none glow transition-all duration-300"
                onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && sendMessage(e)}
              />
              <button
                type="submit"
                className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl glow-red shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="text-xs text-cyan-400 mt-2 opacity-75">
              Ctrl+Enter to send • Attendance auto-tracked • Progress logging available
            </div>
          </form>
        </div>
        {/* Sidebar - Trackers */}
        <div className="w-80 border-l border-cyan-500/20 bg-gray-900/50 backdrop-blur-xl p-6 overflow-y-auto">
          <AttendanceTracker users={usersOnline} />
          <ProgressTracker />
        </div>
      </div>
    </div>
  );
};
export default ChatRoom;