
import React from 'react';

const FunnelExpert = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Become a Funnel Expert, For Free.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with our free templates and training specifically designed for South African business owners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">Free Templates</h3>
            <p className="text-gray-600 mb-4">Get started quickly with our professionally designed templates.</p>
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4 aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Template preview" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline">
              View Templates →
            </button>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">Free Training Videos</h3>
            <p className="text-gray-600 mb-4">Learn how to build high-converting funnels step by step.</p>
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4 aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Training video preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3L19 12L5 21V3Z" fill="#3B82F6" />
                  </svg>
                </div>
              </div>
            </div>
            <button className="text-purple-600 font-medium text-sm hover:underline">
              Watch Now →
            </button>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">Case Studies</h3>
            <p className="text-gray-600 mb-4">See how other South African businesses are succeeding.</p>
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4 aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Case study preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3">
                <div className="text-white text-sm font-medium">How Woolworths increased online sales by 237%</div>
              </div>
            </div>
            <button className="text-yellow-600 font-medium text-sm hover:underline">
              Read Case Study →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunnelExpert;
