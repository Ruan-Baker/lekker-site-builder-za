
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 md:pt-36 pb-16 px-6 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
            Double Your Business with <span className="text-blue-600">Lekker Funnels</span>™
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Create professional websites and sales funnels in minutes with our intuitive drag-and-drop builder, designed specifically for South African businesses.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/builder">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg font-medium shadow-md">
              Start Building Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-6 text-lg font-medium">
            Watch Demo
          </Button>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 mx-auto max-w-5xl">
          <div className="bg-gray-100 h-10 flex items-center px-4 border-b border-gray-200">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-white p-0">
            <img 
              src="/lovable-uploads/c579b62f-abb9-466a-b813-1daa0c762771.png" 
              alt="Lekker Sites Builder Interface" 
              className="w-full object-cover" 
            />
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-16">
          <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">TRUSTED BY</span>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <span className="font-bold text-xl text-gray-700">Woolworths</span>
            <span className="font-bold text-xl text-gray-700">Checkers</span>
            <span className="font-bold text-xl text-gray-700">Pick n Pay</span>
            <span className="font-bold text-xl text-gray-700">Takealot</span>
            <span className="font-bold text-xl text-gray-700">FNB</span>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50 rounded-full opacity-70"></div>
      <div className="absolute top-32 -right-32 w-64 h-64 bg-blue-50 rounded-full opacity-70"></div>
    </section>
  );
};

export default Hero;
