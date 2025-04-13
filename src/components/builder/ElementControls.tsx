
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Scissors, Trash } from 'lucide-react';
import { useBuilder } from '@/contexts/BuilderContext';
import { useClipboard } from '@/hooks/useClipboard';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ElementControlsProps {
  elementId: string;
}

const ElementControls: React.FC<ElementControlsProps> = ({ elementId }) => {
  const { deleteElement, duplicateElement } = useBuilder();
  const { copySelected } = useClipboard();
  
  return (
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
  );
};

export default ElementControls;
