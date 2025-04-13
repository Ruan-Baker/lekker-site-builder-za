
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  // Add effect to prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleAuthAction = () => {
    if (user) {
      navigate('/builder');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white backdrop-blur-md shadow-sm py-2 sm:py-3' : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-bold">
            <span className="text-blue-700">Lekker</span><span className="text-blue-500">Sites</span>
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a href="#features" className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">Features</a>
          <a href="#templates" className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">Templates</a>
          <a href="#funnels" className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">Funnels</a>
          <a href="#ecommerce" className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">E-commerce</a>
          <a href="#why" className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">Our Mission</a>
        </nav>
        
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <Button 
              onClick={() => navigate('/builder')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-base"
            >
              My Projects
            </Button>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 text-base"
                onClick={() => navigate('/auth')}
              >
                Login
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white text-base"
                onClick={() => navigate('/auth')}
              >
                Get Started Free
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 hover:text-gray-900 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Mobile Navigation */}
        <div className={`
          fixed inset-0 bg-white z-40 flex flex-col pt-20 px-6
          transition-transform duration-300 ease-in-out md:hidden
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          {/* Close button at the top right */}
          <button 
            className="absolute top-4 right-4 text-gray-800 p-2"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          
          <nav className="flex flex-col space-y-6">
            <a href="#features" className="text-lg font-medium text-gray-800" onClick={closeMenu}>Features</a>
            <a href="#templates" className="text-lg font-medium text-gray-800" onClick={closeMenu}>Templates</a>
            <a href="#funnels" className="text-lg font-medium text-gray-800" onClick={closeMenu}>Funnels</a>
            <a href="#ecommerce" className="text-lg font-medium text-gray-800" onClick={closeMenu}>E-commerce</a>
            <a href="#why" className="text-lg font-medium text-gray-800" onClick={closeMenu}>Our Mission</a>
          </nav>
          
          <div className="mt-8 flex flex-col space-y-4">
            {user ? (
              <Button 
                onClick={() => {
                  navigate('/builder');
                  closeMenu();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base"
              >
                My Projects
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="w-full text-gray-700 text-base"
                  onClick={() => {
                    navigate('/auth');
                    closeMenu();
                  }}
                >
                  Login
                </Button>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base"
                  onClick={() => {
                    navigate('/auth');
                    closeMenu();
                  }}
                >
                  Get Started Free
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
