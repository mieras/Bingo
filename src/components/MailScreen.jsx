import React from 'react';
import mailHeaderImage from '../assets/vl-bingo-mail-header.png';
import appBannerImage from '../assets/vl-bingo-app-banner.png';

const MailScreen = ({ onNavigateToAccount, onNavigateToBingo, onPlayNow }) => {
  return (
    <div className="flex overflow-y-auto flex-col w-full h-full bg-white">
      {/* Hero Image Section - Desktop/Mobile responsive */}
      <div className="flex relative justify-center w-full shrink-0">
        <img
          src={mailHeaderImage}
          alt="Bekijk de uitslagen"
          className="h-auto w-full rounded-none md:max-w-[765px] md:rounded-lg"
          style={{
            maxWidth: '480px',
            width: '100%',
            height: 'auto',
            border: 0,
          }}
        />
      </div>

      {/* Main Content Section - Based on HTML structure */}
      <div className="w-full bg-white">
        {/* Content wrapper - max-width 600px, gecentreerd */}
        <div className="mx-auto" style={{ maxWidth: '600px', width: '100%' }}>
          {/* Title */}
          <h1
            className="w-full text-left md:px-11"
            style={{
              fontFamily: "'Laca Text', Calibri, Arial, sans-serif",
              fontSize: 'clamp(28px, 5vw, 40px)',
              lineHeight: 'clamp(32px, 5.5vw, 44px)',
              fontWeight: 800,
              color: '#003884',
              padding: '0 16px 12px',
            }}
          >
            Uitslagen VriendenLoterij Eredivisie Bingo
          </h1>

          {/* Body Text */}
          <p
            className="w-full text-left md:px-11"
            style={{
              fontFamily: "'Laca Text', Calibri, Arial, sans-serif",
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 400,
              color: '#333333',
              padding: '0 16px',
            }}
          >
            De VriendenLoterij Eredivisie Bingo uitslagen van maandag 29 december zijn bekend! Speel{' '}
            <button
              onClick={onNavigateToAccount}
              className="text-[#003884] underline cursor-pointer hover:text-[#002a5f]"
              style={{ color: '#003884' }}
            >
              Bingo
            </button>{' '}
            in je{' '}
            <button
              onClick={onNavigateToAccount}
              className="text-[#003884] underline cursor-pointer hover:text-[#002a5f]"
              style={{ color: '#003884' }}
            >
              mijn account
            </button>{' '}
            of in de VriendenLoterij app om te kijken of je gewonnen hebt.
          </p>

          {/* CTA Button */}
          <div className="w-full md:px-11" style={{ padding: '16px 16px 0' }}>
            <button
              onClick={onNavigateToBingo}
              className="block mx-auto transition-all hover:opacity-90 active:scale-95"
              style={{
                padding: '16px 32px',
                backgroundColor: '#009640',
                borderRadius: '8px',
                borderBottom: '4px solid #087239',
                fontFamily: "'Laca Text', Calibri, Arial, sans-serif",
                fontSize: '16px',
                lineHeight: '16px',
                fontWeight: 700,
                color: '#ffffff',
                textShadow: '0 1px #0c7b3f',
                textDecoration: 'none',
                display: 'block',
                minWidth: '210px',
              }}
            >
              Ga naar de Bingo
            </button>
          </div>
        </div>
      </div>

      {/* VIP-KAART App Promotie Section - Background full width, content in wrapper */}
      <div
        className="relative mt-8 w-full"
        style={{
          padding: '30px 0 0',
          backgroundImage: 'url(https://email.vriendenloterij.nl/images/SMC/VL/2024-wlkm_vip-kaart-bg_lichtblauw_dt.png)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 184px',
        }}
      >
        {/* Content wrapper - max-width 600px, gecentreerd, height 200px */}
        <div className="relative mx-auto" style={{ maxWidth: '600px', width: '100%' }}>
          {/* Mobile: App image bovenaan (alleen op mobile zichtbaar) */}
          <div className="block text-center md:hidden" style={{ padding: '0' }}>
            <img
              src="https://email.vriendenloterij.nl/images/SMC/VL/Uitslagen/app_uitslagen.png"
              alt=""
              style={{ maxWidth: '246px', width: '100%', display: 'block', margin: '0 auto' }}
            />
          </div>

          {/* Desktop layout: table structuur met 3 kolommen */}
          <div className="flex relative items-start w-full" style={{}}>
            {/* Kolom 1: Spacer 43px (alleen desktop) */}
            <div className="hidden md:block" style={{ width: '43px', flexShrink: 0 }}>&nbsp;</div>

            {/* Kolom 2: Content */}
            <div className="flex-1 px-4 md:px-0" style={{ maxWidth: '300px' }}>
              <h3
                className="text-left"
                style={{
                  fontFamily: "'Laca Text', Calibri, Arial, sans-serif",
                  fontSize: '18px',
                  lineHeight: '22px',
                  fontWeight: 700,
                  color: '#003884',
                  padding: '30px 0 6px',
                }}
              >
                Uw VIP-KAART op zak én direct zien of u gewonnen heeft
              </h3>
              <p
                className="text-left"
                style={{
                  fontFamily: "'Laca Text', Calibri, Arial, sans-serif",
                  fontSize: '15px',
                  lineHeight: '16px',
                  fontWeight: 350,
                  color: '#003884',
                  padding: '0',
                }}
              >
                Beleef het in de app
              </p>
              <div className="flex gap-2" style={{ padding: '12px 0 30px' }}>
                <a
                  href="https://apps.apple.com/nl/app/vriendenloterij/id1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download in de App Store"
                  style={{ padding: '0 8px 1px 0' }}
                >
                  <img
                    src="https://email.vriendenloterij.nl/images/SMC/VL/btn_app_store.png"
                    alt="App Store"
                    width="110"
                    height="33"
                    style={{ display: 'block' }}
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=nl.vriendenloterij"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download op Google Play"
                  style={{ padding: '0 0 1px' }}
                >
                  <img
                    src="https://email.vriendenloterij.nl/images/SMC/VL/btn_google_play.png"
                    alt="Google Play"
                    width="110"
                    height="33"
                    style={{ display: 'block' }}
                  />
                </a>
              </div>
            </div>

            {/* Kolom 3: App Image 280px (alleen desktop) */}
            <div className="hidden md:block" style={{ width: '280px', flexShrink: 0, padding: '0' }}>
              <img
                src="https://email.vriendenloterij.nl/images/SMC/VL/Uitslagen/app_uitslagen.png"
                alt=""
                width="246"
                height="207"
                style={{ maxWidth: '246px', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section - Background full width, content in wrapper */}
      <div className="mt-4 w-full" style={{ backgroundColor: '#fcfaf7' }}>
        {/* Content wrapper - max-width 600px, gecentreerd */}
        <div className="mx-auto" style={{ maxWidth: '600px', width: '100%', padding: '40px' }}>
          <div className="flex flex-col items-center w-full">
            {/* Feedback Section */}
            <p
              className="pb-2 text-center"
              style={{
                fontFamily: "'Laca Text', Calibri, Arial, sans-serif",
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 600,
                color: '#515151',
                padding: '0 0 8px',
              }}
            >
              Wat vindt u van deze e-mail?
            </p>
            <div className="flex gap-2 pb-8">
              <a href="#" title="Feedback positief">
                <img
                  alt="Duim omhoog"
                  height="45"
                  src="https://email.vriendenloterij.nl/images/SMC/VL/2024-wlkm_feedback_positief.png"
                  width="45"
                  style={{ display: 'block' }}
                />
              </a>
              <a href="#" title="Feedback negatief">
                <img
                  alt="Duim omlaag"
                  height="45"
                  src="https://email.vriendenloterij.nl/images/SMC/VL/2024-wlkm_feedback_negatief.png"
                  width="45"
                  style={{ display: 'block' }}
                />
              </a>
            </div>

            {/* Social Media */}
            <p
              className="pb-2 text-center"
              style={{
                fontFamily: "'Laca Text', Calibri, Arial, sans-serif",
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 600,
                color: '#515151',
                padding: '0 0 8px',
              }}
            >
              Volg ons:
            </p>
            <div className="flex gap-4 pb-10">
              <a href="https://www.instagram.com/vriendenloterij" target="_blank" rel="noopener noreferrer" title="Instagram">
                <img
                  alt="Instagram"
                  src="https://email.vriendenloterij.nl/images/SMC/VL/202404_icon_instagram.png"
                  width="40"
                  style={{ display: 'block' }}
                />
              </a>
              <a href="https://www.youtube.com/vriendenloterij" target="_blank" rel="noopener noreferrer" title="YouTube">
                <img
                  alt="YouTube"
                  src="https://email.vriendenloterij.nl/images/SMC/VL/202404_icon_youtube.png"
                  width="40"
                  style={{ display: 'block' }}
                />
              </a>
              <a href="https://www.facebook.com/vriendenloterij" target="_blank" rel="noopener noreferrer" title="Facebook">
                <img
                  alt="Facebook"
                  src="https://email.vriendenloterij.nl/images/SMC/VL/202404_icon_facebook.png"
                  width="40"
                  style={{ display: 'block' }}
                />
              </a>
            </div>

            {/* Footer Text */}
            <p
              className="text-center md:px-16"
              style={{
                fontFamily: "'Laca Text', Calibri, Arial, sans-serif",
                fontSize: '14px',
                lineHeight: '22px',
                fontWeight: 350,
                color: '#515151',
                padding: '0 16px',
              }}
            >
              <a href="https://www.vriendenloterij.nl" style={{ color: '#515151' }}>VriendenLoterij</a>,{' '}
              <a href="https://www.vriendenloterij.nl" style={{ textDecoration: 'none', color: '#515151' }}>
                Beethovenstraat 200, 1077 JZ Amsterdam
              </a>
              <br /><br />
              Let op! De afgebeelde prijzen zijn onder voorbehoud. Het Prijzenpakket van VriendenLoterij is wekelijks wisselend.
              <br /><br />
              De vergunning voor de loterij is afgegeven door de Kansspelautoriteit onder kenmerk 300027/14481 d.d. 21/10/2021.
              <br /><br />
              <a href="https://www.vriendenloterij.nl/privacy" style={{ color: '#515151' }}>Privacy Statement</a>
              {' '}
              <a href="https://www.vriendenloterij.nl/uitschrijven" style={{ color: '#515151' }}>Uitschrijven</a>
            </p>

            {/* 18+ Badge */}
            <div className="pt-6">
              <img
                alt="18+ Speel bewust"
                height="31"
                src="https://email.vriendenloterij.nl/images/SMC/VL/2024-wlkm_18plus_speel_bewust.png"
                width="123"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailScreen;
