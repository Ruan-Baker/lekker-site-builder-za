
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Eye, Save, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBuilder } from '@/contexts/BuilderContext';
import { useParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import UndoRedoControls from './UndoRedoControls';
import ResponsiveViewControls from './ResponsiveViewControls';
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp';
import { supabase } from '@/integrations/supabase/client';

const BuilderHeader = () => {
  const navigate = useNavigate();
  const { saveElements, elements, isLoading } = useBuilder();
  const { projectId } = useParams<{ projectId: string }>();
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [pageId, setPageId] = React.useState<string | null>(null);
  
  // Fetch the current page ID (this is a simplified version, in a real app this would be from context or params)
  React.useEffect(() => {
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
    
    if (projectId) {
      fetchHomepage();
    }
  }, [projectId]);
  
  const handleSave = async () => {
    if (!pageId) {
      toast({
        title: "Error",
        description: "No page selected to save elements to",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await saveElements(pageId);
      toast({
        title: "Success",
        description: "Elements saved successfully"
      });
    } catch (error) {
      console.error('Error saving elements:', error);
      toast({
        title: "Error",
        description: "Failed to save elements",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="flex items-center justify-between px-4 h-14 border-b bg-white">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/projects')}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium">Page Builder</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <UndoRedoControls />
        <ResponsiveViewControls />
        <KeyboardShortcutsHelp />
        
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
          onClick={() => setPreviewOpen(true)}
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-1"
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
    </header>
  );
};

export default BuilderHeader;
