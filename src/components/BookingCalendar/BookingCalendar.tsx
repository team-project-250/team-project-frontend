import React, { useState } from 'react';
import { Popover, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import type { DateRange } from '../../types/DateRange';
import './BookingCalendar.scss';
import type { Booking } from '../../context/BookingContext';

type Props = {
  availableUntil?: string;
  bookings: Booking[];
  equipmentId: number;
  city: string;
  onDateChange: (range: DateRange) => void;
};

export const BookingCalendar: React.FC<Props> = ({
  availableUntil,
  bookings,
  equipmentId,
  city,
  onDateChange,
}) => {
  const [range, setRange] = useState<DateRange>([null, null]);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  const handleDateChange = (value: DateRange) => {
    const [startDate, endDate] = value;

    if (!startDate && !endDate && range[0] && !range[1]) {
      const singleDayRange: DateRange = [range[0], range[0]];

      setRange(singleDayRange);
      onDateChange(singleDayRange);

      return;
    }

    setRange(value);
    onDateChange(value);
  };

  const isBookedDate = (date: string) => {
    if (availableUntil) {
      if (date <= availableUntil) {
        return true;
      }
    }

    return bookings.some((booking) => {
      if (booking.equipmentId !== equipmentId || booking.city !== city) {
        return false;
      }

      const [startDate, endDate] = booking.dates;

      if (!startDate || !endDate) {
        return false;
      }

      return date >= startDate && date <= endDate;
    });
  };

  const renderDay = (date: string) => {
    const isBooked = isBookedDate(date);

    return (
      <div
        style={{
          textDecoration: isBooked ? 'line-through' : 'none',
        }}
      >
        {dayjs(date).date()}
      </div>
    );
  };

  return (
    <div className="booking-calendar">
      <Popover
        opened={opened}
        onChange={setOpened}
        position="bottom"
        withArrow={false}
        shadow="md"
      >
        <Popover.Target>
          <TextInput
            readOnly
            value={
              range[0] && range[1]
                ? `${dayjs(range[0]).format('DD.MM.YYYY')} — ${dayjs(range[1]).format('DD.MM.YYYY')}`
                : range[0]
                  ? `${dayjs(range[0]).format('DD.MM.YYYY')} —`
                  : ''
            }
            placeholder="Оберіть дати"
            leftSection={
              <span className="booking-calendar__calendar-icon icon icon--calendar" />
            }
            onClick={() => setOpened((value) => !value)}
            classNames={{
              input: 'booking-calendar__input',
            }}
            styles={{
              input: {
                textAlign: 'center',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '15px',
                lineHeight: '22px',
                fontWeight: 500,
                borderRadius: '4px',
                border: '1px solid #0f0f11',
              },
            }}
          />
        </Popover.Target>

        <Popover.Dropdown className="booking-calendar__dropdown">
          <DatePicker
            type="range"
            value={range}
            onChange={handleDateChange}
            minDate={new Date()}
            locale="uk"
            firstDayOfWeek={1}
            monthLabelFormat={(date) => {
              const monthNames = [
                'Січень',
                'Лютий',
                'Березень',
                'Квітень',
                'Травень',
                'Червень',
                'Липень',
                'Серпень',
                'Вересень',
                'Жовтень',
                'Листопад',
                'Грудень',
              ];

              return `${monthNames[dayjs(date).month()]}\n${dayjs(date).year()}`;
            }}
            excludeDate={isBookedDate}
            renderDay={renderDay}
            getDayProps={(date) => {
              const currentDate = dayjs(date).format('YYYY-MM-DD');
              const startDate = range[0];
              const endDate = range[1] || hoveredDate;

              const isStart = currentDate === startDate;
              const isEnd = currentDate === endDate;

              const isInRange =
                isStart ||
                Boolean(
                  startDate &&
                  endDate &&
                  currentDate >= startDate &&
                  currentDate <= endDate,
                );

              return {
                inRange: false,

                onMouseEnter: () => {
                  if (range[0] && !range[1]) {
                    setHoveredDate(currentDate);
                  }
                },

                onMouseLeave: () => {
                  setHoveredDate(null);
                },

                style: {
                  backgroundColor: isInRange ? '#f2c300' : undefined,
                  color: isInRange ? '#0f0f11' : undefined,
                  borderRadius: isStart ? '3px' : isEnd ? '3px' : undefined,
                },
              };
            }}
            headerControlsOrder={['previous', 'level', 'next']}
            classNames={{
              calendarHeader: 'booking-calendar__header',
              calendarHeaderControl: 'booking-calendar__header-control',
              calendarHeaderLevel: 'booking-calendar__header-level',
              weekday: 'booking-calendar__weekday',
            }}
            styles={{
              day: {
                width: '45px',
                height: '45px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
              },
              calendarHeader: {
                maxWidth: '100%',
                marginBottom: '16px',
              },
              calendarHeaderLevel: {
                textAlign: 'center',
              },
            }}
          />

          <div className="booking-calendar__legend">
            <div className="booking-calendar__legend-item text__body text__body--label">
              <span className="booking-calendar__legend-selected" />

              <span>Вибрані</span>
            </div>

            <div className="booking-calendar__legend-item text__body text__body--label">
              <span className="booking-calendar__legend-booked">123</span>

              <span>Заброньовано</span>
            </div>
          </div>

          <button
            type="button"
            className="booking-calendar__done text text__body text__body--label"
            onClick={() => setOpened(false)}
          >
            Готово
          </button>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};
