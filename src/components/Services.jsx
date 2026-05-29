import React, { useContext } from 'react';
import { GameStateContext } from '../context/GameState';

export const Services = () => {
  const { language, setCurrentPage } = useContext(GameStateContext);

  const t = {
    en: {
      title: 'Our Operations',
      subtitle: 'The Syndicate provides three tailored services for citizens and mafiosi.',
      bookBtn: 'Book Session',
      inquireBtn: 'Private Request',
      
      publicTitle: 'Public Game Nights',
      publicSub: 'Open Syndicate Tables',
      publicDesc1: 'Join our weekly public gatherings open to individual players and small groups. Perfect for strategic networking, testing your deduction skills, and socializing in a highly immersive atmosphere.',
      publicDesc2: 'No prior experience is necessary. Our professional hosts conduct a full rules walkthrough and assign roles using our premium custom-designed cards. Duration is typically 3-4 hours of intense gaming, deception, and laughs.',
      publicFeature1: 'Professional Game Moderator (The Storyteller)',
      publicFeature2: 'Premium vintage playing card role distribution',
      publicFeature3: 'Bilingual sessions (Arabic / English)',
      publicFeature4: 'Included themed refreshments & snacks',

      privateTitle: 'Private Syndicate Events',
      privateSub: 'Exclusive Family Chambers',
      privateDesc1: 'Host an unforgettable private celebration. Perfect for birthdays, graduation parties, bachelor/bachelorette gatherings, or a highly competitive game night exclusively with your friends.',
      privateDesc2: 'You get full command over the event layout. We can bring the Mafia experience to your private home, garden, or host you in our select partner noir venues across Amman. Customize the game difficulty, roles, and narrative.',
      privateFeature1: 'Fully custom game narratives & role configurations',
      privateFeature2: 'Flexible venue options across Amman or at your home',
      privateFeature3: 'Themed catering, decorations, and fedora dress code',
      privateFeature4: 'Private dedicated game host just for your group',

      corporateTitle: 'Corporate Team Building',
      corporateSub: 'Syndicate Boardroom Strategy',
      corporateDesc1: 'Align your executive team through tactical social deduction. The Mafia game offers an unparalleled simulation of office dynamics, revealing patterns of trust, communication bottlenecks, leadership styles, and stress management.',
      corporateDesc2: 'We tailor the debrief session after the game to analyze team mechanics: How did information flow? Who managed to lead in the presence of lies? How did the team adapt as members were eliminated?',
      corporateFeature1: 'Comprehensive team-dynamic psychological debrief',
      corporateFeature2: 'Tailored game mechanics reflecting corporate strategy',
      corporateFeature3: 'Detailed performance and trust feedback reports',
      corporateFeature4: 'Accommodates large corporate groups (up to 40 players)'
    },
    ar: {
      title: 'عملياتنا وخدماتنا',
      subtitle: 'توفر العائلة ثلاث خدمات مصممة خصيصاً للمواطنين ورجال العصابات.',
      bookBtn: 'احجز جولتك',
      inquireBtn: 'طلب حجز خاص',

      publicTitle: 'جولات اللعب العامة',
      publicSub: 'طاولات العائلة المفتوحة للجميع',
      publicDesc1: 'انضم إلى اجتماعاتنا الأسبوعية العامة المفتوحة للأفراد والمجموعات الصغيرة. الخيار الأفضل للتعارف الاستراتيجي، واختبار مهاراتك في الاستنتاج، والتفاعل الاجتماعي في أجواء حماسية للغاية.',
      publicDesc2: 'لا يشترط وجود خبرة سابقة. يقوم مضيفونا المحترفون بشرح القواعد بالكامل وتوزيع الأدوار باستخدام أوراق اللعب الكلاسيكية الفاخرة الخاصة بنا. تستمر الجولات عادة من 3 إلى 4 ساعات من اللعب الحماسي والغموض والضحك.',
      publicFeature1: 'مدير لعبة محترف بالكامل (الراوي)',
      publicFeature2: 'توزيع الأدوار باستخدام أوراق لعب كلاسيكية فاخرة',
      publicFeature3: 'جولات ثنائية اللغة (العربية / الإنجليزية)',
      publicFeature4: 'مشروبات وضيافة خفيفة مميزة متضمنة',

      privateTitle: 'الفعاليات الخاصة والمناسبات',
      privateSub: 'غرف العائلة المغلقة والمستقلة',
      privateDesc1: 'استضف حفلة لا تُنسى ومثيرة للاهتمام. مناسبة جداً لأعياد الميلاد، حفلات التخرج، تجمعات الأصدقاء، أو قضاء ليلة لعب تنافسية للغاية مع أشخاص تختارهم بنفسك.',
      privateDesc2: 'تتمتع بالتحكم الكامل في تصميم الحدث. يمكننا إحضار تجربة المافيا بالكامل إلى منزلك، حديقتك، أو استضافتك في أحد الأماكن الشريكة الغامضة في عمان. كما يمكنك تخصيص صعوبة اللعب والأدوار والقصة.',
      privateFeature1: 'قصص لعب مخصصة بالكامل وإعداد أدوار فريد',
      privateFeature2: 'خيارات مرنة للمكان (في منزلك أو في مواقعنا الشريكة)',
      privateFeature3: 'ضيافة مخصصة، ديكورات، وقبعات فيدورا للحضور',
      privateFeature4: 'مضيف لعبة مخصص ومحترف لخدمة مجموعتك فقط',

      corporateTitle: 'بناء فرق العمل للشركات',
      corporateSub: 'استراتيجية غرفة إدارة العائلة',
      corporateDesc1: 'عزز التماسك والتعاون بين فريق عملك من خلال التفكير الاستراتيجي والتحليل الاجتماعي. تقدم لعبة المافيا محاكاة لا مثيل لها لبيئة العمل، وتكشف أنماط الثقة، وعوائق التواصل، وأساليب القيادة وإدارة الضغوط.',
      corporateDesc2: 'نقوم بتخصيص جلسة تحليلية بعد اللعب لمناقشة أداء الفريق: كيف تدفقت المعلومات؟ من نجح في القيادة وسط الأكاذيب؟ كيف تكيّف الفريق مع خروج بعض الأعضاء؟',
      corporateFeature1: 'تحليل نفسي واجتماعي شامل لآليات عمل الفريق',
      corporateFeature2: 'تصميم فكرة اللعبة لتعكس التحديات الاستراتيجية للشركة',
      corporateFeature3: 'تقارير مفصلة عن التفاعل والثقة المتبادلة',
      corporateFeature4: 'تتسع للمجموعات الكبيرة من الشركات (حتى 40 لاعباً)'
    }
  };

  const currentT = t[language];
  const isRtl = language === 'ar';

  const servicesList = [
    {
      id: 'public',
      title: currentT.publicTitle,
      subtitle: currentT.publicSub,
      desc1: currentT.publicDesc1,
      desc2: currentT.publicDesc2,
      features: [currentT.publicFeature1, currentT.publicFeature2, currentT.publicFeature3, currentT.publicFeature4],
      // Ace of Spades Luxury Inline SVG
      svg: (
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto 10px auto' }}>
          <path d="M50 15C50 15 25 40 25 55C25 70 42 75 50 63C58 75 75 70 75 55C75 40 50 15 50 15Z" fill="var(--primary-gold)" />
          <path d="M46 60L42 85H58L54 60H46Z" fill="var(--primary-gold)" />
          <path d="M50 15C50 15 25 40 25 55C25 70 42 75 50 63C58 75 75 70 75 55C75 40 50 15 50 15Z" stroke="var(--bg-pure)" strokeWidth="2" />
        </svg>
      ),
      action: () => setCurrentPage('booking'),
      actionText: currentT.bookBtn,
      primary: true
    },
    {
      id: 'private',
      title: currentT.privateTitle,
      subtitle: currentT.privateSub,
      desc1: currentT.privateDesc1,
      desc2: currentT.privateDesc2,
      features: [currentT.privateFeature1, currentT.privateFeature2, currentT.privateFeature3, currentT.privateFeature4],
      // Fedora Hat Luxury Inline SVG
      svg: (
        <svg width="100" height="70" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto 10px auto' }}>
          <path d="M10 65C10 65 30 65 35 60C40 55 45 35 60 35C75 35 80 55 85 60C90 65 110 65 110 65C110 65 100 70 60 70C20 70 10 65 10 65Z" fill="var(--primary-gold)" stroke="var(--primary-gold)" strokeWidth="2"/>
          <path d="M38 55C38 45 42 22 60 22C78 22 82 45 82 55" fill="var(--primary-gold)" stroke="var(--primary-gold)" strokeWidth="2"/>
          <path d="M36 50H84" stroke="var(--crimson)" strokeWidth="4"/>
        </svg>
      ),
      action: () => setCurrentPage('booking'),
      actionText: currentT.inquireBtn,
      primary: false
    },
    {
      id: 'corporate',
      title: currentT.corporateTitle,
      subtitle: currentT.corporateSub,
      desc1: currentT.corporateDesc1,
      desc2: currentT.corporateDesc2,
      features: [currentT.corporateFeature1, currentT.corporateFeature2, currentT.corporateFeature3, currentT.corporateFeature4],
      // Classified Case File Folder Inline SVG
      svg: (
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto 10px auto' }}>
          <path d="M15 25H40L48 35H85V75H15V25Z" stroke="var(--primary-gold)" strokeWidth="3" fill="rgba(197, 160, 89, 0.05)" />
          <line x1="25" y1="48" x2="75" y2="48" stroke="var(--primary-gold)" strokeWidth="2" />
          <line x1="25" y1="58" x2="65" y2="58" stroke="var(--primary-gold)" strokeWidth="2" />
          <line x1="25" y1="66" x2="50" y2="66" stroke="var(--crimson)" strokeWidth="2" />
        </svg>
      ),
      action: () => setCurrentPage('booking'),
      actionText: currentT.inquireBtn,
      primary: false
    }
  ];

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="title-vintage" style={{ fontSize: '2.5rem' }}>
          {currentT.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0 auto' }}>
          {currentT.subtitle}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        {servicesList.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={service.id} 
              className="card-noir card-tilt-hover gold-shine-border services-grid"
              style={{
                borderLeft: service.primary ? '4px solid var(--primary-gold)' : '1px solid var(--border-gold)'
              }}
            >
              {/* Image / SVG Graphic column */}
              <div 
                style={{ 
                  order: isEven ? (isRtl ? 2 : 1) : (isRtl ? 1 : 2),
                  position: 'relative', 
                  height: '300px', 
                  backgroundColor: '#060608', 
                  border: '1px solid rgba(197, 160, 89, 0.1)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(197, 160, 89, 0.05) 0%, rgba(0,0,0,0.85) 90%)',
                  zIndex: 1
                }}></div>
                <div style={{ zIndex: 2, textAlign: 'center' }}>
                  {service.svg}
                  <span className="title-vintage gold-accent" style={{ fontSize: '1rem', letterSpacing: '0.2em', opacity: 0.65 }}>
                    {service.subtitle}
                  </span>
                </div>
              </div>

              {/* Text content column */}
              <div style={{ 
                order: isEven ? (isRtl ? 1 : 2) : (isRtl ? 2 : 1),
                textAlign: isRtl ? 'right' : 'left' 
              }}>
                <span className="crimson-accent" style={{ fontFamily: 'var(--font-title)', letterSpacing: '0.1em', fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>
                  {service.subtitle}
                </span>
                <h2 className="title-vintage" style={{ fontSize: '1.8rem', marginBottom: '15px' }}>
                  {service.title}
                </h2>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 300, marginBottom: '12px', lineHeight: 1.6 }}>
                  {service.desc1}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.6 }}>
                  {service.desc2}
                </p>

                {/* Features List */}
                <ul style={{ 
                  listStyle: 'none', 
                  marginBottom: '30px', 
                  paddingLeft: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {service.features.map((feat, idx) => (
                    <li 
                      key={idx} 
                      style={{ 
                        fontSize: '0.85rem', 
                        color: 'var(--text-primary)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        justifyContent: isRtl ? 'flex-start' : 'flex-start',
                        flexDirection: isRtl ? 'row-reverse' : 'row'
                      }}
                    >
                      <span className="gold-accent" style={{ fontSize: '1rem' }}>✦</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button onClick={service.action} className={`btn-noir ${service.primary ? 'btn-noir-gold' : 'btn-noir-crimson'}`}>
                  {service.actionText}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
