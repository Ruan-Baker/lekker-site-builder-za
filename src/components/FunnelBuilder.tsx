
import React from 'react';
import { CheckCircle, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

const FunnelBuilder = () => {
  return (
    <section id="funnels" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Why Do You Need a <span className="text-blue-600">Lekker Funnel™</span> ?
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Your website & funnel are killing your conversions! Traditional solutions are slow, static, and not built
            for today's mobile-first world. Meanwhile, <span className="font-bold">98.5%</span> of your audience is scrolling social media on their
            phones. If your funnel doesn't match their experience, they bounce. Lekker Funnels™ are built
            for this reality: mobile-first, fast, interactive, and personalized to match your audience's journey.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-16">
          <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-lg">
            <div className="relative aspect-video w-full bg-gray-100">
              <img 
                src="/lovable-uploads/243f158e-a205-41ef-b2b7-7ac49abe0716.png" 
                alt="Lekker Funnels Demonstration" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="outline" size="icon" className="rounded-full w-16 h-16 bg-white/80 border-none hover:bg-white hover:scale-110 transition-all duration-300">
                  <Play className="h-8 w-8 text-blue-600" fill="currentColor" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">700%</div>
                <p className="text-sm text-gray-700">Higher Conversion</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">42x</div>
                <p className="text-sm text-gray-700">Faster Building</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">300%</div>
                <p className="text-sm text-gray-700">Better Lead Quality</p>
              </div>
            </div>
            
            <div className="mt-12 space-y-6">
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
