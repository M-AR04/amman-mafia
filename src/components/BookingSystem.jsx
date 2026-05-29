import React, { useContext, useState, useEffect } from 'react';
import { GameStateContext, getLocalDateString } from '../context/GameState';

export const BookingSystem = () => {
  const {
    language,
    getTimeSlots,
    getOccupiedSeats,
    getSeatAssignments,
    maxSeats,
    addBooking
  } = useContext(GameStateContext);

  const [selectedDate, setSelectedDate] = useState(() => getLocalDateString(new Date()));
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);

  const slots = getTimeSlots();

  // Reset selected slot if it's not valid for the generated slots
  useEffect(() => {
    if (slots.length > 0) {
      setSelectedSlot(slots[0]);
    } else {
      setSelectedSlot('');
    }
    setSelectedSeats([]);
  }, [selectedDate]);

  useEffect(() => {
    setSelectedSeats([]);
  }, [selectedSlot]);

  const occupiedSeats = selectedSlot ? getOccupiedSeats(selectedDate, selectedSlot) : [];
  const seatAssignments = selectedSlot ? getSeatAssignments(selectedDate, selectedSlot) : {};

  const handleSeatClick = (seatNum) => {
    if (occupiedSeats.includes(seatNum)) return; // Occupied

    setSelectedSeats(prev => {
      if (prev.includes(seatNum)) {
        return prev.filter(s => s !== seatNum);
      } else {
        return [...prev, seatNum];
      }
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0 || !name || !phone) return;

    const bookingData = {
      name,
      phone,
      date: selectedDate,
      timeSlot: selectedSlot,
      seats: selectedSeats,
      status: 'Pending' // Requires Admin confirmation in demo
    };

    const newBooking = addBooking(bookingData);
    setLastBooking(newBooking);
    setBookingConfirmed(true);

    // Reset Form
    setName('');
    setPhone('');
    setSelectedSeats([]);
  };

  const handleReset = () => {
    setBookingConfirmed(false);
    setLastBooking(null);
  };

  // Helper to format names into initials
  const getInitials = (fullName) => {
    if (!fullName) return 'S';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  // Get next 7 days for the date selector
  const getNextSevenDays = () => {
    const days = [];
    const dateNames = {
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    };

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateStr = getLocalDateString(d);
      
      let label = '';
      if (i === 0) label = language === 'en' ? 'Today' : 'اليوم';
      else if (i === 1) label = language === 'en' ? 'Tomorrow' : 'غداً';
      else label = `${dateNames[language][d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;

      days.push({ dateStr, label });
    }
    return days;
  };

  const dateOptions = getNextSevenDays();

  const t = {
    en: {
      selectDate: 'Step 1: Select Game Date',
      selectSlot: 'Step 2: Choose Meeting Time',
      selectSeats: 'Step 3: Secure Your Seat(s)',
      seatMapTitle: 'Interactive Round Table',
      seatMapDesc: 'Select unoccupied seats (golden). Confirmed syndicate members are greyed out.',
      capacityRemaining: 'spots remaining in this meeting',
      tableCenterText: 'AMMAN MAFIA',
      tableCenterSub: 'ROUND TABLE',
      bookingFormTitle: 'Oath of the Family',
      bookingFormDesc: 'Enter your credentials to lock your booking. Admin will review and confirm.',
      fullName: 'Code Name / Full Name',
      phone: 'Secure Phone Line',
      selectedSeatsLabel: 'Your Reserved Seats',
      confirmBtn: 'Take the Oath',
      ticketTitle: 'Syndicate Voucher Issued',
      ticketSlogan: 'YOUR SEATS ARE HELD IN TEMPORARY TRUST',
      ticketInstructions: 'An agent will contact you shortly to confirm your entry at the round table. Bring your vintage credentials.',
      ticketDate: 'Date of Gathering',
      ticketTime: 'Time Slot',
      ticketSeats: 'Assigned Seat(s)',
      ticketHolder: 'Voucher Holder',
      statusLabel: 'Security Clearance',
      statusPending: 'PENDING HQ REVIEW',
      statusConfirmed: 'CONFIRMED FAMILY MEMBER',
      bookAnother: 'Book Another Seat',
      seatBookedTooltip: 'Booked by'
    },
    ar: {
      selectDate: 'الخطوة الأولى: اختر تاريخ اللعب',
      selectSlot: 'الخطوة الثانية: اختر موعد الاجتماع',
      selectSeats: 'الخطوة الثالثة: أمّن مقعدك على الطاولة',
      seatMapTitle: 'طاولة اللعب المستديرة التفاعلية',
      seatMapDesc: 'اختر مقعدك الشاغر (ذهبي). الأعضاء المؤكدون يظهرون باللون الداكن مع الحروف الأولى لأسمائهم.',
      capacityRemaining: 'مقاعد متبقية في هذا الاجتماع',
      tableCenterText: 'مافيا عمان',
      tableCenterSub: 'الطاولة المستديرة',
      bookingFormTitle: 'ميثاق شرف العائلة',
      bookingFormDesc: 'أدخل بياناتك لقفل حجزك. ستقوم لوحة الإدارة بمراجعة الحجز وتأكيده.',
      fullName: 'الاسم الحركي / الاسم الكامل',
      phone: 'رقم هاتف آمن للتواصل',
      selectedSeatsLabel: 'مقاعدك المحددة',
      confirmBtn: 'أدّ القسم وانضم',
      ticketTitle: 'تم إصدار بطاقة الحجز',
      ticketSlogan: 'مقاعدك محجوزة بضمان العائلة المؤقت',
      ticketInstructions: 'سيتصل بك أحد عملائنا قريباً لتأكيد دخولك الطاولة المستديرة. يرجى إحضار الرمز التعريفي الخاص بك.',
      ticketDate: 'تاريخ الاجتماع',
      ticketTime: 'الفترة المحددة',
      ticketSeats: 'المقاعد المخصصة',
      ticketHolder: 'حامل البطاقة',
      statusLabel: 'التصريح الأمني',
      statusPending: 'قيد مراجعة المقر الرئيسي',
      statusConfirmed: 'عضو عائلة مؤكد',
      bookAnother: 'حجز مقعد آخر',
      seatBookedTooltip: 'محجوز باسم'
    }
  };

  const currentT = t[language];
  const isRtl = language === 'ar';

  if (bookingConfirmed && lastBooking) {
    return (
      <div className="container shake-trigger" style={{ textAlign: 'center', padding: '20px 0' }}>
        <h1 className="title-vintage gold-accent" style={{ fontSize: '2.2rem', marginBottom: '10px' }}>
          {currentT.ticketTitle}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          {currentT.ticketSlogan}
        </p>

        {/* Syndicate Ticket Box */}
        <div className="syndicate-ticket" style={{ textAlign: isRtl ? 'right' : 'left' }}>
          {/* Blood Seal Stamp Overlay */}
          <div className="blood-seal">
            <div className="blood-seal-text">
              {lastBooking.status === 'Pending' ? (
                <>PENDING<br />HQ</>
              ) : (
                <>CONFIRMED<br />FAMILY</>
              )}
            </div>
          </div>

          <div style={{ borderBottom: '1px solid var(--border-gold)', paddingBottom: '15px', marginBottom: '20px' }}>
            <span className="gold-accent" style={{ fontFamily: 'var(--font-title)', fontSize: '0.75rem', letterSpacing: '0.2em' }}>
              AMMAN MAFIA SYNDICATE
            </span>
            <h2 className="title-vintage" style={{ fontSize: '1.5rem', marginTop: '5px' }}>
              ليالي مافيا عمان
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                {currentT.ticketHolder}
              </span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                {lastBooking.name}
              </strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                {currentT.phone}
              </span>
              <span style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                {lastBooking.phone}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                  {currentT.ticketDate}
                </span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  {lastBooking.date}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                  {currentT.ticketTime}
                </span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  {lastBooking.timeSlot}
                </span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                {currentT.ticketSeats}
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '5px' }}>
                {lastBooking.seats.map(s => (
                  <span 
                    key={s} 
                    style={{ 
                      padding: '4px 10px', 
                      backgroundColor: 'var(--crimson)', 
                      color: '#fff', 
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-title)',
                      fontWeight: 700,
                      border: '1px solid var(--text-primary)'
                    }}
                  >
                    Seat {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px dashed rgba(197, 160, 89, 0.2)', paddingTop: '15px', marginTop: '10px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                {currentT.statusLabel}
              </span>
              <strong className={lastBooking.status === 'Pending' ? 'crimson-accent' : 'gold-accent'} style={{ fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                {lastBooking.status === 'Pending' ? currentT.statusPending : currentT.statusConfirmed}
              </strong>
            </div>
          </div>
        </div>

        <p style={{ maxWidth: '450px', margin: '30px auto', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          ⚠️ {currentT.ticketInstructions}
        </p>

        <button onClick={handleReset} className="btn-noir btn-noir-gold" style={{ marginTop: '10px' }}>
          {currentT.bookAnother}
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="title-vintage" style={{ fontSize: '2.5rem' }}>
          {currentT.seatMapTitle}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          {currentT.seatMapDesc}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Date & Slot Selectors + Seat Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* STEP 1: Date Picker */}
          <div className="card-noir" style={{ padding: '20px' }}>
            <h3 className="title-vintage gold-accent" style={{ fontSize: '1rem', marginBottom: '15px' }}>
              {currentT.selectDate}
            </h3>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
              {dateOptions.map(day => (
                <button
                  key={day.dateStr}
                  onClick={() => setSelectedDate(day.dateStr)}
                  style={{
                    padding: '10px 14px',
                    backgroundColor: selectedDate === day.dateStr ? 'var(--primary-gold)' : '#0d0d10',
                    border: '1px solid var(--border-gold)',
                    color: selectedDate === day.dateStr ? '#000' : 'var(--text-primary)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {day.label}
                  <span style={{ display: 'block', fontSize: '0.7rem', opacity: 0.7, marginTop: '2px' }}>
                    {day.dateStr}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: Time Slots */}
          <div className="card-noir" style={{ padding: '20px' }}>
            <h3 className="title-vintage gold-accent" style={{ fontSize: '1rem', marginBottom: '15px' }}>
              {currentT.selectSlot}
            </h3>
            {slots.length === 0 ? (
              <p style={{ color: 'var(--crimson)', fontSize: '0.9rem' }}>
                Space is currently closed. No slots available during working hours.
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {slots.map(s => {
                  const rem = maxSeats - getOccupiedSeats(selectedDate, s).length;
                  const isFull = rem <= 0;
                  return (
                    <button
                      key={s}
                      onClick={() => !isFull && setSelectedSlot(s)}
                      disabled={isFull}
                      style={{
                        padding: '12px',
                        backgroundColor: selectedSlot === s ? 'rgba(197, 160, 89, 0.12)' : '#0d0d10',
                        border: selectedSlot === s ? '1px solid var(--primary-gold)' : '1px solid #1c1917',
                        color: isFull ? 'var(--text-dark)' : (selectedSlot === s ? 'var(--primary-gold)' : 'var(--text-primary)'),
                        borderRadius: '4px',
                        cursor: isFull ? 'not-allowed' : 'pointer',
                        transition: 'var(--transition-smooth)',
                        textAlign: 'center',
                        position: 'relative',
                        opacity: isFull ? 0.3 : 1
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '0.85rem', fontFamily: 'var(--font-title)' }}>
                        {s}
                      </strong>
                      <span style={{ fontSize: '0.7rem', display: 'block', marginTop: '2px', color: isFull ? 'var(--crimson)' : 'var(--text-muted)' }}>
                        {isFull ? 'SOLD OUT' : `${rem} seats left`}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Poker Table & Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* STEP 3: Seat Map and Felt Table */}
          {selectedSlot && (
            <div className="card-noir" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 className="title-vintage gold-accent" style={{ fontSize: '1rem', alignSelf: 'flex-start', marginBottom: '10px' }}>
                {currentT.selectSeats}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', alignSelf: 'flex-start', marginBottom: '30px' }}>
                {maxSeats - occupiedSeats.length} {currentT.capacityRemaining}
              </p>

              {/* RADIAL POKER TABLE CONTAINER */}
              <div className="seat-map-container">
                <div className="poker-table-wrapper">
                  
                  {/* Table Felt (Center) */}
                  <div className="poker-table-felt">
                    <img src="/logo.png" alt="Syndicate Logo" className="poker-table-logo" />
                    <div className="table-center-text">
                      <span className="title">{currentT.tableCenterText}</span>
                      <span className="subtitle" style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {currentT.tableCenterSub}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Radial Seats */}
                  {Array.from({ length: maxSeats }, (_, i) => {
                    const seatNum = i + 1;
                    const isOccupied = occupiedSeats.includes(seatNum);
                    const isSelected = selectedSeats.includes(seatNum);
                    const assignment = seatAssignments[seatNum];

                    // Math for circular alignment
                    const angle = (i * 2 * Math.PI) / maxSeats - Math.PI / 2;
                    const radius = window.innerWidth < 500 ? 120 : 165; 
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    const seatClass = isOccupied 
                      ? 'radial-seat occupied confirmed' 
                      : (isSelected ? 'radial-seat selected' : 'radial-seat available');

                    return (
                      <div
                        key={seatNum}
                        className={seatClass}
                        onClick={() => handleSeatClick(seatNum)}
                        style={{
                          '--x': `${x}px`,
                          '--y': `${y}px`,
                          animationDelay: `${i * 0.05}s`,
                          position: 'absolute'
                        }}
                      >
                        {isOccupied ? getInitials(assignment?.name) : seatNum}
                        
                        {/* Hover Tooltip for Occupied Seats */}
                        {isOccupied && assignment && (
                          <div className="seat-tooltip" style={{ right: isRtl ? '55px' : 'auto', left: isRtl ? 'auto' : '55px', bottom: '0px' }}>
                            {currentT.seatBookedTooltip}: <strong>{assignment.name}</strong> ({assignment.status})
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected seats list feedback */}
              {selectedSeats.length > 0 && (
                <div style={{ width: '100%', borderTop: '1px solid rgba(197,160,89,0.15)', paddingTop: '15px', marginTop: '10px', textAlign: isRtl ? 'right' : 'left' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {currentT.selectedSeatsLabel}:
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                    {selectedSeats.sort((a,b)=>a-b).map(s => (
                      <span key={s} style={{ padding: '4px 10px', backgroundColor: 'var(--crimson)', color: '#fff', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        Seat {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OATH BOOKING FORM */}
          {selectedSeats.length > 0 && (
            <div className="card-noir" style={{ padding: '24px 20px' }}>
              <h3 className="title-vintage crimson-accent" style={{ fontSize: '1.1rem', marginBottom: '5px' }}>
                {currentT.bookingFormTitle}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '20px' }}>
                {currentT.bookingFormDesc}
              </p>

              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label className="form-label">{currentT.fullName}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    placeholder={language === 'en' ? 'e.g. Vito Corleone' : 'مثال: فيتو كورليوني'}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{currentT.phone}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    placeholder="e.g. 079XXXXXXX"
                  />
                </div>

                <button type="submit" className="btn-noir btn-noir-crimson" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                  {currentT.confirmBtn}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
