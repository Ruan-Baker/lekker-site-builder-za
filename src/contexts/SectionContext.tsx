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
  industry?: string | null;
  complexity?: 'simple' | 'medium' | 'complex' | null;
  tags?: string[] | null;
  popularity?: number;
  is_premium?: boolean;
  author_id?: string | null;
  author_name?: string | null;
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
  activeIndustry: string;
  setActiveIndustry: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
  industries: string[];
  complexityFilter: string;
  setComplexityFilter: React.Dispatch<React.SetStateAction<string>>;
  addSectionTemplate: (template: Omit<SectionTemplate, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  saveSectionAsTemplate: (sectionData: any, metadata: Partial<SectionTemplate>) => Promise<void>;
  popularSections: SectionTemplate[];
  userSections: SectionTemplate[];
  tagFilters: string[];
  setTagFilters: React.Dispatch<React.SetStateAction<string[]>>;
  availableTags: string[];
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<SectionTemplate[]>([]);
  const [filteredSections, setFilteredSections] = useState<SectionTemplate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeIndustry, setActiveIndustry] = useState<string>('all');
  const [complexityFilter, setComplexityFilter] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>(['all']);
  const [industries, setIndustries] = useState<string[]>(['all']);
  const [popularSections, setPopularSections] = useState<SectionTemplate[]>([]);
  const [userSections, setUserSections] = useState<SectionTemplate[]>([]);
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const { user } = useAuth();
  
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
        
        if (data) {
          const typedSections = data.map(section => ({
            ...section,
            complexity: section.complexity as 'simple' | 'medium' | 'complex' | null,
            tags: section.tags || [],
            popularity: 0, // Default value if not present
            author_id: null, // Default value if not present
          }));
          setSections(typedSections);
        
          const uniqueCategories = ['all', ...new Set(typedSections?.map(section => section.category) || [])];
          setCategories(uniqueCategories);
          
          const uniqueIndustries = ['all', ...new Set(typedSections?.filter(s => s.industry).map(section => section.industry as string) || [])];
          setIndustries(uniqueIndustries);
          
          const allTags = typedSections
            .filter(section => section.tags && section.tags.length > 0)
            .flatMap(section => section.tags as string[]);
          setAvailableTags([...new Set(allTags)]);
          
          setPopularSections(
            [...typedSections]
              .filter(section => section.popularity !== undefined)
              .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
              .slice(0, 8)
          );
          
          if (user) {
            setUserSections(typedSections.filter(section => section.author_id === user.id));
          }
        }
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
  
  useEffect(() => {
    let filtered = [...sections];
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(section => section.category === activeCategory);
    }
    
    if (activeIndustry !== 'all') {
      filtered = filtered.filter(section => section.industry === activeIndustry);
    }
    
    if (complexityFilter !== 'all') {
      filtered = filtered.filter(section => section.complexity === complexityFilter);
    }
    
    if (tagFilters.length > 0) {
      filtered = filtered.filter(section => 
        section.tags && tagFilters.every(tag => section.tags?.includes(tag))
      );
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(section => 
        section.name.toLowerCase().includes(term) || 
        (section.description && section.description.toLowerCase().includes(term)) ||
        (section.tags && section.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    setFilteredSections(filtered);
  }, [sections, searchTerm, activeCategory, activeIndustry, complexityFilter, tagFilters]);
  
  const addSectionTemplate = async (templateData: Omit<SectionTemplate, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('sections')
        .insert(templateData);
      
      if (error) throw new Error(error.message);
      
      toast({
        title: 'Success',
        description: 'Section template added successfully',
      });
      
      const { data, error: fetchError } = await supabase
        .from('sections')
        .select('*')
        .order('name', { ascending: true });
      
      if (fetchError) throw new Error(fetchError.message);
      
      if (data) {
        const typedSections = data.map(section => ({
          ...section,
          complexity: section.complexity as 'simple' | 'medium' | 'complex' | null,
          tags: section.tags || [],
          popularity: 0, // Default value if not present
          author_id: null, // Default value if not present
        }));
        setSections(typedSections);
      }
    } catch (err) {
      console.error('Error adding section template:', err);
      toast({
        title: 'Error',
        description: 'Failed to add section template',
        variant: 'destructive',
      });
      throw err;
    }
  };
  
  const saveSectionAsTemplate = async (sectionData: any, metadata: Partial<SectionTemplate>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to save sections",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const templateData = {
        name: metadata.name || 'Untitled Section',
        category: metadata.category || 'custom',
        description: metadata.description || null,
        thumbnail_url: null, // We're removing the thumbnail requirement completely
        template_data: sectionData,
        industry: metadata.industry || null,
        complexity: metadata.complexity || 'medium',
        tags: metadata.tags || [],
        author_id: user.id,
        author_name: user.user_metadata.full_name || user.email,
        is_premium: false,
        popularity: 0
      };
      
      const { error } = await supabase
        .from('sections')
        .insert(templateData);
      
      if (error) throw new Error(error.message);
      
      toast({
        title: 'Success',
        description: 'Section saved as template',
      });
      
      const { data, error: fetchError } = await supabase
        .from('sections')
        .select('*')
        .order('name', { ascending: true });
      
      if (fetchError) throw new Error(fetchError.message);
      
      if (data) {
        const typedSections = data.map(section => ({
          ...section,
          complexity: section.complexity as 'simple' | 'medium' | 'complex' | null,
          tags: section.tags || [],
          popularity: 0, // Default value if not present
          author_id: null, // Default value if not present
        }));
        setSections(typedSections);
        
        setUserSections(typedSections.filter(section => section.author_id === user.id));
      }
    } catch (err) {
      console.error('Error saving section as template:', err);
      toast({
        title: 'Error',
        description: 'Failed to save section as template',
        variant: 'destructive',
      });
    }
  };
  
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
        activeIndustry,
        setActiveIndustry,
        categories,
        industries,
        complexityFilter,
        setComplexityFilter,
        addSectionTemplate,
        saveSectionAsTemplate,
        popularSections,
        userSections,
        tagFilters,
        setTagFilters,
        availableTags
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
