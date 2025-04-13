
import React from 'react';
import { Button } from "@/components/ui/button";
import { HandHeart, MessageSquare } from 'lucide-react';

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
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Ruan Baker" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Ruan Baker</h3>
                <p className="text-blue-600 mb-4">Founder, Lekker Sites</p>
                
                <div className="flex justify-center">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-300">
                    <MessageSquare className="h-4 w-4" />
                    Contact Me
                  </Button>
                </div>
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
                  I created Lekker Sites because I believe that South African businesses deserve access to world-class tools without paying exorbitant fees. Too many small businesses are priced out of having a professional online presence, especially when converting prices from dollars to rands.
                </p>
                <p>
                  Having run multiple businesses in South Africa myself, I understand the challenges we face - from unreliable internet to expensive software and the lack of locally-focused solutions. That's why I've made Lekker Sites completely free, forever.
                </p>
                <p>
                  Our mission is simple: to help every South African business succeed online without worrying about costs. In these challenging economic times, I believe we need to support each other and build tools specifically designed for our unique market.
                </p>
                <p>
                  This isn't just a temporary offer or a freemium model with hidden costs. Everything you see on our platform is genuinely free, and it always will be. We want to be part of South Africa's digital transformation and economic growth.
                </p>
                <p className="mb-8">
                  I invite you to join us on this journey. Build your website, create your funnels, and grow your business online - without spending a cent.
                </p>
                
                <div className="pt-4">
                  <p className="font-semibold">Warm regards,</p>
                  <div className="mt-2">
                    <span className="font-family-signature text-3xl text-blue-700" style={{ fontFamily: 'cursive' }}>Ruan Baker</span>
                  </div>
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
