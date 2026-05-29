import React, { useContext, useState, useEffect } from 'react';
import { GameStateContext, getLocalDateString } from '../context/GameState';

export const AdminDashboard = () => {
  const {
    language,
    announcement,
    setAnnouncement,
    maintenanceMode,
    setMaintenanceMode,
    maintenanceMessage,
    setMaintenanceMessage,
    workingHours,
    setWorkingHours,
    sessionDuration,
    setSessionDuration,
    maxSeats,
    setMaxSeats,
    bookings,
    getTimeSlots,
    getOccupiedSeats,
    getSeatAssignments,
    addBooking,
    updateBooking,
    cancelBooking,
    deleteBooking
  } = useContext(GameStateContext);

  // States for operational controls
  const [announcementInput, setAnnouncementInput] = useState(announcement);
  const [maintMsgInput, setMaintMsgInput] = useState(maintenanceMessage);
  const [startHourInput, setStartHourInput] = useState(workingHours.start);
  const [endHourInput, setEndHourInput] = useState(workingHours.end);
  const [durationInput, setDurationInput] = useState(sessionDuration);
  const [capacityInput, setCapacityInput] = useState(maxSeats);

  // States for search and visual seating
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => getLocalDateString(new Date()));
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedSeat, setSelectedSeat] = useState(null);
  
  // Direct seat booking fields
  const [directName, setDirectName] = useState('');
  const [directPhone, setDirectPhone] = useState('');

  const [tableSize, setTableSize] = useState(340);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 380) {
        setTableSize(240);
      } else if (window.innerWidth < 500) {
        setTableSize(280);
      } else {
        setTableSize(340);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slots = getTimeSlots();

  useEffect(() => {
    if (slots.length > 0) {
      setSelectedSlot(slots[0]);
    } else {
      setSelectedSlot('');
    }
    setSelectedSeat(null);
  }, [selectedDate, workingHours, sessionDuration]);

  useEffect(() => {
    setSelectedSeat(null);
  }, [selectedSlot]);

  const occupiedSeats = selectedSlot ? getOccupiedSeats(selectedDate, selectedSlot) : [];
  const seatAssignments = selectedSlot ? getSeatAssignments(selectedDate, selectedSlot) : {};

  // Form handlers
  const handleSaveGlobal = (e) => {
    e.preventDefault();
    setAnnouncement(announcementInput);
    setMaintenanceMessage(maintMsgInput);
    alert(language === 'en' ? 'Syndicate HQ settings updated successfully!' : 'تم تحديث إعدادات المقر بنجاح!');
  };

  const handleSaveOperational = (e) => {
    e.preventDefault();
    setWorkingHours({ start: startHourInput, end: endHourInput });
    setSessionDuration(Number(durationInput));
    setMaxSeats(Number(capacityInput));
    alert(language === 'en' ? 'Operating hours and capacity locked!' : 'تم حفظ ساعات العمل والسرية الاستيعابية!');
  };

  const handleDirectBooking = (e) => {
    e.preventDefault();
    if (!selectedSeat || !directName || !directPhone) return;

    addBooking({
      name: directName,
      phone: directPhone,
      date: selectedDate,
      timeSlot: selectedSlot,
      seats: [selectedSeat],
      status: 'Confirmed' // Admin bookings auto-confirmed
    });

    // Reset direct booking fields
    setDirectName('');
    setDirectPhone('');
    setSelectedSeat(null);
    alert(language === 'en' ? `Seat ${selectedSeat} booked for ${directName}!` : `تم حجز المقعد ${selectedSeat} بنجاح باسم ${directName}!`);
  };

  // Filtered bookings based on search
  const filteredBookings = bookings.filter(b => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      b.name.toLowerCase().includes(query) ||
      b.phone.includes(query) ||
      b.seats.some(s => String(s) === query)
    );
  });

  const getInitials = (fullName) => {
    if (!fullName) return 'S';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const t = {
    en: {
      title: 'Syndicate HQ Command Center',
      subtitle: 'Manage operational hours, bookings, seat maps, and broadcast announcements.',
      tabGlobal: 'Global Rules',
      tabOperational: 'Operation Times',
      tabDirectBook: 'Direct Seating',
      tabViewBookings: 'Booking Ledger',
      
      announcementBanner: 'Syndicate Site-wide Broadcast (Announcement)',
      maintToggle: 'Maintenance Restructuring Mode',
      maintMsgLabel: 'Restructuring (Maintenance) Message',
      saveBtn: 'Save Settings',
      
      startHour: 'Opening Hour (e.g. 18:00)',
      endHour: 'Closing Hour (e.g. 02:00)',
      sessionLen: 'Session Duration (Hours)',
      seatCapacity: 'Table Capacity (Seats)',
      saveOpsBtn: 'Lock Operations',

      directTitle: 'Direct Table Allocations',
      directDesc: 'Select Date & Time slot. Click an empty seat to directly allocate it to a family member.',
      directSeatLabel: 'Selected Seat',
      directNameLabel: 'Member Name',
      directPhoneLabel: 'Direct Line (Phone)',
      allocateBtn: 'Allocate Seat',
      tableFeltText: 'HQ ACCESS',

      ledgerTitle: 'Booking Ledger',
      ledgerDesc: 'Review and confirm customer seat requests. Search by member name or phone.',
      searchPlaceholder: 'Search by name, phone or seat...',
      colName: 'Customer Name',
      colPhone: 'Phone Line',
      colDate: 'Date',
      colSlot: 'Time Slot',
      colSeats: 'Seat(s)',
      colStatus: 'Clearance',
      colActions: 'Directives',
      confirmDirective: 'Confirm Access',
      cancelDirective: 'Cancel Entry',
      deleteDirective: 'Expel',
      noBookings: 'No dossiers matched search query.'
    },
    ar: {
      title: 'مقر قيادة العائلة الرئيسي',
      subtitle: 'إدارة ساعات العمل الفعالة، الحجوزات، طاولات اللعب، وإرسال الإعلانات العامة.',
      tabGlobal: 'القواعد العامة',
      tabOperational: 'ساعات العمل والتحكم',
      tabDirectBook: 'التخصيص المباشر',
      tabViewBookings: 'سجل الحجوزات الكلي',
      
      announcementBanner: 'الإعلان العريض المعروض في الموقع (المشفر)',
      maintToggle: 'تفعيل وضع الصيانة وإغلاق المقر',
      maintMsgLabel: 'رسالة إغلاق المقر (الصيانة)',
      saveBtn: 'حفظ التغييرات',
      
      startHour: 'ساعة بدء العمل (مثال: 18:00)',
      endHour: 'ساعة إغلاق المكان (مثال: 02:00)',
      sessionLen: 'مدة جلسة اللعب (بالساعات)',
      seatCapacity: 'السعة الاستيعابية للطاولة (المقاعد)',
      saveOpsBtn: 'تثبيت الإعدادات الفعالة',

      directTitle: 'تخصيص المقاعد المباشر',
      directDesc: 'اختر التاريخ والوقت. اضغط على أي مقعد شاغر على الطاولة المستديرة لحجزه مباشرة لاسم معين.',
      directSeatLabel: 'المقعد المحدد',
      directNameLabel: 'اسم الشخص الحقيقي',
      directPhoneLabel: 'رقم هاتف مباشر آمن',
      allocateBtn: 'تأكيد تخصيص المقعد',
      tableFeltText: 'صلاحية المقر',

      ledgerTitle: 'سجل الحجوزات العام',
      ledgerDesc: 'مراجعة وتأكيد طلبات مقاعد العملاء. يمكنك البحث باسم الشخص أو هاتفه للوصول الفوري لحجزه.',
      searchPlaceholder: 'ابحث عن اسم، هاتف، أو رقم مقعد...',
      colName: 'الاسم الكامل',
      colPhone: 'رقم الهاتف',
      colDate: 'التاريخ',
      colSlot: 'الفترة الزمنية',
      colSeats: 'المقاعد',
      colStatus: 'الحالة الأمنية',
      colActions: 'الأوامر المباشرة',
      confirmDirective: 'تأكيد الحجز',
      cancelDirective: 'إلغاء الحجز',
      deleteDirective: 'طرد نهائي',
      noBookings: 'لا توجد ملفات حجز مطابقة لعملية البحث.'
    }
  };

  const currentT = t[language];
  const isRtl = language === 'ar';

  return (
    <div className="container">
      <div style={{ textAlign: isRtl ? 'right' : 'left', marginBottom: '40px' }}>
        <span className="crimson-accent" style={{ fontFamily: 'var(--font-title)', letterSpacing: '0.15em', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>
          SYNDICATE SECRET HQ
        </span>
        <h1 className="title-vintage" style={{ fontSize: '2.5rem' }}>
          {currentT.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          {currentT.subtitle}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
        
        {/* ROW 1: Controls & Configs (Side by Side) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
          
          {/* Card 1: Global Site Settings */}
          <div className="card-noir" style={{ padding: '24px' }}>
            <h3 className="title-vintage gold-accent" style={{ fontSize: '1.1rem', marginBottom: '20px', borderBottom: '1px solid var(--border-gold)', paddingBottom: '10px' }}>
              {currentT.tabGlobal}
            </h3>
            
            <form onSubmit={handleSaveGlobal}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' }}>
                <span className="form-label">{currentT.maintToggle}</span>
                <label className="switch-container">
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    style={{ display: 'none' }}
                  />
                  <div className="switch-slider"></div>
                  <span style={{ fontSize: '0.85rem', color: maintenanceMode ? 'var(--crimson)' : 'var(--text-muted)', fontWeight: 600 }}>
                    {maintenanceMode ? 'ACTIVE (CLOSED)' : 'INACTIVE (OPEN)'}
                  </span>
                </label>
              </div>

              {maintenanceMode && (
                <div className="form-group">
                  <label className="form-label">{currentT.maintMsgLabel}</label>
                  <textarea
                    rows="3"
                    value={maintMsgInput}
                    onChange={(e) => setMaintMsgInput(e.target.value)}
                    className="form-input"
                    style={{ resize: 'none', fontFamily: 'var(--font-body)' }}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">{currentT.announcementBanner}</label>
                <textarea
                  rows="3"
                  value={announcementInput}
                  onChange={(e) => setAnnouncementInput(e.target.value)}
                  className="form-input"
                  style={{ resize: 'none', fontFamily: 'var(--font-body)' }}
                />
              </div>

              <button type="submit" className="btn-noir btn-noir-gold" style={{ width: '100%', justifyContent: 'center' }}>
                {currentT.saveBtn}
              </button>
            </form>
          </div>

          {/* Card 2: Operating & Session Controls */}
          <div className="card-noir" style={{ padding: '24px' }}>
            <h3 className="title-vintage gold-accent" style={{ fontSize: '1.1rem', marginBottom: '20px', borderBottom: '1px solid var(--border-gold)', paddingBottom: '10px' }}>
              {currentT.tabOperational}
            </h3>

            <form onSubmit={handleSaveOperational}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label className="form-label">{currentT.startHour}</label>
                  <input
                    type="text"
                    required
                    value={startHourInput}
                    onChange={(e) => setStartHourInput(e.target.value)}
                    className="form-input"
                    placeholder="18:00"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{currentT.endHour}</label>
                  <input
                    type="text"
                    required
                    value={endHourInput}
                    onChange={(e) => setEndHourInput(e.target.value)}
                    className="form-input"
                    placeholder="00:00"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label className="form-label">{currentT.sessionLen}</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    required
                    value={durationInput}
                    onChange={(e) => setDurationInput(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{currentT.seatCapacity}</label>
                  <input
                    type="number"
                    min="4"
                    max="20"
                    required
                    value={capacityInput}
                    onChange={(e) => setCapacityInput(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <button type="submit" className="btn-noir btn-noir-crimson" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                {currentT.saveOpsBtn}
              </button>
            </form>
          </div>

        </div>

        {/* ROW 2: Direct Seat Allocations Map & Booker */}
        <div className="card-noir" style={{ padding: '30px' }}>
          <h3 className="title-vintage gold-accent" style={{ fontSize: '1.2rem', marginBottom: '5px' }}>
            {currentT.directTitle}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '30px', textAlign: isRtl ? 'right' : 'left' }}>
            {currentT.directDesc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            
            {/* Visual Radial Map Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Date & Slot selection inside Admin */}
              <div style={{ display: 'flex', gap: '15px', width: '100%', maxWidth: '380px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ fontSize: '0.7rem' }}>Date</label>
                  <select 
                    value={selectedDate}
                    onChange={(e)=>setSelectedDate(e.target.value)}
                    className="form-input"
                    style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                  >
                    {Array.from({ length: 7 }, (_, i) => {
                      const d = new Date();
                      d.setDate(d.getDate() + i);
                      const dStr = getLocalDateString(d);
                      return <option key={dStr} value={dStr}>{dStr}</option>;
                    })}
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ fontSize: '0.7rem' }}>Time Slot</label>
                  <select 
                    value={selectedSlot}
                    onChange={(e)=>setSelectedSlot(e.target.value)}
                    className="form-input"
                    style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                  >
                    {slots.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedSlot ? (
                <div className="poker-table-wrapper" style={{ width: `${tableSize}px`, height: `${tableSize}px` }}>
                  <div className="poker-table-felt" style={{ border: '8px solid #16120e' }}>
                    <div className="table-center-text">
                      <span className="title" style={{ fontSize: '0.8rem' }}>{currentT.tableFeltText}</span>
                      <span className="subtitle" style={{ fontSize: '0.55rem' }}>{selectedSlot}</span>
                    </div>
                  </div>

                  {Array.from({ length: maxSeats }, (_, i) => {
                    const seatNum = i + 1;
                    const isOccupied = occupiedSeats.includes(seatNum);
                    const isSelected = selectedSeat === seatNum;
                    const assignment = seatAssignments[seatNum];

                    const angle = (i * 2 * Math.PI) / maxSeats - Math.PI / 2;
                    const radius = tableSize * 0.36; 
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    let seatClass = 'radial-seat available';
                    if (isOccupied) seatClass = 'radial-seat occupied confirmed';
                    if (isSelected) seatClass = 'radial-seat selected';

                    return (
                      <div
                        key={seatNum}
                        className={seatClass}
                        onClick={() => !isOccupied && setSelectedSeat(seatNum)}
                        style={{
                          '--x': `${x}px`,
                          '--y': `${y}px`,
                          animationDelay: `${i * 0.05}s`,
                          position: 'absolute',
                          width: '32px',
                          height: '32px',
                          fontSize: '0.75rem'
                        }}
                      >
                        {isOccupied ? getInitials(assignment?.name) : seatNum}
                        
                        {isOccupied && assignment && (
                          <div className="seat-tooltip" style={{ right: isRtl ? '45px' : 'auto', left: isRtl ? 'auto' : '45px', bottom: '0px' }}>
                            <strong>{assignment.name}</strong>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={{ color: 'var(--crimson)' }}>No operational slots scheduled.</p>
              )}
            </div>

            {/* Direct Booker Form fields */}
            <div>
              {selectedSeat ? (
                <form onSubmit={handleDirectBooking} className="card-dossier" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                  <h4 className="title-vintage gold-accent" style={{ fontSize: '1rem', marginBottom: '15px' }}>
                    Seat {selectedSeat} Assignment
                  </h4>

                  <div className="form-group">
                    <label className="form-label">{currentT.directNameLabel}</label>
                    <input
                      type="text"
                      required
                      value={directName}
                      onChange={(e)=>setDirectName(e.target.value)}
                      className="form-input"
                      placeholder="e.g. Majd Talal"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{currentT.directPhoneLabel}</label>
                    <input
                      type="tel"
                      required
                      value={directPhone}
                      onChange={(e)=>setDirectPhone(e.target.value)}
                      className="form-input"
                      placeholder="079XXXXXXXX"
                    />
                  </div>

                  <button type="submit" className="btn-noir btn-noir-gold" style={{ width: '100%', justifyContent: 'center' }}>
                    {currentT.allocateBtn}
                  </button>
                </form>
              ) : (
                <div className="card-dossier" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  {/* Luxury minimalist Secret Key outline SVG */}
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.35, display: 'block', margin: '0 auto 15px auto' }}>
                    <circle cx="35" cy="50" r="15" stroke="var(--primary-gold)" strokeWidth="3" />
                    <line x1="50" y1="50" x2="85" y2="50" stroke="var(--primary-gold)" strokeWidth="3" />
                    <line x1="70" y1="50" x2="70" y2="65" stroke="var(--primary-gold)" strokeWidth="3" />
                    <line x1="80" y1="50" x2="80" y2="65" stroke="var(--primary-gold)" strokeWidth="3" />
                  </svg>
                  <p style={{ fontSize: '0.9rem' }}>
                    {language === 'en' 
                      ? 'Select an available radial seat number from the circular table to begin direct Syndicate seat allocation.'
                      : 'اختر رقم مقعد شاغر من الطاولة الدائرية التفاعلية للبدء في حجز وتخصيص المقعد مباشرة لشخص معين.'}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ROW 3: Ledger List (Table with search and controls) */}
        <div className="card-noir" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '25px', borderBottom: '1px solid rgba(197, 160, 89, 0.15)', paddingBottom: '15px' }}>
            <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
              <h3 className="title-vintage gold-accent" style={{ fontSize: '1.2rem' }}>
                {currentT.ledgerTitle}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '3px' }}>
                {currentT.ledgerDesc}
              </p>
            </div>
            
            {/* Search Input */}
            <div style={{ position: 'relative', width: '280px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentT.searchPlaceholder}
                className="form-input"
                style={{ padding: '10px 16px 10px 36px', fontSize: '0.85rem' }}
              />
              <span style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-dark)' }}>
                {/* Search Magnifier SVG icon */}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2"/>
                  <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
            </div>
          </div>

          {/* Bookings Table List */}
          <div style={{ overflowX: 'auto' }}>
            {filteredBookings.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px 0' }}>
                {currentT.noBookings}
              </p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: isRtl ? 'right' : 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--text-dark)' }}>
                    <th style={{ padding: '12px 10px', fontSize: '0.8rem', fontFamily: 'var(--font-title)', color: 'var(--primary-gold)' }}>
                      {currentT.colName}
                    </th>
                    <th style={{ padding: '12px 10px', fontSize: '0.8rem', fontFamily: 'var(--font-title)', color: 'var(--primary-gold)' }}>
                      {currentT.colPhone}
                    </th>
                    <th style={{ padding: '12px 10px', fontSize: '0.8rem', fontFamily: 'var(--font-title)', color: 'var(--primary-gold)' }}>
                      {currentT.colDate}
                    </th>
                    <th style={{ padding: '12px 10px', fontSize: '0.8rem', fontFamily: 'var(--font-title)', color: 'var(--primary-gold)' }}>
                      {currentT.colSlot}
                    </th>
                    <th style={{ padding: '12px 10px', fontSize: '0.8rem', fontFamily: 'var(--font-title)', color: 'var(--primary-gold)' }}>
                      {currentT.colSeats}
                    </th>
                    <th style={{ padding: '12px 10px', fontSize: '0.8rem', fontFamily: 'var(--font-title)', color: 'var(--primary-gold)' }}>
                      {currentT.colStatus}
                    </th>
                    <th style={{ padding: '12px 10px', fontSize: '0.8rem', fontFamily: 'var(--font-title)', color: 'var(--primary-gold)', textAlign: 'center' }}>
                      {currentT.colActions}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map(b => (
                    <tr 
                      key={b.id} 
                      style={{ 
                        borderBottom: '1px solid #141416',
                        opacity: b.status === 'Cancelled' ? 0.5 : 1,
                        transition: 'var(--transition-smooth)'
                      }}
                      onMouseOver={(e)=>e.currentTarget.style.backgroundColor='#111115'}
                      onMouseOut={(e)=>e.currentTarget.style.backgroundColor='transparent'}
                    >
                      <td style={{ padding: '14px 10px', fontSize: '0.9rem', fontWeight: 600 }}>
                        {b.name}
                      </td>
                      <td style={{ padding: '14px 10px', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                        {b.phone}
                      </td>
                      <td style={{ padding: '14px 10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {b.date}
                      </td>
                      <td style={{ padding: '14px 10px', fontSize: '0.85rem', fontWeight: 500 }}>
                        {b.timeSlot}
                      </td>
                      <td style={{ padding: '14px 10px' }}>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {b.seats.map(s => (
                            <span 
                              key={s} 
                              style={{ 
                                padding: '2px 6px', 
                                backgroundColor: b.status === 'Cancelled' ? '#1c1a1e' : 'var(--crimson)', 
                                color: b.status === 'Cancelled' ? 'var(--text-dark)' : '#fff',
                                borderRadius: '3px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                              }}
                            >
                              S{s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '14px 10px' }}>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: 700,
                          color: b.status === 'Confirmed' ? 'var(--primary-gold)' : (b.status === 'Pending' ? '#e2a106' : 'var(--text-dark)')
                        }}>
                          {b.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '14px 10px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {b.status === 'Pending' && (
                          <button
                            onClick={() => updateBooking(b.id, { status: 'Confirmed' })}
                            className="btn-noir btn-noir-gold"
                            style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                          >
                            {currentT.confirmDirective}
                          </button>
                        )}
                        {b.status !== 'Cancelled' && (
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="btn-noir btn-noir-muted"
                            style={{ padding: '4px 10px', fontSize: '0.7rem', border: '1px solid rgba(153, 0, 0, 0.4)', color: 'var(--crimson)' }}
                          >
                            {currentT.cancelDirective}
                          </button>
                        )}
                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="btn-noir btn-noir-muted"
                          style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                        >
                          {currentT.deleteDirective}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
