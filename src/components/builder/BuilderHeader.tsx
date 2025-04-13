
import React from 'react';
import { Button } from '@/components/ui/button';
import { Laptop, Smartphone, Save, Eye, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const BuilderHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <div className="font-bold text-xl mr-4">
            <span className="text-blue-700">Lekker</span><span className="text-blue-500">Sites</span>
          </div>
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">Builder</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="bg-gray-100 rounded-md flex items-center p-1 mr-4">
          <Button variant="ghost" size="icon" className="rounded-md">
            <Laptop size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-md">
            <Smartphone size={18} />
          </Button>
        </div>
        
        <Button variant="ghost" size="icon">
          <Settings size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <Eye size={18} />
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Save size={16} />
          Save
        </Button>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Publish</Button>
      </div>
    </header>
  );
};

export default BuilderHeader;
