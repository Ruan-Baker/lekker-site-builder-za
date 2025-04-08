
import React from 'react';
import { MousePointerClick, Palette, Smartphone, CreditCard } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Drag-and-Drop Builder",
      description: "Create your website with simple drag and drop - no coding skills required.",
      icon: <MousePointerClick className="h-6 w-6 text-lekker-purple" />,
      animation: (
        <div className="relative h-32 bg-lekker-light-gray rounded-lg overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <div className="w-12 h-12 bg-white border border-lekker-border-gray rounded-md shadow-sm flex items-center justify-center">
              <div className="w-8 h-2 bg-lekker-purple/30 rounded-sm"></div>
            </div>
            <svg className="absolute w-5 h-5 text-lekker-purple" style={{left: '55%', top: '40%'}} viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
            <div className="absolute w-16 h-16 bg-lekker-purple/20 border border-lekker-purple/20 rounded-md flex flex-col justify-center items-center" style={{left: '60%', top: '40%'}}>
              <div className="w-10 h-2 bg-white/60 rounded-sm mb-2"></div>
              <div className="w-8 h-2 bg-white/40 rounded-sm"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "South African Templates",
      description: "Professionally designed templates made for local businesses and markets.",
      icon: <Palette className="h-6 w-6 text-lekker-purple" />,
      animation: (
        <div className="relative h-32 bg-lekker-light-gray rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 gap-2 p-2 items-center h-full">
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
            <div className="bg-lekker-purple/20 rounded-md h-12 border border-lekker-purple/40 p-1 shadow-sm">
              <div className="w-full h-2 bg-white/60 rounded-sm mb-1"></div>
              <div className="w-2/3 h-2 bg-white/40 rounded-sm"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Mobile Responsive",
      description: "Every site automatically looks great on mobiles, tablets and desktops.",
      icon: <Smartphone className="h-6 w-6 text-lekker-purple" />,
      animation: (
        <div className="relative h-32 bg-lekker-light-gray rounded-lg overflow-hidden">
          <div className="h-full flex items-center justify-center">
            <div className="w-10 h-20 border-2 border-lekker-purple/40 rounded-lg overflow-hidden bg-white mr-8">
              <div className="h-2 bg-lekker-purple/20 w-full"></div>
              <div className="h-3 mt-1 bg-lekker-purple/30 w-6 mx-auto rounded-sm"></div>
              <div className="h-6 mt-1 bg-lekker-purple/20 w-8 mx-auto rounded-sm"></div>
              <div className="flex gap-1 mt-1 justify-center">
                <div className="h-2 w-2 bg-lekker-purple/30 rounded-full"></div>
                <div className="h-2 w-2 bg-lekker-purple/30 rounded-full"></div>
              </div>
            </div>
            <svg className="w-5 h-5 text-lekker-purple" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
            <div className="w-20 h-14 border-2 border-lekker-purple/40 rounded-md bg-white ml-2">
              <div className="h-2 bg-lekker-purple/20 w-full"></div>
              <div className="h-4 mt-1 bg-lekker-purple/20 w-full rounded-sm"></div>
              <div className="flex gap-1 mt-1 justify-center">
                <div className="h-2 w-2 bg-lekker-purple/30 rounded-full"></div>
                <div className="h-2 w-2 bg-lekker-purple/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Local Payment Integration",
      description: "Accept payments with popular South African payment providers.",
      icon: <CreditCard className="h-6 w-6 text-lekker-purple" />,
      animation: (
        <div className="relative h-32 bg-lekker-light-gray rounded-lg overflow-hidden">
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className="w-16 h-8 bg-white rounded-md shadow-sm flex items-center justify-center text-xs font-bold text-lekker-purple border border-lekker-border-gray">PAYFAST</div>
            <div className="w-16 h-8 bg-white rounded-md shadow-sm flex items-center justify-center text-xs font-bold text-lekker-purple border border-lekker-border-gray">OZOW</div>
            <div className="w-16 h-8 bg-white rounded-md shadow-sm flex items-center justify-center text-xs font-bold text-lekker-purple border border-lekker-border-gray">YOCO</div>
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
            className="section-animation-container feature-card bg-white rounded-lg shadow-softer p-6"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-lekker-gray mb-4">{feature.description}</p>
            <div className="mt-2">
              {feature.animation}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
