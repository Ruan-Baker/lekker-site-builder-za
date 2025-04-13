
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
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-perspective-black to-perspective-dark-gray text-white">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-perspective-purple opacity-10 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-perspective-blue opacity-10 blur-3xl rounded-full transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Professional Website?
            </h2>
            <p className="text-white/70 text-lg">
              Join thousands of South African businesses already using Lekker Sites to grow their online presence.
            </p>
            
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-perspective-purple/30 flex items-center justify-center">
                    <Check size={14} className="text-perspective-purple-light" />
                  </div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 space-y-3">
              <Link to="/builder">
                <Button className="btn-gradient w-full sm:w-auto text-lg group px-8 py-3">
                  Start Building Free
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-white/50 text-sm">No credit card required. Free plan includes all the basics.</p>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-1">Pro Plan</h3>
              <p className="text-white/70">Everything you need to succeed online</p>
              <div className="flex justify-center items-baseline mt-4">
                <span className="text-4xl font-bold">R299</span>
                <span className="text-white/70 ml-2">/month</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-perspective-blue/30 flex items-center justify-center">
                  <Check size={14} className="text-perspective-blue-light" />
                </div>
                <span className="text-white/90">Unlimited websites</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-perspective-blue/30 flex items-center justify-center">
                  <Check size={14} className="text-perspective-blue-light" />
                </div>
                <span className="text-white/90">Unlimited funnels</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-perspective-blue/30 flex items-center justify-center">
                  <Check size={14} className="text-perspective-blue-light" />
                </div>
                <span className="text-white/90">Custom domain</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-perspective-blue/30 flex items-center justify-center">
                  <Check size={14} className="text-perspective-blue-light" />
                </div>
                <span className="text-white/90">Advanced analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-perspective-blue/30 flex items-center justify-center">
                  <Check size={14} className="text-perspective-blue-light" />
                </div>
                <span className="text-white/90">Remove branding</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-perspective-blue/30 flex items-center justify-center">
                  <Check size={14} className="text-perspective-blue-light" />
                </div>
                <span className="text-white/90">Priority support</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
              View All Plans
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
