import React, { useState } from 'react';
import { BookingContext } from './BookingContext';
import type { Booking } from './BookingContext';

export const BookingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (booking: Booking) => {
    setBookings((currentBookings) => [...currentBookings, booking]);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
