
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, MousePointer, Layers, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const FunnelBuilder = () => {
  const steps = [
    {
      title: "Lead Generation",
      description: "Create opt-in pages to collect leads with beautiful forms",
      color: "from-perspective-purple to-perspective-blue",
      icon: <MousePointer className="h-5 w-5" />
    },
    {
      title: "Sales Pages",
      description: "Design high-converting sales pages with proven templates",
      color: "from-perspective-blue to-perspective-blue-light",
      icon: <Layers className="h-5 w-5" />
    },
    {
      title: "Checkout Flow",
      description: "Seamless checkout experience with local payment options",
      color: "from-perspective-blue-light to-perspective-pink-light",
      icon: <ChevronRight className="h-5 w-5" />
    }
  ];

  return (
    <section id="funnels" className="section-padding bg-perspective-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-perspective-pink-light/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-perspective-blue-light/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Introducing <span className="gradient-text">Funnel Builder</span>
          </h2>
          <p className="text-perspective-gray text-lg max-w-2xl mx-auto">
            Build complete sales funnels that convert visitors into customers with our intuitive drag-and-drop funnel builder.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="flex flex-col gap-12">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shrink-0 shadow-soft`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-perspective-gray">{step.description}</p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="absolute ml-6 mt-16">
                      <ArrowDown className="text-perspective-gray/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <Link to="/builder">
                <Button className="btn-gradient">
                  Start Building Your Funnel
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="bg-perspective-white rounded-2xl border border-perspective-light-gray/50 shadow-soft p-6 z-20 relative">
                <div className="mb-4 flex justify-between items-center">
                  <h4 className="font-medium">My Sales Funnel</h4>
                  <Button variant="outline" size="sm">Preview</Button>
                </div>
                
                <div className="space-y-6">
                  <div className="relative">
                    <div className="bg-perspective-light-gray/30 border border-perspective-light-gray/50 rounded-xl p-4 flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-perspective-purple/20 rounded-lg flex items-center justify-center">
                          <span className="font-semibold text-perspective-purple">1</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Lead Magnet</h5>
                          <p className="text-xs text-perspective-gray">leadmagnet.html</p>
                        </div>
                      </div>
                      <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Active
                      </div>
                    </div>
                    <div className="absolute left-5 right-5 h-4 flex justify-center">
                      <div className="w-0.5 h-full bg-perspective-gray/20"></div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-perspective-light-gray/30 border border-perspective-light-gray/50 rounded-xl p-4 flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-perspective-blue/20 rounded-lg flex items-center justify-center">
                          <span className="font-semibold text-perspective-blue">2</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Sales Page</h5>
                          <p className="text-xs text-perspective-gray">sales.html</p>
                        </div>
                      </div>
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        50% conv.
                      </div>
                    </div>
                    <div className="absolute left-5 right-5 h-4 flex justify-center">
                      <div className="w-0.5 h-full bg-perspective-gray/20"></div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-perspective-light-gray/30 border border-perspective-light-gray/50 rounded-xl p-4 flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-perspective-pink/20 rounded-lg flex items-center justify-center">
                          <span className="font-semibold text-perspective-pink">3</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Checkout</h5>
                          <p className="text-xs text-perspective-gray">checkout.html</p>
                        </div>
                      </div>
                      <div className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                        30% conv.
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full border-dashed">
                    + Add Step
                  </Button>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-32 h-32 bg-gradient-purple-blue rounded-xl opacity-20 blur-xl -z-10"></div>
              <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8 w-32 h-32 bg-gradient-blue-green rounded-xl opacity-20 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to build high-converting funnels?</h3>
          <p className="text-perspective-gray mb-8 max-w-xl mx-auto">
            Our funnel builder makes it easy to create complete sales journeys that guide your customers from awareness to purchase.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient">Get Started Free</Button>
            <Button variant="outline">View Templates</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunnelBuilder;
