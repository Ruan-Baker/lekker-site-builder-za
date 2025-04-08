
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="h-24 flex items-center px-[5%] bg-white sticky top-0 z-50 shadow-softer">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold text-lekker-black">Lekker<span className="text-lekker-purple">Sites</span></h1>
          </Link>
          <nav className="hidden md:flex ml-10">
            <ul className="flex items-center space-x-9">
              <li><a href="#features" className="nav-link">Features</a></li>
              <li><a href="#templates" className="nav-link">Templates</a></li>
              <li><a href="#testimonials" className="nav-link">Testimonials</a></li>
              <li><a href="#pricing" className="nav-link">Pricing</a></li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="rounded-2xl px-5 py-2 font-medium">
            Login
          </Button>
          <Button className="bg-lekker-purple hover:bg-lekker-purple-hover text-white rounded-2xl px-5 py-2 font-medium">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
