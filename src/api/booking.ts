import { api } from './client';

export interface BookingCreateRequest {
  equipment: string;
  city: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  start_date: string;
  end_date: string;
  delivery_method: 'pickup' | 'courier';
  delivery_address?: string;
  payment_method: 'cash' | 'transfer';
  comment?: string;
}

export interface BookingCreateResponse {
  number: string;
  equipment_name: string;
  start_date: string;
  end_date: string;
  delivery_method: 'pickup' | 'courier';
  payment_method: 'cash' | 'transfer';
  status: string;
  rental_days: number;
  price_per_day: string;
  delivery_fee: string;
  discount_amount: string;
  total_price: string;
  created_at: string;
}

export const createBooking = (
  booking: BookingCreateRequest,
): Promise<BookingCreateResponse> => {
  return api.post<BookingCreateResponse>('/bookings/', booking);
};
