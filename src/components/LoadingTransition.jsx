import React from 'react';
import BouncingBall from './game/BouncingBall';

const LoadingTransition = () => {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        <BouncingBall ballNumber={1} ballColor="#003884" />
        <p className="text-lg font-semibold text-[#003884] animate-pulse">
          Resultaten worden berekend...
        </p>
      </div>
    </div>
  );
};

export default LoadingTransition;
