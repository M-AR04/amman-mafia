import React, { useContext, useState, useEffect } from 'react';
import { GameStateContext, getLocalDateString } from '../context/GameState';

export const Home = () => {
  const {
    language,
    setCurrentPage,
    getTimeSlots,
    getOccupiedSeats,
    maxSeats
  } = useContext(GameStateContext);

  const [sloganIndex, setSloganIndex] = useState(0);

  const slogans = {
    en: [
      'Trust No One.',
      'Lies Are Your Weapon.',
      'The Syndicate Awaits.',
      'Accuse. Defend. Survive.'
    ],
    ar: [
      'لا تثق بأحد.',
      'الكذب هو سلاحك.',
      'العائلة في انتظارك.',
      'اتهم. دافع. انجُ بحياتك.'
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSloganIndex(prev => (prev + 1) % slogans[language].length);
    }, 3000);
    return () => clearInterval(timer);
  }, [language]);

  const t = {
    en: {
      tagline: 'A Strategic 1920s Social Deduction Experience in Amman',
      joinBtn: 'Join the Family',
      exploreBtn: 'Explore Operations',
      introTitle: 'Welcome to the Underworld',
      introDesc1: 'Step back in time to the golden age of Prohibition. Behind closed doors, under a single brass spotlight, a game of life, death, and deception is played. Amman Mafia Nights organizes premium, fully immersive social deduction events where alliances are forged and broken in seconds.',
      introDesc2: 'Whether you are a seasoned Don or a civilian looking to survive, our events are professionally moderated, feature vintage card deck tokens, themed drinks, and the absolute peak of strategic tension.',
      upcomingTitle: 'Syndicate Meetings',
      upcomingSubtitle: 'Scheduled game nights. Choose a time slot to secure your seat.',
      bookSeat: 'Secure Seat',
      onlySpots: 'spots remaining',
      soldOut: 'Table Full',
      testimonialTitle: 'Classified Dossiers',
      testimonialSubtitle: 'Testimonials from verified players of the Syndicate.',
      joinSyndicate: 'Ready to take the Oath?',
      joinDesc: 'Grab your fedora, practice your poker face, and join the family. Seats are extremely limited.'
    },
    ar: {
      tagline: 'تجربة مافيا وحرب استراتيجية غامضة من عشرينيات القرن الماضي في عمان',
      joinBtn: 'انضم إلى العائلة',
      exploreBtn: 'استكشف عملياتنا',
      introTitle: 'مرحباً بك في عالم العصابات',
      introDesc1: 'خطوة إلى الوراء بالزمن لعصر الحظر الذهبي. خلف الأبواب المغلقة وتحت تسليط ضوء خافت، تُلعب لعبة حياة وموت وخداع. تنظم ليالي مافيا عمان فعاليات حماسية غامرة بالكامل تعتمد على الاستنتاج الاجتماعي والتحالفات التي تُبنى وتنهار في ثوانٍ.',
      introDesc2: 'سواء كنت عرّاباً متمرساً أو مواطناً بسيطاً يحاول النجاة، فإن جولاتنا تُدار باحترافية تامة، وتتميز بأوراق لعب كلاسيكية فاخرة، وأجواء غامضة تلائم قمة التوتر الاستراتيجي.',
      upcomingTitle: 'اجتماعات العائلة القادمة',
      upcomingSubtitle: 'مواعيد اللعب المتاحة. اختر فترتك لتأمين مقعدك.',
      bookSeat: 'حجز مقعد',
      onlySpots: 'مقاعد متبقية',
      soldOut: 'الطاولة ممتلئة',
      testimonialTitle: 'ملفات استخباراتية سرية',
      testimonialSubtitle: 'شهادات وآراء لاعبين موثقين من العائلة.',
      joinSyndicate: 'هل أنت مستعد لأداء القسم؟',
      joinDesc: 'ارتدِ قبعتك، جهّز تعابير وجهك الباردة، وانضم إلى الطاولة المستديرة. المقاعد محدودة جداً.'
    }
  };

  const currentT = t[language];
  const activeSlogan = slogans[language][sloganIndex];

  // Derive upcoming events for Today and Tomorrow
  const todayDate = new Date();
  const tomorrowDate = new Date(Date.now() + 86400000);
  const slots = getTimeSlots();

  const getUpcomingEvents = () => {
    const events = [];
    const dateObjects = [
      { dateStr: getLocalDateString(todayDate), label: language === 'en' ? 'Tonight' : 'الليلة' },
      { dateStr: getLocalDateString(tomorrowDate), label: language === 'en' ? 'Tomorrow' : 'غداً' }
    ];

    dateObjects.forEach(d => {
      slots.slice(0, 2).forEach(s => {
        const occupied = getOccupiedSeats(d.dateStr, s).length;
        const remaining = maxSeats - occupied;
        events.push({
          date: d.dateStr,
          dateLabel: d.label,
          timeSlot: s,
          remaining: remaining,
          occupied: occupied
        });
      });
    });
    return events;
  };

  const upcomingEvents = getUpcomingEvents();

  const testimonials = [
    {
      name: 'Tareq A.',
      role: language === 'en' ? 'The Don (Player for 2 Years)' : 'العرّاب (لاعب منذ سنتين)',
      text: language === 'en' 
        ? '"The tension at the round table is absolutely thrilling! The host managed the room with extreme professionalism. I found myself lying to my closest friends and loving every second of it."' 
        : '"التوتر على الطاولة المستديرة لا يوصف! أدار المضيف الجولة باحترافية شديدة. وجدت نفسي أكذب على أقرب أصدقائي واستمتع بكل ثانية من اللعبة."',
      status: 'VERIFIED SYNDICATE'
    },
    {
      name: 'Layan K.',
      role: language === 'en' ? 'The Detective (Frequent Guest)' : 'المحقق (ضيفة دائمة)',
      text: language === 'en' 
        ? '"Unbelievable atmosphere! From the classic vintage cards to the dim lighting. It feels like stepping into a 1920s Godfather movie right here in Amman. Perfect for meeting strategic minds."' 
        : '"أجواء لا تصدق! من أوراق اللعب الكلاسيكية الفاخرة إلى الإضاءة الخافتة. تشعر كأنك دخلت فيلم مافيا قديم في وسط عمان. مناسبة جداً للتعرف على عقول استراتيجية."',
      status: 'CONFIRMED CITIZEN'
    },
    {
      name: 'Faisal M.',
      role: language === 'en' ? 'CEO, Vintage Ventures' : 'الرئيس التنفيذي، فينتج فينتشرز',
      text: language === 'en' 
        ? '"We booked a private team building night for our executive board. It highlighted leadership flaws, communication bottlenecks, and strategic thinking under pressure. Incredible experience!"' 
        : '"قمنا بحجز جولة خاصة لبناء الفريق لمجلس إدارتنا. لقد كشفت اللعبة نقاط الضعف في القيادة، وعوائق التواصل، والتفكير الاستراتيجي تحت الضغط. تجربة رائعة!"',
      status: 'PRIVATE SUITE'
    }
  ];

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-gold)',
        padding: '60px 0'
      }}>
        <div className="container hero-grid">
          
          {/* Hero Left Content */}
          <div style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
            <span className="gold-accent" style={{
              fontFamily: 'var(--font-title)',
              fontSize: '1rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '15px',
              animation: 'gold-flicker 4s infinite'
            }}>
              ليالي مافيا عمان
            </span>
            <h1 className="title-vintage" style={{ fontSize: '3.5rem', lineHeight: '1.1', fontWeight: 900, marginBottom: '20px' }}>
              Amman Mafia <br />
              <span className="crimson-accent">Nights</span>
            </h1>
            
            {/* Typing Slogan Effect */}
            <div style={{ minHeight: '40px', marginBottom: '25px' }}>
              <p style={{
                fontFamily: 'var(--font-title)',
                fontSize: '1.5rem',
                color: 'var(--text-primary)',
                borderRight: language === 'en' ? '2px solid var(--primary-gold)' : 'none',
                borderLeft: language === 'ar' ? '2px solid var(--primary-gold)' : 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                display: 'inline-block',
                paddingRight: language === 'en' ? '8px' : '0',
                paddingLeft: language === 'ar' ? '8px' : '0',
                animation: 'none'
              }} className="typewriter-caret">
                {activeSlogan}
              </p>
            </div>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '35px', maxWidth: '550px' }}>
              {currentT.tagline}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={() => setCurrentPage('booking')} className="btn-noir btn-noir-gold">
                {currentT.joinBtn}
              </button>
              <button onClick={() => setCurrentPage('services')} className="btn-noir btn-noir-muted">
                {currentT.exploreBtn}
              </button>
            </div>
          </div>

          {/* Hero Right Visual (Shield Logo) */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 60%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              pointerEvents: 'none'
            }}></div>
            <img 
              src="/logo.png" 
              alt="Amman Mafia Shield Logo" 
              style={{
                width: '100%',
                maxHeight: '420px',
                objectFit: 'contain',
                position: 'relative',
                zIndex: 2,
                filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.9))',
                transform: 'scale(1.03)',
                transition: 'transform 0.5s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08) rotate(1deg)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.03) rotate(0deg)'}
            />
          </div>

        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #141316', backgroundColor: '#070709' }}>
        <div className="container intro-grid">
          
          {/* Intro Image Graphic */}
          <div style={{ position: 'relative', height: '350px', border: '1px solid var(--border-gold)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(5,5,5,0.1), rgba(5,5,5,0.9)), radial-gradient(circle at 50% 30%, transparent 20%, rgba(5,5,5,0.85) 80%)',
              zIndex: 2
            }}></div>
            
            {/* Ambient Shadow Hat Outline Placeholder */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              textAlign: 'center'
            }}>
              {/* Gold Fedora Minimalist SVG */}
              <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.25, display: 'block', margin: '0 auto 10px auto' }}>
                <path d="M10 65C10 65 30 65 35 60C40 55 45 35 60 35C75 35 80 55 85 60C90 65 110 65 110 65C110 65 100 70 60 70C20 70 10 65 10 65Z" stroke="var(--primary-gold)" strokeWidth="2"/>
                <path d="M38 55C38 45 42 22 60 22C78 22 82 45 82 55" stroke="var(--primary-gold)" strokeWidth="2"/>
                <path d="M36 50H84" stroke="var(--crimson)" strokeWidth="3"/>
              </svg>
              <span className="title-vintage gold-accent" style={{ fontSize: '1.2rem', letterSpacing: '0.3em', opacity: 0.35 }}>TRUST NO ONE</span>
            </div>
            
            {/* Table visualization borders */}
            <div style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              height: '120px',
              border: '2px solid rgba(197, 160, 89, 0.15)',
              borderRadius: '50%',
              zIndex: 3
            }}></div>
          </div>

          {/* Intro Text */}
          <div style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
            <span className="crimson-accent" style={{ fontFamily: 'var(--font-title)', letterSpacing: '0.15em', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>
              ESTABLISHED IN AMMAN
            </span>
            <h2 className="title-vintage" style={{ fontSize: '2.2rem', marginBottom: '24px' }}>
              {currentT.introTitle}
            </h2>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '18px', fontWeight: 300, lineHeight: 1.7 }}>
              {currentT.introDesc1}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7 }}>
              {currentT.introDesc2}
            </p>
          </div>

        </div>
      </section>

      {/* 3. DYNAMIC UPCOMING EVENTS */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid var(--border-gold)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="title-vintage" style={{ fontSize: '2.2rem' }}>
              {currentT.upcomingTitle}
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
              {currentT.upcomingSubtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {upcomingEvents.map((ev, index) => (
              <div 
                key={index} 
                className="card-noir" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  height: '320px',
                  borderTop: ev.remaining > 0 ? '3px solid var(--primary-gold)' : '3px solid var(--crimson)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      backgroundColor: 'rgba(197, 160, 89, 0.12)', 
                      color: 'var(--primary-gold)', 
                      fontSize: '0.75rem', 
                      borderRadius: '4px',
                      fontFamily: 'var(--font-title)',
                      fontWeight: 600
                    }}>
                      {ev.dateLabel}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {ev.date}
                    </span>
                  </div>

                  <h3 className="title-vintage" style={{ fontSize: '1.2rem', margin: '15px 0 10px 0', color: 'var(--text-primary)' }}>
                    {ev.timeSlot}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '15px 0' }}>
                    <div style={{ flex: 1, height: '4px', backgroundColor: '#1a1a20', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${(ev.occupied / maxSeats) * 100}%`, 
                        height: '100%', 
                        backgroundColor: ev.remaining > 0 ? 'var(--primary-gold)' : 'var(--crimson)' 
                      }}></div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minWidth: '45px', textAlign: 'right' }}>
                      {ev.occupied} / {maxSeats}
                    </span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <div>
                      {ev.remaining > 0 ? (
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                          {ev.remaining} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{currentT.onlySpots}</span>
                        </span>
                      ) : (
                        <span className="crimson-accent" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                          {currentT.soldOut}
                        </span>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => setCurrentPage('booking')}
                      disabled={ev.remaining <= 0}
                      className="btn-noir btn-noir-gold"
                      style={{ 
                        padding: '8px 16px', 
                        fontSize: '0.75rem',
                        opacity: ev.remaining <= 0 ? 0.3 : 1,
                        cursor: ev.remaining <= 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {currentT.bookSeat}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLASSIFIED DOSSIER TESTIMONIALS */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #141316', backgroundColor: '#070709' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="title-vintage" style={{ fontSize: '2.2rem' }}>
              {currentT.testimonialTitle}
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
              {currentT.testimonialSubtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {testimonials.map((tst, index) => (
              <div 
                key={index} 
                className="card-dossier" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  minHeight: '220px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.6)',
                  position: 'relative'
                }}
              >
                {/* Stamp overlay */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  border: '1px dashed var(--border-gold)',
                  borderRadius: '3px',
                  padding: '2px 8px',
                  fontSize: '0.6rem',
                  fontFamily: 'var(--font-title)',
                  color: 'var(--primary-gold)',
                  letterSpacing: '0.1em',
                  transform: 'rotate(5deg)',
                  opacity: 0.7
                }}>
                  {tst.status}
                </div>

                <p style={{ 
                  fontSize: '0.95rem', 
                  color: 'var(--text-primary)', 
                  fontStyle: 'italic', 
                  lineHeight: '1.6', 
                  marginBottom: '20px',
                  paddingRight: '10px'
                }}>
                  {tst.text}
                </p>

                <div>
                  <div style={{ borderTop: '1px solid rgba(197, 160, 89, 0.1)', paddingTop: '12px' }}>
                    <h4 className="title-vintage" style={{ fontSize: '0.95rem', color: 'var(--primary-gold)' }}>
                      {tst.name}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {tst.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section style={{ padding: '100px 0', textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(153, 0, 0, 0.05) 0%, transparent 60%)',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <h2 className="title-vintage" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
            {currentT.joinSyndicate}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
            {currentT.joinDesc}
          </p>
          <button 
            onClick={() => setCurrentPage('booking')} 
            className="btn-noir btn-noir-crimson"
            style={{ padding: '16px 36px', fontSize: '1rem' }}
          >
            {currentT.joinBtn}
          </button>
        </div>
      </section>
    </div>
  );
};
