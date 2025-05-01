import React from 'react';
import QueueSystem from '../components/QueueSystem';

const QueueManagement = () => {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Queue Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track and manage customer orders in real-time
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <QueueSystem />
      </div>
    </div>
  );
};

export default QueueManagement; 