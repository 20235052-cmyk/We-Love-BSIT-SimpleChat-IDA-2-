import React, { useState, useEffect, useRef } from 'react';

// --- STYLES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

    :root {
      --primary: #6366f1;
      --bg: #050508;
      --card: #0a0a0f;
      --border: rgba(255, 255, 255, 0.08);
      --text-dim: #94a3b8;
    }

    body { 
      margin: 0; 
      background: var(--bg); 
      color: #fff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      overflow: hidden;
    }

    .glass-ui {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
    }

    .terminal-font {
      font-family: 'JetBrains Mono', monospace;
    }

    .status-online {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { opacity: 0.5; }
      50% { opacity: 1; }
      100% { opacity: 0.5; }
    }

    .sidebar-btn {
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      width: 100%;
      border-radius: 8px;
      color: var(--text-dim);
      font-weight: 600;
      font-size: 13px;
    }

    .sidebar-btn:hover {
      background: rgba(255, 255, 255, 0.03);
      color: #fff;
    }

    .sidebar-btn.active {
      background: rgba(99, 102, 241, 0.1);
      color: var(--primary);
    }

    .btn-primary {
      background: var(--primary);
      color: #fff;
      font-weight: 700;
      padding: 10px 20px;
      border-radius: 8px;
      transition: opacity 0.2s;
    }

    .btn-primary:hover { opacity: 0.9; }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
  `}</style>
);

export default function App() {
  const [view, setView] = useState('auth'); 
  const [activeTab, setActiveTab] = useState('terminal'); 
  const [user, setUser] = useState({ name: '', section: '' });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.name && user.section) {
      setMessages([{
        id: 'init',
        sender: 'SYS',
        text: `Terminal Initialized. Welcome Operative ${user.name}. Connection stable in ${user.section}.`,
        isSys: true
      }]);
      setView('main');
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), sender: user.name, text: input, isSys: false };
    setMessages(prev => [...prev, newMsg]);

    // Command Simulation
    if (input.startsWith('/')) {
      const cmd = input.toLowerCase();
      let response = '';
      if (cmd === '/help') response = "Available: /status, /clear, /time, /about";
      else if (cmd === '/time') response = `Current Timestamp: ${new Date().toLocaleTimeString()}`;
      else if (cmd === '/about') response = "BSIT Student Terminal v4.0 - Developed by Group 7 Capstone Team.";
      else if (cmd === '/status') response = `User: ${user.name} | Section: ${user.section} | Role: Student Operative`;
      else if (cmd === '/clear') { setMessages([]); setInput(''); return; }
      else response = "Unknown command. Type /help.";

      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now()+1, sender: 'SYS', text: response, isSys: true }]);
      }, 500);
    }
    setInput('');
  };

  if (view === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#030305]">
        <GlobalStyles />
        <div className="w-full max-w-sm glass-ui p-10 text-center">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold tracking-tighter text-white">BSIT<span className="text-indigo-500">.</span>CORE</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Student Terminal Interface</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm focus:border-indigo-500 outline-none transition-all"
              placeholder="Student Name"
              onChange={e => setUser({...user, name: e.target.value})}
              required
            />
            <input 
              className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm focus:border-indigo-500 outline-none transition-all"
              placeholder="Section (e.g. IT3A)"
              onChange={e => setUser({...user, section: e.target.value})}
              required
            />
            <button className="w-full btn-primary text-xs uppercase tracking-widest mt-4">Establish Uplink</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#030305]">
      <GlobalStyles />
      
      {/* Header */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/20">
        <div className="flex items-center gap-4">
          <span className="text-white font-extrabold tracking-tighter">BSIT_CORE</span>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="status-online" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user.section} // {user.name}</span>
          </div>
        </div>
        <button onClick={() => setView('auth')} className="text-[10px] text-gray-500 hover:text-white font-bold uppercase tracking-widest">Logout</button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Simplified Sidebar */}
        <nav className="w-64 border-r border-white/5 p-4 flex flex-col gap-1">
          {[
            { id: 'terminal', label: 'Command Terminal', icon: '⚡' },
            { id: 'lounge', label: 'Peer Lounge', icon: '👥' },
            { id: 'vault', label: 'Resource Vault', icon: '📂' },
            { id: 'matrix', label: 'Grade Matrix', icon: '📊' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`sidebar-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}

          <div className="mt-auto p-4 glass-ui bg-indigo-500/5">
            <p className="text-[9px] font-black text-indigo-400 uppercase mb-2">Upcoming Deadline</p>
            <p className="text-xs font-bold text-white mb-1">DBMS Project v1</p>
            <p className="text-[10px] text-gray-500">Tomorrow @ 11:59PM</p>
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 flex flex-col bg-black/10">
          {activeTab === 'terminal' && (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 terminal-font scrollbar-subtle">
                {messages.map(m => (
                  <div key={m.id} className={`${m.isSys ? 'text-indigo-400/80' : 'text-gray-300'}`}>
                    <span className="font-bold opacity-50 mr-2">[{m.isSys ? 'SYSTEM' : m.sender}]</span>
                    <span className="text-sm">{m.text}</span>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
              <form onSubmit={handleSend} className="p-6 bg-black/20">
                <div className="glass-ui flex items-center px-4 overflow-hidden focus-within:border-indigo-500/50">
                  <span className="text-indigo-500 font-bold mr-3">{'>'}</span>
                  <input 
                    className="flex-1 bg-transparent py-4 text-sm outline-none terminal-font text-white"
                    placeholder="Type /help for commands..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    autoFocus
                  />
                </div>
              </form>
            </>
          )}

          {activeTab === 'lounge' && (
            <div className="p-10 max-w-5xl mx-auto w-full">
              <h2 className="text-2xl font-black text-white mb-8">Active Peers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Aldrin', status: 'Working on Java', online: true },
                  { name: 'Kyla', status: 'Studying Discrete Math', online: true },
                  { name: 'Justin', status: 'Offline', online: false },
                  { name: 'Sam', status: 'Coding CSS fixes', online: true },
                ].map((p, i) => (
                  <div key={i} className="glass-ui p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{p.name}</h4>
                      <p className="text-[11px] text-gray-500">{p.status}</p>
                    </div>
                    {p.online && <div className="status-online" />}
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 glass-ui bg-indigo-500/[0.02]">
                <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Node Broadcasts</h3>
                <div className="space-y-4">
                  <div className="text-[13px] text-gray-400"><span className="text-white font-bold">[10:00 AM]</span> Prof. Santos: The practical exam is moved to Friday.</div>
                  <div className="text-[13px] text-gray-400"><span className="text-white font-bold">[08:30 AM]</span> System: Maintenance scheduled for Saturday.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vault' && (
            <div className="p-10 max-w-5xl mx-auto w-full">
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-black text-white">Repository</h2>
                <span className="text-[10px] font-bold text-gray-500">6 Files Synchronized</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Lecture_Finals.pdf', size: '4.2 MB', category: 'Handout' },
                  { name: 'Lab_Activity_4.java', size: '12 KB', category: 'Source' },
                  { name: 'Project_Proposal.docx', size: '890 KB', category: 'Doc' },
                  { name: 'Reviewer_DBMS.pdf', size: '1.5 MB', category: 'Notes' },
                ].map((f, i) => (
                  <div key={i} className="glass-ui p-6 flex items-center justify-between group hover:border-indigo-500/40 cursor-pointer transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-xl">📄</div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-indigo-400">{f.name}</h4>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">{f.category} • {f.size}</p>
                      </div>
                    </div>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-all">Download</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'matrix' && (
            <div className="p-10 max-w-5xl mx-auto w-full">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-white">Performance Matrix</h2>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Overall GWA</p>
                  <p className="text-4xl font-black text-indigo-500">1.25</p>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { sub: 'Advanced Database', grade: 94 },
                  { sub: 'Human Computer Interaction', grade: 91 },
                  { sub: 'Networking 2', grade: 89 },
                  { sub: 'Integrative Programming', grade: 96 }
                ].map((s, i) => (
                  <div key={i} className="glass-ui p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-white">{s.sub}</span>
                      <span className="text-sm font-bold text-indigo-400">{s.grade}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${s.grade}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}