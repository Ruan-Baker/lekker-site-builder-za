
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
    <section id="testimonials" className="section-padding bg-white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Trusted by South African Businesses
        </h2>
        <p className="text-lekker-gray text-lg">
          Join hundreds of satisfied business owners who've created their websites with Lekker Sites.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="section-animation-container testimonial-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-lekker-purple mb-4 text-5xl font-serif">"</div>
            <p className="text-lekker-gray mb-6">{testimonial.quote}</p>
            <div>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-lekker-gray">{testimonial.business}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20">
        <h3 className="text-xl font-semibold text-center mb-12">Trusted by local businesses across South Africa</h3>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {[1, 2, 3, 4, 5].map((logo) => (
            <div key={logo} className="w-32 h-12 bg-lekker-light-gray rounded-md"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
