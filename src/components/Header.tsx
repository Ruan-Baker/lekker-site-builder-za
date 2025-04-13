
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-gray-900">Lekker</span><span className="text-blue-600">Sites</span>
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">Features</a>
          <a href="#templates" className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">Templates</a>
          <a href="#funnels" className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">Funnels</a>
          <a href="#pricing" className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">Pricing</a>
        </nav>
        
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium">
            Login
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 text-sm font-medium shadow-sm">
            Get Started Free
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 hover:text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Mobile Navigation */}
        <div className={`
          fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 
          transition-transform duration-300 md:hidden
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <nav className="flex flex-col space-y-6">
            <a href="#features" className="text-lg font-medium text-gray-800" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#templates" className="text-lg font-medium text-gray-800" onClick={() => setMobileMenuOpen(false)}>Templates</a>
            <a href="#funnels" className="text-lg font-medium text-gray-800" onClick={() => setMobileMenuOpen(false)}>Funnels</a>
            <a href="#pricing" className="text-lg font-medium text-gray-800" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          </nav>
          
          <div className="mt-8 flex flex-col space-y-4">
            <Button variant="outline" className="w-full text-gray-700">Login</Button>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-sm">Get Started Free</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
