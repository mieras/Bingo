import React from 'react';
import ContentWrapper from './ContentWrapper';
import accountOverviewImage from '../assets/vl-ma-overview.png';

const AccountHomeScreen = ({ onNavigateToMail, onNavigateToBingo }) => {
  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Mock Image - Klikbaar naar Bingo Overview */}
        <button
          onClick={onNavigateToBingo}
          className="w-full shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
          aria-label="Ga naar Bingo overzicht"
        >
          <img 
            src={accountOverviewImage} 
            alt="Mijn Account Overzicht"
            className="w-full h-auto object-cover pointer-events-none"
          />
        </button>

        <ContentWrapper className="flex flex-col p-6">
          {/* Speel Nu en Bingo Links */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={onNavigateToBingo}
              className="w-full bg-[#009b00] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#007900] transition-colors uppercase tracking-wide text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#009b00]"
            >
              Speel Nu
            </button>
            
            <button
              onClick={onNavigateToBingo}
              className="w-full bg-[#003884] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#002a5f] transition-colors uppercase tracking-wide text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003884]"
            >
              Bingo
            </button>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default AccountHomeScreen;
