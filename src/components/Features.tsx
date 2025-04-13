
import React from 'react';
import { Check, Globe, Code, ArrowRight, CreditCard } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Pre-optimized for the South African market
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our builder provides all the tools South African businesses need to establish their online presence quickly and convert more customers.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-5 transition-all hover:shadow-md hover:border-blue-200 bg-white">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Local Templates</h3>
                <p className="text-gray-700 text-sm">Designed specifically for South African markets and consumers.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5 transition-all hover:shadow-md hover:border-blue-200 bg-white">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Code className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">No Coding</h3>
                <p className="text-gray-700 text-sm">Build your entire website without writing a single line of code.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5 transition-all hover:shadow-md hover:border-blue-200 bg-white">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Simple Funnel Flow</h3>
                <p className="text-gray-700 text-sm">Connect pages to guide visitors along your conversion path.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5 transition-all hover:shadow-md hover:border-blue-200 bg-white">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Local Payment</h3>
                <p className="text-gray-700 text-sm">Integrate with popular South African payment providers.</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Funnel builder demonstration" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3L19 12L5 21V3Z" fill="#2563EB" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-full -z-10"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-50 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
