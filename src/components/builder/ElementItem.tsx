
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
      className={`flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-xl cursor-grab transition-all hover:border-blue-300 hover:shadow-md ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mb-2">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-medium text-gray-800">{name}</span>
    </div>
  );
};

export default ElementItem;
