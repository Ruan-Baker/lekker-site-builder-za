
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingBag, CreditCard, Tag, Package, Truck, BarChart3 } from 'lucide-react';

const Ecommerce = () => {
  return (
    <section id="ecommerce" className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">FREE E-COMMERCE</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Sell Products Online <span className="text-blue-600">Without Fees</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Launch your online store completely FREE with no transaction fees, no monthly subscriptions, and no hidden charges - ever!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative overflow-hidden rounded-xl shadow-lg h-[400px]">
            {/* Website Builder UI Illustration */}
            <div className="bg-white h-full w-full relative border border-gray-200">
              {/* Builder Header */}
              <div className="bg-blue-600 p-3 text-white flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-bold text-sm">LekkerSites E-commerce Builder</span>
                </div>
                <div className="flex gap-2">
                  <div className="bg-white/20 rounded-sm px-2 py-1 text-xs">Preview</div>
                  <div className="bg-white/20 rounded-sm px-2 py-1 text-xs">Save</div>
                  <div className="bg-white rounded-sm px-2 py-1 text-xs text-blue-600 font-semibold">Publish</div>
                </div>
              </div>

              {/* Builder Interface */}
              <div className="flex h-[calc(100%-48px)]">
                {/* Left Sidebar - Elements Panel */}
                <div className="w-48 bg-gray-50 border-r border-gray-200 p-3">
                  <div className="text-sm font-medium mb-2 text-gray-800">E-commerce Elements</div>
                  
                  {/* Elements List */}
                  <div className="space-y-2">
                    <div className="bg-white p-2 rounded border border-gray-200 flex items-center gap-2 cursor-pointer transition-all hover:border-blue-300 group">
                      <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                        <ShoppingBag className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-xs text-gray-700 group-hover:text-blue-600">Product Card</span>
                    </div>
                    
                    <div className="bg-blue-50 p-2 rounded border border-blue-300 flex items-center gap-2 cursor-pointer">
                      <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                        <CreditCard className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-blue-700 font-medium">Payment Gateway</span>
                    </div>
                    
                    <div className="bg-white p-2 rounded border border-gray-200 flex items-center gap-2 cursor-pointer transition-all hover:border-blue-300 group">
                      <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                        <Package className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-xs text-gray-700 group-hover:text-blue-600">Product Grid</span>
                    </div>
                    
                    <div className="bg-white p-2 rounded border border-gray-200 flex items-center gap-2 cursor-pointer transition-all hover:border-blue-300 group">
                      <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                        <Truck className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-xs text-gray-700 group-hover:text-blue-600">Shipping Options</span>
                    </div>
                  </div>
                </div>

                {/* Main Canvas */}
                <div className="flex-1 bg-gray-100 p-3 overflow-hidden relative">
                  <div className="bg-white h-full w-full rounded border border-dashed border-gray-300 p-4">
                    {/* Store Preview */}
                    <div className="mb-4 text-sm font-medium text-gray-700">South African Online Store</div>
                    
                    {/* Product Grid Being Built */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white border border-gray-200 rounded p-3">
                        <div className="h-20 bg-gray-100 rounded mb-2"></div>
                        <div className="h-3 w-3/4 bg-gray-300 rounded mb-1"></div>
                        <div className="h-3 w-1/2 bg-gray-300 rounded mb-2"></div>
                        <div className="flex justify-between items-center">
                          <div className="h-6 w-16 bg-blue-500 rounded text-xs text-white flex items-center justify-center">R 299</div>
                          <div className="h-6 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <ShoppingBag className="w-3 h-3 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded p-3">
                        <div className="h-20 bg-gray-100 rounded mb-2"></div>
                        <div className="h-3 w-3/4 bg-gray-300 rounded mb-1"></div>
                        <div className="h-3 w-1/2 bg-gray-300 rounded mb-2"></div>
                        <div className="flex justify-between items-center">
                          <div className="h-6 w-16 bg-blue-500 rounded text-xs text-white flex items-center justify-center">R 499</div>
                          <div className="h-6 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <ShoppingBag className="w-3 h-3 text-blue-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Element Being Dragged Animation */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 bg-white border-2 border-blue-500 rounded shadow-lg p-3 animate-float-short">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-blue-800">SA Payment Gateway</span>
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-8 bg-blue-50 rounded flex items-center justify-center">
                          <span className="text-xs">Payfast</span>
                        </div>
                        <div className="h-8 bg-purple-50 rounded flex items-center justify-center">
                          <span className="text-xs">Peach</span>
                        </div>
                        <div className="h-8 bg-orange-50 rounded flex items-center justify-center">
                          <span className="text-xs">Ozow</span>
                        </div>
                        <div className="h-8 bg-green-50 rounded flex items-center justify-center">
                          <span className="text-xs">SnapScan</span>
                        </div>
                      </div>
                    </div>

                    {/* Mouse Pointer */}
                    <div className="absolute w-4 h-4 border-t-2 border-l-2 border-blue-600 transform -rotate-45 animate-cursor-move-realistic" style={{ right: '30%', top: '30%' }}></div>
                  </div>
                </div>

                {/* Right Sidebar - Properties Panel */}
                <div className="w-56 bg-gray-50 border-l border-gray-200 p-3">
                  <div className="text-sm font-medium mb-3 text-gray-800">Payment Settings</div>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Currency</label>
                      <div className="bg-white border border-gray-200 rounded p-2 text-xs flex justify-between items-center">
                        <span>South African Rand (R)</span>
                        <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-[10px]">R</div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Gateway</label>
                      <div className="bg-white border border-blue-200 rounded p-2 text-xs flex justify-between items-center">
                        <span className="text-blue-700">Payfast</span>
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Transaction Fee</label>
                      <div className="bg-white border border-green-200 rounded p-2 text-xs flex justify-between items-center">
                        <span className="text-green-700">0% (Free)</span>
                        <Tag className="w-3 h-3 text-green-500" />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="bg-blue-600 rounded text-center p-2 cursor-pointer">
                        <span className="text-xs text-white font-medium">Apply Changes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              Free E-commerce for South African Businesses
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Most e-commerce platforms charge high fees and commissions. We don't. Create and run your online store with zero transaction fees.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">Unlimited Products</h4>
                  <p className="text-gray-700">Add as many products as you want with no restrictions - completely free.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">South African Payment Gateways</h4>
                  <p className="text-gray-700">Connect with Payfast, Peach, SnapScan and other local payment providers.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Tag className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">0% Transaction Fees</h4>
                  <p className="text-gray-700">We don't take a cut from your sales. You keep 100% of what you earn.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">Everything You Need To Sell Online</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gray-800">Product Management</h4>
              <p className="text-gray-700">Easily add products with multiple variants, images, and descriptions.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gray-800">Shopping Cart</h4>
              <p className="text-gray-700">Customers can easily add products and check out with a secure shopping cart.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gray-800">Secure Checkout</h4>
              <p className="text-gray-700">Provide a smooth, secure checkout experience for your customers.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gray-800">Shipping Options</h4>
              <p className="text-gray-700">Set different shipping rates for different regions in South Africa.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Tag className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gray-800">Discount Codes</h4>
              <p className="text-gray-700">Create promotional codes and special offers for your customers.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-gray-800">Sales Analytics</h4>
              <p className="text-gray-700">Track sales, inventory, and customer behavior to optimize your store.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-full shadow-md">
              Start Selling Free
            </Button>
            <p className="text-gray-600 mt-3 text-sm">No credit card required. No transaction fees.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecommerce;
