
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
            Create Your FREE Website with <span className="text-blue-600">Lekker Funnels</span>™
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Build professional websites and sales funnels in minutes - 100% FREE! 
            No credit card required, no hidden fees, designed specifically for South African businesses.
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
              src="/lovable-uploads/3502f0e2-87c7-447f-ba87-86aa904adb3a.png" 
              alt="Lekker Sites Builder Interface" 
              className="w-full object-cover" 
            />
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
