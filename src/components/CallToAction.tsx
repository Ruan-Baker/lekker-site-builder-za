
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section id="pricing" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Get Your <span className="text-blue-600">Free Website</span> Today
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Create your professional website or sales funnel without paying anything. No hidden fees or charges.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">100% Free Forever</h3>
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
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">R0</span>
                <span className="text-xl text-gray-600"> / month</span>
                <p className="mt-2 text-blue-600 font-medium">Forever Free</p>
              </div>
              <Link to="/builder" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg font-medium shadow-md">
                  Start Building Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="mb-8 text-gray-700 max-w-3xl mx-auto">
            Join over 10,000 South African businesses already using Lekker Sites to grow their online presence without spending a cent.
          </p>
          
          <div className="inline-flex items-center gap-4 bg-blue-50 rounded-full px-6 py-3 border border-blue-100">
            <span className="text-blue-600 font-medium">No hidden charges</span>
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
            <span className="text-blue-600 font-medium">No credit card needed</span>
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
            <span className="text-blue-600 font-medium">Free forever</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
