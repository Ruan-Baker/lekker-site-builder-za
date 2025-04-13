
import React from 'react';
import { Monitor, Smartphone, CreditCard, Layout } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Drag-and-Drop Builder",
      description: "Create your website by simply dragging and dropping elements - no coding required.",
      icon: <Layout className="h-6 w-6 text-purple-600" />
    },
    {
      title: "South African Templates",
      description: "Professionally designed templates made specifically for local businesses and markets.",
      icon: <Monitor className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Mobile Responsive",
      description: "Every website automatically looks great on mobiles, tablets and desktop computers.",
      icon: <Smartphone className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Local Payment Integration",
      description: "Accept payments with popular South African payment providers like PayFast and Ozow.",
      icon: <CreditCard className="h-6 w-6 text-purple-600" />
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Everything You Need to Create Professional Websites
          </h2>
          <p className="text-lg text-gray-600">
            Our builder provides all the tools South African businesses need to establish their online presence quickly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="rounded-lg mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xl">
          <div className="aspect-video w-full">
            <div className="relative w-full h-full bg-black flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">See how it works</h3>
                <p className="text-white/80">Watch our quick 2-minute overview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
