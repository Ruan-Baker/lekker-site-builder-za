
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Lekker Sites helped me launch my coffee shop's website in just a few hours. The templates are beautiful and made for South African businesses!",
      name: "Thando Nkosi",
      business: "Urban Brew Coffee, Johannesburg"
    },
    {
      quote: "As a small accounting firm, we needed a professional website that was easy to manage. Lekker Sites was the perfect solution for us.",
      name: "Michael van der Merwe",
      business: "MVM Accounting, Cape Town"
    },
    {
      quote: "The local payment integrations saved me so much time. My handmade jewelry store now accepts all South African payment methods!",
      name: "Sarah Molefe",
      business: "Beaded Beauty, Durban"
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Trusted by South African Businesses
          </h2>
          <p className="text-lg text-gray-700">
            Join hundreds of satisfied business owners who've created their websites with Lekker Sites.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="text-blue-500 mb-4 text-5xl font-serif">"</div>
              <p className="text-gray-700 mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.business}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20">
          <h3 className="text-xl font-semibold text-center mb-12 text-gray-800">Trusted by local businesses across South Africa</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {['Takealot', 'Woolworths', 'Standard Bank', 'MTN', 'Dis-Chem'].map((logo, index) => (
              <div key={index} className="font-bold text-xl text-gray-700">{logo}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
