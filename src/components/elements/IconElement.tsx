
import React from 'react';
import * as LucideIcons from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

interface IconElementProps {
  icon: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  rotate?: number;
  animation?: 'none' | 'pulse' | 'spin' | 'bounce';
}

const IconElement: React.FC<IconElementProps> = ({
  icon,
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  onClick,
  hoverEffect = false,
  rotate = 0,
  animation = 'none'
}) => {
  // Get the icon component dynamically
  const IconComponent = LucideIcons[icon];
  
  if (!IconComponent) {
    console.error(`Icon "${icon}" not found`);
    return null;
  }
  
  let animationClass = '';
  switch (animation) {
    case 'pulse':
      animationClass = 'animate-pulse';
      break;
    case 'spin':
      animationClass = 'animate-spin';
      break;
    case 'bounce':
      animationClass = 'animate-bounce';
      break;
    default:
      animationClass = '';
  }
  
  const hoverClass = hoverEffect ? 'transition-transform hover:scale-110' : '';
  
  return (
    <div 
      className={`inline-flex items-center justify-center ${hoverClass} ${animationClass} ${className}`}
      onClick={onClick}
      style={{ 
        transform: `rotate(${rotate}deg)`,
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
      />
    </div>
  );
};

export default IconElement;
