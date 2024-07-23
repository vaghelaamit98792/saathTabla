import React from 'react';

export const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};
