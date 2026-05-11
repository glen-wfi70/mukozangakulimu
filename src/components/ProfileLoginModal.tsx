import React, { useState } from 'react';
import { TeamMember } from '../types/team';

interface ProfileLoginModalProps {
  teamMember: TeamMember;
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string, user: TeamMember) => void;
}

const ProfileLoginModal: React.FC<ProfileLoginModalProps> = ({ 
  teamMember, 
  isOpen, 
  onClose, 
  onLogin 
}) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      onLogin(teamMember.name.toLowerCase(), password, teamMember);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        width: '350px',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
            {teamMember.avatar}
          </div>
          <h2 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
            {teamMember.name}
          </h2>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            {teamMember.role}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#555', 
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              Password for {teamMember.name}:
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
              placeholder="Enter password"
              required
              autoFocus
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
            Login as {teamMember.name}
          </button>
        </form>
        
        <p style={{ 
          textAlign: 'center', 
          marginTop: '1rem', 
          color: '#666', 
          fontSize: '0.8rem' 
        }}>
          Any password will work for demo purposes
        </p>
      </div>
    </div>
  );
};

export default ProfileLoginModal;
