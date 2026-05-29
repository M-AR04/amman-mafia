import React, { createContext, useState, useEffect } from 'react';

export const GameStateContext = createContext();

// Helper to format date as YYYY-MM-DD in local time
export const getLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const GameStateProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('am_language') || 'ar';
  });

  // Map pathname to internal page names
  const getPageFromPath = (path) => {
    switch (path.toLowerCase()) {
      case '/':
      case '':
        return 'home';
      case '/operations':
      case '/services':
        return 'services';
      case '/booking':
      case '/book':
        return 'booking';
      case '/dashboard':
      case '/control':
      case '/admin':
        return 'admin';
      default:
        return 'home';
    }
  };

  // Map internal page names to canonical URLs
  const getPathFromPage = (page) => {
    switch (page) {
      case 'home':
        return '/';
      case 'services':
        return '/operations';
      case 'booking':
        return '/booking';
      case 'admin':
        return '/dashboard';
      default:
        return '/';
    }
  };

  const [currentPage, setCurrentPageState] = useState(() => {
    return getPageFromPath(window.location.pathname);
  });

  const setCurrentPage = (page) => {
    const targetPath = getPathFromPage(page);
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    setCurrentPageState(page);
  };

  // Keep state in sync with browser forward/back button popstates
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPageState(getPageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [announcement, setAnnouncement] = useState(() => {
    return localStorage.getItem('am_announcement') || '🎭 Welcome to the Amman Mafia Syndicate. Secure your seat at the round table for the ultimate strategic battle! 🎭';
  });

  const [maintenanceMode, setMaintenanceMode] = useState(() => {
    return localStorage.getItem('am_maintenance_mode') === 'true';
  });

  const [maintenanceMessage, setMaintenanceMessage] = useState(() => {
    return localStorage.getItem('am_maintenance_message') || 'The Syndicate is currently restructuring. Please check back later, family.';
  });

  const [workingHours, setWorkingHours] = useState(() => {
    const saved = localStorage.getItem('am_working_hours');
    return saved ? JSON.parse(saved) : { start: '18:00', end: '00:00' };
  });

  const [sessionDuration, setSessionDuration] = useState(() => {
    return Number(localStorage.getItem('am_session_duration')) || 2; // in hours
  });

  const [maxSeats, setMaxSeats] = useState(() => {
    return Number(localStorage.getItem('am_max_seats')) || 15;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('am_bookings');
    if (saved) return JSON.parse(saved);

    // Default Seed Bookings
    const today = getLocalDateString(new Date());
    const tomorrow = getLocalDateString(new Date(Date.now() + 86400000));
    
    return [
      {
        id: 'bk-1',
        name: 'Tareq Al-Hasan',
        phone: '0791234567',
        date: today,
        timeSlot: '18:00 - 20:00',
        seats: [3, 4],
        status: 'Confirmed'
      },
      {
        id: 'bk-2',
        name: 'Layan Kawar',
        phone: '0787654321',
        date: today,
        timeSlot: '20:00 - 22:00',
        seats: [7],
        status: 'Pending'
      },
      {
        id: 'bk-3',
        name: 'Ahmad Masri',
        phone: '0779988776',
        date: tomorrow,
        timeSlot: '18:00 - 20:00',
        seats: [1, 2],
        status: 'Confirmed'
      },
      {
        id: 'bk-4',
        name: 'Nour Haddad',
        phone: '0790001112',
        date: tomorrow,
        timeSlot: '22:00 - 00:00',
        seats: [12, 13],
        status: 'Pending'
      }
    ];
  });

  // Save states to local storage
  useEffect(() => {
    localStorage.setItem('am_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('am_announcement', announcement);
  }, [announcement]);

  useEffect(() => {
    localStorage.setItem('am_maintenance_mode', maintenanceMode);
  }, [maintenanceMode]);

  useEffect(() => {
    localStorage.setItem('am_maintenance_message', maintenanceMessage);
  }, [maintenanceMessage]);

  useEffect(() => {
    localStorage.setItem('am_working_hours', JSON.stringify(workingHours));
  }, [workingHours]);

  useEffect(() => {
    localStorage.setItem('am_session_duration', sessionDuration);
  }, [sessionDuration]);

  useEffect(() => {
    localStorage.setItem('am_max_seats', maxSeats);
  }, [maxSeats]);

  useEffect(() => {
    localStorage.setItem('am_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Generate Slots dynamically based on working hours and session duration
  const getTimeSlots = () => {
    const slots = [];
    const [startHour, startMin] = workingHours.start.split(':').map(Number);
    const [endHour, endMin] = workingHours.end.split(':').map(Number);

    let currentHour = startHour;
    let currentMin = startMin;

    // Handle overnight operating hours (e.g. 18:00 to 02:00)
    const endMinutesTotal = (endHour < startHour ? endHour + 24 : endHour) * 60 + endMin;
    let currentMinutesTotal = startHour * 60 + startMin;

    while (currentMinutesTotal + sessionDuration * 60 <= endMinutesTotal) {
      const slotStartHour = Math.floor(currentMinutesTotal / 60) % 24;
      const slotStartMin = currentMinutesTotal % 60;

      const nextMinutesTotal = currentMinutesTotal + sessionDuration * 60;
      const slotEndHour = Math.floor(nextMinutesTotal / 60) % 24;
      const slotEndMin = nextMinutesTotal % 60;

      const formatTime = (h, m) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      slots.push(`${formatTime(slotStartHour, slotStartMin)} - ${formatTime(slotEndHour, slotEndMin)}`);

      currentMinutesTotal = nextMinutesTotal;
    }
    return slots;
  };

  // Get occupied seats for a given date and timeSlot
  const getOccupiedSeats = (date, timeSlot) => {
    const activeBookings = bookings.filter(
      b => b.date === date && b.timeSlot === timeSlot && b.status !== 'Cancelled'
    );
    const occupied = [];
    activeBookings.forEach(b => {
      occupied.push(...b.seats);
    });
    return occupied;
  };

  // Get seat assignment mapping for a slot (shows which seats belong to whom)
  const getSeatAssignments = (date, timeSlot) => {
    const activeBookings = bookings.filter(
      b => b.date === date && b.timeSlot === timeSlot && b.status !== 'Cancelled'
    );
    const assignments = {};
    activeBookings.forEach(b => {
      b.seats.forEach(seat => {
        assignments[seat] = {
          bookingId: b.id,
          name: b.name,
          status: b.status
        };
      });
    });
    return assignments;
  };

  // Add a new booking
  const addBooking = (bookingData) => {
    const newBooking = {
      id: `bk-${Date.now()}`,
      status: bookingData.status || 'Pending',
      ...bookingData
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  // Update a booking
  const updateBooking = (id, updatedFields) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  // Cancel a booking
  const cancelBooking = (id) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
  };

  // Delete a booking completely
  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  return (
    <GameStateContext.Provider
      value={{
        language,
        setLanguage,
        currentPage,
        setCurrentPage,
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
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
