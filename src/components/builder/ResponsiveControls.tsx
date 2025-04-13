
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useDesign } from '@/contexts/DesignContext';
import { useBuilder } from '@/contexts/BuilderContext';

interface ResponsiveControlsProps {
  elementId: string;
}

const ResponsiveControls: React.FC<ResponsiveControlsProps> = ({ elementId }) => {
  const { elements, updateElement } = useBuilder();
  const { viewportSize } = useDesign();
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;
  
  // Get responsive settings for the current viewport
  const responsive = element.properties.responsive || {
    desktop: {},
    tablet: {},
    mobile: {}
  };
  
  const currentViewport = responsive[viewportSize] || {};
  
  const updateResponsiveProperty = (property: string, value: any) => {
    const updatedResponsive = {
      ...responsive,
      [viewportSize]: {
        ...currentViewport,
        [property]: value
      }
    };
    
    updateElement(elementId, {
      properties: {
        ...element.properties,
        responsive: updatedResponsive
      }
    });
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium mb-2">
        Responsive Settings for {viewportSize.charAt(0).toUpperCase() + viewportSize.slice(1)}
      </h3>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="is-visible">Visible on {viewportSize}</Label>
          <Switch 
            id="is-visible" 
            checked={currentViewport.isVisible !== false}
            onCheckedChange={(checked) => updateResponsiveProperty('isVisible', checked)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label>Width</Label>
          <Input 
            value={currentViewport.width || element.position.width} 
            onChange={(e) => updateResponsiveProperty('width', e.target.value)}
            placeholder="Auto"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Height</Label>
          <Input 
            value={currentViewport.height || element.position.height} 
            onChange={(e) => updateResponsiveProperty('height', e.target.value)}
            placeholder="Auto"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label>Margin (T R B L)</Label>
          <Input 
            value={currentViewport.margin || ''} 
            onChange={(e) => updateResponsiveProperty('margin', e.target.value)}
            placeholder="0px 0px 0px 0px"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Padding (T R B L)</Label>
          <Input 
            value={currentViewport.padding || ''} 
            onChange={(e) => updateResponsiveProperty('padding', e.target.value)}
            placeholder="0px 0px 0px 0px"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Font Size</Label>
        <Input 
          value={currentViewport.fontSize || ''} 
          onChange={(e) => updateResponsiveProperty('fontSize', e.target.value)}
          placeholder="16px"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Text Alignment</Label>
        <div className="flex border rounded-md overflow-hidden">
          <button
            className={`flex-1 py-1 px-2 ${currentViewport.textAlign === 'left' ? 'bg-blue-100 text-blue-700' : 'bg-white'}`}
            onClick={() => updateResponsiveProperty('textAlign', 'left')}
          >
            Left
          </button>
          <button
            className={`flex-1 py-1 px-2 ${currentViewport.textAlign === 'center' ? 'bg-blue-100 text-blue-700' : 'bg-white'}`}
            onClick={() => updateResponsiveProperty('textAlign', 'center')}
          >
            Center
          </button>
          <button
            className={`flex-1 py-1 px-2 ${currentViewport.textAlign === 'right' ? 'bg-blue-100 text-blue-700' : 'bg-white'}`}
            onClick={() => updateResponsiveProperty('textAlign', 'right')}
          >
            Right
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveControls;
