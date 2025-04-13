
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
      className={`flex flex-col items-center justify-center p-3 bg-perspective-white border border-perspective-light-gray/50 rounded-xl cursor-grab transition-all hover:border-perspective-purple/20 hover:shadow-soft ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="p-2 rounded-lg bg-gradient-blue-green mb-2 text-white">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-medium text-perspective-black">{name}</span>
    </div>
  );
};

export default ElementItem;
