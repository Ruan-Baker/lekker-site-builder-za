
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBuilder } from '@/contexts/BuilderContext';
import { Trash, Copy, ClipboardCopy, PenTool } from 'lucide-react';
import { useClipboard } from '@/hooks/useClipboard';
import ColorPicker from '@/components/design/ColorPicker';
import ResponsiveControls from '@/components/builder/ResponsiveControls';
import InteractiveControls from '@/components/builder/InteractiveControls';
import ElementControls from '@/components/builder/ElementControls';
import AdvancedDesignTools from '@/components/design/AdvancedDesignTools';
import { ScrollArea } from '@/components/ui/scroll-area';

const ElementProperties: React.FC<{ elementId: string }> = ({ elementId }) => {
  const { elements, updateElement, deleteElement } = useBuilder();
  const { copySelected, paste, hasClipboardData } = useClipboard();
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;
  
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(elementId, {
      properties: {
        ...element.properties,
        content: e.target.value
      }
    });
  };
  
  const handlePositionChange = (property: 'x' | 'y' | 'width' | 'height', value: number) => {
    updateElement(elementId, {
      position: {
        ...element.position,
        [property]: value
      }
    });
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{element.type} Properties</h3>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              copySelected();
            }}
            title="Copy element (Ctrl+C)"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              paste();
            }}
            disabled={!hasClipboardData}
            title="Paste element (Ctrl+V)"
          >
            <ClipboardCopy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => deleteElement(element.id)}
            title="Delete element (Del)"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="basic">
        <TabsList className="w-full">
          <TabsTrigger value="basic" className="flex-1">Basic</TabsTrigger>
          <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
          <TabsTrigger value="responsive" className="flex-1">Responsive</TabsTrigger>
          <TabsTrigger value="interactive" className="flex-1">Interactive</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Input
              id="content"
              value={element.properties.content || ''}
              onChange={handleContentChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="x">X Position</Label>
              <Input
                id="x"
                type="number"
                value={element.position.x}
                onChange={(e) => handlePositionChange('x', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="y">Y Position</Label>
              <Input
                id="y"
                type="number"
                value={element.position.y}
                onChange={(e) => handlePositionChange('y', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                value={element.position.width}
                onChange={(e) => handlePositionChange('width', parseInt(e.target.value) || 100)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                value={element.position.height}
                onChange={(e) => handlePositionChange('height', parseInt(e.target.value) || 100)}
              />
            </div>
          </div>
          
          <ElementControls elementId={elementId} />
        </TabsContent>
        
        <TabsContent value="style" className="space-y-4 py-4">
          <ScrollArea className="h-[500px]">
            <AdvancedDesignTools elementId={elementId} />
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="responsive">
          <ResponsiveControls elementId={elementId} />
        </TabsContent>
        
        <TabsContent value="interactive">
          <InteractiveControls elementId={elementId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ElementProperties;
