import React, { useState, useEffect } from 'react';
import logoImg from '../assets/vlb-logo.png';

// Roulatie component voor social proof
const RotatingSocialProof = () => {
  const messages = [
    "30k deelnemers vallen in de prijzen deze week",
    "Er wint elke week iemand 25,000 euro met deze Bingo"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0); // Key om re-render te forceren

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
      setKey((prev) => prev + 1); // Force re-render voor animatie
    }, 4000); // Elke 4 seconden wisselen

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="relative h-14 overflow-hidden flex items-center">
      <div key={key} className="animate-slide-up w-full">
        <p className="text-sm font-medium text-gray-700 leading-relaxed">
          {messages[currentIndex]}
        </p>
      </div>
    </div>
  );
};

const StartScreen = ({ onStart, onSkipToResult }) => {
  return (
    <div className="flex flex-col items-center p-4 w-full min-h-full bg-white text-center overflow-y-auto">
      <div className="w-full max-w-md flex flex-col items-center ">

        {/* Logo */}
        <img
          src={logoImg}
          alt="VriendenLoterij Bingo"
          className="w-48 mb-4 object-contain max-w-[160px] drop-shadow-sm"
        />

        {/* Uitleg in 3 stappen met genummerde tiles */}
        <div className="space-y-3 text-gray-700 mb-8 w-full">
          <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003884] text-white font-bold flex items-center justify-center text-sm">
              1
            </div>
            <p className="text-base leading-6 flex-1 pt-0.5">
              Er worden 36 ballen getrokken
            </p>
          </div>
          <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003884] text-white font-bold flex items-center justify-center text-sm">
              2
            </div>
            <p className="text-base leading-6 flex-1 pt-0.5">
              Staat een getrokken bal op je kaart? Vink hem af, en anders doe wij dit voor jou
            </p>
          </div>
          <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003884] text-white font-bold flex items-center justify-center text-sm">
              3
            </div>
            <p className="text-base leading-6 flex-1 pt-0.5">
              Zodra je Bingo hebt stopt het spel en zie je je prijs
            </p>
          </div>
        </div>

        {/* Social Proof Roulatie */}
        <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 shadow-sm min-h-[3.5rem] flex items-center">
          <RotatingSocialProof />
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="w-full py-4 bg-[#003884] text-white font-bold rounded-md shadow-lg hover:bg-blue-800 transition-all active:scale-[0.98] uppercase tracking-wide text-lg mb-3"
        >
          Speel nu
        </button>

        {/* Voetnoot */}
        {onSkipToResult && (
          <p className="text-xs text-gray-600 text-center">
            Geen zin in Bingo spelen,{' '}
            <button
              onClick={onSkipToResult}
              className="text-[#003884] hover:text-blue-700 underline font-medium"
            >
              bekijk direct je prijs
            </button>
          </p>
        )}

      </div>
    </div>
  );
};

export default StartScreen;
