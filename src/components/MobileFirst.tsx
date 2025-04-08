
import React from 'react';
import { Button } from "@/components/ui/button";

const MobileFirst = () => {
  return (
    <section className="section-padding bg-white">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
          <div className="relative max-w-md mx-auto">
            {/* Phone Frame */}
            <div className="relative z-10 border-8 border-lekker-black rounded-[40px] w-60 h-[500px] mx-auto shadow-xl overflow-hidden bg-white">
              {/* Status Bar */}
              <div className="h-6 bg-lekker-black w-full flex justify-between items-center px-4">
                <div className="w-10 h-1 bg-white/60 rounded-sm"></div>
                <div className="w-4 h-1 bg-white/60 rounded-sm"></div>
              </div>
              
              {/* Website Preview */}
              <div className="h-[calc(100%-24px)] bg-white overflow-hidden">
                {/* Mobile Header */}
                <div className="h-10 bg-lekker-purple flex items-center px-3">
                  <div className="w-6 h-6 rounded-full bg-white/20"></div>
                  <div className="ml-auto">
                    <div className="w-5 h-1 bg-white/80 rounded-sm"></div>
                    <div className="w-5 h-1 bg-white/80 rounded-sm mt-1"></div>
                    <div className="w-5 h-1 bg-white/80 rounded-sm mt-1"></div>
                  </div>
                </div>
                
                {/* Hero */}
                <div className="p-4">
                  <div className="h-3 w-24 bg-lekker-black/80 rounded-sm"></div>
                  <div className="h-16 w-full bg-lekker-light-gray/50 rounded-md mt-3"></div>
                  <div className="h-8 w-24 bg-lekker-purple/80 rounded-md mt-3"></div>
                </div>
                
                {/* Content */}
                <div className="px-4">
                  <div className="h-3 w-full bg-lekker-light-gray/70 rounded-sm"></div>
                  <div className="h-3 w-4/5 bg-lekker-light-gray/70 rounded-sm mt-2"></div>
                  <div className="h-3 w-3/4 bg-lekker-light-gray/70 rounded-sm mt-2"></div>
                </div>
                
                {/* Card */}
                <div className="mt-4 mx-4 p-3 border border-lekker-border-gray rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-lekker-light-gray"></div>
                  <div className="h-2 w-20 bg-lekker-light-gray/80 rounded-sm mt-2"></div>
                  <div className="h-2 w-full bg-lekker-light-gray/60 rounded-sm mt-2"></div>
                  <div className="h-2 w-3/4 bg-lekker-light-gray/60 rounded-sm mt-1"></div>
                </div>
                
                {/* Bottom Nav */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t border-lekker-border-gray flex justify-around items-center">
                  <div className="w-6 h-6 rounded-full bg-lekker-light-gray"></div>
                  <div className="w-6 h-6 rounded-full bg-lekker-light-gray"></div>
                  <div className="w-6 h-6 rounded-full bg-lekker-purple"></div>
                  <div className="w-6 h-6 rounded-full bg-lekker-light-gray"></div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute w-40 h-40 rounded-full bg-lekker-purple/10 -top-10 -left-10 z-0"></div>
            <div className="absolute w-24 h-24 rounded-full bg-lekker-purple/10 bottom-20 -right-10 z-0"></div>
            <div className="absolute w-20 h-20 rounded-full bg-lekker-purple/5 bottom-40 -left-10 z-0"></div>
            
            {/* Speed indicator */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg px-6 py-3 flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2.03V2.05L13 4.05C17.39 4.59 20.5 8.58 19.96 12.97C19.5 16.61 16.64 19.5 13 19.93V21.93C18.5 21.38 22.5 16.5 21.95 11C21.5 6.25 17.73 2.5 13 2.03ZM5.67 19.74C2.5 16.5 2.5 11.5 5.67 8.26L6.77 9.36C4.1 12.06 4.1 15.94 6.77 18.64L5.67 19.74ZM7.76 17.66C5.97 15.83 5.96 12.17 7.76 10.34L8.86 11.44C7.69 12.63 7.69 15.36 8.86 16.56L7.76 17.66ZM11.23 15.84C10.69 15.31 10.69 14.69 11.23 14.16L12.32 15.26C12.32 15.26 12.31 15.27 12.3 15.28C12.28 15.3 12.27 15.31 12.26 15.33C12.23 15.36 12.21 15.38 12.21 15.38L11.23 15.84Z" fill="currentColor" />
              </svg>
              <span className="text-sm font-medium">Fast loading time</span>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Mobile-First Design for Speed and Usability
          </h2>
          <p className="text-lekker-gray text-lg mb-6">
            Our templates are built with a mobile-first approach to ensure your website loads quickly and looks amazing on all devices.
          </p>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 w-12 h-12 bg-lekker-purple/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-lekker-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14M14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56M14.34 14H9.66C9.56 13.34 9.5 12.68 9.5 12C9.5 11.32 9.56 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14M12 19.96C11.17 18.76 10.5 17.43 10.09 16H13.91C13.5 17.43 12.83 18.76 12 19.96M8 8H5.08C6.03 6.34 7.57 5.06 9.4 4.44C8.8 5.55 8.35 6.75 8 8M5.08 16H8C8.35 17.25 8.8 18.45 9.4 19.56C7.57 18.93 6.03 17.65 5.08 16M4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14M12 4.03C12.83 5.23 13.5 6.57 13.91 8H10.09C10.5 6.57 11.17 5.23 12 4.03M18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.34 18.92 8M12 2C6.47 2 2 6.5 2 12C2 17.5 6.47 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" fill="currentColor" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium mb-2">Optimized for South African Networks</h3>
                <p className="text-lekker-gray">Our websites are optimized for South African internet speeds and connectivity, ensuring fast loading times even in areas with limited bandwidth.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-12 h-12 bg-lekker-purple/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-lekker-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.5C15.03 17.5 17.5 15.03 17.5 12C17.5 8.97 15.03 6.5 12 6.5C8.97 6.5 6.5 8.97 6.5 12C6.5 15.03 8.97 17.5 12 17.5ZM5 20V15H4C2.9 15 2 14.1 2 13V7C2 5.9 2.9 5 4 5H20C21.1 5 22 5.9 22 7V13C22 14.1 21.1 15 20 15H19V20H17V15H7V20H5ZM20 13V7H4V13H20Z" fill="currentColor" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium mb-2">Cross-Device Compatibility</h3>
                <p className="text-lekker-gray">Every website automatically adapts to smartphones, tablets, and desktops, giving your visitors a seamless experience no matter what device they use.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-12 h-12 bg-lekker-purple/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-lekker-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 15H17V17H15V15ZM15 11H17V13H15V11ZM15 7H17V9H15V7ZM11 15H13V17H11V15ZM11 11H13V13H11V11ZM11 7H13V9H11V7ZM7 15H9V17H7V15ZM7 11H9V13H7V11ZM7 7H9V9H7V7ZM19 5V19H5V5H19ZM21 3H3V21H21V3Z" fill="currentColor" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium mb-2">Touch-Friendly Interface</h3>
                <p className="text-lekker-gray">Interactive elements are designed with touch screens in mind, making your site easy to navigate with taps and swipes on mobile devices.</p>
              </div>
            </div>
          </div>
          
          <Button className="btn-primary mt-8">Learn More About Mobile Design</Button>
        </div>
      </div>
    </section>
  );
};

export default MobileFirst;
