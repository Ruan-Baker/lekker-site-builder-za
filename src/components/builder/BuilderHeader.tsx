
import React from 'react';
import { Button } from '@/components/ui/button';
import { Laptop, Smartphone, Save, Eye, Settings } from 'lucide-react';

const BuilderHeader = () => {
  return (
    <header className="bg-white border-b border-lekker-border-gray h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-lekker-purple/30 rounded-md flex items-center justify-center mr-4">
          <span className="text-lekker-purple font-bold">L</span>
        </div>
        <h1 className="text-lg font-semibold text-lekker-black">Lekker Site Builder</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="bg-lekker-light-gray rounded-md flex items-center p-1 mr-4">
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
        <Button size="sm">Publish</Button>
      </div>
    </header>
  );
};

export default BuilderHeader;
