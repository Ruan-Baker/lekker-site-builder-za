
import React from 'react';
import { Check, Globe, Code, ArrowRight, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">100% FREE</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Website Builder Made for <span className="text-blue-600">South African Businesses</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We've created the easiest way to build professional websites that convert visitors into customers - even if you've never built a website before. And it's completely FREE!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              Pre-optimized for the South African market
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Our FREE builder provides all the tools South African businesses need to establish their online presence quickly and convert more customers.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md hover:border-blue-200">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Local Templates</h4>
                <p className="text-gray-700">Designed specifically for South African markets and consumers with local payment options.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md hover:border-blue-200">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">No Coding</h4>
                <p className="text-gray-700">Build your entire website without writing a single line of code - just drag and drop.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md hover:border-blue-200">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <ArrowRight className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Simple Funnel Flow</h4>
                <p className="text-gray-700">Connect pages to guide visitors along your conversion path with just a few clicks.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md hover:border-blue-200">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Local Payment</h4>
                <p className="text-gray-700">Integrate with Payfast, Peach, SnapScan, and other South African payment providers.</p>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-[500px]">
            {/* Website Builder Interface Animation */}
            <div className="bg-gray-900 h-full w-full relative">
              {/* Builder Interface Header */}
              <div className="bg-gray-800 p-3 border-b border-gray-700 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 ml-1"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 ml-1"></div>
                <div className="text-xs text-gray-400 ml-4">South African Website Builder</div>
              </div>
              
              {/* Builder Content */}
              <div className="grid grid-cols-12 h-[calc(100%-40px)]">
                {/* Left Sidebar - Elements Panel */}
                <div className="col-span-2 bg-gray-800 border-r border-gray-700 p-2 text-xs">
                  <div className="text-gray-400 mb-2 text-center">Templates</div>
                  <div className="bg-gray-700 p-2 rounded mb-2 text-blue-300 text-center animate-pulse">South African</div>
                  <div className="bg-gray-700 p-2 rounded mb-2 text-gray-300 text-center">Business</div>
                  <div className="bg-gray-700 p-2 rounded mb-2 text-gray-300 text-center">Portfolio</div>
                  <div className="bg-gray-700 p-2 rounded mb-2 text-gray-300 text-center">E-commerce</div>
                </div>
                
                {/* Main Canvas */}
                <div className="col-span-8 bg-white p-0 relative">
                  {/* Website Being Built Animation */}
                  <div className="h-full">
                    {/* Website Header */}
                    <div className="bg-blue-600 text-white p-2 flex justify-between items-center">
                      <div className="font-bold text-sm">SA Business</div>
                      <div className="flex gap-3">
                        <div className="h-2 w-8 bg-white rounded-full"></div>
                        <div className="h-2 w-8 bg-white rounded-full"></div>
                        <div className="h-2 w-8 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Hero Section */}
                    <div className="p-4 bg-blue-50 border-b border-gray-200">
                      <div className="h-4 w-3/4 bg-gray-400 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-gray-300 rounded mb-3"></div>
                      <div className="h-8 w-32 bg-blue-500 rounded-lg"></div>
                    </div>
                    
                    {/* Features Section */}
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="h-2 w-3/4 bg-gray-300 rounded mb-2"></div>
                          <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                        </div>
                        <div>
                          <div className="h-2 w-3/4 bg-gray-300 rounded mb-2"></div>
                          <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment Section Being Added */}
                    <div className="absolute top-32 left-20 animate-float-medium">
                      <div className="bg-green-50 border-2 border-dashed border-green-500 p-3 rounded-lg shadow-lg w-48">
                        <div className="h-4 w-3/4 bg-gray-400 rounded mb-2"></div>
                        <div className="flex gap-2 mb-2">
                          <div className="h-8 w-8 bg-blue-100 rounded-md flex items-center justify-center text-xs text-blue-500">PF</div>
                          <div className="h-8 w-8 bg-purple-100 rounded-md flex items-center justify-center text-xs text-purple-500">SS</div>
                          <div className="h-8 w-8 bg-green-100 rounded-md flex items-center justify-center text-xs text-green-500">OZ</div>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded mb-1"></div>
                        <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Mouse Pointer */}
                    <div className="absolute w-4 h-4 border-t-2 border-l-2 border-blue-600 transform -rotate-45 animate-cursor-move-realistic" style={{ left: '80px', top: '120px' }}></div>
                  </div>
                </div>
                
                {/* Right Sidebar - Properties Panel */}
                <div className="col-span-2 bg-gray-800 border-l border-gray-700 p-2 text-xs">
                  <div className="text-gray-400 mb-2 text-center">Settings</div>
                  <div className="mb-2">
                    <div className="text-gray-300 mb-1">Currency</div>
                    <div className="bg-gray-700 p-1 rounded text-white">ZAR (R)</div>
                  </div>
                  <div className="mb-2">
                    <div className="text-gray-300 mb-1">Region</div>
                    <div className="bg-gray-700 p-1 rounded text-white">South Africa</div>
                  </div>
                  <div className="mb-2">
                    <div className="text-gray-300 mb-1">Language</div>
                    <div className="bg-gray-700 p-1 rounded text-white">English (ZA)</div>
                  </div>
                  <div className="mb-2">
                    <div className="text-gray-300 mb-1">Payments</div>
                    <div className="bg-blue-600 p-1 rounded text-white animate-pulse">Payfast</div>
                  </div>
                </div>
              </div>
              
              {/* Builder Status Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-green-600 h-5 text-xs text-white flex items-center justify-between px-2">
                <span>All changes saved</span>
                <span className="animate-pulse">South African optimizations active</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-2xl p-8 md:p-12 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">What Makes Our Free Website Builder Different?</h3>
              <p className="text-lg text-gray-700 mb-6">Unlike other website builders, we focus exclusively on helping South African businesses succeed online with:</p>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Local payment gateways built-in (Payfast, Peach, etc.)</span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">R0 setup fee, R0 monthly fee - completely free</span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Templates designed for South African businesses</span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Local support team based in South Africa</span>
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-4xl font-bold text-blue-600">100+</div>
                </div>
                <p className="text-center text-gray-700">Local Templates</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-4xl font-bold text-purple-600">24/7</div>
                </div>
                <p className="text-center text-gray-700">Local Support</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-4xl font-bold text-green-600">100%</div>
                </div>
                <p className="text-center text-gray-700">Free</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-4xl font-bold text-orange-600">R0</div>
                </div>
                <p className="text-center text-gray-700">No Hidden Fees</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
