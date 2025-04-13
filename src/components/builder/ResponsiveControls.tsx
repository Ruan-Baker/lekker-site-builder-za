
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useDesign } from '@/contexts/DesignContext';
import { useBuilder } from '@/contexts/BuilderContext';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { EyeIcon, EyeOffIcon, Laptop, Smartphone, Tablet } from 'lucide-react';

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

  const copyFromViewport = (sourceViewport: string) => {
    if (sourceViewport === viewportSize) return;

    const sourceSettings = responsive[sourceViewport] || {};
    
    updateElement(elementId, {
      properties: {
        ...element.properties,
        responsive: {
          ...responsive,
          [viewportSize]: {
            ...sourceSettings
          }
        }
      }
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">
          Responsive Settings for {viewportSize.charAt(0).toUpperCase() + viewportSize.slice(1)}
        </h3>
        
        <Select 
          value={viewportSize === 'desktop' ? 'none' : 'none'}
          onValueChange={(value) => {
            if (value !== 'none') {
              copyFromViewport(value);
            }
          }}
        >
          <SelectTrigger className="w-[130px] h-8 text-xs">
            <SelectValue placeholder="Copy from..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" disabled>Copy settings from...</SelectItem>
            {viewportSize !== 'desktop' && <SelectItem value="desktop">Desktop</SelectItem>}
            {viewportSize !== 'tablet' && <SelectItem value="tablet">Tablet</SelectItem>}
            {viewportSize !== 'mobile' && <SelectItem value="mobile">Mobile</SelectItem>}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded-md bg-gray-100">
            {viewportSize === 'desktop' ? (
              <Laptop className="h-4 w-4" />
            ) : viewportSize === 'tablet' ? (
              <Tablet className="h-4 w-4" />
            ) : (
              <Smartphone className="h-4 w-4" />
            )}
          </div>
          <Label htmlFor="is-visible">Visible on {viewportSize}</Label>
        </div>
        <Switch 
          id="is-visible" 
          checked={currentViewport.isVisible !== false}
          onCheckedChange={(checked) => updateResponsiveProperty('isVisible', checked)}
        />
      </div>
      
      <Separator />
      
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="dimensions">
          <AccordionTrigger className="text-sm py-2">Dimensions & Position</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label className="text-xs">Width</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={currentViewport.width || ''} 
                      onChange={(e) => updateResponsiveProperty('width', e.target.value)}
                      placeholder="Auto"
                      className="text-xs"
                    />
                    <Select 
                      value={currentViewport.widthUnit || 'px'} 
                      onValueChange={(value) => updateResponsiveProperty('widthUnit', value)}
                    >
                      <SelectTrigger className="w-20 h-8 text-xs">
                        <SelectValue placeholder="px" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="px">px</SelectItem>
                        <SelectItem value="%">%</SelectItem>
                        <SelectItem value="rem">rem</SelectItem>
                        <SelectItem value="vw">vw</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs">Height</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={currentViewport.height || ''} 
                      onChange={(e) => updateResponsiveProperty('height', e.target.value)}
                      placeholder="Auto"
                      className="text-xs"
                    />
                    <Select 
                      value={currentViewport.heightUnit || 'px'} 
                      onValueChange={(value) => updateResponsiveProperty('heightUnit', value)}
                    >
                      <SelectTrigger className="w-20 h-8 text-xs">
                        <SelectValue placeholder="px" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="px">px</SelectItem>
                        <SelectItem value="%">%</SelectItem>
                        <SelectItem value="rem">rem</SelectItem>
                        <SelectItem value="vh">vh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label className="text-xs">Min Width</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={currentViewport.minWidth || ''} 
                      onChange={(e) => updateResponsiveProperty('minWidth', e.target.value)}
                      placeholder="None"
                      className="text-xs"
                    />
                    <Select 
                      value={currentViewport.minWidthUnit || 'px'} 
                      onValueChange={(value) => updateResponsiveProperty('minWidthUnit', value)}
                    >
                      <SelectTrigger className="w-20 h-8 text-xs">
                        <SelectValue placeholder="px" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="px">px</SelectItem>
                        <SelectItem value="%">%</SelectItem>
                        <SelectItem value="rem">rem</SelectItem>
                        <SelectItem value="vw">vw</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs">Max Width</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={currentViewport.maxWidth || ''} 
                      onChange={(e) => updateResponsiveProperty('maxWidth', e.target.value)}
                      placeholder="None"
                      className="text-xs"
                    />
                    <Select 
                      value={currentViewport.maxWidthUnit || 'px'} 
                      onValueChange={(value) => updateResponsiveProperty('maxWidthUnit', value)}
                    >
                      <SelectTrigger className="w-20 h-8 text-xs">
                        <SelectValue placeholder="px" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="px">px</SelectItem>
                        <SelectItem value="%">%</SelectItem>
                        <SelectItem value="rem">rem</SelectItem>
                        <SelectItem value="vw">vw</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="spacing">
          <AccordionTrigger className="text-sm py-2">Margin & Padding</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs">Margin</Label>
                <div className="grid grid-cols-4 gap-1">
                  <div>
                    <Label className="text-xs text-gray-500">Top</Label>
                    <Input 
                      value={currentViewport.marginTop || ''} 
                      onChange={(e) => updateResponsiveProperty('marginTop', e.target.value)}
                      className="text-xs"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Right</Label>
                    <Input 
                      value={currentViewport.marginRight || ''} 
                      onChange={(e) => updateResponsiveProperty('marginRight', e.target.value)}
                      className="text-xs"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Bottom</Label>
                    <Input 
                      value={currentViewport.marginBottom || ''} 
                      onChange={(e) => updateResponsiveProperty('marginBottom', e.target.value)}
                      className="text-xs"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Left</Label>
                    <Input 
                      value={currentViewport.marginLeft || ''} 
                      onChange={(e) => updateResponsiveProperty('marginLeft', e.target.value)}
                      className="text-xs"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-xs h-7 mt-1" onClick={() => {
                    updateResponsiveProperty('marginTop', '');
                    updateResponsiveProperty('marginRight', '');
                    updateResponsiveProperty('marginBottom', '');
                    updateResponsiveProperty('marginLeft', '');
                  }}>
                    Reset all
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Padding</Label>
                <div className="grid grid-cols-4 gap-1">
                  <div>
                    <Label className="text-xs text-gray-500">Top</Label>
                    <Input 
                      value={currentViewport.paddingTop || ''} 
                      onChange={(e) => updateResponsiveProperty('paddingTop', e.target.value)}
                      className="text-xs"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Right</Label>
                    <Input 
                      value={currentViewport.paddingRight || ''} 
                      onChange={(e) => updateResponsiveProperty('paddingRight', e.target.value)}
                      className="text-xs"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Bottom</Label>
                    <Input 
                      value={currentViewport.paddingBottom || ''} 
                      onChange={(e) => updateResponsiveProperty('paddingBottom', e.target.value)}
                      className="text-xs"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Left</Label>
                    <Input 
                      value={currentViewport.paddingLeft || ''} 
                      onChange={(e) => updateResponsiveProperty('paddingLeft', e.target.value)}
                      className="text-xs"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-xs h-7 mt-1" onClick={() => {
                    updateResponsiveProperty('paddingTop', '');
                    updateResponsiveProperty('paddingRight', '');
                    updateResponsiveProperty('paddingBottom', '');
                    updateResponsiveProperty('paddingLeft', '');
                  }}>
                    Reset all
                  </Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="typography">
          <AccordionTrigger className="text-sm py-2">Typography</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label className="text-xs">Font Size</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={currentViewport.fontSize || ''} 
                      onChange={(e) => updateResponsiveProperty('fontSize', e.target.value)}
                      placeholder="16"
                      className="text-xs"
                    />
                    <Select 
                      value={currentViewport.fontSizeUnit || 'px'} 
                      onValueChange={(value) => updateResponsiveProperty('fontSizeUnit', value)}
                    >
                      <SelectTrigger className="w-20 h-8 text-xs">
                        <SelectValue placeholder="px" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="px">px</SelectItem>
                        <SelectItem value="rem">rem</SelectItem>
                        <SelectItem value="em">em</SelectItem>
                        <SelectItem value="%">%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs">Line Height</Label>
                  <Input 
                    value={currentViewport.lineHeight || ''} 
                    onChange={(e) => updateResponsiveProperty('lineHeight', e.target.value)}
                    placeholder="1.5"
                    className="text-xs"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Text Alignment</Label>
                <div className="grid grid-cols-4 gap-1">
                  <Button
                    variant={currentViewport.textAlign === 'left' ? 'default' : 'outline'}
                    className="text-xs h-8"
                    onClick={() => updateResponsiveProperty('textAlign', 'left')}
                  >
                    Left
                  </Button>
                  <Button
                    variant={currentViewport.textAlign === 'center' ? 'default' : 'outline'}
                    className="text-xs h-8"
                    onClick={() => updateResponsiveProperty('textAlign', 'center')}
                  >
                    Center
                  </Button>
                  <Button
                    variant={currentViewport.textAlign === 'right' ? 'default' : 'outline'}
                    className="text-xs h-8"
                    onClick={() => updateResponsiveProperty('textAlign', 'right')}
                  >
                    Right
                  </Button>
                  <Button
                    variant={currentViewport.textAlign === 'justify' ? 'default' : 'outline'}
                    className="text-xs h-8"
                    onClick={() => updateResponsiveProperty('textAlign', 'justify')}
                  >
                    Justify
                  </Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="display">
          <AccordionTrigger className="text-sm py-2">Display & Visibility</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs">Display Type</Label>
                <Select 
                  value={currentViewport.display || 'block'} 
                  onValueChange={(value) => updateResponsiveProperty('display', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select display type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="block">Block</SelectItem>
                    <SelectItem value="inline">Inline</SelectItem>
                    <SelectItem value="inline-block">Inline Block</SelectItem>
                    <SelectItem value="flex">Flex</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-xs" htmlFor="overflow-hidden">Hide Overflow</Label>
                <Switch 
                  id="overflow-hidden" 
                  checked={currentViewport.overflowHidden === true}
                  onCheckedChange={(checked) => updateResponsiveProperty('overflowHidden', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-xs" htmlFor="position-relative">Position Relative</Label>
                <Switch 
                  id="position-relative" 
                  checked={currentViewport.positionRelative === true}
                  onCheckedChange={(checked) => updateResponsiveProperty('positionRelative', checked)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResponsiveControls;
