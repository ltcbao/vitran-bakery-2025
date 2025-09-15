import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div 
      className="w-16 h-16 border-4 border-brand-pink border-t-brand-accent rounded-full animate-spin"
      role="status"
      aria-label="Loading menu items"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
