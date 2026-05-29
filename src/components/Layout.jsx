import React, { useContext } from 'react';
import { GameStateContext } from '../context/GameState';

export const Layout = ({ children }) => {
  const {
    language,
    setLanguage,
    currentPage,
    setCurrentPage,
    announcement
  } = useContext(GameStateContext);

  const t = {
    en: {
      brand: 'Mafia Club',
      slogan: 'Nights',
      navHome: 'Dossier',
      navServices: 'Operations',
      navBooking: 'Secure Seat',
      navAdmin: 'Syndicate HQ',
      langLabel: 'العربية',
      footerQuote: '"Four of these people are citizens. Three of them are mafia. Two of them are lying. One is dead. Who do you trust?"',
      footerDev: 'Mafia Club Nights © 2026. All rights reserved to the Family.',
      adminButton: 'HQ Panel'
    },
    ar: {
      brand: 'نادي المافيا',
      slogan: 'ليالي',
      navHome: 'الملف الرئيسي',
      navServices: 'العمليات',
      navBooking: 'حجز مقعد',
      navAdmin: 'مقر العائلة',
      langLabel: 'English',
      footerQuote: '"أربعة من هؤلاء مواطنون. ثلاثة منهم مافيا. اثنان منهم يكذبان. وواحد ميت. بمن تثق؟"',
      footerDev: 'ليالي نادي المافيا © 2026. جميع الحقوق محفوظة للعائلة.',
      adminButton: 'لوحة التحكم'
    }
  };

  const currentT = t[language];
  const isRtl = language === 'ar';

  return (
    <div className={`layout-wrapper ${isRtl ? 'arabic-font' : ''}`} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Background decoration elements */}
      <div className="noir-fog"></div>
      <div className="ambient-smoke"></div>
      <div className="gold-spotlight"></div>

      {/* Announcement Ticker */}
      {announcement && (
        <div className="announcement-ticker">
          <div className="ticker-wrap">
            <marquee behavior="scroll" direction={isRtl ? "right" : "left"} scrollamount="5">
              {announcement}
            </marquee>
          </div>
        </div>
      )}

      {/* Main Header / Navigation */}
      <header style={{
        borderBottom: '1px solid var(--border-gold)',
        backgroundColor: 'rgba(5, 5, 5, 0.9)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 500,
        padding: '12px 0'
      }}>
        <div className="container header-container">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => setCurrentPage('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <img 
              src="/logo3.png" 
              alt="Mafia Club Logo" 
              style={{ width: '48px', height: '48px', objectFit: 'contain', border: '1px solid var(--border-gold)', borderRadius: '50%' }} 
            />
            <div>
              <span className="title-vintage" style={{ fontSize: '1.2rem', display: 'block', fontWeight: 900 }}>
                {currentT.brand}
              </span>
              <span className="gold-accent" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginTop: '-3px' }}>
                {currentT.slogan}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span 
              onClick={() => setCurrentPage('home')}
              style={{
                cursor: 'pointer',
                fontFamily: 'var(--font-title)',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                color: currentPage === 'home' ? 'var(--primary-gold)' : 'var(--text-muted)',
                transition: 'var(--transition-smooth)',
                fontWeight: currentPage === 'home' ? 700 : 400
              }}
              className="nav-link"
            >
              {currentT.navHome}
            </span>
            <span 
              onClick={() => setCurrentPage('services')}
              style={{
                cursor: 'pointer',
                fontFamily: 'var(--font-title)',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                color: currentPage === 'services' ? 'var(--primary-gold)' : 'var(--text-muted)',
                transition: 'var(--transition-smooth)',
                fontWeight: currentPage === 'services' ? 700 : 400
              }}
              className="nav-link"
            >
              {currentT.navServices}
            </span>
            <span 
              onClick={() => setCurrentPage('booking')}
              style={{
                cursor: 'pointer',
                fontFamily: 'var(--font-title)',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                color: currentPage === 'booking' ? 'var(--primary-gold)' : 'var(--text-muted)',
                transition: 'var(--transition-smooth)',
                fontWeight: currentPage === 'booking' ? 700 : 400
              }}
              className="nav-link"
            >
              {currentT.navBooking}
            </span>
            
            {/* Lang Switcher */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-gold)',
                color: 'var(--primary-gold)',
                padding: '6px 14px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                transition: 'var(--transition-smooth)'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-gold)'; e.currentTarget.style.color = '#000'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--primary-gold)'; }}
            >
              {currentT.langLabel}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px 0', zIndex: 10, position: 'relative' }}>
        {children}
      </main>

      {/* Footer Section */}
      <footer style={{
        borderTop: '1px solid var(--border-gold)',
        backgroundColor: '#070709',
        padding: '30px 0',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
          
          <img 
            src="/logo3.png" 
            alt="Mafia Club Seal" 
            style={{ width: '64px', height: '64px', opacity: 0.7 }}
          />

          <p style={{
            fontStyle: 'italic',
            fontFamily: 'var(--font-title)',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            maxWidth: '600px',
            lineHeight: 1.5
          }}>
            {currentT.footerQuote}
          </p>

          <div className="footer-sub" style={{ borderTop: '1px solid #1c1a1e', paddingTop: '15px', marginTop: '10px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {currentT.footerDev}
            </span>
            <button 
              onClick={() => setCurrentPage('admin')}
              style={{
                background: 'rgba(153, 0, 0, 0.1)',
                border: '1px solid var(--border-red)',
                color: 'var(--crimson)',
                padding: '6px 14px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-title)',
                fontWeight: 600,
                transition: 'var(--transition-smooth)',
                letterSpacing: '0.05em'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--crimson)'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(153, 0, 0, 0.1)'; e.currentTarget.style.color = 'var(--crimson)'; }}
            >
              {currentT.adminButton}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
