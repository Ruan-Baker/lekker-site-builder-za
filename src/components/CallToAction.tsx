
import React from 'react';
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="section-padding bg-lekker-purple text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Build Your Professional Website?
        </h2>
        <p className="text-white/80 text-lg mb-10">
          Join thousands of South African businesses already using Lekker Sites to grow their online presence.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-white text-lekker-purple hover:bg-lekker-light-gray rounded-2xl px-6 py-6 text-lg font-medium min-w-[200px]">
            Start Building Free
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-2xl px-6 py-6 text-lg font-medium min-w-[200px]">
            Contact Sales
          </Button>
        </div>
        
        <p className="text-white/70 text-sm mt-6">
          No credit card required. Free plan includes all the basics.
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
