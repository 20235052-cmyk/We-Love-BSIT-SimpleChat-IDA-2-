import React, { useState } from 'react';
import { Users, CheckCircle, Clock, ArrowLeft } from 'lucide-react';

const AttendanceDashboard = ({ room, onBack }) => {
  const [attendanceList, setAttendanceList] = useState([
    { name: 'You', status: 'Present', time: new Date().toLocaleTimeString().slice(0, 5), duration: 'Active' }
  ]);
  const [totalPresent, setTotalPresent] = useState(1);
  const [totalExpected, setTotalExpected] = useState(20);

  const markPresent = (name) => {
    setAttendanceList(prev => 
      prev.map(person => 
        person.name === name 
          ? { ...person, status: 'Present', time: new Date().toLocaleTimeString().slice(0, 5) }
          : person
      )
    );
    setTotalPresent(prev => Math.min(prev + 1, totalExpected));
  };

  const addMockStudent = () => {
    const names = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    setAttendanceList(prev => [...prev, {
      name: `${randomName}`,
      status: 'Pending',
      time: '',
      duration: 'Joined now'
    }]);
  };

  return (
    <div style={{height: '100vh', background: '#f3f4f6', padding: '1rem'}}>
      <div style={{background: 'white', borderRadius: '1rem', boxShadow: '0 25px 50px rgba(0,0,0,0.1)', height: '100%', overflow: 'hidden'}}>
        {/* Header */}
        <div style={{
          padding: '1.5rem', borderBottom: '1px solid #e5e7eb', 
          background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white'
        }}>
          <button onClick={onBack} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', 
            marginBottom: '1rem', color: 'white', background: 'none', border: 'none', 
            fontSize: '0.875rem', cursor: 'pointer', opacity: 0.9
          }}>
            <ArrowLeft style={{width: 20, height: 20}} /> Back to Chat
          </button>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <Users style={{width: 32, height: 32}} />
            <div>
              <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem'}}>{room} Attendance</h2>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#d1fae5'}}>
                <span>{totalPresent}/{totalExpected}</span>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem'}}>
                  <CheckCircle style={{width: 16, height: 16}} />
                  {((totalPresent / totalExpected) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{padding: '1.5rem', overflowY: 'auto', flex: 1, height: 'calc(100% - 120px)'}}>
          <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem'}}>
            <button
              onClick={addMockStudent}
              style={{
                flex: 1, background: '#4f46e5', color: 'white', padding: '0.75rem', 
                borderRadius: '0.75rem', fontWeight: '600', border: 'none', 
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
              }}
            >
              <Users style={{width: 18, height: 18}} /> Add Student
            </button>
            <button
              onClick={() => setTotalExpected(totalExpected + 5)}
              style={{
                padding: '0.75rem 1rem', background: '#6b7280', color: 'white', 
                borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem'
              }}
            >
              +5 Expected
            </button>
          </div>

          {attendanceList.length === 0 ? (
            <div style={{textAlign: 'center', padding: '3rem 1rem', color: '#6b7280'}}>
              <Users style={{width: 64, height: 64, margin: '0 auto 1rem', opacity: 0.4}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem'}}>No attendance records</h3>
              <p>Click "Add Student" to simulate class join</p>
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              {attendanceList.map((person, i) => (
                <div key={i} style={{
                  padding: '1rem', background: 'white', border: '1px solid #e5e7eb', 
                  borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: person.status === 'Present' ? '#10b981' : '#d1d5db'
                  }} />
                  <div style={{flex: 1, minWidth: 0}}>
                    <div style={{fontWeight: '500', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                      {person.name}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem'}}>
                      <span style={{
                        padding: '0.125rem 0.5rem', borderRadius: '9999px', fontWeight: '500', fontSize: '0.75rem',
                        background: person.status === 'Present' ? '#d1fae5' : '#fef3c7',
                        color: person.status === 'Present' ? '#065f46' : '#92400e'
                      }}>
                        {person.status}
                      </span>
                      {person.time && <Clock style={{width: 14, height: 14}} />}
                      <span>{person.time || 'Pending...'}</span>
                    </div>
                  </div>
                  {person.status === 'Pending' && (
                    <button
                      onClick={() => markPresent(person.name)}
                      style={{
                        background: '#10b981', color: 'white', padding: '0.5rem 1rem', 
                        borderRadius: '0.5rem', fontWeight: '600', border: 'none', 
                        cursor: 'pointer', fontSize: '0.875rem'
                      }}
                    >
                      Mark Present
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;