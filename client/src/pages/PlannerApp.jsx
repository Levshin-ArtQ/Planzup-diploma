import React, { useState } from 'react';
import Planer from "./Planer";
import DatePickerExample from './DatePickerExample';
import moment from 'moment';

const PlannerApp = () => {
  const [periods, setPeriods] = useState([
    {
      name: 'Рабочий день',
      type: 'available',
      start: new Date(2024, 5, 1, 9, 0),
      end: new Date(2024, 5, 1, 17, 0),
      status: 'available',
    },
    {
      name: 'Обеденный перерыв',
      type: 'busy',
      start: new Date(2024, 5, 1, 12, 0),
      end: new Date(2024, 5, 1, 13, 0),
      status: 'busy',
    },
    {
      name: 'Выходной',
      type: 'holiday',
      start: new Date(2024, 5, 2),
      end: new Date(2024, 5, 2, 23, 59),
      status: 'holiday',
    },
    {
      name: 'VIP прием',
      type: 'forVIP',
      start: new Date(2024, 6, 10, 10, 0),
      end: new Date(2024, 6, 10, 12, 0),
      status: 'forVIP',
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      client: 'Иван Иванов',
      start: new Date(2024, 5, 1, 10, 0),
      end: new Date(2024, 5, 1, 11, 0),
      status: 'confirmed',
    },
    {
      client: 'Анна Петрова',
      start: new Date(2024, 5, 1, 14, 0),
      end: new Date(2024, 5, 1, 15, 0),
      status: 'confirmed',
    },
    {
      client: 'Сергей Сидоров',
      start: new Date(2024, 6, 10, 10, 0),
      end: new Date(2024, 6, 10, 11, 0),
      status: 'confirmed',
    },
  ]);

  const handleAddPeriod = (newPeriod) => {
    const updatedPeriods = periods.filter(period => 
      newPeriod.end <= period.start || newPeriod.start >= period.end
    );

    setPeriods([...updatedPeriods, newPeriod].sort((a, b) => a.start - b.start));
  };

  const handleAddAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <div>
      <Planer
        periods={periods}
        appointments={appointments}
        onAddPeriod={handleAddPeriod}
        onAddAppointment={handleAddAppointment}
      />
      <DatePickerExample />
    </div>
  );
};

export default PlannerApp;
