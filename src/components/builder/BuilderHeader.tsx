
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '@/contexts/ProjectContext';
import { useHistory } from '@/contexts/HistoryContext';
import { Button } from '@/components/ui/button';
import ResponsiveViewControls from './ResponsiveViewControls';
import UndoRedoControls from './UndoRedoControls';
import { Eye, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useBuilder } from '@/contexts/BuilderContext';
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp';

const BuilderHeader = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, isLoading: projectLoading } = useProject();
  const { saveElements, isLoading: builderLoading } = useBuilder();
  const [pages, setPages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const { isSaving } = useHistory();
  
  useEffect(() => {
    if (projectId) {
      fetchPages();
    }
  }, [projectId]);
  
  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('project_id', projectId);
        
      if (error) throw error;
      
      if (data) {
        setPages(data);
        
        // Set homepage as default
        const homepage = data.find(page => page.is_homepage);
        if (homepage) {
          setCurrentPage(homepage.id);
        } else if (data.length > 0) {
          setCurrentPage(data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };
  
  const handleSave = async () => {
    if (!currentPage) {
      toast({
        title: 'No page selected',
        description: 'Please select a page to save your changes',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      await saveElements(currentPage);
      
      toast({
        title: 'Changes saved',
        description: 'Your page has been saved successfully'
      });
    } catch (error) {
      console.error('Error saving:', error);
      toast({
        title: 'Error saving',
        description: 'There was a problem saving your changes',
        variant: 'destructive'
      });
    }
  };
  
  return (
    <header className="h-14 border-b border-gray-200 bg-white px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold">
          {projectLoading ? 'Loading...' : project?.name || 'New Project'}
        </h1>
        
        <UndoRedoControls />
      </div>
      
      <div className="flex items-center space-x-2">
        <KeyboardShortcutsHelp />
      
        <ResponsiveViewControls />
        
        <Button
          variant="outline"
          size="sm"
          className="ml-2"
          onClick={() => setPreviewMode(!previewMode)}
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        
        <Button 
          onClick={handleSave}
          disabled={builderLoading || isSaving}
          size="sm"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </header>
  );
};

export default BuilderHeader;
