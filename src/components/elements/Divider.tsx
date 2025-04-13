
import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  style?: 'solid' | 'dashed' | 'dotted';
  className?: string;
  decorative?: boolean;
  label?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  color,
  thickness = 1,
  style: borderStyle = 'solid',
  className = '',
  decorative = true,
  label,
}) => {
  const baseStyles = {
    backgroundColor: 'transparent',
    borderColor: color || 'currentColor',
    borderStyle,
  };

  if (orientation === 'horizontal') {
    return (
      <div className={`w-full relative flex items-center justify-center ${className}`}>
        {label ? (
          <>
            <div
              className="flex-grow"
              style={{
                ...baseStyles,
                borderBottomWidth: thickness,
              }}
            />
            <span className="mx-4 text-sm text-gray-500">{label}</span>
            <div
              className="flex-grow"
              style={{
                ...baseStyles,
                borderBottomWidth: thickness,
              }}
            />
          </>
        ) : (
          <hr
            className="w-full"
            style={{
              ...baseStyles,
              height: thickness,
              borderTop: `${thickness}px ${borderStyle} ${color || 'currentColor'}`,
              margin: 0,
            }}
            role={decorative ? 'presentation' : 'separator'}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`inline-block h-full ${className}`}
      style={{
        ...baseStyles,
        borderLeftWidth: thickness,
        width: thickness,
      }}
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation="vertical"
    />
  );
};

export default Divider;
