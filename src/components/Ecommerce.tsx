
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
            {/* Website Builder Interface Animation */}
            <div className="bg-gray-900 h-full w-full relative">
              {/* Builder Interface Header */}
              <div className="bg-gray-800 p-3 border-b border-gray-700 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 ml-1"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 ml-1"></div>
                <div className="text-xs text-gray-400 ml-4">My Online Store - Builder</div>
              </div>

              {/* Builder Content */}
              <div className="grid grid-cols-12 h-[calc(100%-40px)]">
                {/* Left Sidebar - Elements Panel */}
                <div className="col-span-2 bg-gray-800 border-r border-gray-700 p-2 text-xs">
                  <div className="text-gray-400 mb-2 text-center">Elements</div>
                  <div className="bg-gray-700 p-2 rounded mb-2 text-blue-300 text-center animate-pulse">Products</div>
                  <div className="bg-gray-700 p-2 rounded mb-2 text-gray-300 text-center">Header</div>
                  <div className="bg-gray-700 p-2 rounded mb-2 text-gray-300 text-center">Gallery</div>
                  <div className="bg-gray-700 p-2 rounded mb-2 text-gray-300 text-center">Checkout</div>
                </div>

                {/* Main Canvas */}
                <div className="col-span-8 bg-gray-100 p-3 relative overflow-hidden">
                  {/* Store Preview */}
                  <div className="bg-white h-full rounded shadow-sm overflow-hidden">
                    {/* Store Header */}
                    <div className="bg-blue-600 text-white p-2 text-center text-sm font-bold">
                      My South African Online Store
                    </div>
                    
                    {/* Product Grid Being Built */}
                    <div className="grid grid-cols-2 gap-3 p-3">
                      <div className="animate-float-short bg-gray-100 rounded p-2">
                        <div className="h-16 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-3/4 bg-gray-300 rounded mb-1"></div>
                        <div className="h-3 w-1/2 bg-gray-300 rounded mb-2"></div>
                        <div className="flex justify-between items-center">
                          <div className="h-4 w-16 bg-blue-200 rounded"></div>
                          <div className="h-6 w-16 bg-blue-500 rounded text-xs text-white flex items-center justify-center">R 299</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 rounded p-2">
                        <div className="h-16 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-3/4 bg-gray-300 rounded mb-1"></div>
                        <div className="h-3 w-1/2 bg-gray-300 rounded mb-2"></div>
                        <div className="flex justify-between items-center">
                          <div className="h-4 w-16 bg-blue-200 rounded"></div>
                          <div className="h-6 w-16 bg-blue-500 rounded text-xs text-white flex items-center justify-center">R 499</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Element Being Dragged Animation */}
                    <div className="absolute top-20 left-20 w-32 h-28 bg-white border-2 border-dashed border-blue-500 rounded p-2 animate-builder-drag shadow-md">
                      <div className="h-12 bg-gray-100 rounded mb-2"></div>
                      <div className="h-2 w-3/4 bg-gray-200 rounded mb-1"></div>
                      <div className="h-2 w-1/2 bg-gray-200 rounded mb-1"></div>
                      <div className="h-4 w-16 bg-blue-500 rounded text-xs text-white flex items-center justify-center">R 199</div>
                    </div>

                    {/* Mouse Pointer */}
                    <div className="absolute w-4 h-4 border-r-2 border-b-2 border-blue-600 transform rotate-45 animate-cursor-bounce" style={{ left: '60px', top: '50px' }}></div>
                  </div>
                </div>

                {/* Right Sidebar - Properties Panel */}
                <div className="col-span-2 bg-gray-800 border-l border-gray-700 p-2 text-xs">
                  <div className="text-gray-400 mb-2 text-center">Product Settings</div>
                  <div className="mb-2">
                    <div className="text-gray-300 mb-1">Price (ZAR)</div>
                    <div className="bg-gray-700 p-1 rounded text-white">R 299.99</div>
                  </div>
                  <div className="mb-2">
                    <div className="text-gray-300 mb-1">Stock</div>
                    <div className="bg-gray-700 p-1 rounded text-white">15</div>
                  </div>
                  <div className="mb-2">
                    <div className="text-gray-300 mb-1">Payment</div>
                    <div className="bg-gray-700 p-1 rounded text-white">Payfast</div>
                  </div>
                  <div className="mb-2">
                    <div className="text-gray-300 mb-1">Shipping</div>
                    <div className="bg-gray-700 p-1 rounded text-white">CourierGuy</div>
                  </div>
                </div>
              </div>
              
              {/* Builder Status Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-blue-600 h-5 text-xs text-white flex items-center px-2">
                <span className="animate-pulse">✓ Changes saved - 0% transaction fees</span>
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
