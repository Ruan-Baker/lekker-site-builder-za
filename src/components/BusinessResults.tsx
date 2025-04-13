
import React from 'react';

const BusinessResults = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Results in All Business-Critical Areas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our funnels help South African businesses achieve dramatic improvements across their entire customer journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-blue-200 bg-blue-50 rounded-xl overflow-hidden relative">
            <div className="h-64 bg-blue-100">
              <div className="h-full w-full flex items-center justify-center">
                <svg width="120" height="240" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                  <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Lead Generation</h3>
              <p className="text-gray-600 mb-4">Convert more visitors into leads with optimized landing pages and forms.</p>
              <div className="text-sm font-semibold text-blue-600">Grow your email list →</div>
            </div>
          </div>
          
          <div className="border border-red-200 bg-red-50 rounded-xl overflow-hidden relative">
            <div className="h-64 bg-red-100">
              <div className="h-full w-full flex items-center justify-center">
                <svg width="120" height="240" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
                  <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Sales Conversion</h3>
              <p className="text-gray-600 mb-4">Turn potential customers into paying customers with persuasive sales pages.</p>
              <div className="text-sm font-semibold text-red-600">Increase your revenue →</div>
            </div>
          </div>
          
          <div className="border border-yellow-200 bg-yellow-50 rounded-xl overflow-hidden relative">
            <div className="h-64 bg-yellow-100">
              <div className="h-full w-full flex items-center justify-center">
                <svg width="120" height="240" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-600">
                  <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Customer Retention</h3>
              <p className="text-gray-600 mb-4">Keep customers coming back with follow-up sequences and loyalty programs.</p>
              <div className="text-sm font-semibold text-yellow-600">Build loyal customers →</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessResults;
