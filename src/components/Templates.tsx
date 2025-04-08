
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";

const Templates = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const templates = [
    {
      name: 'Cafe & Restaurant',
      thumbnail: 'bg-gradient-to-br from-orange-100 to-red-100',
      featured: true
    },
    {
      name: 'Professional Services',
      thumbnail: 'bg-gradient-to-br from-blue-100 to-indigo-100',
      featured: false
    },
    {
      name: 'Retail Shop',
      thumbnail: 'bg-gradient-to-br from-green-100 to-emerald-100',
      featured: false
    },
    {
      name: 'Travel Agency',
      thumbnail: 'bg-gradient-to-br from-purple-100 to-pink-100',
      featured: false
    },
    {
      name: 'Beauty Salon',
      thumbnail: 'bg-gradient-to-br from-pink-100 to-rose-100',
      featured: false
    },
    {
      name: 'Personal Portfolio',
      thumbnail: 'bg-gradient-to-br from-slate-100 to-gray-100',
      featured: false
    }
  ];

  return (
    <section id="templates" className="section-padding bg-lekker-light-gray">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Beautiful Templates Designed for South African Businesses
        </h2>
        <p className="text-lekker-gray text-lg">
          Choose from our collection of professionally designed templates and customize them to match your brand.
        </p>
      </div>
      
      <div className="relative">
        <Button 
          variant="outline" 
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-soft h-12 w-12"
          onClick={scrollLeft}
        >
          ←
        </Button>
        
        <div 
          ref={scrollContainer}
          className="flex gap-8 overflow-x-auto py-8 px-12 scrollbar-none snap-x"
        >
          {templates.map((template, index) => (
            <div key={index} className="min-w-[320px] snap-start">
              <div className={`template-thumbnail aspect-[5/6] ${template.thumbnail} relative group`}>
                {template.featured && (
                  <div className="absolute top-4 right-4 bg-lekker-purple text-white text-xs font-medium px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-250"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-lekker-purple/10 transition-all duration-250">
                  <Button className="bg-white text-lekker-black hover:bg-lekker-light-gray">Preview</Button>
                </div>
                
                {/* Template mock content */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-white/70 rounded"></div>
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-5/6 h-24 bg-white/50 rounded"></div>
                <div className="absolute top-44 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-white/60 rounded"></div>
                <div className="absolute top-56 left-1/2 -translate-x-1/2 grid grid-cols-2 gap-2 w-3/4">
                  <div className="h-12 bg-white/40 rounded"></div>
                  <div className="h-12 bg-white/40 rounded"></div>
                </div>
              </div>
              <p className="template-label">{template.name}</p>
            </div>
          ))}
        </div>
        
        <Button
          variant="outline" 
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-soft h-12 w-12"
          onClick={scrollRight}
        >
          →
        </Button>
      </div>
      
      <div className="text-center mt-12">
        <Button className="btn-primary">Browse All Templates</Button>
      </div>
    </section>
  );
};

export default Templates;
