
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
            <div className="bg-gray-900 p-4 h-full w-full font-mono text-sm overflow-hidden">
              <div className="code-animation-container">
                <pre className="animate-typing text-green-400 overflow-hidden whitespace-pre-wrap">
{`// South African E-commerce Platform
import { createStore } from 'lekker-sites';

const store = createStore({
  name: "My Online Store",
  currency: "ZAR",
  shipping: {
    providers: ["CourierGuy", "FastWay", "Pargo"],
    defaultRegion: "Gauteng"
  },
  payments: {
    gateways: [
      "Payfast",
      "Peach",
      "SnapScan"
    ],
    noTransactionFees: true
  },
  products: [
    {
      id: "prod-001",
      name: "Premium Product",
      price: 499.99,
      description: "Amazing product for your needs",
      inStock: true,
      variants: [
        { color: "blue", size: "M", sku: "BLU-M-001" },
        { color: "red", size: "L", sku: "RED-L-001" }
      ]
    },
    // More products...
  ]
});

// No fees taken from your sales
store.setFeePercentage(0);

// Deploy your store for FREE!
store.deploy();`}
                </pre>
              </div>
              
              {/* Animated cursor */}
              <div className="typing-cursor"></div>
              
              {/* Code animation elements */}
              <div className="code-line-highlight"></div>
              <div className="code-glow-effect"></div>
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
