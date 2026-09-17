import { createContext } from 'react';
import type { DateRange } from '../types/DateRange';

export interface Booking {
  equipmentId: number;
  city: string;
  dates: DateRange;
}

export interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
}

export const BookingContext = createContext<BookingContextType | null>(null);
