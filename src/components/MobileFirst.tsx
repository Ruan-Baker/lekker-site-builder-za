
import React from 'react';
import { Smartphone, Zap, Layers, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const MobileFirst = () => {
  return (
    <section className="section-padding bg-white section-animation-container">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mobile device illustration */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 mx-auto w-[280px] h-[560px] bg-white rounded-[36px] border-[12px] border-lekker-border-gray shadow-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-12 bg-white flex items-center justify-center">
                <div className="w-20 h-6 bg-lekker-border-gray rounded-full"></div>
              </div>
              <div className="w-full h-full pt-12 bg-lekker-light-gray">
                <div className="bg-white h-14 flex items-center px-4 border-b border-lekker-border-gray">
                  <div className="w-8 h-8 rounded-full bg-lekker-purple flex items-center justify-center">
                    <span className="text-white text-xs font-bold">LS</span>
                  </div>
                  <div className="ml-3">
                    <div className="w-20 h-2 bg-lekker-border-gray rounded-full"></div>
                    <div className="w-16 h-2 bg-lekker-border-gray rounded-full mt-2 opacity-70"></div>
                  </div>
                  <div className="ml-auto">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-lekker-light-gray">
                      <Layers size={16} className="text-lekker-gray" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="w-full h-40 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-lg bg-lekker-light-gray flex items-center justify-center">
                      <Layers size={24} className="text-lekker-purple" />
                    </div>
                  </div>
                  <div className="w-full h-6 bg-white rounded-md mb-3"></div>
                  <div className="w-4/5 h-4 bg-white rounded-md mb-6"></div>
                  <div className="w-full h-24 bg-white rounded-lg shadow-sm flex items-center p-3 mb-4">
                    <div className="w-16 h-16 rounded-md bg-lekker-light-gray"></div>
                    <div className="ml-3">
                      <div className="w-20 h-3 bg-lekker-light-gray rounded-md"></div>
                      <div className="w-28 h-2 bg-lekker-light-gray rounded-md mt-2"></div>
                      <div className="w-16 h-2 bg-lekker-light-gray rounded-md mt-2"></div>
                    </div>
                  </div>
                  <div className="w-full h-24 bg-white rounded-lg shadow-sm flex items-center p-3">
                    <div className="w-16 h-16 rounded-md bg-lekker-light-gray"></div>
                    <div className="ml-3">
                      <div className="w-20 h-3 bg-lekker-light-gray rounded-md"></div>
                      <div className="w-28 h-2 bg-lekker-light-gray rounded-md mt-2"></div>
                      <div className="w-16 h-2 bg-lekker-light-gray rounded-md mt-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Mobile-First Design Philosophy</h2>
            <p className="text-lekker-gray text-lg mb-8">
              Our templates are built with a mobile-first approach, ensuring your site looks amazing and performs flawlessly on all devices.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Smartphone size={20} className="text-lekker-purple" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Responsive by Default</h3>
                  <p className="text-lekker-gray">
                    Every template and component automatically adjusts to look perfect on phones, tablets, and desktops without extra work.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Zap size={20} className="text-lekker-purple" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Lightning-Fast Performance</h3>
                  <p className="text-lekker-gray">
                    Optimized images, minimal CSS, and efficient code ensure your mobile site loads in milliseconds, not seconds.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Layers size={20} className="text-lekker-purple" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Touch-Optimized Interface</h3>
                  <p className="text-lekker-gray">
                    Large touch targets, swipe-friendly navigation, and intuitive mobile menus give your visitors a seamless experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Button variant="default" size="lg" className="group">
                Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileFirst;
