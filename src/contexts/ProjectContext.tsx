import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Project {
  id: string;
  name: string;
  description: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  published_url: string | null;
  thumbnail_url: string | null;
  project_type?: string;
  template_id?: string | null;
}

interface ProjectContextType {
  project: Project | null;
  isLoading: boolean;
  error: Error | null;
  saveProject: (data: Partial<Project>) => Promise<void>;
  createPage: (name: string, isHomepage?: boolean) => Promise<string | null>;
  publishProject: () => Promise<void>;
  loadProject: (projectId: string) => Promise<void>;
  createNewProject: (name: string, description?: string, projectType?: string, templateId?: string | null) => Promise<string | null>;
  navigateToProject?: (projectId: string) => void;
  navigateToCreateProject?: () => void;
  navigateToDashboard?: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProviderWithRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  
  const navigateToProject = (projectId: string) => {
    navigate(`/builder/${projectId}`);
  };
  
  const navigateToCreateProject = () => {
    navigate('/create-project');
  };
  
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  const loadProject = async (projectId: string) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data.user_id !== user.id) {
        throw new Error('You do not have permission to access this project');
      }
      
      setProject(data);
    } catch (err) {
      console.error('Error loading project:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: 'Failed to load project. ' + (err as Error).message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveProject = async (data: Partial<Project>) => {
    if (!project || !user) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', project.id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setProject(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: 'Success',
        description: 'Project saved successfully',
      });
    } catch (err) {
      console.error('Error saving project:', err);
      toast({
        title: 'Error',
        description: 'Failed to save project',
        variant: 'destructive',
      });
    }
  };
  
  const createPage = async (name: string, isHomepage = false) => {
    if (!project || !user) return null;
    
    try {
      const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      const { data, error } = await supabase
        .from('pages')
        .insert({
          name,
          slug,
          project_id: project.id,
          is_homepage: isHomepage,
        })
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: 'Success',
        description: 'Page created successfully',
      });
      
      return data.id;
    } catch (err) {
      console.error('Error creating page:', err);
      toast({
        title: 'Error',
        description: 'Failed to create page',
        variant: 'destructive',
      });
      return null;
    }
  };
  
  const publishProject = async () => {
    if (!project || !user) return;
    
    try {
      const publishedUrl = project.published_url || 
        `https://lekker-sites.com/site/${project.id}`;
      
      const { error } = await supabase
        .from('projects')
        .update({
          is_published: true,
          published_url: publishedUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', project.id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setProject(prev => prev ? { 
        ...prev, 
        is_published: true, 
        published_url: publishedUrl 
      } : null);
      
      toast({
        title: 'Success',
        description: 'Project published successfully',
      });
    } catch (err) {
      console.error('Error publishing project:', err);
      toast({
        title: 'Error',
        description: 'Failed to publish project',
        variant: 'destructive',
      });
    }
  };
  
  const createNewProject = async (name: string, description?: string, projectType: string = 'website', templateId?: string | null) => {
    if (!user) return null;
    
    setIsLoading(true);
    
    try {
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert({
          name,
          description,
          user_id: user.id,
          project_type: projectType,
          template_id: templateId || null,
        })
        .select()
        .single();
      
      if (projectError) {
        throw new Error(projectError.message);
      }
      
      // Create a default homepage
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .insert({
          name: 'Home',
          slug: 'home',
          project_id: projectData.id,
          is_homepage: true,
        })
        .select()
        .single();
      
      if (pageError) {
        // If page creation fails, delete the project to avoid orphaned projects
        await supabase.from('projects').delete().eq('id', projectData.id);
        throw new Error(pageError.message);
      }
      
      toast({
        title: 'Success',
        description: 'Project created successfully',
      });
      
      return projectData.id;
    } catch (err) {
      console.error('Error creating project:', err);
      toast({
        title: 'Error',
        description: 'Failed to create project',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <ProjectContext.Provider
      value={{
        project,
        isLoading,
        error,
        saveProject,
        createPage,
        publishProject,
        loadProject,
        createNewProject,
        navigateToProject,
        navigateToCreateProject,
        navigateToDashboard,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const loadProject = async (projectId: string) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data.user_id !== user.id) {
        throw new Error('You do not have permission to access this project');
      }
      
      setProject(data);
    } catch (err) {
      console.error('Error loading project:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: 'Failed to load project. ' + (err as Error).message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveProject = async (data: Partial<Project>) => {
    if (!project || !user) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', project.id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setProject(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: 'Success',
        description: 'Project saved successfully',
      });
    } catch (err) {
      console.error('Error saving project:', err);
      toast({
        title: 'Error',
        description: 'Failed to save project',
        variant: 'destructive',
      });
    }
  };
  
  const createPage = async (name: string, isHomepage = false) => {
    if (!project || !user) return null;
    
    try {
      const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      const { data, error } = await supabase
        .from('pages')
        .insert({
          name,
          slug,
          project_id: project.id,
          is_homepage: isHomepage,
        })
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: 'Success',
        description: 'Page created successfully',
      });
      
      return data.id;
    } catch (err) {
      console.error('Error creating page:', err);
      toast({
        title: 'Error',
        description: 'Failed to create page',
        variant: 'destructive',
      });
      return null;
    }
  };
  
  const publishProject = async () => {
    if (!project || !user) return;
    
    try {
      const publishedUrl = project.published_url || 
        `https://lekker-sites.com/site/${project.id}`;
      
      const { error } = await supabase
        .from('projects')
        .update({
          is_published: true,
          published_url: publishedUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', project.id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setProject(prev => prev ? { 
        ...prev, 
        is_published: true, 
        published_url: publishedUrl 
      } : null);
      
      toast({
        title: 'Success',
        description: 'Project published successfully',
      });
    } catch (err) {
      console.error('Error publishing project:', err);
      toast({
        title: 'Error',
        description: 'Failed to publish project',
        variant: 'destructive',
      });
    }
  };
  
  const createNewProject = async (name: string, description?: string, projectType: string = 'website', templateId?: string | null) => {
    if (!user) return null;
    
    setIsLoading(true);
    
    try {
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert({
          name,
          description,
          user_id: user.id,
          project_type: projectType,
          template_id: templateId || null,
        })
        .select()
        .single();
      
      if (projectError) {
        throw new Error(projectError.message);
      }
      
      // Create a default homepage
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .insert({
          name: 'Home',
          slug: 'home',
          project_id: projectData.id,
          is_homepage: true,
        })
        .select()
        .single();
      
      if (pageError) {
        // If page creation fails, delete the project to avoid orphaned projects
        await supabase.from('projects').delete().eq('id', projectData.id);
        throw new Error(pageError.message);
      }
      
      toast({
        title: 'Success',
        description: 'Project created successfully',
      });
      
      return projectData.id;
    } catch (err) {
      console.error('Error creating project:', err);
      toast({
        title: 'Error',
        description: 'Failed to create project',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <ProjectContext.Provider
      value={{
        project,
        isLoading,
        error,
        saveProject,
        createPage,
        publishProject,
        loadProject,
        createNewProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
