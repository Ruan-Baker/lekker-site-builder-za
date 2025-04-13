
import React from 'react';
import { FileText, LayoutDashboard, CheckCircle } from 'lucide-react';

const BusinessResults = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Results in All Business-Critical Areas
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our funnels help South African businesses achieve dramatic improvements across their entire customer journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-blue-200 bg-blue-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-52 bg-blue-100 flex items-center justify-center">
              <FileText size={80} className="text-blue-500" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Lead Generation</h3>
              <p className="text-gray-700 mb-4">Convert more visitors into leads with optimized landing pages and forms.</p>
              <div className="text-sm font-semibold text-blue-600 flex items-center">
                <span>Grow your email list</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="border border-red-200 bg-red-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-52 bg-red-100 flex items-center justify-center">
              <LayoutDashboard size={80} className="text-red-500" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Sales Conversion</h3>
              <p className="text-gray-700 mb-4">Turn potential customers into paying customers with persuasive sales pages.</p>
              <div className="text-sm font-semibold text-red-600 flex items-center">
                <span>Increase your revenue</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="border border-yellow-200 bg-yellow-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-52 bg-yellow-100 flex items-center justify-center">
              <CheckCircle size={80} className="text-yellow-500" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Customer Retention</h3>
              <p className="text-gray-700 mb-4">Keep customers coming back with follow-up sequences and loyalty programs.</p>
              <div className="text-sm font-semibold text-yellow-600 flex items-center">
                <span>Build loyal customers</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessResults;
