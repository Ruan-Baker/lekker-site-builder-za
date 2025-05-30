
import React from 'react';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2 } from 'lucide-react';
import { useHistory } from '@/contexts/HistoryContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const UndoRedoControls = () => {
  const { canUndo, canRedo, undo, redo } = useHistory();
  
  return (
    <div className="flex items-center space-x-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={undo}
            disabled={!canUndo}
            className={`rounded-md ${!canUndo ? 'opacity-50' : 'hover:bg-gray-100'}`}
            aria-label="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="flex flex-col">
            <p>Undo last action</p>
            <p className="text-xs opacity-80 mt-1">Ctrl+Z</p>
          </div>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={redo}
            disabled={!canRedo}
            className={`rounded-md ${!canRedo ? 'opacity-50' : 'hover:bg-gray-100'}`}
            aria-label="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="flex flex-col">
            <p>Redo last action</p>
            <p className="text-xs opacity-80 mt-1">Ctrl+Y / Ctrl+Shift+Z</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default UndoRedoControls;
