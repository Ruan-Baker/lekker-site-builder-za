
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
          
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 h-[500px]">
            {/* Website Builder Interface Illustration */}
            <div className="bg-white h-full w-full relative">
              {/* Builder Interface Header */}
              <div className="bg-blue-600 p-3 text-white flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-bold text-sm">LekkerSites Builder</span>
                </div>
                <div className="flex gap-2">
                  <div className="bg-white/20 rounded-sm px-2 py-1 text-xs">Desktop</div>
                  <div className="bg-white/20 rounded-sm px-2 py-1 text-xs">Mobile</div>
                  <div className="bg-white rounded-sm px-2 py-1 text-xs text-blue-600 font-semibold">Publish</div>
                </div>
              </div>
              
              {/* Builder Content */}
              <div className="grid grid-cols-12 h-[calc(100%-48px)]">
                {/* Left Sidebar - Elements Panel */}
                <div className="col-span-3 bg-gray-50 border-r border-gray-200 p-3">
                  <div className="text-sm font-medium mb-3 text-gray-800">Templates</div>
                  
                  {/* Template Categories */}
                  <div className="space-y-2">
                    <div className="bg-blue-50 p-2 rounded border border-blue-300 flex items-center gap-2 cursor-pointer">
                      <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                        <Globe className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-blue-700 font-medium">South African</span>
                    </div>
                    
                    <div className="bg-white p-2 rounded border border-gray-200 flex items-center gap-2 cursor-pointer transition-all hover:border-blue-300 group">
                      <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                        <Code className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-700 group-hover:text-blue-600">Business</span>
                    </div>
                    
                    <div className="bg-white p-2 rounded border border-gray-200 flex items-center gap-2 cursor-pointer transition-all hover:border-blue-300 group">
                      <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                        <CreditCard className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-700 group-hover:text-blue-600">E-commerce</span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2 text-gray-800">Page Settings</div>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">Currency</label>
                          <div className="bg-white border border-gray-200 rounded p-2 text-xs flex justify-between items-center">
                            <span>ZAR (R)</span>
                            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-[10px]">R</div>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">Region</label>
                          <div className="bg-white border border-blue-200 rounded p-2 text-xs flex justify-between items-center">
                            <span className="text-blue-700">South Africa</span>
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main Canvas */}
                <div className="col-span-7 bg-gray-100 p-4 relative">
                  {/* Website Being Built */}
                  <div className="bg-white h-full rounded overflow-hidden border border-gray-200 shadow-sm">
                    {/* Website Header */}
                    <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
                      <div className="font-semibold">SA Business</div>
                      <div className="flex gap-3">
                        <div className="h-2 w-8 bg-white rounded-full"></div>
                        <div className="h-2 w-8 bg-white rounded-full"></div>
                        <div className="h-2 w-8 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Hero Section */}
                    <div className="p-4 bg-blue-50 border-b border-gray-200">
                      <div className="h-5 w-3/4 bg-gray-400 rounded mb-2"></div>
                      <div className="h-4 w-1/2 bg-gray-300 rounded mb-3"></div>
                      <div className="h-8 w-32 bg-blue-500 rounded"></div>
                    </div>
                    
                    {/* Features Section */}
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="h-3 w-3/4 bg-gray-300 rounded mb-2"></div>
                          <div className="h-2 w-1/2 bg-gray-200 rounded mb-3"></div>
                          <div className="h-10 w-full bg-gray-100 rounded"></div>
                        </div>
                        <div>
                          <div className="h-3 w-3/4 bg-gray-300 rounded mb-2"></div>
                          <div className="h-2 w-1/2 bg-gray-200 rounded mb-3"></div>
                          <div className="h-10 w-full bg-gray-100 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* South African Payment Section Being Dragged */}
                  <div className="absolute top-1/4 left-1/4 w-48 bg-white border-2 border-blue-400 rounded shadow-lg p-3 animate-float-medium">
                    <div className="mb-2 text-xs font-medium text-blue-800 flex items-center justify-between">
                      <span>Local Payment Section</span>
                      <CreditCard className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="bg-blue-50 p-2 rounded text-center">
                      <div className="flex justify-center gap-2 mb-2">
                        <div className="h-6 w-6 rounded bg-blue-100 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-blue-800">PF</span>
                        </div>
                        <div className="h-6 w-6 rounded bg-purple-100 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-purple-800">SS</span>
                        </div>
                        <div className="h-6 w-6 rounded bg-green-100 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-green-800">OZ</span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Cursor */}
                  <div className="absolute w-4 h-4 border-t-2 border-l-2 border-blue-600 transform -rotate-45 animate-cursor-move-realistic" style={{ left: '30%', top: '30%' }}></div>
                </div>
                
                {/* Right Sidebar - Properties Panel */}
                <div className="col-span-2 bg-gray-50 border-l border-gray-200 p-3">
                  <div className="text-sm font-medium mb-3 text-gray-800">Properties</div>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Element Type</label>
                      <div className="bg-white border border-gray-200 rounded p-2 text-xs">
                        Payment Section
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Payment Gateways</label>
                      <div className="bg-white border border-blue-200 rounded p-2 text-xs flex justify-between items-center">
                        <span className="text-blue-700">Payfast</span>
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Allow EFT</label>
                      <div className="bg-white border border-gray-200 rounded p-2 text-xs flex justify-between items-center">
                        <span>Yes</span>
                        <div className="w-6 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Show Logos</label>
                      <div className="bg-white border border-gray-200 rounded p-2 text-xs flex justify-between items-center">
                        <span>Yes</span>
                        <div className="w-6 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Builder Status Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500 h-5 text-xs text-white flex items-center justify-between px-3">
                <span>South African optimizations active</span>
                <span className="animate-pulse">Changes saved automatically</span>
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
