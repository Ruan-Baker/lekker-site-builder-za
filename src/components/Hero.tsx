
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation observer setup
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animationElements = document.querySelectorAll('.section-animation-container');
    animationElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      animationElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section className="section-padding bg-white flex flex-col lg:flex-row items-center">
      <div className="w-full lg:w-1/2 pr-0 lg:pr-12 mb-12 lg:mb-0 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-lekker-black">
          Build Stunning Websites for Your South African Business
        </h1>
        <p className="text-lg font-normal leading-relaxed text-lekker-gray mt-6">
          Create professional websites in minutes with our easy-to-use drag-and-drop builder, designed specifically for South African SMEs.
        </p>
        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <Button className="btn-primary">Start Building Free</Button>
          <Button variant="outline" className="btn-secondary">View Templates</Button>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[500px]">
        {/* Desktop Browser Mockup */}
        <div className="relative z-10 mx-auto w-full max-w-[500px] bg-white rounded-lg border border-lekker-border-gray shadow-lg overflow-hidden">
          {/* Browser Chrome */}
          <div className="bg-lekker-light-gray p-3 border-b border-lekker-border-gray flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-grow mx-4">
              <div className="bg-white w-full h-6 rounded-md border border-lekker-border-gray flex items-center px-3">
                <div className="w-4 h-4 mr-2">
                  <svg viewBox="0 0 24 24" fill="none" className="text-lekker-gray w-4 h-4">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-xs text-lekker-gray truncate">lekkersites.co.za</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="none" className="text-lekker-gray w-4 h-4">
                  <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="none" className="text-lekker-gray w-4 h-4">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Website Content */}
          <div className="h-[300px] bg-white relative overflow-hidden">
            {/* Website Header */}
            <div className="w-full h-14 border-b border-lekker-border-gray flex items-center px-5 justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-lekker-purple flex items-center justify-center">
                  <span className="text-white text-xs font-bold">LS</span>
                </div>
                <div className="font-medium text-sm">Lekker Business</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-8 h-2 bg-lekker-light-gray rounded-full"></div>
                <div className="w-8 h-2 bg-lekker-light-gray rounded-full"></div>
                <div className="w-8 h-2 bg-lekker-light-gray rounded-full"></div>
                <div className="w-8 h-2 bg-lekker-light-gray rounded-full"></div>
              </div>
            </div>
            
            {/* Builder Interface */}
            <div className="flex h-full">
              {/* Left Sidebar */}
              <div className="w-[70px] border-r border-lekker-border-gray h-full py-3 flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-md bg-lekker-light-gray flex items-center justify-center">
                  <svg className="w-5 h-5 text-lekker-gray" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 9H21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-md bg-lekker-purple/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-lekker-purple" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 18L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-md bg-lekker-light-gray flex items-center justify-center">
                  <svg className="w-5 h-5 text-lekker-gray" viewBox="0 0 24 24" fill="none">
                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-md bg-lekker-light-gray flex items-center justify-center">
                  <svg className="w-5 h-5 text-lekker-gray" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              
              {/* Main Canvas */}
              <div className="flex-grow bg-lekker-light-gray/30 p-5 relative">
                {/* Hero Section Being Built */}
                <div className="w-full bg-white rounded-lg h-40 mb-5 p-4 flex flex-col items-center justify-center border border-lekker-border-gray">
                  <div className="w-48 h-4 bg-lekker-light-gray rounded-full mb-2"></div>
                  <div className="w-64 h-3 bg-lekker-light-gray/70 rounded-full mb-4"></div>
                  <div className="w-32 h-8 bg-lekker-light-gray rounded-md"></div>
                </div>
                
                {/* Draggable Element - Shows drag animation */}
                <div 
                  ref={blockRef}
                  className="website-block h-20 w-48 bg-lekker-purple/20 border border-lekker-purple/30 rounded-md absolute top-48 left-16 animate-builder-drag-slow"
                >
                  <div className="h-3 w-32 bg-white/60 rounded-sm m-2"></div>
                  <div className="h-2 w-24 bg-white/40 rounded-sm mx-2 mb-1"></div>
                  <div className="flex m-2 gap-1">
                    <div className="h-6 w-6 bg-white/70 rounded-sm"></div>
                    <div className="h-6 w-6 bg-white/70 rounded-sm"></div>
                    <div className="h-6 w-6 bg-white/70 rounded-sm"></div>
                  </div>
                  <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-lekker-purple/40"></div>
                </div>
                
                {/* Drop Zone */}
                <div className="mt-4 h-32 bg-white/80 rounded-lg border-2 border-dashed border-lekker-purple/30 flex items-center justify-center mb-3">
                  <div className="text-lekker-purple/60 text-xs font-medium">Drop Section Here</div>
                </div>
                
                {/* Features Section Placeholder */}
                <div className="w-full bg-white rounded-lg h-16 border border-lekker-border-gray p-2 flex gap-2">
                  <div className="w-1/3 h-full bg-lekker-light-gray/50 rounded"></div>
                  <div className="w-1/3 h-full bg-lekker-light-gray/50 rounded"></div>
                  <div className="w-1/3 h-full bg-lekker-light-gray/50 rounded"></div>
                </div>
                
                {/* Animated Cursor */}
                <div 
                  ref={cursorRef} 
                  className="cursor-custom animate-cursor-move-slow"
                ></div>
              </div>
              
              {/* Right Props Panel */}
              <div className="w-[120px] border-l border-lekker-border-gray h-full py-3 px-2">
                <div className="text-xs font-medium text-lekker-gray mb-2 px-2">Properties</div>
                <div className="space-y-3">
                  <div className="w-full h-6 bg-lekker-light-gray rounded-md"></div>
                  <div className="w-full h-6 bg-lekker-light-gray rounded-md"></div>
                  <div className="w-full h-24 bg-lekker-light-gray rounded-md"></div>
                  <div className="w-full h-6 bg-lekker-light-gray rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
