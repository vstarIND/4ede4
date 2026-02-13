
import React, { useState } from 'react';
import { WaitlistForm } from './WaitlistForm';

interface HeroSectionProps {
  onAdminClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAdminClick }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    if (newCount >= 5) {
      onAdminClick();
      setClickCount(0);
    } else {
      setClickCount(newCount);
      // Reset count after 2 seconds of inactivity
      setTimeout(() => setClickCount(0), 2000);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 md:py-20 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
      <div className="scanline pointer-events-none" />
      
      {/* HUD Decorative Elements - Hidden on Mobile */}
      <div className="absolute top-10 left-10 w-32 h-32 border-t border-l border-[#00ffff]/20 pointer-events-none hidden md:block" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-b border-r border-[#00ffff]/20 pointer-events-none hidden md:block" />
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#00ffff] opacity-[0.03] blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#00ffff] opacity-[0.03] blur-[150px] rounded-full pointer-events-none animate-pulse" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16">
        
        {/* Left Side: Brand & Messaging */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 md:mb-8 rounded-sm border-l-2 border-[#00ffff] bg-[#00ffff]/5 text-[#00ffff] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ffff]"></span>
            </span>
            Waitlist is Live: Free Course Access Open
          </div>
          
          <h1 
            onClick={handleLogoClick}
            className="font-display text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6 md:mb-8 italic cursor-default select-none transition-transform active:scale-95"
          >
            EDUNETIC<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#008888]">INDIA</span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-400 font-light mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed px-4 md:px-0">
            School teaches what's in the books. We teach what's in the <span className="text-white border-b border-[#00ffff]/30">real world</span>. Join us to learn skills that actually matter for your career.
          </p>

          {/* Skill Checklist - Now Hidden on Mobile to reduce clutter as per request */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0">
            {[
              "Artificial Intelligence Basics",
              "New-Age School Syllabus",
              "Money & Financial Literacy",
              "Leadership & Confidence"
            ].map((skill, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="h-[1px] w-6 bg-[#00ffff]/40 group-hover:w-10 transition-all duration-300" />
                <span className="text-gray-500 text-sm font-medium tracking-wide group-hover:text-[#00ffff] transition-colors">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: High-Tech Form & Counter */}
        <div className="w-full max-w-lg flex flex-col gap-6 float-element">
          {/* Live Slot Counter */}
          <div className="glass-panel p-4 rounded-lg border border-[#00ffff]/20 bg-black/60 relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ffff] animate-pulse" />
                <span className="text-[10px] font-mono text-[#00ffff] tracking-widest uppercase">Live Enrollment Status</span>
              </div>
              <span className="text-[10px] font-mono text-gray-500 uppercase">Batch Alpha</span>
            </div>
            
            <div className="flex justify-between items-end mb-1">
              <div className="text-2xl font-display font-black text-white tracking-tighter">
                47 <span className="text-gray-600 text-sm font-normal">/ 50</span>
              </div>
              <div className="text-[10px] text-[#00ffff] font-mono mb-1">94% SECURED</div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-[#00ffff] to-[#008888] shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all duration-1000"
                style={{ width: '22%' }}
              />
            </div>
          </div>

          <WaitlistForm />
        </div>

      </div>

      {/* Aesthetic Coordinates / HUD Footer - Hidden on very small screens */}
      <div className="absolute bottom-5 md:bottom-10 left-10 text-[8px] md:text-[10px] text-gray-700 font-mono tracking-widest hidden md:block uppercase">
        Future Ready // Skill Gap Solution // Edunetic India
      </div>
      
      <div className="absolute bottom-5 md:bottom-10 right-10 flex items-center gap-4 md:gap-6 group">
        <div className="h-px w-10 md:w-20 bg-gray-800 group-hover:bg-[#00ffff] transition-all duration-300" />
        <button 
          onClick={(e) => {
            e.preventDefault();
            onAdminClick();
          }}
          className="text-gray-600 md:text-gray-500 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase hover:text-[#00ffff] hover:scale-105 transition-all focus:outline-none cursor-pointer p-4 -m-4 font-bold"
          title="Administrative Access"
        >
          Building New India
        </button>
      </div>
    </div>
  );
};
