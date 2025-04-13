
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Keyboard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ShortcutProps {
  keys: string[];
  description: string;
}

const Shortcut: React.FC<ShortcutProps> = ({ keys, description }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm">{description}</span>
    <div className="flex items-center gap-1">
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-400 mx-1">+</span>}
          <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md">
            {key}
          </kbd>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const KeyboardShortcutsHelp = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Keyboard className="h-4 w-4" />
          <span className="hidden sm:inline">Keyboard Shortcuts</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Use these keyboard shortcuts to work more efficiently.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="text-sm font-medium mb-2">Element Manipulation</h3>
          <Shortcut keys={["Delete"]} description="Delete selected element" />
          <Shortcut keys={["Ctrl", "C"]} description="Copy selected element" />
          <Shortcut keys={["Ctrl", "V"]} description="Paste copied element" />
          <Shortcut keys={["Ctrl", "D"]} description="Duplicate selected element" />
          <Shortcut keys={["Esc"]} description="Cancel element selection" />
          
          <Separator className="my-4" />
          
          <h3 className="text-sm font-medium mb-2">Positioning</h3>
          <Shortcut keys={["↑"]} description="Move element up 1px" />
          <Shortcut keys={["↓"]} description="Move element down 1px" />
          <Shortcut keys={["←"]} description="Move element left 1px" />
          <Shortcut keys={["→"]} description="Move element right 1px" />
          <Shortcut keys={["Shift", "↑"]} description="Move element up 10px" />
          <Shortcut keys={["Shift", "↓"]} description="Move element down 10px" />
          <Shortcut keys={["Shift", "←"]} description="Move element left 10px" />
          <Shortcut keys={["Shift", "→"]} description="Move element right 10px" />
          
          <Separator className="my-4" />
          
          <h3 className="text-sm font-medium mb-2">History</h3>
          <Shortcut keys={["Ctrl", "Z"]} description="Undo last action" />
          <Shortcut keys={["Ctrl", "Y"]} description="Redo last action" />
          <Shortcut keys={["Ctrl", "Shift", "Z"]} description="Redo last action (alternative)" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsHelp;
