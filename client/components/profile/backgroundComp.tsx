// components/BackgroundComponent.tsx
"use client";

import React from 'react';

const BackgroundComponent: React.FC = () => {
  return (
    <div
      className="relative top-[-150px] bg-cover bg-center mx-auto h-80 md:h-96 lg:h-380"
      style={{
        backgroundImage: `url('/profileBack.png')`
      }}
    >
      
    </div>
  );
};

export default BackgroundComponent;
