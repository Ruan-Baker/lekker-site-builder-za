
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-gray-900">
            South Africa's #1 FREE <span className="text-blue-600">Website Builder</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Build professional websites and sales funnels in minutes - 100% FREE! 
            No credit card required, no hidden fees, designed specifically for South African businesses.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
          <Link to="/builder" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-base flex items-center gap-2 rounded-xl">
              Start Building Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" className="w-full sm:w-auto mt-3 sm:mt-0 border-gray-300 text-gray-700 hover:bg-gray-50 text-base rounded-xl">
            Watch Demo
          </Button>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border border-gray-200 mx-auto max-w-5xl">
          <div className="bg-gray-100 h-8 sm:h-10 flex items-center px-3 sm:px-4 border-b border-gray-200">
            <div className="flex space-x-1.5 sm:space-x-2">
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-white p-0">
            <img 
              src="/lovable-uploads/3502f0e2-87c7-447f-ba87-86aa904adb3a.png" 
              alt="Lekker Sites Builder Interface - South Africa's Best Website Builder" 
              className="w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
      
      <div className="hidden sm:block absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50 rounded-full opacity-70"></div>
    </section>
  );
};

export default Hero;
