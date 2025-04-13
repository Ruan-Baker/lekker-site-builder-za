
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
          
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="bg-gray-900 p-6 h-full w-full font-mono text-sm">
              <div className="mb-3 flex items-center justify-start gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 ml-2 text-xs">south-african-optimization.js</span>
              </div>
              
              <div className="overflow-hidden h-full">
                <pre className="text-blue-400 animate-typing overflow-hidden">
{`// South African Market Optimization

const locale = "za-ZA";
const currency = "ZAR";

const localizeWebsite = () => {
  return {
    language: "en-ZA",
    timezone: "Africa/Johannesburg",
    currencySymbol: "R",
    phoneFormat: "+27 XX XXX XXXX",
    defaultPaymentOptions: [
      "Payfast",
      "SnapScan",
      "Peach Payments",
      "Ozow"
    ],
    shippingProviders: [
      "CourierGuy",
      "FastWay",
      "Pargo",
      "The Courier Guy"
    ],
    marketingChannels: [
      "Facebook",
      "Instagram",
      "Google Ads",
      "Local SEO"
    ]
  };
};

// Mobile-First Design for South African Internet
const optimizeForSA = () => {
  const metrics = {
    mobileUsage: "74%",
    averageLoadSpeed: "3G/4G networks",
    dataConsideration: true,
    offlineCapabilities: true
  };
  
  // Implement data saving techniques
  const optimizedImages = compressImages(images, "webp");
  const lazyLoading = implementLazyLoading();
  const caching = setupOfflineCache();
  
  return {
    optimizedImages,
    lazyLoading,
    caching,
    metrics
  };
};

// Local payment integrations
setupPaymentGateways({
  payfast: {
    merchantId: "MERCHANT_ID",
    merchantKey: "MERCHANT_KEY",
    passphrase: "PASSPHRASE",
    testMode: false
  },
  snapScan: {
    merchantId: "MERCHANT_ID",
    apiKey: "API_KEY"
  }
});`}
                </pre>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent"></div>
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
                <p className="text-center text-gray-700">Free Forever</p>
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
