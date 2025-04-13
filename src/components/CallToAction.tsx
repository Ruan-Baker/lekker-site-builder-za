
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  const features = [
    "Drag-and-drop website builder",
    "Funnel building functionality",
    "South African payment integrations",
    "Mobile-responsive templates",
    "No coding skills required",
    "Free tier available"
  ];
  
  return (
    <section id="pricing" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to build your professional website?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of South African businesses already using Lekker Sites to grow their online presence.
            </p>
            
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                    <Check size={14} className="text-purple-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <Link to="/builder">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md w-full sm:w-auto px-8 py-3 text-lg">
                  Start Building Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-gray-500">No credit card required. Free plan includes all the basics.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-2">Most Popular</div>
              <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
              <p className="text-gray-600 mb-4">Everything you need to succeed online</p>
              <div className="flex justify-center items-baseline">
                <span className="text-4xl font-bold">R299</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-8">
              {[
                "Unlimited websites",
                "Unlimited funnels",
                "Custom domain",
                "Advanced analytics",
                "Remove branding",
                "Priority support"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check size={14} className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button className="w-full bg-gray-900 hover:bg-black text-white rounded-md py-3">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
