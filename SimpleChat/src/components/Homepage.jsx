import React, { useState } from 'react';
const HomePage = ({ onJoinRoom }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && room) {
      onJoinRoom(room, username);
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
      {!showForm ? (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl glow transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <span className="block group-hover:-translate-y-1 transition-transform">🚀 Join Chat Room</span>
          </button>
          <button className="bg-gradient-to-r from-gray-700 to-gray-600 text-white font-bold py-4 px-6 rounded-xl border-2 border-cyan-500/50 hover:bg-gray-600/50 glow transition-all duration-300">
            📊 View Analytics
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 focus:outline-none glow transition-all duration-300"
              placeholder="Enter your username"
              required
            />
          </div>          
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2">
              Room Name
            </label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full p-4 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 focus:outline-none glow transition-all duration-300"
              placeholder="e.g., BSIT-3A, Group-Project-Alpha"
              required
            />
          </div>          
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 px-6 rounded-xl glow-red transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              🚀 Join Room
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 bg-gray-700/50 hover:bg-gray-600/50 border-2 border-gray-500/50 text-white font-bold py-4 rounded-xl glow transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="mt-12 pt-8 border-t border-cyan-500/30">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">Quick Rooms</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {['BSIT-3A', 'Group-Project-Alpha', 'Coding-Session', 'Thesis-Review'].map((roomName) => (
            <button
              key={roomName}
              onClick={() => {
                setRoom(roomName);
                setUsername(`Student-${Math.floor(Math.random() * 100)}`);
                setTimeout(() => document.querySelector('form')?.requestSubmit(), 100);
              }}
              className="p-4 bg-gray-900/50 hover:bg-gray-800/50 border border-cyan-500/30 rounded-lg transition-all duration-300 hover:glow hover:scale-105 text-left group"
            >
              <div className="font-bold text-cyan-400 group-hover:text-cyan-300">{roomName}</div>
              <div className="text-sm opacity-75">Click to join instantly</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;