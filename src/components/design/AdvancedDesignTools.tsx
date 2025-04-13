
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ColorPicker from './ColorPicker';
import ShadowGenerator from './ShadowGenerator';
import BackgroundSelector from './BackgroundSelector';
import AdvancedTypographyControls from './AdvancedTypographyControls';
import { useDesign } from '@/contexts/DesignContext';
import { useBuilder } from '@/contexts/BuilderContext';
import { Paintbrush, Type, Layout, Palette, Layers, Sliders } from 'lucide-react';

interface AdvancedDesignToolsProps {
  elementId: string;
}

const AdvancedDesignTools: React.FC<AdvancedDesignToolsProps> = ({ elementId }) => {
  const { elements, updateElement } = useBuilder();
  const { designSettings } = useDesign();
  const [activeTab, setActiveTab] = useState('typography');
  
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;
  
  const handleStyleChange = (property: string, value: any) => {
    updateElement(elementId, {
      properties: {
        ...element.properties,
        style: {
          ...(element.properties.style || {}),
          [property]: value
        }
      }
    });
  };

  const handleTypographyChange = (values: Record<string, string>) => {
    updateElement(elementId, {
      properties: {
        ...element.properties,
        typography: {
          ...(element.properties.typography || {}),
          ...values
        }
      }
    });
  };

  const handleBackgroundChange = (background: any) => {
    updateElement(elementId, {
      properties: {
        ...element.properties,
        background
      }
    });
  };

  const handleBorderChange = (border: any) => {
    updateElement(elementId, {
      properties: {
        ...element.properties,
        border
      }
    });
  };
  
  const handleEffectChange = (effect: string, value: any) => {
    updateElement(elementId, {
      properties: {
        ...element.properties,
        effects: {
          ...(element.properties.effects || {}),
          [effect]: value
        }
      }
    });
  };
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="typography" className="flex items-center gap-1">
            <Type className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Typography</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-1">
            <Palette className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="effects" className="flex items-center gap-1">
            <Layers className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Effects</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="typography" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Typography Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <AdvancedTypographyControls
                value={element.properties.typography || {}}
                onChange={handleTypographyChange}
                fonts={availableFonts || []}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Background</CardTitle>
            </CardHeader>
            <CardContent>
              <BackgroundSelector 
                value={element.properties.background || {}} 
                onChange={handleBackgroundChange} 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Border</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Border Width</Label>
                <Slider 
                  value={[element.properties.border?.width || 0]} 
                  min={0} 
                  max={10} 
                  step={1} 
                  onValueChange={([value]) => handleBorderChange({
                    ...(element.properties.border || {}),
                    width: value
                  })}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0px</span>
                  <span>10px</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Border Style</Label>
                <Select 
                  value={element.properties.border?.style || 'solid'} 
                  onValueChange={(value) => handleBorderChange({
                    ...(element.properties.border || {}),
                    style: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Border style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="dashed">Dashed</SelectItem>
                    <SelectItem value="dotted">Dotted</SelectItem>
                    <SelectItem value="double">Double</SelectItem>
                    <SelectItem value="groove">Groove</SelectItem>
                    <SelectItem value="ridge">Ridge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Border Color</Label>
                <ColorPicker 
                  color={element.properties.border?.color || '#000000'} 
                  onChange={(color) => handleBorderChange({
                    ...(element.properties.border || {}),
                    color
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Border Radius</Label>
                <Slider 
                  value={[element.properties.border?.radius || 0]} 
                  min={0} 
                  max={50} 
                  step={1} 
                  onValueChange={([value]) => handleBorderChange({
                    ...(element.properties.border || {}),
                    radius: value
                  })}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0px</span>
                  <span>50px</span>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mt-2">
                  <button
                    type="button"
                    className={`text-xs p-1 rounded ${element.properties.border?.radius === 0 ? 'bg-primary text-white' : 'bg-muted'}`}
                    onClick={() => handleBorderChange({
                      ...(element.properties.border || {}),
                      radius: 0
                    })}
                  >
                    Square
                  </button>
                  <button
                    type="button"
                    className={`text-xs p-1 rounded ${element.properties.border?.radius === 4 ? 'bg-primary text-white' : 'bg-muted'}`}
                    onClick={() => handleBorderChange({
                      ...(element.properties.border || {}),
                      radius: 4
                    })}
                  >
                    Small
                  </button>
                  <button
                    type="button"
                    className={`text-xs p-1 rounded ${element.properties.border?.radius === 8 ? 'bg-primary text-white' : 'bg-muted'}`}
                    onClick={() => handleBorderChange({
                      ...(element.properties.border || {}),
                      radius: 8
                    })}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    className={`text-xs p-1 rounded ${element.properties.border?.radius === 9999 ? 'bg-primary text-white' : 'bg-muted'}`}
                    onClick={() => handleBorderChange({
                      ...(element.properties.border || {}),
                      radius: 9999
                    })}
                  >
                    Pill
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="effects" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Shadow</CardTitle>
            </CardHeader>
            <CardContent>
              <ShadowGenerator 
                value={element.properties.effects?.boxShadow || 'none'} 
                onChange={(shadow) => handleEffectChange('boxShadow', shadow)} 
                type="box"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Transform & Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Opacity</Label>
                <Slider 
                  value={[element.properties.effects?.opacity !== undefined ? element.properties.effects.opacity * 100 : 100]} 
                  min={0} 
                  max={100} 
                  step={1} 
                  onValueChange={([value]) => handleEffectChange('opacity', value / 100)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Scale</Label>
                <Slider 
                  value={[element.properties.effects?.scale || 1]} 
                  min={0.5} 
                  max={2} 
                  step={0.05} 
                  onValueChange={([value]) => handleEffectChange('scale', value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>50%</span>
                  <span>200%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Blur</Label>
                <Slider 
                  value={[element.properties.effects?.blur || 0]} 
                  min={0} 
                  max={20} 
                  step={1} 
                  onValueChange={([value]) => handleEffectChange('blur', value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0px</span>
                  <span>20px</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Rotate</Label>
                <Slider 
                  value={[element.properties.effects?.rotate || 0]} 
                  min={-180} 
                  max={180} 
                  step={1} 
                  onValueChange={([value]) => handleEffectChange('rotate', value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>-180°</span>
                  <span>180°</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="filter-grayscale">Grayscale</Label>
                <Switch 
                  id="filter-grayscale" 
                  checked={element.properties.effects?.grayscale || false} 
                  onCheckedChange={(checked) => handleEffectChange('grayscale', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Add the missing availableFonts array
const availableFonts = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Poppins',
  'Montserrat',
  'Source Sans Pro',
  'Raleway',
  'Playfair Display',
  'Merriweather',
  'Oswald',
  'Nunito',
  'Work Sans',
  'Fira Sans',
  'Rubik',
  'Quicksand',
];

export default AdvancedDesignTools;
