import type { BookingFormData, BookingFormErrors } from '../../types/BookingForm';

export const validateBookingForm = (formData: BookingFormData): BookingFormErrors => {
  const errors: BookingFormErrors = {
    name: '',
    tel: '',
    email: '',
  };

  if (formData.name.trim().length < 2) {
    errors.name = 'Введіть ім’я та прізвище';
  }

  const phoneRegex = /^\+380\d{9}$/;

  if (!phoneRegex.test(formData.tel)) {
    errors.tel = 'Введіть коректний номер телефону';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
    errors.email = 'Введіть коректну електронну адресу';
  }

  return errors;
};
