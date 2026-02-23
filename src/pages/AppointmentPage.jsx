import React, { useState } from 'react';
import AppointmentTimeline from '../components/AppointmentTimeline';

const AppointmentPage = () => {
  const stages = [
    { id: 'requested', label: 'Requested' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'in_consultation', label: 'In Consultation' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const [currentStage, setCurrentStage] = useState('in_consultation');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Appointment Status</h1>
      <AppointmentTimeline stages={stages} currentStage={currentStage} />
    </div>
  );
};

export default AppointmentPage;