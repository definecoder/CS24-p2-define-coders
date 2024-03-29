import React from 'react';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0  flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center justify-center gap-4">
        <img src={"logoBlack.png"} alt="logo" className="mb-4 w-32 h-32 mx-auto" />
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16 mb-4">            
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">EcoSync is loading...</h2>
      </div>
    </div>
  );
};

export default LoadingPage;