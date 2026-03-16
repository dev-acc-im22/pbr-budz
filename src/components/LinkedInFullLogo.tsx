import React from 'react';
import { Linkedin } from 'lucide-react';

export const LinkedInFullLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center font-bold tracking-tighter ${className}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <span className="text-primary mr-[2px]">Linked</span>
      <div className="bg-primary text-white rounded-[4px] px-[4px] pb-[1px] leading-none flex items-center justify-center">
        in
      </div>
    </div>
  );
};
