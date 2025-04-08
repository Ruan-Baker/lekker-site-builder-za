
import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Drag-and-Drop Builder",
      description: "Create your website with simple drag and drop - no coding skills required.",
      animation: (
        <div className="relative h-32 bg-lekker-light-gray rounded-lg overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <div className="absolute left-4 top-6 w-12 h-12 bg-white border border-lekker-border-gray rounded-md shadow-sm flex items-center justify-center animate-float-slow">
              <div className="w-8 h-2 bg-lekker-purple/30 rounded-sm"></div>
            </div>
            <div className="absolute top-6 left-24 w-16 h-16 bg-lekker-purple/20 border border-lekker-purple/20 rounded-md animate-float-medium flex flex-col justify-center items-center" style={{ animationDelay: '0.5s' }}>
              <div className="w-10 h-2 bg-white/60 rounded-sm mb-2"></div>
              <div className="w-8 h-2 bg-white/40 rounded-sm"></div>
            </div>
            <svg className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-lekker-purple/10" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,3H5C3.89,3,3,3.89,3,5V19A2,2,0,0,0,5,21H19A2,2,0,0,0,21,19V5C21,3.89,20.1,3,19,3M19,5V19H5V5H19Z" />
              <path fill="currentColor" d="M7,7H9V9H7V7M11,7H13V9H11V7M15,7H17V9H15V7M7,11H9V13H7V11M11,11H13V13H11V11M15,11H17V13H15V11M7,15H9V17H7V15M11,15H13V17H11V15M15,15H17V17H15V15Z" />
            </svg>
            <div className="animate-cursor-bounce absolute w-4 h-4 bg-lekker-purple rounded-full opacity-70"></div>
          </div>
        </div>
      )
    },
    {
      title: "South African Templates",
      description: "Professionally designed templates made for local businesses and markets.",
      animation: (
        <div className="relative h-32 bg-lekker-light-gray rounded-lg overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2 items-center">
            <div className="bg-white rounded-md h-12 border border-lekker-border-gray p-1">
              <div className="w-full h-2 bg-lekker-purple/20 rounded-sm mb-1"></div>
              <div className="w-2/3 h-2 bg-lekker-light-gray rounded-sm"></div>
            </div>
            <div className="bg-white rounded-md h-12 border border-lekker-border-gray p-1">
              <div className="w-full h-2 bg-lekker-purple/30 rounded-sm mb-1"></div>
              <div className="w-2/3 h-2 bg-lekker-light-gray rounded-sm"></div>
            </div>
            <div className="bg-white rounded-md h-12 border border-lekker-border-gray p-1">
              <div className="w-full h-2 bg-lekker-purple/40 rounded-sm mb-1"></div>
              <div className="w-2/3 h-2 bg-lekker-light-gray rounded-sm"></div>
            </div>
            <div className="bg-lekker-purple/20 rounded-md h-12 border border-lekker-purple/40 p-1 shadow-sm animate-pulse-medium">
              <div className="w-full h-2 bg-white/60 rounded-sm mb-1"></div>
              <div className="w-2/3 h-2 bg-white/40 rounded-sm"></div>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-lekker-purple/40"></div>
            <div className="w-2 h-2 rounded-full bg-lekker-purple/70"></div>
            <div className="w-2 h-2 rounded-full bg-lekker-purple/40"></div>
          </div>
        </div>
      )
    },
    {
      title: "Mobile Responsive",
      description: "Every site automatically looks great on mobiles, tablets and desktops.",
      animation: (
        <div className="relative h-32 bg-lekker-light-gray rounded-lg overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-10 h-20 border-2 border-lekker-purple/40 rounded-lg overflow-hidden bg-white">
            <div className="h-2 bg-lekker-purple/20 w-full"></div>
            <div className="h-3 mt-1 bg-lekker-purple/30 w-6 mx-auto rounded-sm"></div>
            <div className="h-6 mt-1 bg-lekker-purple/20 w-8 mx-auto rounded-sm"></div>
            <div className="flex gap-1 mt-1 justify-center">
              <div className="h-2 w-2 bg-lekker-purple/30 rounded-full"></div>
              <div className="h-2 w-2 bg-lekker-purple/30 rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 w-24 h-16 border-2 border-lekker-purple/40 rounded-md bg-white animate-device-switch">
            <div className="h-2 bg-lekker-purple/20 w-full"></div>
            <div className="h-4 mt-1 bg-lekker-purple/20 w-full rounded-sm"></div>
            <div className="flex gap-1 mt-1 justify-center">
              <div className="h-2 w-2 bg-lekker-purple/30 rounded-full"></div>
              <div className="h-2 w-2 bg-lekker-purple/30 rounded-full"></div>
              <div className="h-2 w-2 bg-lekker-purple/30 rounded-full"></div>
            </div>
          </div>
          <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-lekker-purple/40 animate-pulse-medium" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </div>
      )
    },
    {
      title: "Local Payment Integration",
      description: "Accept payments with popular South African payment providers.",
      animation: (
        <div className="relative h-32 bg-lekker-light-gray rounded-lg overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <div className="w-16 h-8 bg-white rounded-md shadow-sm flex items-center justify-center text-xs font-bold text-lekker-purple border border-lekker-border-gray">PAYFAST</div>
            <div className="w-16 h-8 bg-white rounded-md shadow-sm flex items-center justify-center text-xs font-bold text-lekker-purple border border-lekker-border-gray animate-float-slow">OZOW</div>
            <div className="w-16 h-8 bg-white rounded-md shadow-sm flex items-center justify-center text-xs font-bold text-lekker-purple border border-lekker-border-gray">YOCO</div>
          </div>
          <div className="absolute bottom-2 right-2 animate-float-short">
            <svg className="w-6 h-6 text-lekker-purple/50" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
            </svg>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="section-padding bg-lekker-light-gray">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Everything You Need to Build Your Website</h2>
        <p className="text-lekker-gray text-lg">
          Our builder provides all the tools South African businesses need to create professional websites quickly.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="section-animation-container feature-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="mb-4">
              {feature.animation}
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-lekker-gray">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
