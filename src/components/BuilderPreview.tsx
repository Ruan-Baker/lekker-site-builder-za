
import React from 'react';

const BuilderPreview = () => {
  return (
    <section className="section-padding bg-white">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Build Your Site with Simple Drag & Drop
          </h2>
          <p className="text-lekker-gray text-lg mb-8">
            Our intuitive builder makes website creation simple. Just drag elements onto your page, customize them, and publish when you're ready.
          </p>
          
          <div className="space-y-8">
            <div className="section-animation-container flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-lekker-purple/10 flex items-center justify-center text-2xl font-semibold text-lekker-purple">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Choose a Template</h3>
                <p className="text-lekker-gray">Start with one of our professionally designed templates customized for South African businesses.</p>
              </div>
            </div>
            
            <div className="section-animation-container flex items-start gap-4" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-full bg-lekker-purple/10 flex items-center justify-center text-2xl font-semibold text-lekker-purple">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Customize Everything</h3>
                <p className="text-lekker-gray">Change colors, fonts, images and content to match your brand with our simple editor.</p>
              </div>
            </div>
            
            <div className="section-animation-container flex items-start gap-4" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-full bg-lekker-purple/10 flex items-center justify-center text-2xl font-semibold text-lekker-purple">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Publish Your Site</h3>
                <p className="text-lekker-gray">Go live with a click and start attracting customers to your professional website.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <div className="browser-frame shadow-soft max-w-xl mx-auto">
            <div className="browser-top">
              <div className="browser-dot bg-red-400"></div>
              <div className="browser-dot bg-yellow-400 ml-2"></div>
              <div className="browser-dot bg-green-400 ml-2"></div>
              <div className="w-48 h-6 bg-lekker-light-gray rounded-md ml-4"></div>
            </div>
            
            <div className="p-4 bg-lekker-light-gray">
              <div className="grid grid-cols-5 gap-4 h-[450px]">
                {/* Left Sidebar */}
                <div className="col-span-1 bg-white rounded-lg p-3 flex flex-col gap-3">
                  <div className="h-8 w-full bg-lekker-light-gray rounded-md"></div>
                  <div className="h-8 w-full bg-lekker-light-gray rounded-md"></div>
                  <div className="h-8 w-full bg-lekker-light-gray rounded-md"></div>
                  <div className="h-8 w-full bg-lekker-purple/20 rounded-md"></div>
                  <div className="h-8 w-full bg-lekker-light-gray rounded-md"></div>
                </div>
                
                {/* Main Canvas */}
                <div className="col-span-3 bg-white rounded-lg p-4 relative">
                  {/* Header */}
                  <div className="h-10 bg-lekker-light-gray rounded-md mb-4"></div>
                  
                  {/* Hero */}
                  <div className="h-32 bg-lekker-light-gray rounded-md mb-4 flex items-center justify-center">
                    <div className="w-2/3 h-6 bg-white rounded-md"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="h-24 bg-lekker-light-gray rounded-md"></div>
                    <div className="h-24 bg-lekker-light-gray rounded-md"></div>
                  </div>
                  
                  {/* Dragged Element Animation */}
                  <div className="h-20 w-32 bg-lekker-purple/20 border-2 border-dashed border-lekker-purple rounded-md absolute top-40 left-16 animate-drag"></div>
                  
                  {/* Mouse Cursor */}
                  <div className="cursor-custom animate-cursor-move"></div>
                </div>
                
                {/* Right Properties Panel */}
                <div className="col-span-1 bg-white rounded-lg p-3 flex flex-col gap-3">
                  <div className="h-6 w-3/4 bg-lekker-light-gray rounded-md mb-1"></div>
                  <div className="h-8 w-full bg-lekker-light-gray rounded-md mb-2"></div>
                  <div className="h-6 w-3/4 bg-lekker-light-gray rounded-md mb-1"></div>
                  <div className="h-8 w-full bg-lekker-light-gray rounded-md mb-2"></div>
                  <div className="h-6 w-3/4 bg-lekker-light-gray rounded-md mb-1"></div>
                  <div className="h-24 w-full bg-lekker-light-gray rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderPreview;
