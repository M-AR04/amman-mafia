import React, { useContext } from 'react';
import { GameStateProvider, GameStateContext } from './context/GameState';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Services } from './components/Services';
import { BookingSystem } from './components/BookingSystem';
import { AdminDashboard } from './components/AdminDashboard';

function MainApp() {
  const { 
    currentPage, 
    setCurrentPage, 
    maintenanceMode, 
    maintenanceMessage, 
    language 
  } = useContext(GameStateContext);

  if (maintenanceMode && currentPage !== 'admin') {
    return (
      <div className={`maintenance-overlay ${language === 'ar' ? 'arabic-font' : ''}`}>
        <div className="noir-fog"></div>
        <div className="ambient-smoke"></div>
        <div className="gold-spotlight"></div>
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <img src="/logo3.png" alt="Mafia Club Seal" className="maintenance-logo" />
          <h1 className="title-vintage crimson-accent" style={{ fontSize: '2.5rem', marginBottom: '20px', letterSpacing: '0.1em' }}>
            {language === 'en' ? 'Syndicate HQ Closed' : 'مقر العائلة مغلق مؤقتاً'}
          </h1>
          <p style={{ color: 'var(--text-primary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: 1.6, fontWeight: 300 }}>
            {maintenanceMessage}
          </p>
          <button 
            onClick={() => setCurrentPage('admin')}
            className="btn-noir btn-noir-gold"
            style={{ padding: '10px 20px', fontSize: '0.8rem' }}
          >
            {language === 'en' ? 'Staff HQ Access' : 'دخول المصرح لهم للمقر'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      {currentPage === 'home' && <Home />}
      {currentPage === 'services' && <Services />}
      {currentPage === 'booking' && <BookingSystem />}
      {currentPage === 'admin' && <AdminDashboard />}
    </Layout>
  );
}

function App() {
  return (
    <GameStateProvider>
      <MainApp />
    </GameStateProvider>
  );
}

export default App;
