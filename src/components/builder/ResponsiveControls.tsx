import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useBuilder } from '@/contexts/BuilderContext';
import { useDesign } from '@/contexts/DesignContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import ResponsiveGridControls from '@/components/builder/ResponsiveGridControls';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Laptop, Smartphone, Tablet, Eye, EyeOff, LayoutGrid 
} from 'lucide-react';

interface ResponsiveControlsProps {
  elementId: string;
}

const ResponsiveControls: React.FC<ResponsiveControlsProps> = ({ elementId }) => {
  const { elements, updateElement, toggleElementVisibility } = useBuilder();
  const { viewportSize } = useDesign();
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;

  // Get responsive settings for current viewport
  const responsive = element.properties.responsive || {
    desktop: {}, tablet: {}, mobile: {}
  };
  
  const currentViewport = responsive[viewportSize] || {};
  const isVisible = currentViewport.isVisible !== false;
  
  const updateResponsiveSetting = (property: string, value: any) => {
    const updatedViewport = {
      ...currentViewport,
      [property]: value
    };
    
    const updatedResponsive = {
      ...responsive,
      [viewportSize]: updatedViewport
    };
    
    updateElement(elementId, {
      properties: {
        ...element.properties,
        responsive: updatedResponsive
      }
    });
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop':
        return <Laptop className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-6">
        <Tabs defaultValue="layout" className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="sizing">Sizing</TabsTrigger>
            <TabsTrigger value="grid">Grid</TabsTrigger>
          </TabsList>
          
          <TabsContent value="layout" className="space-y-4 pt-4">
            <div className="p-4 border rounded-md bg-gray-50 mb-4">
              <div className="flex items-center gap-2 mb-2">
                {getDeviceIcon(viewportSize)}
                <h3 className="text-sm font-medium capitalize">{viewportSize} View</h3>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="isVisible">Visible on {viewportSize}</Label>
                <Switch 
                  id="isVisible" 
                  checked={isVisible}
                  onCheckedChange={(checked) => toggleElementVisibility(elementId, viewportSize, checked)}
                />
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                {isVisible 
                  ? <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> Element will be visible on {viewportSize} devices</span>
                  : <span className="flex items-center gap-1"><EyeOff className="h-3 w-3" /> Element will be hidden on {viewportSize} devices</span>
                }
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="display-select">Display</Label>
                <Select 
                  value={currentViewport.display || 'block'} 
                  onValueChange={(value) => updateResponsiveSetting('display', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select display type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="block">Block</SelectItem>
                    <SelectItem value="inline-block">Inline Block</SelectItem>
                    <SelectItem value="flex">Flex</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {currentViewport.display === 'flex' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="flexDirection-select">Flex Direction</Label>
                    <Select 
                      value={currentViewport.flexDirection || 'row'} 
                      onValueChange={(value) => updateResponsiveSetting('flexDirection', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="row">Row</SelectItem>
                        <SelectItem value="row-reverse">Row Reverse</SelectItem>
                        <SelectItem value="column">Column</SelectItem>
                        <SelectItem value="column-reverse">Column Reverse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="justifyContent-select">Justify Content</Label>
                    <Select 
                      value={currentViewport.justifyContent || 'flex-start'} 
                      onValueChange={(value) => updateResponsiveSetting('justifyContent', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select alignment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flex-start">Start</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="flex-end">End</SelectItem>
                        <SelectItem value="space-between">Space Between</SelectItem>
                        <SelectItem value="space-around">Space Around</SelectItem>
                        <SelectItem value="space-evenly">Space Evenly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alignItems-select">Align Items</Label>
                    <Select 
                      value={currentViewport.alignItems || 'stretch'} 
                      onValueChange={(value) => updateResponsiveSetting('alignItems', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select alignment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flex-start">Start</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="flex-end">End</SelectItem>
                        <SelectItem value="stretch">Stretch</SelectItem>
                        <SelectItem value="baseline">Baseline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="textAlign-select">Text Alignment</Label>
                <Select 
                  value={currentViewport.textAlign || 'left'} 
                  onValueChange={(value) => updateResponsiveSetting('textAlign', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select text alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="justify">Justify</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sizing" className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="width">Width</Label>
                <Input 
                  id="width"
                  placeholder={`${element.position.width}px`}
                  value={currentViewport.width || ''} 
                  onChange={(e) => updateResponsiveSetting('width', e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Use px, %, vh, or rem units (e.g., 100%, 300px, 50vh)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input 
                  id="height"
                  placeholder={`${element.position.height}px`}
                  value={currentViewport.height || ''} 
                  onChange={(e) => updateResponsiveSetting('height', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minWidth">Min Width</Label>
                <Input 
                  id="minWidth"
                  placeholder="auto"
                  value={currentViewport.minWidth || ''} 
                  onChange={(e) => updateResponsiveSetting('minWidth', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxWidth">Max Width</Label>
                <Input 
                  id="maxWidth"
                  placeholder="none"
                  value={currentViewport.maxWidth || ''} 
                  onChange={(e) => updateResponsiveSetting('maxWidth', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minHeight">Min Height</Label>
                <Input 
                  id="minHeight"
                  placeholder="auto"
                  value={currentViewport.minHeight || ''} 
                  onChange={(e) => updateResponsiveSetting('minHeight', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxHeight">Max Height</Label>
                <Input 
                  id="maxHeight"
                  placeholder="none"
                  value={currentViewport.maxHeight || ''} 
                  onChange={(e) => updateResponsiveSetting('maxHeight', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="margin">Margin</Label>
                  <Input 
                    id="margin"
                    placeholder="0px"
                    value={currentViewport.margin || ''} 
                    onChange={(e) => updateResponsiveSetting('margin', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="padding">Padding</Label>
                  <Input 
                    id="padding"
                    placeholder="0px"
                    value={currentViewport.padding || ''} 
                    onChange={(e) => updateResponsiveSetting('padding', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="grid" className="pt-4">
            <Card>
              <ResponsiveGridControls elementId={elementId} />
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="space-y-3 border-t pt-4">
          <h4 className="text-sm font-medium">Additional Settings</h4>
          
          <div className="space-y-2">
            <Label htmlFor="order">Order</Label>
            <Input 
              id="order"
              type="number"
              placeholder="0"
              value={currentViewport.order || ''} 
              onChange={(e) => updateResponsiveSetting('order', e.target.value ? parseInt(e.target.value) : '')}
            />
            <p className="text-xs text-gray-500">
              Controls the order of flexible items (requires flex container)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="zIndex">Z-Index</Label>
            <Input 
              id="zIndex"
              type="number"
              placeholder="auto"
              value={currentViewport.zIndex || ''} 
              onChange={(e) => updateResponsiveSetting('zIndex', e.target.value ? parseInt(e.target.value) : '')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontSize">Font Size</Label>
            <Input 
              id="fontSize"
              placeholder="inherit"
              value={currentViewport.fontSize || ''} 
              onChange={(e) => updateResponsiveSetting('fontSize', e.target.value)}
            />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ResponsiveControls;
