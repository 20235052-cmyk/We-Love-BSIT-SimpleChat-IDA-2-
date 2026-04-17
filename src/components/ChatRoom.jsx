import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Users, BarChart3, LogOut } from 'lucide-react';

const ChatRoom = ({ user, room, onLeave }) => {
  const [messages, setMessages] = useState([]); // EMPTY - NEW ROOM!
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState(1); // Just you
  const [progress, setProgress] = useState(0); // Start at 0%
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (message.trim()) {
      const newMsg = { 
        user, 
        message, 
        time: new Date().toLocaleTimeString().slice(0, 5) 
      };
      setMessages((prev) => [...prev, newMsg]);
      setMessage('');
      // Mock progress bump on first messages
      if (progress < 10) setProgress(10);
      if (Math.random() > 0.8) setProgress((p) => Math.min(100, p + 5));
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Welcome message effect
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        setMessages([{ 
          user: 'System', 
          message: `Welcome to ${room}! You're the first member. Attendance auto-tracks activity.`, 
          time: new Date().toLocaleTimeString().slice(0, 5),
          system: true
        }]);
      }, 500);
    }
  }, [room]);

  const MsgBubble = ({ msg }) => (
    <div className={`flex ${msg.user === user ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs p-3 rounded-2xl ${
        msg.user === user 
          ? 'bg-blue-500 text-white' 
          : msg.system 
            ? 'bg-gray-400 text-white' 
            : 'bg-gray-200'
      }`}>
        <div className={`font-semibold text-sm ${msg.system ? '' : ''}`}>
          {msg.user}
        </div>
        {msg.message && <div>{msg.message}</div>}
        <div className="text-xs opacity-75 mt-1">{msg.time}</div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">SimpleChat+ - {room}</h2>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full text-sm">
            <Users size={16} /> {attendance}/20
          </span>
          <button onClick={onLeave} className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
            <LogOut size={16} /> Leave
          </button>
        </div>
      </header>
      
      <div className="p-4 bg-white border-b mx-4 rounded-t-lg shadow-sm flex gap-4 text-sm items-center">
        <span className="flex items-center gap-1">
          <Users size={16} className="text-green-600" />
          Attendance: {attendance}/20 Active
        </span>
        <span className="flex items-center gap-1 ml-auto">
          <BarChart3 size={16} className="text-blue-600" />
          Progress: 
          <div className="ml-1 w-20 bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="bg-green-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          {progress}%
        </span>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-white mx-4 my-2 rounded-lg shadow-inner space-y-3 flex flex-col justify-center items-center text-center px-8">
        {messages.length === 0 ? (
          <div className="text-gray-500 space-y-2">
            <MessageCircle size={64} className="mx-auto opacity-40" />
            <h3 className="text-xl font-semibold text-gray-700">Welcome to a new room!</h3>
            <p className="text-gray-500">Be the first to send a message. Attendance tracks your activity automatically.</p>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <MsgBubble key={i} msg={msg} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      <div className="p-4 bg-white border-t mx-4 mb-4 flex gap-2">
        <input
          className="flex-1 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your first message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={!message.trim()}
          className="bg-blue-500 text-white p-4 rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MessageCircle size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;