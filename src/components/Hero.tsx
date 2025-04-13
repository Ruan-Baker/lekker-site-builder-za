
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
    <section className="section-padding bg-perspective-white min-h-[90vh] flex flex-col lg:flex-row items-center justify-center relative overflow-hidden py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-perspective-light-gray/20 to-transparent opacity-60 z-0"></div>
      
      <div className="w-full lg:w-1/2 pr-0 lg:pr-16 mb-16 lg:mb-0 space-y-6 z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Build <span className="gradient-text">stunning websites</span> for your South African business
        </h1>
        <p className="text-xl font-normal leading-relaxed text-perspective-gray mt-6 max-w-xl">
          Create professional websites and funnels in minutes with our intuitive drag-and-drop builder, designed specifically for South African SMEs.
        </p>
        <div className="pt-8 flex flex-col sm:flex-row gap-4">
          <Link to="/builder">
            <Button className="btn-gradient text-lg group px-8 py-6">
              Start Building Free
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" className="btn-secondary text-lg px-8 py-6">
            View Templates
          </Button>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 relative h-[450px] sm:h-[550px] z-10">
        <div className="browser-frame shadow-soft w-full h-full relative overflow-hidden">
          <div className="browser-top bg-perspective-white border-b border-perspective-light-gray/20">
            <div className="browser-dot bg-red-400"></div>
            <div className="browser-dot bg-yellow-400 ml-2"></div>
            <div className="browser-dot bg-green-400 ml-2"></div>
            <div className="w-48 h-6 bg-perspective-light-gray rounded-md ml-4"></div>
          </div>
          <div className="p-6 relative h-[calc(100%-48px)] bg-gradient-radial from-perspective-light-gray to-perspective-white">
            {/* Website Canvas */}
            <div className="bg-perspective-white h-full rounded-lg p-6 relative shadow-softer">
              {/* Header Block */}
              <div className="h-10 bg-perspective-light-gray/50 rounded-lg mb-6 flex items-center px-4">
                <div className="w-8 h-4 bg-perspective-purple/30 rounded-sm mr-3"></div>
                <div className="flex space-x-5 ml-auto">
                  <div className="w-12 h-3 bg-perspective-light-gray/80 rounded-sm"></div>
                  <div className="w-12 h-3 bg-perspective-light-gray/80 rounded-sm"></div>
                  <div className="w-12 h-3 bg-perspective-light-gray/80 rounded-sm"></div>
                </div>
              </div>
              
              {/* Hero Block */}
              <div className="h-28 bg-perspective-light-gray/30 rounded-lg mb-6 p-4 flex flex-col justify-center">
                <div className="w-2/3 h-5 bg-perspective-light-gray/60 rounded-sm mb-3"></div>
                <div className="w-1/2 h-3 bg-perspective-light-gray/60 rounded-sm mb-2"></div>
                <div className="w-1/3 h-3 bg-perspective-light-gray/60 rounded-sm"></div>
                <div className="mt-4 flex gap-3">
                  <div className="w-20 h-6 bg-perspective-purple/30 rounded-md"></div>
                  <div className="w-20 h-6 bg-perspective-light-gray/80 rounded-md"></div>
                </div>
              </div>
              
              {/* Draggable Element */}
              <div 
                ref={blockRef}
                className="website-block h-24 w-48 bg-gradient-purple-blue/20 border border-perspective-purple/30 rounded-lg absolute top-44 left-8 animate-builder-drag backdrop-blur-sm"
              >
                <div className="h-4 w-32 bg-white/60 rounded-sm m-3 mb-2"></div>
                <div className="h-3 w-28 bg-white/40 rounded-sm mx-3 mb-1"></div>
                <div className="h-3 w-24 bg-white/30 rounded-sm mx-3"></div>
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-perspective-purple/40"></div>
              </div>
              
              {/* Content Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="h-16 bg-perspective-light-gray/40 rounded-lg p-3">
                  <div className="w-full h-3 bg-perspective-light-gray/60 rounded-sm mb-2"></div>
                  <div className="w-2/3 h-3 bg-perspective-light-gray/60 rounded-sm"></div>
                </div>
                <div className="h-16 bg-perspective-light-gray/40 rounded-lg p-3">
                  <div className="w-full h-3 bg-perspective-light-gray/60 rounded-sm mb-2"></div>
                  <div className="w-2/3 h-3 bg-perspective-light-gray/60 rounded-sm"></div>
                </div>
                <div className="h-16 bg-perspective-light-gray/40 rounded-lg p-3">
                  <div className="w-full h-3 bg-perspective-light-gray/60 rounded-sm mb-2"></div>
                  <div className="w-2/3 h-3 bg-perspective-light-gray/60 rounded-sm"></div>
                </div>
              </div>
              
              <div className="h-40 bg-perspective-light-gray/30 rounded-lg border-2 border-dashed border-perspective-purple/20 flex items-center justify-center animate-pulse-slow">
                <div className="text-perspective-purple/70 font-medium bg-perspective-white/70 px-4 py-2 rounded-md backdrop-blur-sm">Drop Zone</div>
              </div>
              
              {/* Color Palette Sidebar */}
              <div className="absolute right-4 top-20 bottom-6 w-14 bg-perspective-white border border-perspective-light-gray/30 rounded-lg py-3 px-2 shadow-soft">
                <div className="w-10 h-10 rounded-full bg-gradient-purple-blue mb-3 mx-auto shadow-sm"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-blue-green mb-3 mx-auto shadow-sm"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-purple-pink mb-3 mx-auto shadow-sm"></div>
                <div className="w-10 h-10 rounded-full bg-perspective-light-gray mb-3 mx-auto shadow-sm"></div>
              </div>
              
              {/* Animated Cursor */}
              <div 
                ref={cursorRef} 
                className="cursor-custom animate-cursor-move-realistic"
              ></div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-purple-blue rounded-2xl opacity-20 blur-xl animate-float-slow"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-purple-pink rounded-full opacity-20 blur-xl animate-float-medium"></div>
      </div>
    </section>
  );
};

export default Hero;
