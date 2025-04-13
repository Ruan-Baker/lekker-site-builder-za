
import React from 'react';
import { HandHeart } from 'lucide-react';

const FounderMessage = () => {
  return (
    <section id="why" className="py-24 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">OUR MISSION</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Why We're Doing This
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            A personal message from our founder to South African businesses
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            <div className="md:col-span-4 bg-blue-50 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="h-40 w-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white shadow-md">
                  <img 
                    src="/lovable-uploads/d92b4962-3ad3-4065-87fb-77986fb3417a.png" 
                    alt="Ruan Baker" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Ruan Baker</h3>
                <p className="text-blue-600 mb-4">Founder, Lekker Sites</p>
              </div>
            </div>
            
            <div className="md:col-span-8 p-8 md:p-12">
              <div className="flex items-center mb-6">
                <HandHeart className="h-6 w-6 text-red-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">A Message to South African Businesses</h3>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Dear fellow South African entrepreneurs,
                </p>
                <p>
                  I created Lekker Sites with a simple mission: to provide South African businesses with world-class web tools that don't cost a fortune. As a business owner myself, I understand the challenges we face with unreliable internet, expensive software, and the lack of locally-focused solutions.
                </p>
                <p>
                  That's why I've made Lekker Sites completely free to help as many South African businesses as possible. Everything you see on our platform is genuinely free.
                </p>
                
                <div className="pt-6">
                  <p className="font-medium">Warm regards,</p>
                  <div className="mt-3">
                    <img 
                      src="/lovable-uploads/8e5abb5e-c4f6-4a6d-a3ea-0e0336cf6013.png" 
                      alt="Ruan Baker Signature" 
                      className="h-16 w-auto"
                    />
                  </div>
                  <p className="font-semibold text-blue-700">Ruan Baker</p>
                  <p className="text-sm text-gray-500">Founder & CEO, Lekker Sites</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
