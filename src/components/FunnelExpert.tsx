
import React from 'react';
import { ArrowRight } from 'lucide-react';

const FunnelExpert = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Learn How to Create the Perfect Website for Your Business
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get started with our free templates and training specifically designed for South African business owners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Free Templates</h3>
            <p className="text-gray-700 mb-4">Get started quickly with our professionally designed templates.</p>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md mb-4 aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Template preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-white font-medium">Business Landing Page</span>
              </div>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline flex items-center">
              View Templates
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Free Training Videos</h3>
            <p className="text-gray-700 mb-4">Learn how to build high-converting funnels step by step.</p>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md mb-4 aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Training video preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3L19 12L5 21V3Z" fill="#3B82F6" />
                  </svg>
                </div>
              </div>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline flex items-center">
              Watch Now
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Case Studies</h3>
            <p className="text-gray-700 mb-4">See how other South African businesses are succeeding.</p>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md mb-4 aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Case study preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="text-white text-sm font-medium">How Woolworths increased online sales by 237%</div>
              </div>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline flex items-center">
              Read Case Study
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunnelExpert;
