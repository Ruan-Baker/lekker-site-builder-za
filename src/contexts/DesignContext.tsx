
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Json } from '@/integrations/supabase/types';

// Define types for our design settings
export interface TypographySettings {
  headings: {
    fontFamily: string;
    fontWeight: string;
  };
  body: {
    fontFamily: string;
    fontWeight: string;
  };
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface SpacingSettings {
  containerPadding: string;
  sectionSpacing: string;
}

export interface ResponsiveSettings {
  desktop: Record<string, any>;
  tablet: Record<string, any>;
  mobile: Record<string, any>;
}

export type ViewportSize = 'desktop' | 'tablet' | 'mobile';

export interface DesignSettings {
  id?: string;
  project_id: string;
  typography_settings: TypographySettings;
  color_palette: ColorPalette;
  spacing_settings: SpacingSettings;
  responsive_settings?: ResponsiveSettings;
  animations?: Record<string, any>;
}

interface DesignContextType {
  designSettings: DesignSettings | null;
  updateDesignSettings: (settings: Partial<DesignSettings>) => Promise<void>;
  isLoading: boolean;
  fonts: string[];
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  viewportSize: ViewportSize;
  setViewportSize: (size: ViewportSize) => void;
  getResponsiveValue: (key: string, defaultValue: any) => any;
}

const defaultDesignSettings: DesignSettings = {
  project_id: '',
  typography_settings: {
    headings: { fontFamily: 'Inter', fontWeight: '700' },
    body: { fontFamily: 'Inter', fontWeight: '400' },
  },
  color_palette: {
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#f97316',
    background: '#ffffff',
    text: '#1e293b',
  },
  spacing_settings: {
    containerPadding: '1rem',
    sectionSpacing: '4rem',
  },
  responsive_settings: {
    desktop: {},
    tablet: {},
    mobile: {}
  }
};

// Available fonts
const availableFonts = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Poppins',
  'Montserrat',
  'Source Sans Pro',
  'Raleway',
];

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider: React.FC<{ children: React.ReactNode; projectId: string }> = ({ 
  children, 
  projectId 
}) => {
  const [designSettings, setDesignSettings] = useState<DesignSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');
  const { user } = useAuth();
  
  // Get responsive value based on current viewport size
  const getResponsiveValue = (key: string, defaultValue: any): any => {
    if (!designSettings?.responsive_settings) return defaultValue;
    
    // Check for value in current viewport first
    const viewportSettings = designSettings.responsive_settings[viewportSize];
    if (viewportSettings && viewportSettings[key] !== undefined) {
      return viewportSettings[key];
    }
    
    // Fall back to tablet if mobile
    if (viewportSize === 'mobile') {
      const tabletSettings = designSettings.responsive_settings.tablet;
      if (tabletSettings && tabletSettings[key] !== undefined) {
        return tabletSettings[key];
      }
    }
    
    // Fall back to desktop
    const desktopSettings = designSettings.responsive_settings.desktop;
    if (desktopSettings && desktopSettings[key] !== undefined) {
      return desktopSettings[key];
    }
    
    return defaultValue;
  };
  
  useEffect(() => {
    if (!projectId || !user) return;
    
    const fetchDesignSettings = async () => {
      setIsLoading(true);
      
      try {
        // Try to get existing design settings for this project
        const { data, error } = await supabase
          .from('design_settings')
          .select('*')
          .eq('project_id', projectId)
          .single();
        
        if (error) {
          console.error('Error fetching design settings:', error);
          
          // If no settings exist, create default ones
          if (error.code === 'PGRST116') {
            const newSettings = {
              project_id: projectId,
              typography_settings: defaultDesignSettings.typography_settings as unknown as Json,
              color_palette: defaultDesignSettings.color_palette as unknown as Json,
              spacing_settings: defaultDesignSettings.spacing_settings as unknown as Json,
              responsive_settings: defaultDesignSettings.responsive_settings as unknown as Json
            };
            
            const { data: insertedData, error: insertError } = await supabase
              .from('design_settings')
              .insert(newSettings)
              .select()
              .single();
            
            if (insertError) {
              console.error('Error creating design settings:', insertError);
              toast({
                title: 'Error',
                description: 'Failed to create design settings.',
                variant: 'destructive',
              });
            } else {
              // Transform the inserted data to our DesignSettings type
              const settings: DesignSettings = {
                id: insertedData.id,
                project_id: insertedData.project_id,
                typography_settings: insertedData.typography_settings as unknown as TypographySettings,
                color_palette: insertedData.color_palette as unknown as ColorPalette,
                spacing_settings: insertedData.spacing_settings as unknown as SpacingSettings,
                responsive_settings: insertedData.responsive_settings as unknown as ResponsiveSettings
              };
              
              setDesignSettings(settings);
              setSelectedFont(settings.typography_settings.headings.fontFamily);
              setPrimaryColor(settings.color_palette.primary);
            }
          } else {
            toast({
              title: 'Error',
              description: 'Failed to load design settings.',
              variant: 'destructive',
            });
          }
        } else {
          // Transform the fetched data to our DesignSettings type
          const settings: DesignSettings = {
            id: data.id,
            project_id: data.project_id,
            typography_settings: data.typography_settings as unknown as TypographySettings,
            color_palette: data.color_palette as unknown as ColorPalette,
            spacing_settings: data.spacing_settings as unknown as SpacingSettings,
            responsive_settings: data.responsive_settings as unknown as ResponsiveSettings
          };
          
          setDesignSettings(settings);
          setSelectedFont(settings.typography_settings.headings.fontFamily);
          setPrimaryColor(settings.color_palette.primary);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast({
          title: 'Error',
          description: 'An unexpected error occurred.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDesignSettings();
  }, [projectId, user]);
  
  const updateDesignSettings = async (settings: Partial<DesignSettings>) => {
    if (!designSettings || !projectId) return;
    
    try {
      const updatedSettings = {
        ...designSettings,
        ...settings,
      };
      
      // Transform our types to Json for Supabase
      const dataToUpdate = {
        project_id: updatedSettings.project_id,
        typography_settings: updatedSettings.typography_settings as unknown as Json,
        color_palette: updatedSettings.color_palette as unknown as Json,
        spacing_settings: updatedSettings.spacing_settings as unknown as Json,
        responsive_settings: updatedSettings.responsive_settings as unknown as Json
      };
      
      const { error } = await supabase
        .from('design_settings')
        .update(dataToUpdate)
        .eq('id', designSettings.id);
        
      if (error) {
        console.error('Error updating design settings:', error);
        toast({
          title: 'Error',
          description: 'Failed to update design settings.',
          variant: 'destructive',
        });
        return;
      }
      
      setDesignSettings(updatedSettings);
      toast({
        title: 'Success',
        description: 'Design settings updated.',
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <DesignContext.Provider
      value={{
        designSettings,
        updateDesignSettings,
        isLoading,
        fonts: availableFonts,
        selectedFont,
        setSelectedFont,
        primaryColor,
        setPrimaryColor,
        viewportSize,
        setViewportSize,
        getResponsiveValue,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (context === undefined) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
};
