
import React from 'react';
import * as LucideIcons from 'lucide-react';

type IconNames = keyof typeof LucideIcons;

interface IconElementProps {
  name: IconNames;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const IconElement: React.FC<IconElementProps> = ({
  name,
  size = 24,
  color,
  strokeWidth = 2,
  className = '',
}) => {
  const IconComponent = LucideIcons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return <div className="text-red-500">Icon not found</div>;
  }
  
  return (
    <div className={`icon-element inline-flex ${className}`}>
      <IconComponent 
        size={size} 
        color={color} 
        strokeWidth={strokeWidth} 
        aria-hidden="true" 
      />
    </div>
  );
};

export default IconElement;
