
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
    letterSpacing?: string;
    lineHeight?: string;
    textTransform?: string;
  };
  body: {
    fontFamily: string;
    fontWeight: string;
    letterSpacing?: string;
    lineHeight?: string;
    fontSize?: string;
  };
  customFonts?: {
    name: string;
    url: string;
    weights: string[];
  }[];
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  customColors?: Record<string, string>;
}

export interface SpacingSettings {
  containerPadding: string;
  sectionSpacing: string;
  elementSpacing?: string;
  borderRadius?: string;
  contentWidth?: string;
}

export interface AnimationSettings {
  pageTransitions?: string;
  elementAnimations?: Record<string, any>;
  scrollEffects?: boolean;
  duration?: number;
  easing?: string;
}

export interface ResponsiveSettings {
  desktop: Record<string, any>;
  tablet: Record<string, any>;
  mobile: Record<string, any>;
  breakpoints?: {
    tablet: number;
    mobile: number;
  };
}

export type ViewportSize = 'desktop' | 'tablet' | 'mobile';

export interface DesignSettings {
  id?: string;
  project_id: string;
  typography_settings: TypographySettings;
  color_palette: ColorPalette;
  spacing_settings: SpacingSettings;
  responsive_settings?: ResponsiveSettings;
  animations?: AnimationSettings;
  custom_css?: string;
  theme?: string;
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
  addCustomFont: (name: string, url: string, weights: string[]) => Promise<void>;
  addCustomColor: (name: string, color: string) => Promise<void>;
  setCustomCSS: (css: string) => Promise<void>;
  getComputedStyle: (element: string) => Record<string, string>;
  applyTheme: (themeName: string) => Promise<void>;
  availableThemes: string[];
}

const defaultDesignSettings: DesignSettings = {
  project_id: '',
  typography_settings: {
    headings: { 
      fontFamily: 'Inter', 
      fontWeight: '700',
      lineHeight: '1.2',
      letterSpacing: '-0.025em',
    },
    body: { 
      fontFamily: 'Inter', 
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0',
      fontSize: '16px',
    },
    customFonts: [],
  },
  color_palette: {
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#f97316',
    background: '#ffffff',
    text: '#1e293b',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    customColors: {},
  },
  spacing_settings: {
    containerPadding: '1rem',
    sectionSpacing: '4rem',
    elementSpacing: '1rem',
    borderRadius: '0.375rem',
    contentWidth: '1200px',
  },
  responsive_settings: {
    desktop: {},
    tablet: {},
    mobile: {},
    breakpoints: {
      tablet: 768,
      mobile: 480,
    }
  },
  animations: {
    pageTransitions: 'fade',
    elementAnimations: {},
    scrollEffects: false,
    duration: 300,
    easing: 'ease',
  },
  custom_css: '',
  theme: 'default',
};

// Available fonts - expanded list
const availableFonts = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Poppins',
  'Montserrat',
  'Source Sans Pro',
  'Raleway',
  'Playfair Display',
  'Merriweather',
  'Oswald',
  'Nunito',
  'Work Sans',
  'Fira Sans',
  'Rubik',
  'Quicksand',
];

// Available themes
const availableThemes = [
  'default',
  'minimalist',
  'bold',
  'elegant',
  'playful',
  'corporate',
  'dark',
  'light',
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
              responsive_settings: defaultDesignSettings.responsive_settings as unknown as Json,
              animations: defaultDesignSettings.animations as unknown as Json,
              custom_css: defaultDesignSettings.custom_css,
              theme: defaultDesignSettings.theme
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
                responsive_settings: insertedData.responsive_settings as unknown as ResponsiveSettings,
                animations: insertedData.animations as unknown as AnimationSettings,
                custom_css: insertedData.custom_css,
                theme: insertedData.theme
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
            responsive_settings: data.responsive_settings as unknown as ResponsiveSettings,
            animations: data.animations as unknown as AnimationSettings,
            custom_css: data.custom_css,
            theme: data.theme
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
        responsive_settings: updatedSettings.responsive_settings as unknown as Json,
        animations: updatedSettings.animations as unknown as Json,
        custom_css: updatedSettings.custom_css,
        theme: updatedSettings.theme
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
  
  // Add a custom font to the design settings
  const addCustomFont = async (name: string, url: string, weights: string[]) => {
    if (!designSettings) return;
    
    try {
      const customFonts = designSettings.typography_settings.customFonts || [];
      const updatedCustomFonts = [...customFonts, { name, url, weights }];
      
      await updateDesignSettings({
        typography_settings: {
          ...designSettings.typography_settings,
          customFonts: updatedCustomFonts
        }
      });
      
      toast({
        title: 'Success',
        description: `Custom font "${name}" added.`,
      });
    } catch (error) {
      console.error('Error adding custom font:', error);
      toast({
        title: 'Error',
        description: 'Failed to add custom font.',
        variant: 'destructive',
      });
    }
  };
  
  // Add a custom color to the design settings
  const addCustomColor = async (name: string, color: string) => {
    if (!designSettings) return;
    
    try {
      const customColors = designSettings.color_palette.customColors || {};
      const updatedCustomColors = { ...customColors, [name]: color };
      
      await updateDesignSettings({
        color_palette: {
          ...designSettings.color_palette,
          customColors: updatedCustomColors
        }
      });
      
      toast({
        title: 'Success',
        description: `Custom color "${name}" added.`,
      });
    } catch (error) {
      console.error('Error adding custom color:', error);
      toast({
        title: 'Error',
        description: 'Failed to add custom color.',
        variant: 'destructive',
      });
    }
  };
  
  // Set custom CSS
  const setCustomCSS = async (css: string) => {
    if (!designSettings) return;
    
    try {
      await updateDesignSettings({
        custom_css: css
      });
      
      toast({
        title: 'Success',
        description: 'Custom CSS updated.',
      });
    } catch (error) {
      console.error('Error updating custom CSS:', error);
      toast({
        title: 'Error',
        description: 'Failed to update custom CSS.',
        variant: 'destructive',
      });
    }
  };
  
  // Get computed style for an element
  const getComputedStyle = (element: string): Record<string, string> => {
    if (!designSettings) return {};
    
    // This is a simplified version. In a real app, this would use the design settings
    // to compute the styles for a specific element based on global settings,
    // component presets, and any overrides.
    const styles: Record<string, string> = {
      fontFamily: designSettings.typography_settings.body.fontFamily,
      color: designSettings.color_palette.text,
    };
    
    // Add specific element styles based on element type
    switch (element) {
      case 'heading-1':
        styles.fontFamily = designSettings.typography_settings.headings.fontFamily;
        styles.fontWeight = designSettings.typography_settings.headings.fontWeight;
        styles.fontSize = '2.5rem';
        break;
      case 'button-primary':
        styles.backgroundColor = designSettings.color_palette.primary;
        styles.color = '#ffffff';
        styles.borderRadius = designSettings.spacing_settings.borderRadius || '0.375rem';
        break;
      // Add other element types as needed
    }
    
    return styles;
  };
  
  // Apply a theme
  const applyTheme = async (themeName: string) => {
    if (!designSettings) return;
    
    try {
      let themeSettings: Partial<DesignSettings> = { theme: themeName };
      
      // Apply theme-specific settings
      switch (themeName) {
        case 'minimalist':
          themeSettings = {
            ...themeSettings,
            color_palette: {
              ...designSettings.color_palette,
              primary: '#000000',
              secondary: '#333333',
              accent: '#666666',
              background: '#ffffff',
              text: '#333333',
            },
            typography_settings: {
              ...designSettings.typography_settings,
              headings: {
                ...designSettings.typography_settings.headings,
                fontFamily: 'Work Sans',
                fontWeight: '300',
              },
              body: {
                ...designSettings.typography_settings.body,
                fontFamily: 'Work Sans',
                fontWeight: '300',
              },
            },
            spacing_settings: {
              ...designSettings.spacing_settings,
              containerPadding: '2rem',
              sectionSpacing: '6rem',
              borderRadius: '0',
            },
          };
          break;
        case 'bold':
          themeSettings = {
            ...themeSettings,
            color_palette: {
              ...designSettings.color_palette,
              primary: '#ff3e00',
              secondary: '#ff8700',
              accent: '#ffbd00',
              background: '#ffffff',
              text: '#111111',
            },
            typography_settings: {
              ...designSettings.typography_settings,
              headings: {
                ...designSettings.typography_settings.headings,
                fontFamily: 'Montserrat',
                fontWeight: '800',
              },
              body: {
                ...designSettings.typography_settings.body,
                fontFamily: 'Open Sans',
                fontWeight: '400',
              },
            },
            spacing_settings: {
              ...designSettings.spacing_settings,
              containerPadding: '1.5rem',
              sectionSpacing: '5rem',
              borderRadius: '0.5rem',
            },
          };
          break;
        case 'elegant':
          themeSettings = {
            ...themeSettings,
            color_palette: {
              ...designSettings.color_palette,
              primary: '#937264',
              secondary: '#dcd0c0',
              accent: '#c0b283',
              background: '#f4f4f4',
              text: '#373737',
            },
            typography_settings: {
              ...designSettings.typography_settings,
              headings: {
                ...designSettings.typography_settings.headings,
                fontFamily: 'Playfair Display',
                fontWeight: '700',
              },
              body: {
                ...designSettings.typography_settings.body,
                fontFamily: 'Lato',
                fontWeight: '300',
              },
            },
            spacing_settings: {
              ...designSettings.spacing_settings,
              containerPadding: '1.75rem',
              sectionSpacing: '7rem',
              borderRadius: '0.25rem',
            },
          };
          break;
        case 'dark':
          themeSettings = {
            ...themeSettings,
            color_palette: {
              ...designSettings.color_palette,
              primary: '#bb86fc',
              secondary: '#03dac6',
              accent: '#cf6679',
              background: '#121212',
              text: '#ffffff',
            }
          };
          break;
        // Add other themes as needed
        default:
          // Default theme - already defined in defaultDesignSettings
          break;
      }
      
      await updateDesignSettings(themeSettings);
      
      toast({
        title: 'Success',
        description: `${themeName.charAt(0).toUpperCase() + themeName.slice(1)} theme applied.`,
      });
    } catch (error) {
      console.error('Error applying theme:', error);
      toast({
        title: 'Error',
        description: 'Failed to apply theme.',
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
        fonts: [...availableFonts, ...(designSettings?.typography_settings.customFonts?.map(font => font.name) || [])],
        selectedFont,
        setSelectedFont,
        primaryColor,
        setPrimaryColor,
        viewportSize,
        setViewportSize,
        getResponsiveValue,
        addCustomFont,
        addCustomColor,
        setCustomCSS,
        getComputedStyle,
        applyTheme,
        availableThemes,
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
