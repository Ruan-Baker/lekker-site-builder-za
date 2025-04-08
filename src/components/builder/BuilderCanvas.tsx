
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

const BuilderCanvas = () => {
  const [elements, setElements] = useState<any[]>([]);
  
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'element',
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(delta ? delta.x : 0);
      const top = Math.round(delta ? delta.y : 0);
      
      console.log('Item dropped:', item);
      addElement(item.id);
      return undefined;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  
  const addElement = (type: string) => {
    const newElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: `New ${type}`,
    };
    
    setElements(prev => [...prev, newElement]);
  };
  
  return (
    <div className="flex-1 overflow-y-auto relative">
      <div className="pb-4 pt-2 px-4 bg-white border-b border-lekker-border-gray flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="grid" />
            <Label htmlFor="grid" className="text-sm">Show Grid</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="guides" />
            <Label htmlFor="guides" className="text-sm">Show Guides</Label>
          </div>
        </div>
        <div className="text-sm text-lekker-gray">Width: 1200px</div>
      </div>
      
      <div 
        ref={drop}
        className={`min-h-[calc(100vh-8rem)] mx-auto my-8 w-full max-w-[1200px] bg-white rounded-lg shadow-softer transition-all p-6 ${isOver ? 'ring-2 ring-lekker-purple/50' : ''}`}
      >
        {elements.length === 0 ? (
          <div className="h-full border-2 border-dashed border-lekker-border-gray rounded-lg flex flex-col items-center justify-center text-lekker-gray p-12 text-center">
            <div className="w-12 h-12 bg-lekker-light-gray rounded-full flex items-center justify-center mb-4">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your canvas is empty</h3>
            <p className="text-sm mb-4 max-w-md">Drag sections or elements from the sidebar to start building your website</p>
          </div>
        ) : (
          <div>
            {elements.map((element) => (
              <div key={element.id} className="p-4 border border-lekker-border-gray rounded-md mb-4">
                {element.content} ({element.type})
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderCanvas;
