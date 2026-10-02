import React from 'react';

/**
 * Reusable branded logo loader for Sri Mahalakshmi Caters
 * Displays the restaurant logo with an elegant rotating spinner and pulse glow
 */
export const LogoLoader = ({ 
  message = 'Loading...', 
  subtext = 'Authentic Cuisine & Catering',
  fullScreen = false,
  size = 'md' 
}) => {
  const isLarge = size === 'lg' || fullScreen;
  const isSmall = size === 'sm';

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-[#FFF8EC] min-h-screen px-4'
    : 'flex flex-col items-center justify-center py-12 px-4 w-full';

  const logoDimension = isLarge ? 'w-16 h-16 sm:w-20 sm:h-20' : isSmall ? 'w-8 h-8' : 'w-12 h-12';
  const ringDimension = isLarge ? 'w-24 h-24 sm:w-28 sm:h-28' : isSmall ? 'w-12 h-12' : 'w-16 h-16';

  return (
    <div className={containerClasses} role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4 text-center">
        
        {/* Animated Brand Logo Container */}
        <div className={`relative flex items-center justify-center ${ringDimension}`}>
          {/* Outer glowing pulsing ring */}
          <div className="absolute inset-0 rounded-full bg-[#D4731A]/10 animate-ping" />
          
          {/* Smooth spinning dual-tone accent border */}
          <div 
            className="absolute inset-0 rounded-full border-3 sm:border-4 border-[#1B4332]/20 border-t-[#D4731A] border-r-[#E0B030] animate-spin"
            style={{ animationDuration: '1.2s' }}
          />

          {/* Centered Website Logo */}
          <img 
            src="/logo-sm.svg" 
            alt="Sri Mahalakshmi Logo" 
            className={`${logoDimension} object-contain transition-transform duration-300 drop-shadow-sm animate-pulse`}
          />
        </div>

        {/* Text Details */}
        <div className="space-y-1">
          <h3 
            className="font-heading font-black text-base sm:text-lg text-[#1B4332] tracking-wider uppercase"
          >
            {message}
          </h3>
          {subtext && (
            <p className="text-xs font-semibold text-[#D4731A] tracking-widest uppercase opacity-90">
              {subtext}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default LogoLoader;
