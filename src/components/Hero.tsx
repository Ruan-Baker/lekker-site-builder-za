
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
        <div className="relative z-10 mx-auto w-[320px] h-[620px] bg-white rounded-[36px] border-[12px] border-lekker-border-gray shadow-lg overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-8 bg-white flex items-center justify-center">
            <div className="w-16 h-1.5 bg-lekker-border-gray rounded-full"></div>
          </div>
          <div className="w-full h-full pt-8 bg-lekker-light-gray">
            <div className="bg-white h-14 flex items-center px-4 border-b border-lekker-border-gray">
              <div className="w-8 h-8 rounded-full bg-lekker-purple flex items-center justify-center">
                <span className="text-white text-xs font-bold">LS</span>
              </div>
              <div className="ml-3">
                <div className="w-20 h-2 bg-lekker-border-gray rounded-full"></div>
                <div className="w-16 h-2 bg-lekker-border-gray rounded-full mt-2 opacity-70"></div>
              </div>
              <div className="ml-auto">
                <div className="w-8 h-8 flex items-center justify-center rounded-full">
                  <svg className="w-5 h-5 text-lekker-gray" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="w-full h-40 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-lekker-purple" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 18L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div className="w-full h-6 bg-white rounded-md mb-3"></div>
              <div className="w-4/5 h-4 bg-white rounded-md mb-6"></div>
              
              {/* Draggable Element */}
              <div 
                ref={blockRef}
                className="website-block h-16 w-36 bg-lekker-purple/20 border border-lekker-purple/30 rounded-md absolute top-48 left-16 animate-builder-drag-slow"
              >
                <div className="h-3 w-24 bg-white/60 rounded-sm m-2"></div>
                <div className="h-2 w-20 bg-white/40 rounded-sm mx-2"></div>
                <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-lekker-purple/40"></div>
              </div>
              
              <div className="w-full h-24 bg-white rounded-lg shadow-sm flex items-center p-3 mb-4">
                <div className="w-16 h-16 rounded-md bg-lekker-light-gray"></div>
                <div className="ml-3">
                  <div className="w-20 h-3 bg-lekker-light-gray rounded-md"></div>
                  <div className="w-28 h-2 bg-lekker-light-gray rounded-md mt-2"></div>
                  <div className="w-16 h-2 bg-lekker-light-gray rounded-md mt-2"></div>
                </div>
              </div>
              <div className="w-full h-24 bg-white rounded-lg shadow-sm flex items-center p-3">
                <div className="w-16 h-16 rounded-md bg-lekker-light-gray"></div>
                <div className="ml-3">
                  <div className="w-20 h-3 bg-lekker-light-gray rounded-md"></div>
                  <div className="w-28 h-2 bg-lekker-light-gray rounded-md mt-2"></div>
                  <div className="w-16 h-2 bg-lekker-light-gray rounded-md mt-2"></div>
                </div>
              </div>
              
              <div className="mt-4 h-32 bg-lekker-light-gray/50 rounded-md border-2 border-dashed border-lekker-purple/20 flex items-center justify-center animate-pulse-slow">
                <div className="text-lekker-purple/40 text-xs font-medium">Drop Zone</div>
              </div>
              
              {/* Animated Cursor */}
              <div 
                ref={cursorRef} 
                className="cursor-custom animate-cursor-move-slow"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
