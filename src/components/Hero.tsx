
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
        <div className="browser-frame shadow-soft w-full h-full relative overflow-hidden">
          <div className="browser-top">
            <div className="browser-dot bg-red-400"></div>
            <div className="browser-dot bg-yellow-400 ml-2"></div>
            <div className="browser-dot bg-green-400 ml-2"></div>
            <div className="w-48 h-6 bg-lekker-light-gray rounded-md ml-4"></div>
          </div>
          <div className="p-4 relative h-[calc(100%-48px)] bg-lekker-light-gray">
            {/* Website Canvas */}
            <div className="bg-white h-full rounded-md p-4 relative">
              {/* Header Block */}
              <div className="h-8 bg-lekker-light-gray rounded-md mb-4 flex items-center px-3">
                <div className="w-6 h-3 bg-lekker-purple/30 rounded-sm mr-2"></div>
                <div className="flex space-x-3 ml-auto">
                  <div className="w-10 h-3 bg-lekker-light-gray/80 rounded-sm"></div>
                  <div className="w-10 h-3 bg-lekker-light-gray/80 rounded-sm"></div>
                  <div className="w-10 h-3 bg-lekker-light-gray/80 rounded-sm"></div>
                </div>
              </div>
              
              {/* Content Blocks */}
              <div className="flex gap-4 mb-4">
                <div className="h-24 bg-lekker-light-gray rounded-md w-1/3 flex flex-col justify-center items-center p-2">
                  <div className="w-12 h-12 bg-lekker-purple/20 rounded-full mb-2"></div>
                  <div className="w-16 h-2 bg-lekker-light-gray/80 rounded-sm"></div>
                </div>
                <div className="h-24 bg-lekker-light-gray rounded-md w-2/3 flex flex-col justify-center p-3">
                  <div className="w-3/4 h-3 bg-lekker-light-gray/80 rounded-sm mb-2"></div>
                  <div className="w-full h-2 bg-lekker-light-gray/60 rounded-sm mb-2"></div>
                  <div className="w-5/6 h-2 bg-lekker-light-gray/60 rounded-sm mb-2"></div>
                  <div className="w-2/3 h-2 bg-lekker-light-gray/60 rounded-sm"></div>
                </div>
              </div>
              
              {/* Draggable Element */}
              <div 
                ref={blockRef}
                className="website-block h-16 w-36 bg-lekker-purple/20 border border-lekker-purple/30 rounded-md absolute top-32 left-6 animate-builder-drag"
              >
                <div className="h-3 w-24 bg-white/60 rounded-sm m-2"></div>
                <div className="h-2 w-20 bg-white/40 rounded-sm mx-2"></div>
                <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-lekker-purple/40"></div>
              </div>
              
              {/* Content Grid */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="h-10 bg-lekker-light-gray rounded-md"></div>
                <div className="h-10 bg-lekker-light-gray rounded-md"></div>
                <div className="h-10 bg-lekker-light-gray rounded-md"></div>
              </div>
              
              <div className="mt-4 h-32 bg-lekker-light-gray/50 rounded-md border-2 border-dashed border-lekker-purple/20 flex items-center justify-center animate-pulse-slow">
                <div className="text-lekker-purple/40 text-xs font-medium">Drop Zone</div>
              </div>
              
              {/* Color Palette Sidebar */}
              <div className="absolute right-3 top-14 bottom-4 w-12 bg-white border border-lekker-border-gray rounded-md py-2 px-1">
                <div className="w-8 h-8 rounded-full bg-lekker-purple mb-2 mx-auto"></div>
                <div className="w-8 h-8 rounded-full bg-blue-400 mb-2 mx-auto"></div>
                <div className="w-8 h-8 rounded-full bg-green-400 mb-2 mx-auto"></div>
                <div className="w-8 h-8 rounded-full bg-yellow-400 mb-2 mx-auto"></div>
                <div className="w-8 h-8 rounded-full bg-red-400 mx-auto"></div>
              </div>
              
              {/* Animated Cursor */}
              <div 
                ref={cursorRef} 
                className="cursor-custom animate-cursor-move-realistic"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
