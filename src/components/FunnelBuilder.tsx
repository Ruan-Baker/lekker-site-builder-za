
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, MousePointer, FileText, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const FunnelBuilder = () => {
  const steps = [
    {
      title: "Lead Generation",
      description: "Create opt-in pages to collect customer information with beautiful forms.",
      icon: <MousePointer className="h-5 w-5 text-white" />
    },
    {
      title: "Sales Pages",
      description: "Design high-converting sales pages with proven templates.",
      icon: <FileText className="h-5 w-5 text-white" />
    },
    {
      title: "Checkout Flow",
      description: "Seamless checkout experience with local payment options.",
      icon: <CreditCard className="h-5 w-5 text-white" />
    }
  ];

  return (
    <section id="funnels" className="py-20 px-6 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Build complete <span className="text-purple-600">sales funnels</span> that convert
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Turn visitors into customers with our intuitive funnel builder. Create connected pages that guide users through your sales process.
            </p>
            
            <div className="space-y-8 mb-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mt-1">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/builder">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-6 py-3">
                Start Building Your Funnel
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="order-1 lg:order-2 bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-xl">
            <div className="text-xl font-semibold mb-6">Your Sales Funnel</div>
            
            <div className="space-y-3 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">1</div>
                    <div>
                      <div className="font-medium">Lead Capture</div>
                      <div className="text-sm text-gray-500">landing-page.html</div>
                    </div>
                  </div>
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Published
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">2</div>
                    <div>
                      <div className="font-medium">Sales Page</div>
                      <div className="text-sm text-gray-500">offer.html</div>
                    </div>
                  </div>
                  <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    35% conv.
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-semibold">3</div>
                    <div>
                      <div className="font-medium">Checkout</div>
                      <div className="text-sm text-gray-500">payment.html</div>
                    </div>
                  </div>
                  <div className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                    80% conv.
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full border-dashed text-gray-600">
              + Add Funnel Step
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunnelBuilder;
