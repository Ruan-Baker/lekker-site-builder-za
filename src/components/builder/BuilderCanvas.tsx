
import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useBuilder } from '@/contexts/BuilderContext';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const BuilderCanvas = () => {
  const { elements, addElement, selectElement, selectedElement, updateElement } = useBuilder();
  
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'element',
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(delta ? delta.x : 0);
      const top = Math.round(delta ? delta.y : 0);
      
      console.log('Item dropped:', item);
      
      // Add the element to our context
      addElement({
        type: item.id,
        properties: {
          content: `New ${item.name}`
        },
        position: {
          x: left,
          y: top,
          width: 200,
          height: 100
        }
      });
      
      toast({
        title: "Element added",
        description: `Added a new ${item.name} element to your canvas`
      });
      
      return undefined;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  
  // Autosave elements to Supabase when they change
  useEffect(() => {
    const saveElementsToSupabase = async () => {
      // This would require the page ID to be available
      // For now, we're just demonstrating the concept
      console.log('Elements would be saved to Supabase:', elements);
    };
    
    // Debounced save would be implemented here
    const timer = setTimeout(() => {
      if (elements.length > 0) {
        saveElementsToSupabase();
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [elements]);
  
  // Function to handle element positioning with grid snapping
  const handleElementDrag = (id: string, position: { x: number; y: number }) => {
    // Grid size (e.g., 8px)
    const gridSize = 8;
    
    // Snap to grid
    const x = Math.round(position.x / gridSize) * gridSize;
    const y = Math.round(position.y / gridSize) * gridSize;
    
    updateElement(id, {
      position: {
        ...elements.find(el => el.id === id)?.position,
        x,
        y
      }
    });
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
        className={`min-h-[calc(100vh-8rem)] mx-auto my-8 w-full max-w-[1200px] bg-white rounded-lg shadow-softer transition-all p-6 ${isOver ? 'ring-2 ring-blue-600/50' : ''}`}
      >
        {elements.length === 0 ? (
          <div className="h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 p-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your canvas is empty</h3>
            <p className="text-sm mb-4 max-w-md">Drag sections or elements from the sidebar to start building your website</p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {elements.map((element) => (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute p-4 border cursor-pointer ${
                  selectedElement === element.id 
                    ? 'border-blue-500 ring-2 ring-blue-500/20' 
                    : 'border-gray-200 hover:border-gray-300'
                } rounded-md bg-white`}
                style={{
                  left: element.position.x,
                  top: element.position.y,
                  width: element.position.width,
                  height: element.position.height,
                }}
                onClick={() => selectElement(element.id)}
                drag
                dragMomentum={false}
                onDragEnd={(event, info) => {
                  handleElementDrag(element.id, {
                    x: element.position.x + info.offset.x,
                    y: element.position.y + info.offset.y
                  });
                }}
              >
                <div className="text-sm font-medium">
                  {element.properties.content} ({element.type})
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderCanvas;
