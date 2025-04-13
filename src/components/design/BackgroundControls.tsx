
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import GradientGenerator from './GradientGenerator';
import { Image, Palette, Brush } from 'lucide-react';

interface BackgroundSettings {
  type: 'color' | 'gradient' | 'image';
  color: string;
  gradient: string;
  image: string;
  size: string;
  position: string;
  repeat: string;
  attachment: string;
  opacity: number;
}

interface BackgroundControlsProps {
  value: Partial<BackgroundSettings>;
  onChange: (value: Partial<BackgroundSettings>) => void;
}

const BackgroundControls: React.FC<BackgroundControlsProps> = ({
  value = { type: 'color', color: '#ffffff', opacity: 1 },
  onChange
}) => {
  const [activeTab, setActiveTab] = useState<string>(value.type || 'color');
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onChange({ ...value, type: tab as 'color' | 'gradient' | 'image' });
  };

  const handleBackgroundChange = (updates: Partial<BackgroundSettings>) => {
    onChange({ ...value, ...updates });
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="color" className="flex items-center space-x-1">
            <Palette size={14} />
            <span>Color</span>
          </TabsTrigger>
          <TabsTrigger value="gradient" className="flex items-center space-x-1">
            <Brush size={14} />
            <span>Gradient</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center space-x-1">
            <Image size={14} />
            <span>Image</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="color" className="space-y-4">
          <div className="space-y-2">
            <Label>Background Color</Label>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md border border-gray-300 overflow-hidden">
                <Input
                  type="color"
                  value={value.color || '#ffffff'}
                  onChange={(e) => handleBackgroundChange({ color: e.target.value })}
                  className="w-10 h-10 p-0 border-0 m-0 transform translate-x-[-4px] translate-y-[-4px]"
                />
              </div>
              <Input
                type="text"
                value={value.color || '#ffffff'}
                onChange={(e) => handleBackgroundChange({ color: e.target.value })}
                className="flex-grow"
                placeholder="#RRGGBB or rgba(...)"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Opacity: {Math.round((value.opacity || 1) * 100)}%</Label>
            </div>
            <Slider
              value={[value.opacity != null ? value.opacity * 100 : 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(val) => handleBackgroundChange({ opacity: val[0] / 100 })}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="gradient" className="space-y-4 pt-2">
          <GradientGenerator
            value={value.gradient || 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)'}
            onChange={(gradient) => handleBackgroundChange({ gradient })}
          />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Opacity: {Math.round((value.opacity || 1) * 100)}%</Label>
            </div>
            <Slider
              value={[value.opacity != null ? value.opacity * 100 : 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(val) => handleBackgroundChange({ opacity: val[0] / 100 })}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="image" className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input
              type="url"
              value={value.image || ''}
              onChange={(e) => handleBackgroundChange({ image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            <Button variant="outline" size="sm" className="mt-2">
              Upload Image
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label>Background Size</Label>
            <Select
              value={value.size || 'cover'}
              onValueChange={(size) => handleBackgroundChange({ size })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cover">Cover</SelectItem>
                <SelectItem value="contain">Contain</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="100% 100%">100% 100%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Background Position</Label>
            <Select
              value={value.position || 'center'}
              onValueChange={(position) => handleBackgroundChange({ position })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="bottom">Bottom</SelectItem>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="top left">Top Left</SelectItem>
                <SelectItem value="top right">Top Right</SelectItem>
                <SelectItem value="bottom left">Bottom Left</SelectItem>
                <SelectItem value="bottom right">Bottom Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Background Repeat</Label>
            <Select
              value={value.repeat || 'no-repeat'}
              onValueChange={(repeat) => handleBackgroundChange({ repeat })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select repeat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-repeat">No Repeat</SelectItem>
                <SelectItem value="repeat">Repeat</SelectItem>
                <SelectItem value="repeat-x">Repeat X</SelectItem>
                <SelectItem value="repeat-y">Repeat Y</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Background Attachment</Label>
            <Select
              value={value.attachment || 'scroll'}
              onValueChange={(attachment) => handleBackgroundChange({ attachment })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select attachment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scroll">Scroll</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="local">Local</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Opacity: {Math.round((value.opacity || 1) * 100)}%</Label>
            </div>
            <Slider
              value={[value.opacity != null ? value.opacity * 100 : 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(val) => handleBackgroundChange({ opacity: val[0] / 100 })}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundControls;
