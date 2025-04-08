
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
              <div className="h-8 bg-lekker-light-gray rounded-md mb-4"></div>
              
              {/* Content Blocks */}
              <div className="flex gap-4 mb-4">
                <div className="h-24 bg-lekker-light-gray rounded-md w-1/3"></div>
                <div className="h-24 bg-lekker-light-gray rounded-md w-2/3"></div>
              </div>
              
              {/* Draggable Element */}
              <div 
                ref={blockRef}
                className="h-12 w-24 bg-lekker-purple/20 rounded-md absolute top-32 left-6 animate-drag"
              ></div>
              
              <div className="flex gap-4">
                <div className="h-32 bg-lekker-light-gray rounded-md w-full"></div>
              </div>
              
              {/* Animated Cursor */}
              <div 
                ref={cursorRef} 
                className="cursor-custom animate-cursor-move"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
