
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ColorPicker from './ColorPicker';
import GradientGenerator from './GradientGenerator';
import { Upload, Image as ImageIcon, Trash } from 'lucide-react';

interface BackgroundSelectorProps {
  value: any;
  onChange: (value: any) => void;
  label?: string;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  value = { type: 'color', value: '#ffffff' },
  onChange,
  label,
}) => {
  const [activeTab, setActiveTab] = useState<string>(value?.type || 'color');
  const [bgColor, setBgColor] = useState<string>(
    value?.type === 'color' ? value.value : '#ffffff'
  );
  const [bgGradient, setBgGradient] = useState<string>(
    value?.type === 'gradient' ? value.value : 'linear-gradient(180deg, #3b82f6 0%, #10b981 100%)'
  );
  const [bgImage, setBgImage] = useState<string>(
    value?.type === 'image' ? value.value : ''
  );
  const [bgImageOptions, setBgImageOptions] = useState<any>(
    value?.type === 'image' ? (value.options || {}) : {
      size: 'cover',
      position: 'center center',
      repeat: 'no-repeat',
    }
  );
  
  const updateBackground = (type: string, newValue: any, options?: any) => {
    const updatedValue = {
      type,
      value: newValue,
      ...(options ? { options } : {})
    };
    
    onChange(updatedValue);
  };
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Update background based on active tab
    switch (tab) {
      case 'color':
        updateBackground('color', bgColor);
        break;
      case 'gradient':
        updateBackground('gradient', bgGradient);
        break;
      case 'image':
        updateBackground('image', bgImage, bgImageOptions);
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="space-y-4">
      {label && <Label>{label}</Label>}
      
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="color">Color</TabsTrigger>
          <TabsTrigger value="gradient">Gradient</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>
        
        <TabsContent value="color" className="space-y-4 pt-4">
          <ColorPicker
            color={bgColor}
            onChange={(color) => {
              setBgColor(color);
              updateBackground('color', color);
            }}
            label="Background Color"
          />
        </TabsContent>
        
        <TabsContent value="gradient" className="space-y-4 pt-4">
          <GradientGenerator
            value={bgGradient}
            onChange={(gradient) => {
              setBgGradient(gradient);
              updateBackground('gradient', gradient);
            }}
            label="Background Gradient"
          />
        </TabsContent>
        
        <TabsContent value="image" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Background Image URL</Label>
            <div className="flex gap-2">
              <Input
                value={bgImage}
                placeholder="Enter image URL"
                onChange={(e) => {
                  setBgImage(e.target.value);
                  updateBackground('image', e.target.value, bgImageOptions);
                }}
                className="flex-1"
              />
              {/* In a real app, you'd have an image upload option here */}
              <Button variant="outline" size="icon" type="button">
                <Upload size={16} />
              </Button>
            </div>
          </div>
          
          {bgImage && (
            <div 
              className="h-20 w-full rounded border bg-gray-100 relative bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${bgImage})`, 
                backgroundSize: bgImageOptions.size,
                backgroundPosition: bgImageOptions.position,
                backgroundRepeat: bgImageOptions.repeat,
              }}
            >
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2 h-6 w-6" 
                onClick={() => {
                  setBgImage('');
                  updateBackground('image', '', bgImageOptions);
                }}
              >
                <Trash size={14} />
              </Button>
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Background Size</Label>
            <RadioGroup
              value={bgImageOptions.size}
              onValueChange={(value) => {
                const newOptions = { ...bgImageOptions, size: value };
                setBgImageOptions(newOptions);
                updateBackground('image', bgImage, newOptions);
              }}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="cover" id="cover" />
                <Label htmlFor="cover" className="text-xs">Cover</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="contain" id="contain" />
                <Label htmlFor="contain" className="text-xs">Contain</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="auto" id="auto" />
                <Label htmlFor="auto" className="text-xs">Original</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Background Repeat</Label>
            <RadioGroup
              value={bgImageOptions.repeat}
              onValueChange={(value) => {
                const newOptions = { ...bgImageOptions, repeat: value };
                setBgImageOptions(newOptions);
                updateBackground('image', bgImage, newOptions);
              }}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="no-repeat" id="no-repeat" />
                <Label htmlFor="no-repeat" className="text-xs">No Repeat</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="repeat" id="repeat" />
                <Label htmlFor="repeat" className="text-xs">Repeat</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="repeat-x" id="repeat-x" />
                <Label htmlFor="repeat-x" className="text-xs">Repeat X</Label>
              </div>
            </RadioGroup>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundSelector;
