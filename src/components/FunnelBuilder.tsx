
import React from 'react';
import { CheckCircle, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

const FunnelBuilder = () => {
  return (
    <section id="funnels" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Why Do You Need a <span className="text-blue-600">Lekker Funnel</span>?
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Convert more visitors into paying customers with optimized funnels designed specifically for South African businesses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-200 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Person talking about funnels" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-xl font-semibold">See how funnels transform your business</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="outline" size="icon" className="rounded-full w-16 h-16 bg-white/80 border-none hover:bg-white hover:scale-110 transition-all duration-300">
                  <Play className="h-8 w-8 text-blue-600" fill="currentColor" />
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="grid grid-cols-3 gap-8 mb-10">
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">700%</div>
                <p className="text-sm text-gray-700">Higher Conversion Rate</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="text-4xl font-bold text-green-600 mb-2">42%</div>
                <p className="text-sm text-gray-700">Lower Customer Acquisition Cost</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="text-4xl font-bold text-purple-600 mb-2">300%</div>
                <p className="text-sm text-gray-700">Increase in Revenue</p>
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">How Funnels Grow Your Business:</h3>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex gap-4">
                  <CheckCircle className="text-blue-500 h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800">Guide Your Customers</h4>
                    <p className="text-gray-700">Lead your visitors step-by-step through your sales process, increasing conversions at every stage. Perfect for businesses that want to simplify the buying journey.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex gap-4">
                  <CheckCircle className="text-blue-500 h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800">Optimize Each Step</h4>
                    <p className="text-gray-700">Test and improve individual funnel stages to maximize your overall conversion rate. Find out exactly where potential customers are dropping off and fix it.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex gap-4">
                  <CheckCircle className="text-blue-500 h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800">Increase Average Sale</h4>
                    <p className="text-gray-700">Add upsells and cross-sells to multiply your revenue per customer. Turn R100 sales into R300+ with strategic offers that complement their initial purchase.</p>
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

export default FunnelBuilder;
