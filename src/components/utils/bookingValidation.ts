import type { BookingFormData, BookingFormErrors } from '../../types/BookingForm';

export const validateBookingForm = (
  formData: BookingFormData,
  delivery: 'pickup' | 'delivery',
): BookingFormErrors => {
  const errors: BookingFormErrors = {
    name: '',
    tel: '',
    email: '',
    address: '',
  };

  const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+(?:[ -][A-Za-zА-Яа-яІіЇїЄєҐґ]+)+$/;

  if (!nameRegex.test(formData.name.trim())) {
    errors.name = 'Введіть ім’я та прізвище';
  }

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

  if (delivery === 'delivery' && !formData.address.trim()) {
    errors.address = 'Введіть адресу доставки';
  }

  return errors;
};
