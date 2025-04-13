
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 md:pt-40 pb-20 md:pb-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Build beautiful websites <span className="text-purple-600">without code</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Create professional websites and funnels in minutes with our intuitive drag-and-drop builder, designed specifically for South African businesses.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/builder">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-8 py-6 text-lg font-medium">
              Start Building Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md px-8 py-6 text-lg font-medium">
            View Templates
          </Button>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
          <div className="bg-gray-100 h-10 flex items-center px-4 border-b border-gray-200">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="relative bg-gradient-to-br from-gray-50 to-white p-6 aspect-[16/9]">
            {/* Editor UI Preview */}
            <div className="absolute inset-0 flex">
              <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                <div className="h-8 bg-gray-200 rounded-md mb-4"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded-md w-2/3"></div>
                </div>
              </div>
              <div className="flex-1 p-4">
                <div className="border border-gray-200 rounded-md h-full bg-white p-4">
                  <div className="h-6 bg-gray-100 rounded-md w-1/3 mb-4"></div>
                  <div className="h-10 bg-gray-100 rounded-md mb-4"></div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-20 bg-gray-100 rounded-md"></div>
                    <div className="h-20 bg-gray-100 rounded-md"></div>
                    <div className="h-20 bg-gray-100 rounded-md"></div>
                  </div>
                  <div className="h-40 bg-gray-100 rounded-md"></div>
                </div>
              </div>
              <div className="w-56 bg-white border-l border-gray-200 p-4">
                <div className="h-8 bg-gray-200 rounded-md mb-4"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded-md"></div>
                  <div className="h-6 bg-gray-200 rounded-md"></div>
                  <div className="h-6 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>
            
            {/* Animated elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-600/10 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-40 w-16 h-16 bg-blue-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-40 w-24 h-24 bg-pink-500/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
