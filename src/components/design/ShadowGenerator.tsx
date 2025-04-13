
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Plus, X, RotateCcw } from "lucide-react";

interface ShadowSettings {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  type: 'box' | 'text';
  inset: boolean;
}

interface ShadowGeneratorProps {
  value: string;
  type: 'box' | 'text';
  onChange: (value: string) => void;
  allowMultiple?: boolean;
}

const ShadowGenerator: React.FC<ShadowGeneratorProps> = ({
  value = 'none',
  type = 'box',
  onChange,
  allowMultiple = false
}) => {
  const [shadows, setShadows] = useState<ShadowSettings[]>([
    { offsetX: 0, offsetY: 4, blur: 8, spread: 0, color: '#000000', opacity: 0.2, type, inset: false }
  ]);

  // Parse initial shadow value if provided
  useEffect(() => {
    if (value && value !== 'none') {
      try {
        const shadowsArray = value.split(',').map(shadow => shadow.trim());
        
        const parsedShadows = shadowsArray.map(shadowStr => {
          const inset = shadowStr.includes('inset');
          shadowStr = shadowStr.replace('inset', '').trim();
          
          const parts = shadowStr.split(' ').filter(part => part !== '');
          
          // Extract color (supports rgba, hex, etc)
          let color = '#000000';
          let opacity = 1;
          
          const colorMatch = shadowStr.match(/(rgba?\(.*?\)|#[0-9a-f]{3,8})/i);
          if (colorMatch) {
            color = colorMatch[0];
            
            // Extract opacity if it's rgba
            if (color.startsWith('rgba')) {
              const rgbaMatch = color.match(/rgba\(.*,\s*([\d.]+)\)/i);
              if (rgbaMatch && rgbaMatch[1]) {
                opacity = parseFloat(rgbaMatch[1]);
              }
            }
          }
          
          return {
            offsetX: parseInt(parts[0], 10) || 0,
            offsetY: parseInt(parts[1], 10) || 4,
            blur: parseInt(parts[2], 10) || 8,
            spread: type === 'box' ? (parseInt(parts[3], 10) || 0) : 0,
            color,
            opacity,
            type,
            inset
          };
        });
        
        if (parsedShadows.length > 0) {
          setShadows(parsedShadows);
        }
      } catch (error) {
        console.error('Failed to parse shadow value:', error);
      }
    }
  }, []);

  // Generate shadow string from settings
  useEffect(() => {
    if (shadows.length === 0) {
      onChange('none');
      return;
    }
    
    const shadowString = shadows.map(shadow => {
      const { offsetX, offsetY, blur, spread, color, opacity, inset } = shadow;
      
      // Convert hex color to rgba if opacity < 1
      let colorValue = color;
      if (opacity < 1) {
        if (color.startsWith('#')) {
          // Convert hex to rgba
          let r = 0, g = 0, b = 0;
          
          if (color.length === 4) {
            r = parseInt(color[1] + color[1], 16);
            g = parseInt(color[2] + color[2], 16);
            b = parseInt(color[3] + color[3], 16);
          } else {
            r = parseInt(color.slice(1, 3), 16);
            g = parseInt(color.slice(3, 5), 16);
            b = parseInt(color.slice(5, 7), 16);
          }
          
          colorValue = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        } else if (color.startsWith('rgb(')) {
          // Convert rgb to rgba
          colorValue = color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
        }
      }
      
      if (type === 'box') {
        return `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${colorValue}`;
      } else {
        return `${offsetX}px ${offsetY}px ${blur}px ${colorValue}`;
      }
    }).join(', ');
    
    onChange(shadowString);
  }, [shadows, onChange, type]);

  const updateShadow = (index: number, updates: Partial<ShadowSettings>) => {
    setShadows(prevShadows => 
      prevShadows.map((shadow, i) => 
        i === index ? { ...shadow, ...updates } : shadow
      )
    );
  };

  const addShadow = () => {
    if (!allowMultiple) return;
    
    const newShadow: ShadowSettings = {
      offsetX: 0,
      offsetY: 6,
      blur: 10,
      spread: 0,
      color: '#000000',
      opacity: 0.1,
      type,
      inset: false
    };
    
    setShadows([...shadows, newShadow]);
  };

  const removeShadow = (index: number) => {
    setShadows(prevShadows => prevShadows.filter((_, i) => i !== index));
  };

  const resetShadow = (index: number) => {
    const defaultShadow: ShadowSettings = {
      offsetX: 0,
      offsetY: 4,
      blur: 8,
      spread: 0,
      color: '#000000',
      opacity: 0.2,
      type,
      inset: false
    };
    
    updateShadow(index, defaultShadow);
  };

  return (
    <div className="space-y-4">
      {shadows.map((shadow, index) => (
        <div key={index} className="space-y-3 border border-gray-200 rounded-md p-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Shadow {shadows.length > 1 ? index + 1 : ''}</h4>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => resetShadow(index)}
              >
                <RotateCcw size={14} />
              </Button>
              {shadows.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-red-500 hover:text-red-700"
                  onClick={() => removeShadow(index)}
                >
                  <X size={14} />
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">X Offset: {shadow.offsetX}px</Label>
              <Slider
                value={[shadow.offsetX]}
                min={-50}
                max={50}
                step={1}
                onValueChange={(val) => updateShadow(index, { offsetX: val[0] })}
              />
            </div>
            
            <div className="space-y-1">
              <Label className="text-xs">Y Offset: {shadow.offsetY}px</Label>
              <Slider
                value={[shadow.offsetY]}
                min={-50}
                max={50}
                step={1}
                onValueChange={(val) => updateShadow(index, { offsetY: val[0] })}
              />
            </div>
            
            <div className="space-y-1">
              <Label className="text-xs">Blur: {shadow.blur}px</Label>
              <Slider
                value={[shadow.blur]}
                min={0}
                max={100}
                step={1}
                onValueChange={(val) => updateShadow(index, { blur: val[0] })}
              />
            </div>
            
            {type === 'box' && (
              <div className="space-y-1">
                <Label className="text-xs">Spread: {shadow.spread}px</Label>
                <Slider
                  value={[shadow.spread]}
                  min={-50}
                  max={50}
                  step={1}
                  onValueChange={(val) => updateShadow(index, { spread: val[0] })}
                />
              </div>
            )}
            
            <div className="space-y-1">
              <Label className="text-xs">Color</Label>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md border border-gray-300 overflow-hidden">
                  <Input
                    type="color"
                    value={shadow.color}
                    onChange={(e) => updateShadow(index, { color: e.target.value })}
                    className="w-8 h-8 p-0 border-0 m-0 transform translate-x-[-4px] translate-y-[-4px]"
                  />
                </div>
                <Input
                  type="text"
                  value={shadow.color}
                  onChange={(e) => updateShadow(index, { color: e.target.value })}
                  className="flex-grow h-7 text-xs"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <Label className="text-xs">Opacity: {Math.round(shadow.opacity * 100)}%</Label>
              <Slider
                value={[shadow.opacity * 100]}
                min={0}
                max={100}
                step={1}
                onValueChange={(val) => updateShadow(index, { opacity: val[0] / 100 })}
              />
            </div>
            
            {type === 'box' && (
              <div className="col-span-2 flex items-center space-x-2 mt-1">
                <input
                  type="checkbox"
                  id={`inset-${index}`}
                  checked={shadow.inset}
                  onChange={(e) => updateShadow(index, { inset: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor={`inset-${index}`} className="text-xs font-normal">
                  Inner shadow (inset)
                </Label>
              </div>
            )}
          </div>
          
          <div className="h-12 mt-2 rounded border border-gray-300 flex items-center justify-center overflow-hidden bg-white">
            <div 
              className={`w-32 h-8 rounded ${type === 'box' ? '' : 'font-bold text-center flex items-center justify-center'}`}
              style={{
                boxShadow: type === 'box' ? 
                  `${shadow.inset ? 'inset ' : ''}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}${shadow.opacity < 1 ? Math.round(shadow.opacity * 100) / 100 : ''}` : 
                  'none',
                textShadow: type === 'text' ? 
                  `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.color}${shadow.opacity < 1 ? Math.round(shadow.opacity * 100) / 100 : ''}` : 
                  'none'
              }}
            >
              {type === 'text' ? 'Sample Text' : ''}
            </div>
          </div>
        </div>
      ))}
      
      {allowMultiple && (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={addShadow}
        >
          <Plus size={14} className="mr-1" /> Add Shadow
        </Button>
      )}
    </div>
  );
};

export default ShadowGenerator;
