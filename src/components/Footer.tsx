
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-perspective-black text-white pt-20 pb-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center">
              <h2 className="text-2xl font-bold text-white">Lekker<span className="text-perspective-purple">Sites</span></h2>
            </Link>
            <p className="mt-4 text-perspective-gray max-w-xs">
              The website and funnel builder created specifically for South African businesses to establish their online presence quickly and professionally.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-perspective-purple/80 transition-colors duration-200">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-perspective-purple/80 transition-colors duration-200">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-perspective-purple/80 transition-colors duration-200">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-perspective-purple/80 transition-colors duration-200">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-lg">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-perspective-gray hover:text-white transition-colors duration-200">Features</a></li>
              <li><a href="#templates" className="text-perspective-gray hover:text-white transition-colors duration-200">Templates</a></li>
              <li><a href="#funnels" className="text-perspective-gray hover:text-white transition-colors duration-200">Funnels</a></li>
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">Pricing</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-lg">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">Tutorials</a></li>
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">Support</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">Partners</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">Cookie Policy</a></li>
              <li><a href="#" className="text-perspective-gray hover:text-white transition-colors duration-200">POPIA Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-perspective-gray">© {currentYear} Lekker Sites. All rights reserved.</p>
          
          <p className="mt-4 md:mt-0 text-sm text-perspective-gray">
            Made with ❤️ in South Africa
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
