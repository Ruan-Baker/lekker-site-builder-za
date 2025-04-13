
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import ColorPicker from '@/components/design/ColorPicker';
import { useBuilder } from '@/contexts/BuilderContext';

interface InteractiveControlsProps {
  elementId: string;
}

const InteractiveControls: React.FC<InteractiveControlsProps> = ({ elementId }) => {
  const { elements, updateElement } = useBuilder();
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;
  
  // Get interaction settings with defaults
  const interactions = element.properties.interactions || {};
  const hover = interactions.hover || {};
  const animations = interactions.animations || {};
  
  const updateInteraction = (path: string, value: any) => {
    const [category, property] = path.split('.');
    
    const updatedInteractions = {
      ...interactions,
      [category]: {
        ...(interactions[category] || {}),
        [property]: value
      }
    };
    
    updateElement(elementId, {
      properties: {
        ...element.properties,
        interactions: updatedInteractions
      }
    });
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium mb-2">Interactive Settings</h3>
      
      <Tabs defaultValue="hover">
        <TabsList className="w-full">
          <TabsTrigger value="hover" className="flex-1">Hover</TabsTrigger>
          <TabsTrigger value="animations" className="flex-1">Animations</TabsTrigger>
          <TabsTrigger value="actions" className="flex-1">Actions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hover" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-hover">Enable hover effects</Label>
              <Switch 
                id="enable-hover" 
                checked={hover.enabled || false}
                onCheckedChange={(checked) => updateInteraction('hover.enabled', checked)}
              />
            </div>
            
            {hover.enabled && (
              <>
                <div className="space-y-2">
                  <Label>Background color on hover</Label>
                  <ColorPicker 
                    color={hover.backgroundColor || 'transparent'} 
                    onChange={(color) => updateInteraction('hover.backgroundColor', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Text color on hover</Label>
                  <ColorPicker 
                    color={hover.textColor || ''} 
                    onChange={(color) => updateInteraction('hover.textColor', color)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Scale on hover</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[hover.scale || 1]}
                      min={0.8}
                      max={1.2}
                      step={0.01}
                      onValueChange={([value]) => updateInteraction('hover.scale', value)}
                    />
                    <span className="text-sm w-12 text-right">
                      {hover.scale || 1}x
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Transition duration</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[hover.transitionDuration || 200]}
                      min={0}
                      max={1000}
                      step={10}
                      onValueChange={([value]) => updateInteraction('hover.transitionDuration', value)}
                    />
                    <span className="text-sm w-12 text-right">
                      {hover.transitionDuration || 200}ms
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="animations" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-animations">Enable animations</Label>
              <Switch 
                id="enable-animations" 
                checked={animations.enabled || false}
                onCheckedChange={(checked) => updateInteraction('animations.enabled', checked)}
              />
            </div>
            
            {animations.enabled && (
              <>
                <div className="space-y-2">
                  <Label>Animation type</Label>
                  <Select 
                    value={animations.type || 'fade'} 
                    onValueChange={(value) => updateInteraction('animations.type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select animation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fade">Fade</SelectItem>
                      <SelectItem value="slide">Slide</SelectItem>
                      <SelectItem value="scale">Scale</SelectItem>
                      <SelectItem value="bounce">Bounce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Animation duration</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[animations.duration || 500]}
                      min={100}
                      max={2000}
                      step={100}
                      onValueChange={([value]) => updateInteraction('animations.duration', value)}
                    />
                    <span className="text-sm w-12 text-right">
                      {animations.duration || 500}ms
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Animation delay</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[animations.delay || 0]}
                      min={0}
                      max={2000}
                      step={100}
                      onValueChange={([value]) => updateInteraction('animations.delay', value)}
                    />
                    <span className="text-sm w-12 text-right">
                      {animations.delay || 0}ms
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="actions" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>On Click Action</Label>
            <Select 
              value={interactions.onClick?.action || 'none'} 
              onValueChange={(value) => updateInteraction('onClick.action', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="link">Navigate to URL</SelectItem>
                <SelectItem value="scroll">Scroll to section</SelectItem>
                <SelectItem value="toggle">Toggle element</SelectItem>
              </SelectContent>
            </Select>
            
            {interactions.onClick?.action === 'link' && (
              <div className="space-y-2 mt-2">
                <Label>URL</Label>
                <Input 
                  value={interactions.onClick?.url || ''} 
                  onChange={(e) => updateInteraction('onClick.url', e.target.value)}
                  placeholder="https://example.com"
                />
                <div className="flex items-center gap-2 mt-2">
                  <Switch 
                    id="new-tab" 
                    checked={interactions.onClick?.newTab || false}
                    onCheckedChange={(checked) => updateInteraction('onClick.newTab', checked)}
                  />
                  <Label htmlFor="new-tab">Open in new tab</Label>
                </div>
              </div>
            )}
            
            {interactions.onClick?.action === 'scroll' && (
              <div className="space-y-2 mt-2">
                <Label>Element ID</Label>
                <Input 
                  value={interactions.onClick?.targetId || ''} 
                  onChange={(e) => updateInteraction('onClick.targetId', e.target.value)}
                  placeholder="section-id"
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveControls;
