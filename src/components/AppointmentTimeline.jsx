import React from 'react';

/**
 * AppointmentTimeline
 * Props:
 *  - stages: array of { id, label }
 *  - currentStage: string (id of active stage)
 */
const AppointmentTimeline = ({ stages, currentStage }) => {
  const currentIndex = stages.findIndex(stage => stage.id === currentStage);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
      {stages.map((stage, index) => {
        let status = 'upcoming';
        if (index < currentIndex) status = 'completed';
        if (index === currentIndex) status = 'active';
        if (stage.id === 'cancelled' && currentStage === 'cancelled') status = 'cancelled';

        return (
          <div key={stage.id} className="flex flex-col items-center md:flex-1 relative">
            {/* Dot */}
            <div
              className={`w-6 h-6 rounded-full border-2 
                ${status === 'completed' ? 'bg-green-500 border-green-500' : ''}
                ${status === 'active' ? 'bg-blue-500 border-blue-500 animate-pulse' : ''}
                ${status === 'upcoming' ? 'bg-gray-300 border-gray-300' : ''}
                ${status === 'cancelled' ? 'bg-red-500 border-red-500' : ''}
              `}
            ></div>

            {/* Label */}
            <div
              className={`mt-2 text-sm font-medium 
                ${status === 'completed' ? 'text-green-600' : ''}
                ${status === 'active' ? 'text-blue-600' : ''}
                ${status === 'upcoming' ? 'text-gray-400' : ''}
                ${status === 'cancelled' ? 'text-red-600 line-through' : ''}
              `}
            >
              {stage.label}
            </div>

            {/* Line connecting stages */}
            {index < stages.length - 1 && (
              <div
                className={`hidden md:block absolute top-3 left-1/2 w-full h-1 -translate-x-1/2 z-0 
                  ${index < currentIndex ? 'bg-green-500' : 'bg-gray-300'}
                `}
                style={{ width: '100%' }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentTimeline;