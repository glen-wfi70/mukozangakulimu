import React, { useState } from 'react';
import { teamMembers, TeamMember } from '../types/team';

interface LoginProps {
  onLogin: (username: string, password: string, user?: TeamMember) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple universal login - any username and password works
    if (username && password) {
      // Find a matching team member or use first one as default
      const selectedMember = teamMembers.find(m => m.name.toLowerCase() === username.toLowerCase()) || teamMembers[0];
      onLogin(username, password, selectedMember);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'rgba(245, 245, 245, 0.95)',
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '350px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333', fontSize: '1.8rem' }}>
          Mukozangakulimu Login
        </h2>
        
        {/* Simple Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontSize: '1rem', fontWeight: '500' }}>
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontSize: '1rem', fontWeight: '500' }}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2980b9';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3498db';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Login
          </button>
        </form>
        
        <p style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem', 
          color: '#666', 
          fontSize: '0.9rem' 
        }}>
          Any username and password will work for demo purposes
        </p>
      </div>
    </div>
  );
};

export default Login;
