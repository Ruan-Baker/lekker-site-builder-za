
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section id="pricing" className="py-24 px-6 bg-gradient-to-t from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="px-4 py-2 bg-green-100 text-green-800 font-medium mb-4 rounded-full">100% FREE</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Get Your <span className="text-blue-600">Free Website</span> Today
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Create your professional website or sales funnel without paying anything - ever! No hidden fees, no credit card required, and absolutely no charges ever.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto rounded-2xl bg-white shadow-lg border border-blue-100 p-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Crown className="h-6 w-6 text-yellow-500" />
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited pages and funnels</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Full access to all templates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">No credit card required</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">South African payment integrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Free hosting included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Local customer support</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-center mb-8">
                <div className="inline-block p-1 px-4 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">FREE PLAN</div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl font-bold text-gray-900">R0</span>
                  <span className="text-xl text-gray-600">/ month</span>
                </div>
                <p className="mt-2 text-blue-600 font-medium">No hidden charges ever!</p>
              </div>
              <Link to="/builder" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base flex items-center gap-2 justify-center rounded-xl">
                  Start Building Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <p className="text-center text-sm text-gray-500 mt-4">No credit card required. No commitments.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="mb-8 text-gray-700 max-w-3xl mx-auto">
            Join thousands of South African businesses already using Lekker Sites to grow their online presence without spending a cent.
          </p>
          
          <div className="inline-flex flex-wrap justify-center items-center gap-4 bg-blue-50 rounded-full px-6 py-3 border border-blue-100">
            <span className="text-blue-600 font-medium">No hidden charges</span>
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600 hidden sm:block"></div>
            <span className="text-blue-600 font-medium">No credit card needed</span>
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600 hidden sm:block"></div>
            <span className="text-blue-600 font-medium">Free</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
