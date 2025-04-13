
import React from 'react';
import { useDesign } from '@/contexts/DesignContext';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface ThemeSelectorProps {
  onSelect: (theme: string) => void;
  selectedTheme: string;
}

interface ThemeOption {
  id: string;
  name: string;
  colors: string[];
  fonts: [string, string];
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onSelect, selectedTheme }) => {
  const themes: ThemeOption[] = [
    {
      id: 'default',
      name: 'Default',
      colors: ['#3b82f6', '#10b981', '#f97316', '#ffffff', '#1e293b'],
      fonts: ['Inter', 'Inter'] 
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      colors: ['#000000', '#333333', '#666666', '#ffffff', '#333333'],
      fonts: ['Work Sans', 'Work Sans']
    },
    {
      id: 'bold',
      name: 'Bold',
      colors: ['#ff3e00', '#ff8700', '#ffbd00', '#ffffff', '#111111'],
      fonts: ['Montserrat', 'Open Sans']
    },
    {
      id: 'elegant',
      name: 'Elegant',
      colors: ['#937264', '#dcd0c0', '#c0b283', '#f4f4f4', '#373737'],
      fonts: ['Playfair Display', 'Lato']
    },
    {
      id: 'playful',
      name: 'Playful',
      colors: ['#6b46c1', '#d53f8c', '#ed8936', '#ffffff', '#2d3748'],
      fonts: ['Quicksand', 'Nunito']
    },
    {
      id: 'corporate',
      name: 'Corporate',
      colors: ['#2c5282', '#4299e1', '#63b3ed', '#ffffff', '#1a202c'],
      fonts: ['Roboto', 'Source Sans Pro']
    },
    {
      id: 'dark',
      name: 'Dark',
      colors: ['#bb86fc', '#03dac6', '#cf6679', '#121212', '#ffffff'],
      fonts: ['Inter', 'Roboto']
    },
    {
      id: 'light',
      name: 'Light',
      colors: ['#6366f1', '#10b981', '#f59e0b', '#f8fafc', '#334155'],
      fonts: ['Nunito', 'Open Sans']
    }
  ];
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Theme Presets</h2>
      <p className="text-sm text-muted-foreground">
        Apply a pre-designed theme to quickly style your entire website
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {themes.map((theme) => (
          <Card 
            key={theme.id}
            className={`cursor-pointer border transition-all ${selectedTheme === theme.id ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
            onClick={() => onSelect(theme.id)}
          >
            <CardContent className="p-3 space-y-3">
              <div className="flex justify-between items-center">
                <div className="font-medium text-sm">{theme.name}</div>
                {selectedTheme === theme.id && (
                  <Check size={16} className="text-primary" />
                )}
              </div>
              
              <div className="flex space-x-1">
                {theme.colors.map((color, index) => (
                  <div 
                    key={index}
                    className="w-5 h-5 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              <div className="grid gap-1">
                <div className="text-xs truncate" style={{ fontFamily: theme.fonts[0] }}>
                  Aa {theme.fonts[0]}
                </div>
                <div className="text-xs truncate text-muted-foreground" style={{ fontFamily: theme.fonts[1] }}>
                  Aa {theme.fonts[1]}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
