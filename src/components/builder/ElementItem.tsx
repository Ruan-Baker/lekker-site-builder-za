
import React from 'react';
import { useDrag } from 'react-dnd';
import { LucideIcon } from 'lucide-react';

interface ElementItemProps {
  id: string;
  name: string;
  Icon: LucideIcon;
}

const ElementItem = ({ id, name, Icon }: ElementItemProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'element',
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`flex flex-col items-center justify-center p-3 bg-white border border-lekker-border-gray rounded-md cursor-grab transition-all hover:border-lekker-purple/50 hover:shadow-sm ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Icon className="h-5 w-5 text-lekker-gray mb-1" />
      <span className="text-xs font-medium">{name}</span>
    </div>
  );
};

export default ElementItem;
