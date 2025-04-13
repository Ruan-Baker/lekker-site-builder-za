
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Lekker Sites helped me launch my coffee shop's website in just a few hours. The templates are beautiful and made for South African businesses!",
      name: "Thando Nkosi",
      business: "Urban Brew Coffee, Johannesburg",
      rating: 5,
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      quote: "As a small accounting firm, we needed a professional website that was easy to manage. Lekker Sites was the perfect solution for us.",
      name: "Michael van der Merwe",
      business: "MVM Accounting, Cape Town",
      rating: 5,
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      quote: "The local payment integrations saved me so much time. My handmade jewelry store now accepts all South African payment methods!",
      name: "Sarah Molefe",
      business: "Beaded Beauty, Durban",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
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
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-blue-600 mb-4 text-5xl font-serif">"</div>
              <p className="text-gray-700 mb-6 text-lg">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20">
          <h3 className="text-xl font-semibold text-center mb-12 text-gray-800">Trusted by businesses across South Africa</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            <div className="font-bold text-2xl text-gray-700">Takealot</div>
            <div className="font-bold text-2xl text-gray-700">Woolworths</div>
            <div className="font-bold text-2xl text-gray-700">Standard Bank</div>
            <div className="font-bold text-2xl text-gray-700">MTN</div>
            <div className="font-bold text-2xl text-gray-700">Dis-Chem</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
