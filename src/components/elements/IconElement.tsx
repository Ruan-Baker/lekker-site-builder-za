
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
  // Check if the name exists in LucideIcons
  if (!LucideIcons[name] || typeof LucideIcons[name] !== 'function') {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return <div className="text-red-500">Icon not found</div>;
  }
  
  // Properly type and create the icon component
  const IconComponent = LucideIcons[name] as React.FC<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    'aria-hidden'?: boolean | 'true' | 'false';
  }>;
  
  return (
    <div className={`icon-element inline-flex ${className}`}>
      <IconComponent 
        size={size} 
        color={color} 
        strokeWidth={strokeWidth} 
        aria-hidden={true} 
      />
    </div>
  );
};

export default IconElement;
