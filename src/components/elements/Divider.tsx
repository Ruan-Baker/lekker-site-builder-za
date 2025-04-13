
import React from 'react';

interface DividerProps {
  style?: 'solid' | 'dashed' | 'dotted' | 'double';
  width?: string;
  color?: string;
  thickness?: number;
  orientation?: 'horizontal' | 'vertical';
  margin?: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  style = 'solid',
  width = '100%',
  color = '#e5e7eb',
  thickness = 1,
  orientation = 'horizontal',
  margin = '1rem 0',
  className = ''
}) => {
  const dividerStyles = {
    borderStyle: style,
    borderColor: color,
    margin: margin,
    ...(orientation === 'horizontal' ? {
      width: width,
      borderWidth: `${thickness}px 0 0 0`,
    } : {
      height: width,
      borderWidth: `0 0 0 ${thickness}px`,
      display: 'inline-block',
    }),
  };
  
  return (
    <hr 
      className={`divider ${className}`}
      style={dividerStyles}
      aria-orientation={orientation}
    />
  );
};

export default Divider;
