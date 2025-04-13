
import React from 'react';
import { Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

const FunnelBuilder = () => {
  return (
    <section id="funnels" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">WHY CHOOSE US</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Why Do You Need a <span className="text-blue-600">Lekker Sites™</span>?
        </h2>
        
        <p className="text-lg text-gray-700 mx-auto mb-12">
          Your website & funnel are killing your conversions! Traditional solutions are slow, static, and not built
          for today's mobile-first world. Meanwhile, <span className="font-bold">98.5%</span> of your audience is scrolling social media on their
          phones. If your funnel doesn't match their experience, they bounce. Lekker Sites™ are built
          for this reality: mobile-first, fast, interactive, and personalized to match your audience's journey.
        </p>

        {/* Video Section - Enhanced with nicer shadow and hover effect */}
        <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-16 mx-auto">
          <div className="relative aspect-video w-full bg-gray-100">
            <img 
              src="/lovable-uploads/17f32272-e437-4137-9a93-9774b8bc8094.png" 
              alt="Lekker Sites Demonstration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <Button variant="outline" size="icon" className="rounded-full w-16 h-16 bg-white/80 border-none hover:bg-white hover:scale-110 transition-all duration-300">
                <Play className="h-8 w-8 text-blue-600" fill="currentColor" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Stats Section - Enhanced with animation and better styling */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
          <div className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-3">700%</div>
            <p className="text-gray-700 font-medium">Higher Conversion</p>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-3">42x</div>
            <p className="text-gray-700 font-medium">Faster Building</p>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-3">300%</div>
            <p className="text-gray-700 font-medium">Better Lead Quality</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunnelBuilder;
