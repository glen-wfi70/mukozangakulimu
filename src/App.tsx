import React, { useState } from 'react';
import Login from './components/Login';
import WorldGlobe from './components/WorldGlobe';
import ProjectStructure from './components/ProjectStructure';
import CalculatorSpreadsheet from './components/CalculatorSpreadsheet';
import CalendarComponent from './components/Calendar';
import Finance from './components/Finance';
import Dashboard from './components/Dashboard';
import TeamNavbar from './components/TeamNavbar';
import ProfileLoginModal from './components/ProfileLoginModal';
import { TeamMember } from './types/team';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'globe' | 'projects' | 'calculator' | 'calendar' | 'finance' | 'dashboard'>('globe');
  const [currentUser, setCurrentUser] = useState<TeamMember | null>(null);
  const [selectedProfileForLogin, setSelectedProfileForLogin] = useState<TeamMember | null>(null);

  const handleLogin = (username: string, password: string, user?: TeamMember) => {
    // Simple authentication - in real app, this would validate against a backend
    if (username && password) {
      setIsLoggedIn(true);
      setCurrentUser(user || null);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleProfileClick = (member: TeamMember) => {
    setSelectedProfileForLogin(member);
  };

  const handleProfileLoginClose = () => {
    setSelectedProfileForLogin(null);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Mukozangakulimu Project Management</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </header>

      {/* Navigation Tabs */}
      <nav style={{
        backgroundColor: 'white',
        padding: '0 2rem',
        borderBottom: '2px solid #ddd',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex' }}>
          <button
            onClick={() => setActiveTab('globe')}
            onMouseEnter={(e) => {
              if (activeTab !== 'globe') {
                e.currentTarget.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'globe') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
            style={{
              padding: '1rem 2rem',
              backgroundColor: activeTab === 'globe' ? '#3498db' : 'transparent',
              color: activeTab === 'globe' ? 'white' : '#333',
              border: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'globe' ? '3px solid #2980b9' : '3px solid transparent',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              position: 'relative',
              fontSize: '1.1rem'
            }}
          >
            World Map
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            onMouseEnter={(e) => {
              if (activeTab !== 'projects') {
                e.currentTarget.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'projects') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
            style={{
              padding: '1rem 2rem',
              backgroundColor: activeTab === 'projects' ? '#3498db' : 'transparent',
              color: activeTab === 'projects' ? 'white' : '#333',
              border: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'projects' ? '3px solid #2980b9' : '3px solid transparent',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              position: 'relative',
              fontSize: '1.1rem'
            }}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            onMouseEnter={(e) => {
              if (activeTab !== 'dashboard') {
                e.currentTarget.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'dashboard') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
            style={{
              padding: '1rem 2rem',
              backgroundColor: activeTab === 'dashboard' ? '#3498db' : 'transparent',
              color: activeTab === 'dashboard' ? 'white' : '#333',
              border: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'dashboard' ? '3px solid #2980b9' : '3px solid transparent',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              position: 'relative',
              fontSize: '1.1rem'
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            onMouseEnter={(e) => {
              if (activeTab !== 'calculator') {
                e.currentTarget.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'calculator') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
            style={{
              padding: '1rem 2rem',
              backgroundColor: activeTab === 'calculator' ? '#3498db' : 'transparent',
              color: activeTab === 'calculator' ? 'white' : '#333',
              border: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'calculator' ? '3px solid #2980b9' : '3px solid transparent',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              position: 'relative',
              fontSize: '1.1rem'
            }}
          >
            Expenditure Calculator
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            onMouseEnter={(e) => {
              if (activeTab !== 'calendar') {
                e.currentTarget.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'calendar') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
            style={{
              padding: '1rem 2rem',
              backgroundColor: activeTab === 'calendar' ? '#3498db' : 'transparent',
              color: activeTab === 'calendar' ? 'white' : '#333',
              border: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'calendar' ? '3px solid #2980b9' : '3px solid transparent',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              position: 'relative',
              fontSize: '1.1rem'
            }}
          >
            Calendar
          </button>
          <button
            onClick={() => setActiveTab('finance')}
            onMouseEnter={(e) => {
              if (activeTab !== 'finance') {
                e.currentTarget.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'finance') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
            style={{
              padding: '1rem 2rem',
              backgroundColor: activeTab === 'finance' ? '#3498db' : 'transparent',
              color: activeTab === 'finance' ? 'white' : '#333',
              border: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'finance' ? '3px solid #2980b9' : '3px solid transparent',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              position: 'relative',
              fontSize: '1.1rem'
            }}
          >
            Finance
          </button>
        </div>
      </nav>

      {/* Team Navbar */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        borderBottom: '1px solid #ddd'
      }}>
        <TeamNavbar currentUser={currentUser} onProfileClick={handleProfileClick} />
      </div>

      {/* Main Content */}
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'globe' && <WorldGlobe />}
        {activeTab === 'projects' && <ProjectStructure />}
        {activeTab === 'calculator' && <CalculatorSpreadsheet />}
        {activeTab === 'calendar' && <CalendarComponent />}
        {activeTab === 'finance' && <Finance />}
        {activeTab === 'dashboard' && <Dashboard user={currentUser} onLogout={handleLogout} />}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#34495e',
        color: 'white',
        textAlign: 'center',
        padding: '1rem',
        marginTop: '2rem'
      }}>
        <p style={{ margin: 0 }}>© 2026 Mukozangakulimu Project Management System</p>
      </footer>

      {/* Profile Login Modal */}
      <ProfileLoginModal
        teamMember={selectedProfileForLogin!}
        isOpen={!!selectedProfileForLogin}
        onClose={handleProfileLoginClose}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default App;
