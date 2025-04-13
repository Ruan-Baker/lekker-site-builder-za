
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Scissors, Trash, MoveHorizontal, MoveVertical, AlignStartHorizontal, AlignEndHorizontal, AlignCenterHorizontal } from 'lucide-react';
import { useBuilder } from '@/contexts/BuilderContext';
import { useClipboard } from '@/hooks/useClipboard';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

interface ElementControlsProps {
  elementId: string;
}

const ElementControls: React.FC<ElementControlsProps> = ({ elementId }) => {
  const { deleteElement, duplicateElement, elements, updateElement } = useBuilder();
  const { copySelected } = useClipboard();
  
  // Nudge element by small increments
  const nudgeElement = (direction: 'left' | 'right' | 'up' | 'down', amount = 1) => {
    const element = elements.find(el => el.id === elementId);
    if (!element) return;
    
    const { x, y } = element.position;
    const newPosition = { ...element.position };
    
    switch (direction) {
      case 'left':
        newPosition.x = x - amount;
        break;
      case 'right':
        newPosition.x = x + amount;
        break;
      case 'up':
        newPosition.y = y - amount;
        break;
      case 'down':
        newPosition.y = y + amount;
        break;
    }
    
    updateElement(elementId, { position: newPosition });
  };
  
  // Align elements to canvas edges
  const alignElement = (alignment: 'left' | 'center' | 'right') => {
    const element = elements.find(el => el.id === elementId);
    if (!element) return;
    
    const newPosition = { ...element.position };
    const canvasWidth = 768; // Default canvas width (this could be dynamic based on viewport)
    
    switch (alignment) {
      case 'left':
        newPosition.x = 0;
        break;
      case 'center':
        newPosition.x = (canvasWidth / 2) - (element.position.width / 2);
        break;
      case 'right':
        newPosition.x = canvasWidth - element.position.width;
        break;
    }
    
    updateElement(elementId, { position: newPosition });
    toast({
      title: "Element aligned",
      description: `Element aligned to ${alignment}`
    });
  };
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                copySelected();
              }}
              className="h-7 w-7"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="flex flex-col">
              <p>Copy element</p>
              <p className="text-xs opacity-80 mt-1">Ctrl+C</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                duplicateElement(elementId);
              }}
              className="h-7 w-7"
            >
              <Scissors className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="flex flex-col">
              <p>Duplicate element</p>
              <p className="text-xs opacity-80 mt-1">Ctrl+D</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={(e) => {
                e.stopPropagation();
                deleteElement(elementId);
              }}
            >
              <Trash className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="flex flex-col">
              <p>Delete element</p>
              <p className="text-xs opacity-80 mt-1">Delete / Backspace</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <Separator className="my-2" />
      
      {/* Precise positioning controls */}
      <div className="space-y-2">
        <p className="text-xs text-gray-500 font-medium">Positioning</p>
        
        <div className="flex space-x-1">
          {/* Alignment controls */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="h-7 w-7"
                onClick={() => alignElement('left')}
              >
                <AlignStartHorizontal className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align left</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="h-7 w-7"
                onClick={() => alignElement('center')}
              >
                <AlignCenterHorizontal className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align center</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="h-7 w-7"
                onClick={() => alignElement('right')}
              >
                <AlignEndHorizontal className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align right</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {/* Nudge controls */}
        <div className="flex justify-center items-center space-x-1 mt-2">
          <Button 
            variant="outline" 
            size="icon"
            className="h-6 w-6"
            onClick={() => nudgeElement('left')}
          >
            <MoveHorizontal className="h-3 w-3 -rotate-90" />
          </Button>
          
          <div className="flex flex-col space-y-1">
            <Button 
              variant="outline" 
              size="icon"
              className="h-6 w-6"
              onClick={() => nudgeElement('up')}
            >
              <MoveVertical className="h-3 w-3 -rotate-180" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              className="h-6 w-6"
              onClick={() => nudgeElement('down')}
            >
              <MoveVertical className="h-3 w-3" />
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            className="h-6 w-6"
            onClick={() => nudgeElement('right')}
          >
            <MoveHorizontal className="h-3 w-3 rotate-90" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-1 mt-2">
          <Button 
            variant="outline" 
            size="sm"
            className="h-6 text-xs"
            onClick={() => nudgeElement('left', 10)}
          >
            ← 10px
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="h-6 text-xs"
            onClick={() => nudgeElement('right', 10)}
          >
            10px →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElementControls;
