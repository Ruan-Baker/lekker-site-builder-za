
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ColorPicker from './ColorPicker';
import { Upload, Trash, Image as ImageIcon } from 'lucide-react';

interface BackgroundSelectorProps {
  background: {
    type: 'color' | 'gradient' | 'image' | 'video';
    value: string;
    overlay?: string;
    opacity?: number;
    position?: string;
    size?: string;
    repeat?: string;
    attachment?: string;
    parallax?: boolean;
  };
  onChange: (background: any) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ background, onChange }) => {
  const [bgType, setBgType] = useState<string>(background.type || 'color');
  
  const handleTypeChange = (type: string) => {
    setBgType(type);
    
    let newValue = '';
    switch (type) {
      case 'color':
        newValue = background.type === 'color' ? background.value : '#ffffff';
        break;
      case 'gradient':
        newValue = background.type === 'gradient' ? background.value : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        break;
      case 'image':
        newValue = background.type === 'image' ? background.value : '';
        break;
      case 'video':
        newValue = background.type === 'video' ? background.value : '';
        break;
    }
    
    onChange({
      ...background,
      type,
      value: newValue
    });
  };
  
  return (
    <div className="space-y-4">
      <Tabs value={bgType} onValueChange={handleTypeChange}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="color">Color</TabsTrigger>
          <TabsTrigger value="gradient">Gradient</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
        </TabsList>
        
        <TabsContent value="color" className="space-y-4 pt-4">
          <ColorPicker
            color={background.value}
            onChange={(color) => onChange({ ...background, value: color })}
            label="Background Color"
          />
        </TabsContent>
        
        <TabsContent value="gradient" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Gradient Preview</Label>
            <div 
              className="w-full h-20 rounded-md border"
              style={{ background: background.value }}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gradientValue">Gradient CSS</Label>
            <Input
              id="gradientValue"
              value={background.value}
              onChange={(e) => onChange({ ...background, value: e.target.value })}
              placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button variant="outline" size="sm" className="w-full" onClick={() => onChange({ 
              ...background, 
              value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
            })}>
              Purple Blend
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={() => onChange({ 
              ...background, 
              value: 'linear-gradient(to right, #ec4899, #8b5cf6)' 
            })}>
              Pink Purple
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={() => onChange({ 
              ...background, 
              value: 'linear-gradient(to right, #0ea5e9, #10b981)' 
            })}>
              Blue Green
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={() => onChange({ 
              ...background, 
              value: 'radial-gradient(circle, #fcd34d 0%, #f97316 100%)' 
            })}>
              Radial Orange
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="image" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="imageUrl"
                value={background.value}
                onChange={(e) => onChange({ ...background, value: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
              <Button variant="outline" size="icon">
                <Upload size={16} />
              </Button>
            </div>
          </div>
          
          {background.value && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative w-full h-32 rounded-md border overflow-hidden">
                <div 
                  className="w-full h-full bg-center"
                  style={{ 
                    backgroundImage: `url(${background.value})`,
                    backgroundSize: background.size || 'cover',
                    backgroundPosition: background.position || 'center',
                    backgroundRepeat: background.repeat || 'no-repeat'
                  }}
                />
                <Button 
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 w-6 h-6"
                  onClick={() => onChange({ ...background, value: '' })}
                >
                  <Trash size={12} />
                </Button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Background Size</Label>
              <Select
                value={background.size || 'cover'}
                onValueChange={(value) => onChange({ ...background, size: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Cover</SelectItem>
                  <SelectItem value="contain">Contain</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="100%">100%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Position</Label>
              <Select
                value={background.position || 'center'}
                onValueChange={(value) => onChange({ ...background, position: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={background.parallax || false}
              onCheckedChange={(checked) => onChange({ ...background, parallax: checked })}
              id="parallax"
            />
            <Label htmlFor="parallax">Enable parallax effect</Label>
          </div>
          
          <div className="space-y-2">
            <Label>Overlay Color</Label>
            <ColorPicker
              color={background.overlay || 'rgba(0,0,0,0)'}
              onChange={(color) => onChange({ ...background, overlay: color })}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="video" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              value={background.value}
              onChange={(e) => onChange({ ...background, value: e.target.value })}
              placeholder="https://example.com/video.mp4"
            />
          </div>
          
          {background.value && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative w-full rounded-md border overflow-hidden">
                <video
                  src={background.value}
                  className="w-full"
                  height="150"
                  controls
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2 mt-4">
            <Label>Overlay Color</Label>
            <ColorPicker
              color={background.overlay || 'rgba(0,0,0,0)'}
              onChange={(color) => onChange({ ...background, overlay: color })}
            />
          </div>
          
          <div className="flex items-center space-x-2 mt-2">
            <Switch
              checked={background.attachment === 'fixed'}
              onCheckedChange={(checked) => onChange({ 
                ...background, 
                attachment: checked ? 'fixed' : 'scroll' 
              })}
              id="fixed"
            />
            <Label htmlFor="fixed">Fixed background (no scroll)</Label>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundSelector;
