
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FontSelector from './FontSelector';

interface TypographyValues {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: string;
  fontStyle?: string;
  textDecoration?: string;
}

interface AdvancedTypographyControlsProps {
  value: TypographyValues;
  onChange: (value: TypographyValues) => void;
  fonts?: string[];
}

const AdvancedTypographyControls: React.FC<AdvancedTypographyControlsProps> = ({
  value,
  onChange,
  fonts = []
}) => {
  const handleChange = (key: keyof TypographyValues, val: string) => {
    onChange({
      ...value,
      [key]: val
    });
  };

  return (
    <div className="space-y-4">
      {fonts.length > 0 && (
        <div className="space-y-2">
          <Label>Font Family</Label>
          <FontSelector
            value={value.fontFamily || ''}
            onChange={(val) => handleChange('fontFamily', val)}
            fonts={fonts}
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label>Font Size</Label>
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            value={value.fontSize || ''}
            onChange={(e) => handleChange('fontSize', e.target.value)}
            placeholder="16px"
            className="flex-1"
          />
          <Select
            value={value.fontSize?.includes('rem') ? 'rem' : 'px'}
            onValueChange={(unit) => {
              const currentSize = parseFloat(value.fontSize || '16px');
              const newSize = unit === 'rem' 
                ? `${(currentSize / 16).toFixed(2)}rem` 
                : `${Math.round(currentSize * 16)}px`;
              handleChange('fontSize', newSize);
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="px">px</SelectItem>
              <SelectItem value="rem">rem</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Font Weight</Label>
        <Select
          value={value.fontWeight || '400'}
          onValueChange={(val) => handleChange('fontWeight', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select weight" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="300">Light (300)</SelectItem>
            <SelectItem value="400">Regular (400)</SelectItem>
            <SelectItem value="500">Medium (500)</SelectItem>
            <SelectItem value="600">Semi-Bold (600)</SelectItem>
            <SelectItem value="700">Bold (700)</SelectItem>
            <SelectItem value="800">Extra Bold (800)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Line Height: {value.lineHeight}</Label>
        <Slider
          value={[parseFloat(value.lineHeight || '1.5')]}
          min={0.75}
          max={3}
          step={0.05}
          onValueChange={(val) => handleChange('lineHeight', val[0].toString())}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Letter Spacing: {value.letterSpacing}</Label>
        <Slider
          value={[parseFloat(value.letterSpacing?.replace('em', '') || '0') * 100]}
          min={-5}
          max={10}
          step={0.25}
          onValueChange={(val) => handleChange('letterSpacing', `${(val[0] / 100).toFixed(3)}em`)}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Text Transform</Label>
        <Select
          value={value.textTransform || 'none'}
          onValueChange={(val) => handleChange('textTransform', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select text transform" />
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
        <Label>Font Style</Label>
        <Select
          value={value.fontStyle || 'normal'}
          onValueChange={(val) => handleChange('fontStyle', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select font style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="italic">Italic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Text Decoration</Label>
        <Select
          value={value.textDecoration || 'none'}
          onValueChange={(val) => handleChange('textDecoration', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select text decoration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="underline">Underline</SelectItem>
            <SelectItem value="line-through">Line Through</SelectItem>
            <SelectItem value="overline">Overline</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AdvancedTypographyControls;
