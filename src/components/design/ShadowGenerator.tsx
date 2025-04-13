
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ColorPicker } from './ColorPicker';

interface ShadowGeneratorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type?: 'box' | 'text';
}

interface ShadowValues {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

const ShadowGenerator: React.FC<ShadowGeneratorProps> = ({
  value,
  onChange,
  label = 'Shadow',
  type = 'box',
}) => {
  const defaultValues = {
    offsetX: 0,
    offsetY: 4,
    blur: 6,
    spread: 0,
    color: 'rgba(0,0,0,0.1)',
    inset: false,
  };

  // Parse initial shadow value
  const parseShadowValue = (shadowString: string): ShadowValues => {
    const defaultReturn = { ...defaultValues };
    
    if (!shadowString || shadowString === 'none') {
      return defaultReturn;
    }

    try {
      // Remove "inset" and check if it exists
      const hasInset = shadowString.includes('inset');
      let cleanString = shadowString.replace('inset', '').trim();

      // Extract color (assuming it's at the end or in rgba/hex format)
      let color = 'rgba(0,0,0,0.1)';
      const rgbaMatch = cleanString.match(/rgba?\([^)]+\)/);
      const hexMatch = cleanString.match(/(#[0-9a-f]{3,8})/i);
      
      if (rgbaMatch) {
        color = rgbaMatch[0];
        cleanString = cleanString.replace(rgbaMatch[0], '').trim();
      } else if (hexMatch) {
        color = hexMatch[0];
        cleanString = cleanString.replace(hexMatch[0], '').trim();
      }

      // Extract numeric values
      const values = cleanString.split(' ')
        .filter(Boolean)
        .map(v => parseInt(v));

      return {
        offsetX: values[0] || defaultReturn.offsetX,
        offsetY: values[1] || defaultReturn.offsetY,
        blur: values[2] || defaultReturn.blur,
        spread: type === 'box' ? (values[3] || defaultReturn.spread) : defaultReturn.spread,
        color,
        inset: hasInset,
      };
    } catch (error) {
      console.error('Error parsing shadow:', error);
      return defaultReturn;
    }
  };

  const [shadowValues, setShadowValues] = useState<ShadowValues>(
    parseShadowValue(value)
  );

  // Update shadow string when values change
  useEffect(() => {
    const generateShadowString = () => {
      const { offsetX, offsetY, blur, spread, color, inset } = shadowValues;
      let shadow = `${offsetX}px ${offsetY}px ${blur}px`;
      
      if (type === 'box') {
        shadow += ` ${spread}px`;
      }
      
      shadow += ` ${color}`;
      
      if (type === 'box' && inset) {
        shadow += ' inset';
      }
      
      return shadow;
    };

    onChange(generateShadowString());
  }, [shadowValues, onChange, type]);

  const handleValueChange = (key: keyof ShadowValues, value: any) => {
    setShadowValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-4">
      {label && <Label>{label}</Label>}
      
      <div 
        className="p-6 h-24 rounded-md border flex items-center justify-center text-center bg-white"
        style={{ 
          [type === 'box' ? 'boxShadow' : 'textShadow']: value 
        }}
      >
        {type === 'text' ? (
          <span className="text-2xl font-bold">Text Shadow</span>
        ) : (
          <span>Preview</span>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-xs">Horizontal Offset: {shadowValues.offsetX}px</Label>
          <Slider
            value={[shadowValues.offsetX]}
            min={-50}
            max={50}
            step={1}
            onValueChange={(val) => handleValueChange('offsetX', val[0])}
          />
        </div>
        
        <div className="space-y-1">
          <Label className="text-xs">Vertical Offset: {shadowValues.offsetY}px</Label>
          <Slider
            value={[shadowValues.offsetY]}
            min={-50}
            max={50}
            step={1}
            onValueChange={(val) => handleValueChange('offsetY', val[0])}
          />
        </div>
        
        <div className="space-y-1">
          <Label className="text-xs">Blur Radius: {shadowValues.blur}px</Label>
          <Slider
            value={[shadowValues.blur]}
            min={0}
            max={100}
            step={1}
            onValueChange={(val) => handleValueChange('blur', val[0])}
          />
        </div>
        
        {type === 'box' && (
          <div className="space-y-1">
            <Label className="text-xs">Spread Radius: {shadowValues.spread}px</Label>
            <Slider
              value={[shadowValues.spread]}
              min={-50}
              max={50}
              step={1}
              onValueChange={(val) => handleValueChange('spread', val[0])}
            />
          </div>
        )}
        
        <div className="space-y-1">
          <Label className="text-xs">Shadow Color</Label>
          <ColorPicker
            color={shadowValues.color}
            onChange={(color) => handleValueChange('color', color)}
            allowAlpha
          />
        </div>
        
        {type === 'box' && (
          <div className="flex items-center space-x-2">
            <Switch
              checked={shadowValues.inset}
              onCheckedChange={(checked) => handleValueChange('inset', checked)}
            />
            <Label>Inset Shadow</Label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShadowGenerator;
