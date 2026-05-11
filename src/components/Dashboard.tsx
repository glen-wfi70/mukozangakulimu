import React from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
}

interface DashboardProps {
  user: TeamMember | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: 'rgba(249, 249, 249, 0.95)',
      borderRadius: '8px',
      backdropFilter: 'blur(5px)'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: '2rem', marginRight: '10px' }}>
              {user?.avatar}
            </div>
            <div>
              <h2 style={{ margin: '0', color: '#333', fontSize: '1.5rem' }}>
                {user?.name}
              </h2>
              <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '1rem' }}>
                {user?.role}
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.2rem' }}>
            📊 Projects
          </h3>
          <p style={{ margin: '0', color: '#666' }}>View and manage projects</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.2rem' }}>
            🧮 Calculator
          </h3>
          <p style={{ margin: '0', color: '#666' }}>Budget and expense calculations</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.2rem' }}>
            📅 Calendar
          </h3>
          <p style={{ margin: '0', color: '#666' }}>Schedule and deadlines</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.2rem' }}>
            💰 Finance
          </h3>
          <p style={{ margin: '0', color: '#666' }}>Track receipts and expenditures</p>
        </div>
      </div>

      {/* User Stats */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '1.3rem' }}>
          👤 Your Profile
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '15px'
        }}>
          <div>
            <h4 style={{ margin: '0', color: '#666' }}>Email</h4>
            <p style={{ margin: '5px 0 0 0', color: '#333' }}>{user?.email || 'Not available'}</p>
          </div>
          <div>
            <h4 style={{ margin: '0', color: '#666' }}>Role</h4>
            <p style={{ margin: '5px 0 0 0', color: '#333' }}>{user?.role || 'Not available'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
