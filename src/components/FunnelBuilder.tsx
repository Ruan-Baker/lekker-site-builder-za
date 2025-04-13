
import React from 'react';
import { CheckCircle } from 'lucide-react';

const FunnelBuilder = () => {
  return (
    <section id="funnels" className="py-24 px-6 bg-gray-50">
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
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Person talking about funnels" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-xl font-semibold">See how funnels transform your business</h3>
              </div>
            </div>
          </div>
          
          <div>
            <div className="grid grid-cols-3 gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">700%</div>
                <p className="text-sm text-gray-700">Higher Conversion Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">42%</div>
                <p className="text-sm text-gray-700">Lower Customer Acquisition Cost</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">300%</div>
                <p className="text-sm text-gray-700">Increase in Revenue</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex gap-3">
                  <CheckCircle className="text-blue-500 h-6 w-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Guide Your Customers</h3>
                    <p className="text-gray-700">Lead your visitors step-by-step through your sales process, increasing conversions at every stage.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex gap-3">
                  <CheckCircle className="text-blue-500 h-6 w-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Optimize Each Step</h3>
                    <p className="text-gray-700">Test and improve individual funnel stages to maximize your overall conversion rate.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex gap-3">
                  <CheckCircle className="text-blue-500 h-6 w-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Increase Average Sale</h3>
                    <p className="text-gray-700">Add upsells and cross-sells to multiply your revenue per customer.</p>
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
