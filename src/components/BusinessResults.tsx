
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const BusinessResults = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Results in All Business-Critical Areas
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We analyzed over 100,000 funnels on our platform to create the highest-converting templates to get qualified leads and sell online effectively.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lead Generation Card */}
          <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
            <div className="bg-blue-50 p-4">
              <img 
                src="/lovable-uploads/976d4e3c-4063-4a3c-925c-b10a08ae8e05.png" 
                alt="Get Qualified Leads" 
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Get Qualified Leads</h3>
              <p className="text-gray-700 mb-6">
                Our webinar, case study, quiz, freebie, and VSL funnel templates get you ready-to-buy leads.
              </p>
              <div className="flex justify-center">
                <Button variant="outline" className="rounded-full text-blue-600 border-blue-600 hover:bg-blue-50 flex items-center gap-2">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sales Conversion Card */}
          <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
            <div className="bg-red-50 p-4">
              <img 
                src="/lovable-uploads/976d4e3c-4063-4a3c-925c-b10a08ae8e05.png" 
                alt="Sell Smarter Online" 
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Sell Smarter Online</h3>
              <p className="text-gray-700 mb-6">
                Personalize your offer and sell your product or offer directly in the funnel without further tools.
              </p>
              <div className="flex justify-center">
                <Button variant="outline" className="rounded-full text-red-600 border-red-600 hover:bg-red-50 flex items-center gap-2">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Customer Success Card - Replaced "Hire Top Talent" */}
          <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
            <div className="bg-yellow-50 p-4">
              <img 
                src="/lovable-uploads/976d4e3c-4063-4a3c-925c-b10a08ae8e05.png" 
                alt="Customer Success" 
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Customer Success</h3>
              <p className="text-gray-700 mb-6">
                Our website templates help maintain customer relationships and deliver ongoing value long after the first sale.
              </p>
              <div className="flex justify-center">
                <Button variant="outline" className="rounded-full text-yellow-600 border-yellow-600 hover:bg-yellow-50 flex items-center gap-2">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessResults;
