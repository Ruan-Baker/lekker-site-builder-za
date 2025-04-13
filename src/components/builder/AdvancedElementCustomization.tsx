
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useBuilder } from '@/contexts/BuilderContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import ColorPicker from '@/components/design/ColorPicker';
import BackgroundSelector from '@/components/design/BackgroundSelector';
import ShadowGenerator from '@/components/design/ShadowGenerator';
import AdvancedTypographyControls from '@/components/design/AdvancedTypographyControls';
import { Type, Palette, PenLine, Layers, MousePointer, Frame, Box } from 'lucide-react';

interface AdvancedElementCustomizationProps {
  elementId: string;
}

const AdvancedElementCustomization: React.FC<AdvancedElementCustomizationProps> = ({ elementId }) => {
  const { elements, updateElement } = useBuilder();
  const [activeTab, setActiveTab] = useState('styles');
  
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;
  
  const advancedStyles = element.properties.advancedStyles || {};
  const transforms = element.properties.transforms || {};
  const filters = element.properties.filters || {};
  const animation = element.properties.animation || {};
  
  const updateAdvancedStyle = (key: string, value: any) => {
    updateElement(elementId, {
      properties: {
        ...element.properties,
        advancedStyles: {
          ...advancedStyles,
          [key]: value
        }
      }
    });
  };
  
  const updateTransform = (key: string, value: any) => {
    updateElement(elementId, {
      properties: {
        ...element.properties,
        transforms: {
          ...transforms,
          [key]: value
        }
      }
    });
  };
  
  const updateFilter = (key: string, value: any) => {
    updateElement(elementId, {
      properties: {
        ...element.properties,
        filters: {
          ...filters,
          [key]: value
        }
      }
    });
  };
  
  const updateAnimation = (key: string, value: any) => {
    updateElement(elementId, {
      properties: {
        ...element.properties,
        animation: {
          ...animation,
          [key]: value
        }
      }
    });
  };
  
  // Generate the CSS from current properties
  const generateCss = () => {
    let css = '';
    
    // Advanced styles
    if (advancedStyles.position) css += `position: ${advancedStyles.position};\n`;
    if (advancedStyles.overflow) css += `overflow: ${advancedStyles.overflow};\n`;
    if (advancedStyles.zIndex) css += `z-index: ${advancedStyles.zIndex};\n`;
    
    // Transform properties
    const transformProps = [];
    if (transforms.translateX) transformProps.push(`translateX(${transforms.translateX}px)`);
    if (transforms.translateY) transformProps.push(`translateY(${transforms.translateY}px)`);
    if (transforms.rotate) transformProps.push(`rotate(${transforms.rotate}deg)`);
    if (transforms.scale) transformProps.push(`scale(${transforms.scale})`);
    if (transforms.skewX) transformProps.push(`skewX(${transforms.skewX}deg)`);
    if (transforms.skewY) transformProps.push(`skewY(${transforms.skewY}deg)`);
    
    if (transformProps.length > 0) {
      css += `transform: ${transformProps.join(' ')};\n`;
    }
    
    // Filter properties
    const filterProps = [];
    if (filters.blur) filterProps.push(`blur(${filters.blur}px)`);
    if (filters.brightness) filterProps.push(`brightness(${filters.brightness})`);
    if (filters.contrast) filterProps.push(`contrast(${filters.contrast})`);
    if (filters.grayscale) filterProps.push(`grayscale(${filters.grayscale})`);
    if (filters.hueRotate) filterProps.push(`hue-rotate(${filters.hueRotate}deg)`);
    if (filters.saturate) filterProps.push(`saturate(${filters.saturate})`);
    
    if (filterProps.length > 0) {
      css += `filter: ${filterProps.join(' ')};\n`;
    }
    
    // Animation properties
    if (animation.name && animation.duration) {
      css += `animation: ${animation.name} ${animation.duration}s`;
      if (animation.timingFunction) css += ` ${animation.timingFunction}`;
      if (animation.delay) css += ` ${animation.delay}s`;
      if (animation.iterationCount) css += ` ${animation.iterationCount}`;
      if (animation.direction) css += ` ${animation.direction}`;
      if (animation.fillMode) css += ` ${animation.fillMode}`;
      css += ';\n';
    }
    
    return css;
  };
  
  return (
    <ScrollArea className="h-[500px]">
      <div className="p-4 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="styles" className="flex items-center gap-1">
              <Palette className="h-4 w-4" />
              <span>Styles</span>
            </TabsTrigger>
            <TabsTrigger value="transforms" className="flex items-center gap-1">
              <Frame className="h-4 w-4" />
              <span>Transforms</span>
            </TabsTrigger>
            <TabsTrigger value="animations" className="flex items-center gap-1">
              <Layers className="h-4 w-4" />
              <span>Animations</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="styles" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Advanced Styles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Select 
                    value={advancedStyles.position || 'static'} 
                    onValueChange={(val) => updateAdvancedStyle('position', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static">Static</SelectItem>
                      <SelectItem value="relative">Relative</SelectItem>
                      <SelectItem value="absolute">Absolute</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="sticky">Sticky</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {(advancedStyles.position === 'absolute' || advancedStyles.position === 'fixed' || advancedStyles.position === 'relative') && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Top</Label>
                      <Input
                        type="text"
                        placeholder="auto"
                        value={advancedStyles.top || ''}
                        onChange={(e) => updateAdvancedStyle('top', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Right</Label>
                      <Input
                        type="text"
                        placeholder="auto"
                        value={advancedStyles.right || ''}
                        onChange={(e) => updateAdvancedStyle('right', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Bottom</Label>
                      <Input
                        type="text"
                        placeholder="auto"
                        value={advancedStyles.bottom || ''}
                        onChange={(e) => updateAdvancedStyle('bottom', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Left</Label>
                      <Input
                        type="text"
                        placeholder="auto"
                        value={advancedStyles.left || ''}
                        onChange={(e) => updateAdvancedStyle('left', e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Z-Index</Label>
                  <Input
                    type="number"
                    placeholder="auto"
                    value={advancedStyles.zIndex || ''}
                    onChange={(e) => updateAdvancedStyle('zIndex', e.target.value ? parseInt(e.target.value) : '')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Overflow</Label>
                  <Select 
                    value={advancedStyles.overflow || 'visible'} 
                    onValueChange={(val) => updateAdvancedStyle('overflow', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select overflow" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visible">Visible</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                      <SelectItem value="scroll">Scroll</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Opacity</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[advancedStyles.opacity !== undefined ? advancedStyles.opacity * 100 : 100]}
                      onValueChange={([value]) => updateAdvancedStyle('opacity', value / 100)}
                    />
                    <div className="w-12 text-center">
                      {advancedStyles.opacity !== undefined ? Math.round(advancedStyles.opacity * 100) : 100}%
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Cursor</Label>
                  <Select 
                    value={advancedStyles.cursor || 'auto'} 
                    onValueChange={(val) => updateAdvancedStyle('cursor', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cursor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="pointer">Pointer</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="move">Move</SelectItem>
                      <SelectItem value="not-allowed">Not Allowed</SelectItem>
                      <SelectItem value="grabbing">Grabbing</SelectItem>
                      <SelectItem value="help">Help</SelectItem>
                      <SelectItem value="wait">Wait</SelectItem>
                      <SelectItem value="crosshair">Crosshair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Blur</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={0}
                      max={20}
                      step={0.5}
                      value={[filters.blur || 0]}
                      onValueChange={([value]) => updateFilter('blur', value)}
                    />
                    <div className="w-12 text-center">
                      {filters.blur || 0}px
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Brightness</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={0}
                      max={2}
                      step={0.05}
                      value={[filters.brightness || 1]}
                      onValueChange={([value]) => updateFilter('brightness', value)}
                    />
                    <div className="w-12 text-center">
                      {filters.brightness || 1}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Contrast</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={0}
                      max={2}
                      step={0.05}
                      value={[filters.contrast || 1]}
                      onValueChange={([value]) => updateFilter('contrast', value)}
                    />
                    <div className="w-12 text-center">
                      {filters.contrast || 1}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Grayscale</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={0}
                      max={1}
                      step={0.01}
                      value={[filters.grayscale || 0]}
                      onValueChange={([value]) => updateFilter('grayscale', value)}
                    />
                    <div className="w-12 text-center">
                      {Math.round((filters.grayscale || 0) * 100)}%
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Hue Rotate</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={0}
                      max={360}
                      step={5}
                      value={[filters.hueRotate || 0]}
                      onValueChange={([value]) => updateFilter('hueRotate', value)}
                    />
                    <div className="w-12 text-center">
                      {filters.hueRotate || 0}°
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Saturate</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={0}
                      max={3}
                      step={0.1}
                      value={[filters.saturate || 1]}
                      onValueChange={([value]) => updateFilter('saturate', value)}
                    />
                    <div className="w-12 text-center">
                      {filters.saturate || 1}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transforms" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Transform Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Scale</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={0.1}
                      max={2}
                      step={0.05}
                      value={[transforms.scale || 1]}
                      onValueChange={([value]) => updateTransform('scale', value)}
                    />
                    <div className="w-12 text-center">
                      {transforms.scale || 1}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Rotate</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={-180}
                      max={180}
                      step={5}
                      value={[transforms.rotate || 0]}
                      onValueChange={([value]) => updateTransform('rotate', value)}
                    />
                    <div className="w-12 text-center">
                      {transforms.rotate || 0}°
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Translate X</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={-100}
                      max={100}
                      step={1}
                      value={[transforms.translateX || 0]}
                      onValueChange={([value]) => updateTransform('translateX', value)}
                    />
                    <div className="w-12 text-center">
                      {transforms.translateX || 0}px
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Translate Y</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={-100}
                      max={100}
                      step={1}
                      value={[transforms.translateY || 0]}
                      onValueChange={([value]) => updateTransform('translateY', value)}
                    />
                    <div className="w-12 text-center">
                      {transforms.translateY || 0}px
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Skew X</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={-30}
                      max={30}
                      step={1}
                      value={[transforms.skewX || 0]}
                      onValueChange={([value]) => updateTransform('skewX', value)}
                    />
                    <div className="w-12 text-center">
                      {transforms.skewX || 0}°
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Skew Y</Label>
                  <div className="flex gap-2">
                    <Slider
                      min={-30}
                      max={30}
                      step={1}
                      value={[transforms.skewY || 0]}
                      onValueChange={([value]) => updateTransform('skewY', value)}
                    />
                    <div className="w-12 text-center">
                      {transforms.skewY || 0}°
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Transform Origin</Label>
                  <Select 
                    value={transforms.origin || 'center'} 
                    onValueChange={(val) => updateTransform('origin', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="top right">Top Right</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="bottom right">Bottom Right</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="bottom left">Bottom Left</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="top left">Top Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="animations" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Animation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Animation Type</Label>
                  <Select 
                    value={animation.name || ''} 
                    onValueChange={(val) => updateAnimation('name', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select animation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      <SelectItem value="fade-in">Fade In</SelectItem>
                      <SelectItem value="fade-out">Fade Out</SelectItem>
                      <SelectItem value="slide-up">Slide Up</SelectItem>
                      <SelectItem value="slide-down">Slide Down</SelectItem>
                      <SelectItem value="slide-left">Slide Left</SelectItem>
                      <SelectItem value="slide-right">Slide Right</SelectItem>
                      <SelectItem value="scale-in">Scale In</SelectItem>
                      <SelectItem value="scale-out">Scale Out</SelectItem>
                      <SelectItem value="rotate-in">Rotate In</SelectItem>
                      <SelectItem value="bounce">Bounce</SelectItem>
                      <SelectItem value="pulse">Pulse</SelectItem>
                      <SelectItem value="spin">Spin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {animation.name && (
                  <>
                    <div className="space-y-2">
                      <Label>Duration (seconds)</Label>
                      <div className="flex gap-2">
                        <Slider
                          min={0.1}
                          max={10}
                          step={0.1}
                          value={[animation.duration || 1]}
                          onValueChange={([value]) => updateAnimation('duration', value)}
                        />
                        <div className="w-12 text-center">
                          {animation.duration || 1}s
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Timing Function</Label>
                      <Select 
                        value={animation.timingFunction || 'ease'} 
                        onValueChange={(val) => updateAnimation('timingFunction', val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ease">Ease</SelectItem>
                          <SelectItem value="linear">Linear</SelectItem>
                          <SelectItem value="ease-in">Ease In</SelectItem>
                          <SelectItem value="ease-out">Ease Out</SelectItem>
                          <SelectItem value="ease-in-out">Ease In Out</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Delay (seconds)</Label>
                      <div className="flex gap-2">
                        <Slider
                          min={0}
                          max={5}
                          step={0.1}
                          value={[animation.delay || 0]}
                          onValueChange={([value]) => updateAnimation('delay', value)}
                        />
                        <div className="w-12 text-center">
                          {animation.delay || 0}s
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Iteration Count</Label>
                      <Select 
                        value={animation.iterationCount || '1'} 
                        onValueChange={(val) => updateAnimation('iterationCount', val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="infinite">Infinite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Direction</Label>
                      <Select 
                        value={animation.direction || 'normal'} 
                        onValueChange={(val) => updateAnimation('direction', val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="reverse">Reverse</SelectItem>
                          <SelectItem value="alternate">Alternate</SelectItem>
                          <SelectItem value="alternate-reverse">Alternate Reverse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Fill Mode</Label>
                      <Select 
                        value={animation.fillMode || 'none'} 
                        onValueChange={(val) => updateAnimation('fillMode', val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select fill mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="forwards">Forwards</SelectItem>
                          <SelectItem value="backwards">Backwards</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Generated CSS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-3 rounded-md font-mono text-xs">
                  <pre>{generateCss()}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default AdvancedElementCustomization;
