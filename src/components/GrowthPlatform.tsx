
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

const GrowthPlatform = () => {
  const features = [
    {
      title: "Website Builder",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
          <path d="M9 21L9 9" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      description: "Create professional websites with our FREE drag-and-drop builder - no coding required."
    },
    {
      title: "Payment Processing",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
          <path d="M22 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      description: "Accept payments through South African payment gateways like Payfast, Peach, and SnapScan - all FREE!"
    },
    {
      title: "Funnel Builder",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
          <path d="M3 3L9 9M21 9H9M21 9C21 7.34315 19.6569 6 18 6H9L21 9ZM21 9C21 10.6569 19.6569 12 18 12H9L21 9ZM9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      description: "Build sales funnels that convert visitors into paying customers with our easy-to-use funnel builder."
    },
    {
      title: "YouTube Integration",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
          <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16134 5.19941C1.82071 5.55057 1.57878 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 1 11.75C0.988768 13.537 1.14277 15.3213 1.46 17.08C1.59096 17.5398 1.8333 17.9581 2.16929 18.2945C2.50529 18.6308 2.92884 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0112 9.96295 22.8572 8.1787 22.54 6.42Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      description: "Easily embed YouTube videos on your website to engage visitors and showcase your products or services."
    },
    {
      title: "Appointment Scheduling",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-600">
          <path d="M5 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 7H20C20.5523 7 21 7.44772 21 8V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V8C3 7.44772 3.44772 7 4 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      description: "Let customers book appointments directly through your FREE website with automatic reminders."
    },
    {
      title: "Analytics",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
          <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      description: "Track visitor behavior and see exactly how people interact with your FREE website."
    }
  ];

  return (
    <section id="tools" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">ALL-IN-ONE PLATFORM</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Everything You Need - FREE
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            All the tools you need to build, launch, and grow your online business in South Africa - in one simple, FREE platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.slice(0, 6).map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 bg-blue-50 p-8 lg:p-12 flex items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Beautifully simple funnel builder</h3>
                <p className="text-gray-700 mb-6">Build your sales funnel in minutes with our FREE drag-and-drop editor. No technical skills required.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">No coding required</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Mobile-responsive</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Works on any device</span>
                  </li>
                </ul>
                
                <Button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white">
                  Start Building Free
                </Button>
              </div>
            </div>
            <div className="lg:col-span-3 relative">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Lekker Sites Builder Interface" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthPlatform;
