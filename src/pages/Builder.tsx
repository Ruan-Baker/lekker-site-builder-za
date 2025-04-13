
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BuilderSidebar from '@/components/builder/BuilderSidebar';
import BuilderCanvas from '@/components/builder/BuilderCanvas';
import BuilderHeader from '@/components/builder/BuilderHeader';
import { useBuilder, BuilderProvider } from '@/contexts/BuilderContext';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LayoutGrid } from 'lucide-react';

const Builder = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [pageId, setPageId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [gridBuilderOpen, setGridBuilderOpen] = useState(false);
  
  // Use keyboard shortcuts
  useKeyboardShortcuts();
  
  useEffect(() => {
    // If we don't have a projectId in params, we should create one or redirect
    if (!projectId && !loading && user) {
      navigate('/projects');
    }
  }, [projectId, loading, user, navigate]);
  
  // Load the default page (homepage) when the project loads
  useEffect(() => {
    if (!projectId || !user) return;
    
    const fetchHomepage = async () => {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('id')
          .eq('project_id', projectId)
          .eq('is_homepage', true)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setPageId(data.id);
        }
      } catch (error) {
        console.error('Error fetching homepage:', error);
      }
    };
    
    fetchHomepage();
  }, [projectId, user]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4 text-lg">Please sign in to access the builder</p>
        <Button onClick={() => navigate('/auth')}>Sign In</Button>
      </div>
    );
  }
  
  if (!projectId) {
    return <div className="flex items-center justify-center h-screen">Redirecting...</div>;
  }

  return (
    <ProjectProvider>
      <DesignProvider projectId={projectId}>
        <BuilderProvider>
          <HistoryProvider projectId={projectId} pageId={pageId || undefined}>
            <SectionProvider>
              <DndProvider backend={HTML5Backend}>
                <div className="min-h-screen flex flex-col bg-gray-50">
                  <BuilderHeader />
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
                        <DialogContent className="max-w-5xl">
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
                    <Dialog open={gridBuilderOpen} onOpenChange={setGridBuilderOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="rounded-full flex items-center gap-2 shadow-md"
                        >
                          <LayoutGrid className="h-4 w-4" /> 
                          Grid Builder
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </DndProvider>
            </SectionProvider>
          </HistoryProvider>
        </BuilderProvider>
      </DesignProvider>
    </ProjectProvider>
  );
};

export default Builder;
