
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section id="pricing" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Your Free Trial, Made Easy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with our 14-day free trial. No credit card required.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-16">
          <div className="flex items-center gap-4 bg-white shadow-sm border border-gray-200 rounded-full px-6 py-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-gray-700">14-day free trial</span>
          </div>
          
          <div className="flex items-center gap-4 bg-white shadow-sm border border-gray-200 rounded-full px-6 py-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-gray-700">No credit card required</span>
          </div>
          
          <div className="flex items-center gap-4 bg-white shadow-sm border border-gray-200 rounded-full px-6 py-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-gray-700">Cancel anytime</span>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/builder">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg font-medium">
              Start Building Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-4 text-gray-500 text-sm">Join 10,000+ South African businesses already using Lekker Sites</p>
        </div>
        
        <div className="mt-24 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
            The 2000s Marketing Era is Over
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Stop wasting money on outdated marketing tactics. It's time to upgrade to high-converting funnels.
          </p>
          <Link to="/builder">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 text-base font-medium">
              Get Started For Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
