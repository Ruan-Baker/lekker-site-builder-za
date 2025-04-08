
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

  const industryTemplates = [
    {
      industry: "Restaurant & Cafe",
      thumbnail: 'bg-gradient-to-br from-orange-100 to-red-100',
      icon: (
        <svg className="w-10 h-10 text-orange-500 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 2C5.5 2 3 4.5 3 7.5V14H11V7.5C11 6.67 10.83 5.93 10.5 5.25C11.37 5.72 12 6.8 12 8V14H20V8C20 5.79 18.21 4 16 4C15.3 4 14.63 4.2 14.09 4.54C13.28 3.03 11.96 2 10.5 2H8.5ZM8.5 4H10.5C12.16 4 13.5 5.34 13.5 7H6.5C6.5 5.34 7.4 4 8.5 4ZM3 16V22H11V16H3ZM13 16V22H21V16H13Z" fill="currentColor" />
        </svg>
      )
    },
    {
      industry: "Professional Services",
      thumbnail: 'bg-gradient-to-br from-blue-100 to-indigo-100',
      icon: (
        <svg className="w-10 h-10 text-blue-600 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 16V15H3V16C3 17.11 3.89 18 5 18H21C22.11 18 23 17.11 23 16V15H16V16H10ZM20 8C20 5.79 18.21 4 16 4C13.79 4 12 5.79 12 8C12 10.21 13.79 12 16 12C18.21 12 20 10.21 20 8ZM18 8C18 9.1 17.1 10 16 10C14.9 10 14 9.1 14 8C14 6.9 14.9 6 16 6C17.1 6 18 6.9 18 8ZM9.14 8.75C9.73 5.66 10 2 10 2L8.86 2.12C8.86 2.12 8 6.81 7 11.69C6 6.81 5.14 2.12 5.14 2.12L4 2C4 2 4.27 5.66 4.86 8.75C1.73 11.88 0 13 0 16H6C6 13 4.27 11.88 1.13 8.75H1.14C1.14 8.75 4.3 9.5 5 12.5C5.7 9.5 8.86 8.75 8.86 8.75H8.85C5.72 11.88 4 13 4 16H10C10 13 8.27 11.88 5.14 8.75H5.15C5.15 8.75 8.3 9.5 9 12.5" fill="currentColor" />
        </svg>
      )
    },
    {
      industry: "Retail & Shopping",
      thumbnail: 'bg-gradient-to-br from-green-100 to-emerald-100',
      icon: (
        <svg className="w-10 h-10 text-emerald-600 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 18C15.89 18 15 18.89 15 20C15 21.11 15.89 22 17 22C18.11 22 19 21.11 19 20C19 18.89 18.11 18 17 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.11 5.89 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.5C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM7 18C5.89 18 5 18.89 5 20C5 21.11 5.89 22 7 22C8.11 22 9 21.11 9 20C9 18.89 8.11 18 7 18Z" fill="currentColor" />
        </svg>
      )
    },
    {
      industry: "Travel & Hospitality",
      thumbnail: 'bg-gradient-to-br from-purple-100 to-pink-100',
      icon: (
        <svg className="w-10 h-10 text-purple-600 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8ZM19 13H17V17H19V13ZM15 13H13V17H15V13ZM11 13H9V17H11V13Z" fill="currentColor" />
        </svg>
      )
    },
    {
      industry: "Health & Wellness",
      thumbnail: 'bg-gradient-to-br from-pink-100 to-rose-100',
      icon: (
        <svg className="w-10 h-10 text-rose-500 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor" />
        </svg>
      )
    },
    {
      industry: "Construction & Trade",
      thumbnail: 'bg-gradient-to-br from-slate-100 to-gray-200',
      icon: (
        <svg className="w-10 h-10 text-gray-600 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 9H17V11H15V9ZM17 5H15V7H17V5ZM11 15H13V17H11V15ZM13 5H11V7H13V5ZM11 11H13V13H11V11ZM11 7H13V9H11V7ZM7 11H9V13H7V11ZM7 15H9V17H7V15ZM7 7H9V9H7V7ZM3 5V19H21V5H3ZM19 17H5V7H19V17Z" fill="currentColor" />
        </svg>
      )
    }
  ];

  return (
    <section id="templates" className="section-padding bg-white">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Templates Designed for South African Industries
        </h2>
        <p className="text-lekker-gray text-lg">
          Choose from our collection of professionally designed templates for every kind of business.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
        {industryTemplates.map((template, index) => (
          <div 
            key={index} 
            className="section-animation-container bg-white rounded-xl shadow-soft hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className={`${template.thumbnail} h-28 flex items-center justify-center`}>
              {template.icon}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">{template.industry}</h3>
              <p className="text-lekker-gray mb-4">Professional templates designed specifically for {template.industry.toLowerCase()} businesses in South Africa.</p>
              <Button variant="outline" className="w-full">View Templates</Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Button className="btn-primary">Browse All Templates</Button>
      </div>
    </section>
  );
};

export default Templates;
