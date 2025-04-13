
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BuilderSidebar from '@/components/builder/BuilderSidebar';
import BuilderCanvas from '@/components/builder/BuilderCanvas';
import BuilderHeader from '@/components/builder/BuilderHeader';
import { useBuilder } from '@/contexts/BuilderContext';
import { DesignProvider } from '@/contexts/DesignContext';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { SectionProvider } from '@/contexts/SectionContext';
import { HistoryProvider } from '@/contexts/HistoryContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import PreviewMode from '@/components/builder/PreviewMode';
import { supabase } from '@/integrations/supabase/client';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import KeyboardShortcutsHelp from '@/components/builder/KeyboardShortcutsHelp';
import GridSectionBuilder from '@/components/sections/GridSectionBuilder';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LayoutGrid, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Builder = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [pageId, setPageId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [gridBuilderOpen, setGridBuilderOpen] = useState(false);
  
  useEffect(() => {
    // If we don't have a projectId in params, we should redirect to dashboard
    if (!loading && user && !projectId) {
      navigate('/dashboard');
      return;
    }
  }, [projectId, loading, user, navigate]);

  // Load project details
  useEffect(() => {
    if (!projectId || !user) return;
    
    const fetchProject = async () => {
      setIsLoadingProject(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('name')
          .eq('id', projectId)
          .single();
          
        if (error) throw error;
        if (data) setProjectName(data.name);
        
        // Also fetch the homepage
        const { data: pageData, error: pageError } = await supabase
          .from('pages')
          .select('id')
          .eq('project_id', projectId)
          .eq('is_homepage', true)
          .single();
          
        if (pageError) throw pageError;
        if (pageData) setPageId(pageData.id);
        
      } catch (error) {
        console.error('Error fetching project:', error);
        toast({
          title: 'Error',
          description: 'Failed to load project. Redirecting to dashboard.',
          variant: 'destructive',
        });
        navigate('/dashboard');
      } finally {
        setIsLoadingProject(false);
      }
    };
    
    fetchProject();
  }, [projectId, user, navigate]);
  
  if (loading || isLoadingProject) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">{isLoadingProject ? 'Loading project...' : 'Checking authentication...'}</p>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <p className="mb-4 text-lg">Please sign in to access the builder</p>
        <Button onClick={() => navigate('/auth')} className="bg-blue-600 hover:bg-blue-700">Sign In</Button>
      </div>
    );
  }
  
  if (!projectId) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="mb-4 text-lg">No project selected</p>
          <Button onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-700">Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <ProjectProvider>
      <DesignProvider projectId={projectId}>
        <HistoryProvider projectId={projectId} pageId={pageId || undefined}>
          <SectionProvider>
            <DndProvider backend={HTML5Backend}>
              <div className="min-h-screen flex flex-col bg-gray-50">
                <BuilderHeader projectName={projectName} />
                <div className="flex flex-1 overflow-hidden">
                  <BuilderSidebar />
                  <BuilderCanvas />
                </div>
                
                {pageId && (
                  <>
                    <PreviewMode 
                      open={previewOpen} 
                      onClose={() => setPreviewOpen(false)} 
                      pageId={pageId}
                    />
                    
                    <Dialog open={gridBuilderOpen} onOpenChange={setGridBuilderOpen}>
                      <DialogContent className="max-w-5xl rounded-xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <LayoutGrid className="h-5 w-5" />
                            Grid Section Builder
                          </DialogTitle>
                        </DialogHeader>
                        <GridSectionBuilder 
                          onSave={() => setGridBuilderOpen(false)} 
                        />
                      </DialogContent>
                    </Dialog>
                  </>
                )}
                
                <div className="fixed bottom-4 right-4 z-10">
                  <Button 
                    size="sm" 
                    className="rounded-full flex items-center gap-2 shadow-md bg-blue-600 hover:bg-blue-700"
                    onClick={() => setGridBuilderOpen(true)}
                  >
                    <LayoutGrid className="h-4 w-4" /> 
                    Grid Builder
                  </Button>
                </div>
              </div>
            </DndProvider>
          </SectionProvider>
        </HistoryProvider>
      </DesignProvider>
    </ProjectProvider>
  );
};

export default Builder;
