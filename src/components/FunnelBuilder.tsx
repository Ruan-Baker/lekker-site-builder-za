
import React from 'react';

const FunnelBuilder = () => {
  return (
    <section id="funnels" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Why Do You Need a <span className="text-blue-600">Lekker Funnel</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Convert more visitors into paying customers with optimized funnels designed specifically for South African businesses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
              {/* This would be a video or screenshot */}
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Person talking about funnels" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">700%</div>
                <p className="text-sm text-gray-600">Higher Conversion Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">42%</div>
                <p className="text-sm text-gray-600">Lower Customer Acquisition Cost</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">300%</div>
                <p className="text-sm text-gray-600">Increase in Revenue</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Guide Your Customers</h3>
                <p className="text-gray-600">Lead your visitors step-by-step through your sales process, increasing conversions at every stage.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Optimize Each Step</h3>
                <p className="text-gray-600">Test and improve individual funnel stages to maximize your overall conversion rate.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Increase Average Sale</h3>
                <p className="text-gray-600">Add upsells and cross-sells to multiply your revenue per customer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunnelBuilder;
