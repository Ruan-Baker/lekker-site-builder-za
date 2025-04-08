
import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Drag-and-Drop Builder",
      description: "Create your website with simple drag and drop - no coding skills required.",
      animation: (
        <div className="relative h-32 bg-lekker-light-gray rounded-lg overflow-hidden">
          <div className="absolute top-4 left-4 w-8 h-8 bg-lekker-purple/20 rounded animate-float"></div>
          <div className="absolute top-8 left-16 w-12 h-12 bg-lekker-purple/30 rounded animate-float" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-12 left-32 w-10 h-10 bg-lekker-purple/40 rounded animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
      )
    },
    {
      title: "South African Templates",
      description: "Professionally designed templates made for local businesses and markets.",
      animation: (
        <div className="relative h-32 bg-lekker-light-gray rounded-lg overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2">
            <div className="bg-white rounded"></div>
            <div className="bg-white rounded"></div>
            <div className="bg-white rounded"></div>
            <div className="bg-lekker-purple/20 rounded animate-pulse"></div>
          </div>
        </div>
      )
    },
    {
      title: "Mobile Responsive",
      description: "Every site automatically looks great on mobiles, tablets and desktops.",
      animation: (
        <div className="relative h-32 bg-lekker-light-gray rounded-lg overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-20 border-2 border-lekker-purple/40 rounded-lg overflow-hidden">
            <div className="h-3 bg-lekker-purple/20 w-full"></div>
            <div className="h-4 mt-1 bg-lekker-purple/30 w-10 mx-auto rounded"></div>
            <div className="h-8 mt-1 bg-lekker-purple/20 w-10 mx-auto rounded"></div>
          </div>
          <div className="absolute top-1/2 left-[70%] -translate-y-1/2 w-20 h-14 border-2 border-lekker-purple/40 rounded-md animate-responsive-switch">
            <div className="h-2 bg-lekker-purple/20 w-full"></div>
            <div className="h-8 mt-1 bg-lekker-purple/20 w-full rounded"></div>
          </div>
        </div>
      )
    },
    {
      title: "Local Payment Integration",
      description: "Accept payments with popular South African payment providers.",
      animation: (
        <div className="relative h-32 bg-lekker-light-gray rounded-lg overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <div className="w-16 h-10 bg-white rounded-md shadow-soft flex items-center justify-center text-xs font-bold text-lekker-purple">PAYFAST</div>
            <div className="w-16 h-10 bg-white rounded-md shadow-soft flex items-center justify-center text-xs font-bold text-lekker-purple">OZOW</div>
            <div className="w-16 h-10 bg-white rounded-md shadow-soft flex items-center justify-center text-xs font-bold text-lekker-purple">YOCO</div>
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
