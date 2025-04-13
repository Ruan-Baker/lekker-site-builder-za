
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface SectionTemplate {
  id: string;
  name: string;
  category: string;
  description: string | null;
  thumbnail_url: string | null;
  template_data: any;
  created_at: string;
  updated_at: string;
}

interface SectionContextType {
  sections: SectionTemplate[];
  filteredSections: SectionTemplate[];
  isLoading: boolean;
  error: Error | null;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<SectionTemplate[]>([]);
  const [filteredSections, setFilteredSections] = useState<SectionTemplate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const { user } = useAuth();
  
  // Load all sections on component mount
  useEffect(() => {
    const fetchSections = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('sections')
          .select('*')
          .order('name', { ascending: true });
        
        if (error) {
          throw new Error(error.message);
        }
        
        setSections(data || []);
        
        // Extract unique categories
        const uniqueCategories = ['all', ...new Set(data?.map(section => section.category) || [])];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error loading sections:', err);
        setError(err as Error);
        toast({
          title: 'Error',
          description: 'Failed to load section templates',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSections();
  }, [user]);
  
  // Filter sections based on search term and active category
  useEffect(() => {
    let filtered = [...sections];
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(section => section.category === activeCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(section => 
        section.name.toLowerCase().includes(term) || 
        (section.description && section.description.toLowerCase().includes(term))
      );
    }
    
    setFilteredSections(filtered);
  }, [sections, searchTerm, activeCategory]);
  
  return (
    <SectionContext.Provider
      value={{
        sections,
        filteredSections,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        activeCategory,
        setActiveCategory,
        categories,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export const useSections = () => {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error('useSections must be used within a SectionProvider');
  }
  return context;
};
