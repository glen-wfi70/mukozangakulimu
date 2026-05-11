import React from 'react';
import { teamMembers, TeamMember } from '../types/team';

interface TeamNavbarProps {
  currentUser?: TeamMember | null;
  onProfileClick?: (member: TeamMember) => void;
}

const TeamNavbar: React.FC<TeamNavbarProps> = ({ currentUser, onProfileClick }) => {
  const radius = 120;
  const centerX = 150;
  const centerY = 150;

  const calculatePosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div style={{
      position: 'relative',
      width: '300px',
      height: '300px',
      margin: '0 auto'
    }}>
      {/* Center circle with current user or logo */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#3498db',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)',
        zIndex: 10
      }}>
        {currentUser ? currentUser.avatar : '👥'}
      </div>

      {/* Team members in circular layout */}
      {teamMembers.map((member, index) => {
        const position = calculatePosition(index, teamMembers.length);
        return (
          <div
            key={member.id}
            onClick={() => onProfileClick && onProfileClick(member)}
            style={{
              position: 'absolute',
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: 'translate(-50%, -50%)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: currentUser?.id === member.id ? '#e74c3c' : '#f8f9fa',
              border: currentUser?.id === member.id ? '3px solid #c0392b' : '2px solid #ddd',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: onProfileClick ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
              boxShadow: currentUser?.id === member.id 
                ? '0 4px 12px rgba(231, 76, 60, 0.3)' 
                : '0 2px 4px rgba(0, 0, 0, 0.1)',
              zIndex: 5
            }}
            onMouseEnter={(e) => {
              if (currentUser?.id !== member.id && onProfileClick) {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(52, 152, 219, 0.3)';
                e.currentTarget.style.backgroundColor = '#3498db';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (currentUser?.id !== member.id) {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.color = '#333';
              }
            }}
            title={`${member.name} - ${member.role} (Click to login)`}
          >
            <div style={{ fontSize: '1.2rem' }}>
              {member.avatar}
            </div>
            <div style={{ 
              fontSize: '0.7rem', 
              fontWeight: 'bold',
              color: currentUser?.id === member.id ? 'white' : '#333'
            }}>
              {member.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamNavbar;
