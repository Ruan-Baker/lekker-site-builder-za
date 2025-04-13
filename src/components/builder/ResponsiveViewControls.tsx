
import React from 'react';
import { Button } from '@/components/ui/button';
import { Laptop, Smartphone, Tablet } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';

const ResponsiveViewControls = () => {
  const { viewportSize, setViewportSize } = useDesign();
  
  return (
    <div className="flex items-center gap-1 border border-gray-200 rounded-md p-0.5 bg-white">
      <Button 
        variant="ghost" 
        size="sm"
        className={`px-3 ${viewportSize === 'desktop' ? 'bg-blue-100 text-blue-600' : ''}`}
        onClick={() => setViewportSize('desktop')}
        title="Desktop view"
      >
        <Laptop className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm"
        className={`px-3 ${viewportSize === 'tablet' ? 'bg-blue-100 text-blue-600' : ''}`}
        onClick={() => setViewportSize('tablet')}
        title="Tablet view"
      >
        <Tablet className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm"
        className={`px-3 ${viewportSize === 'mobile' ? 'bg-blue-100 text-blue-600' : ''}`}
        onClick={() => setViewportSize('mobile')}
        title="Mobile view"
      >
        <Smartphone className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ResponsiveViewControls;
