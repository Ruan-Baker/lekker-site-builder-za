
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import FontSelector from "./FontSelector";
import { Button } from "@/components/ui/button";
import { Italic, Bold, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { useDesign } from '@/contexts/DesignContext';

interface TypographySettings {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  textAlign: string;
  textTransform: string;
  fontStyle: string;
  textDecoration: string;
  textShadow: string;
}

interface AdvancedTypographyControlsProps {
  value: Partial<TypographySettings>;
  onChange: (value: Partial<TypographySettings>) => void;
}

const AdvancedTypographyControls: React.FC<AdvancedTypographyControlsProps> = ({
  value,
  onChange
}) => {
  // Get fonts from Design Context
  const { fonts = [] } = useDesign();
  
  const handleChange = (key: keyof TypographySettings, newValue: string) => {
    onChange({ ...value, [key]: newValue });
  };

  const toggleStyle = (style: string, key: 'fontStyle' | 'textDecoration' | 'fontWeight') => {
    const currentValue = value[key] || '';
    const newValue = currentValue === style ? '' : style;
    handleChange(key, newValue);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Font</Label>
        <FontSelector 
          value={value.fontFamily || ''} 
          onChange={(font) => handleChange('fontFamily', font)}
          fonts={fonts}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Size</Label>
        <div className="flex items-center space-x-2">
          <Select 
            value={value.fontSize || '16px'} 
            onValueChange={(val) => handleChange('fontSize', val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Font size" />
            </SelectTrigger>
            <SelectContent>
              {[12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 64].map(size => (
                <SelectItem key={size} value={`${size}px`}>{size}px</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="text"
            value={value.fontSize || '16px'}
            onChange={(e) => handleChange('fontSize', e.target.value)}
            className="w-24"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Line Height</Label>
        <div className="flex items-center space-x-2">
          <Slider
            value={[parseFloat(value.lineHeight || '1.5')]}
            min={1}
            max={3}
            step={0.1}
            onValueChange={(val) => handleChange('lineHeight', val[0].toString())}
            className="flex-grow"
          />
          <Input
            type="text"
            value={value.lineHeight || '1.5'}
            onChange={(e) => handleChange('lineHeight', e.target.value)}
            className="w-16"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Letter Spacing</Label>
        <div className="flex items-center space-x-2">
          <Slider
            value={[parseFloat(value.letterSpacing || '0')]}
            min={-2}
            max={10}
            step={0.1}
            onValueChange={(val) => handleChange('letterSpacing', val[0] + 'px')}
            className="flex-grow"
          />
          <Input
            type="text"
            value={value.letterSpacing || '0px'}
            onChange={(e) => handleChange('letterSpacing', e.target.value)}
            className="w-16"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Style</Label>
        <div className="flex items-center space-x-1">
          <Button
            type="button"
            size="icon"
            variant={value.fontWeight === 'bold' ? 'default' : 'outline'}
            onClick={() => toggleStyle('bold', 'fontWeight')}
          >
            <Bold size={16} />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={value.fontStyle === 'italic' ? 'default' : 'outline'}
            onClick={() => toggleStyle('italic', 'fontStyle')}
          >
            <Italic size={16} />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={value.textDecoration === 'underline' ? 'default' : 'outline'}
            onClick={() => toggleStyle('underline', 'textDecoration')}
          >
            <Underline size={16} />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Alignment</Label>
        <div className="flex items-center space-x-1">
          <Button
            type="button"
            size="icon"
            variant={value.textAlign === 'left' ? 'default' : 'outline'}
            onClick={() => handleChange('textAlign', 'left')}
          >
            <AlignLeft size={16} />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={value.textAlign === 'center' ? 'default' : 'outline'}
            onClick={() => handleChange('textAlign', 'center')}
          >
            <AlignCenter size={16} />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={value.textAlign === 'right' ? 'default' : 'outline'}
            onClick={() => handleChange('textAlign', 'right')}
          >
            <AlignRight size={16} />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={value.textAlign === 'justify' ? 'default' : 'outline'}
            onClick={() => handleChange('textAlign', 'justify')}
          >
            <AlignJustify size={16} />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Text Transform</Label>
        <Select
          value={value.textTransform || 'none'}
          onValueChange={(val) => handleChange('textTransform', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Text transformation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="uppercase">UPPERCASE</SelectItem>
            <SelectItem value="lowercase">lowercase</SelectItem>
            <SelectItem value="capitalize">Capitalize</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Text Shadow</Label>
        <Input
          type="text"
          value={value.textShadow || 'none'}
          onChange={(e) => handleChange('textShadow', e.target.value)}
          placeholder="e.g., 1px 1px 2px rgba(0,0,0,0.5)"
        />
      </div>
    </div>
  );
};

export default AdvancedTypographyControls;
