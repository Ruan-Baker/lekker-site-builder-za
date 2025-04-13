
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Save, 
  LayoutGrid, 
  Eye, 
  Settings, 
  Download, 
  Upload, 
  Sparkles,
  Undo,
  Redo
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useProject } from '@/contexts/ProjectContext';
import { useDesign } from '@/contexts/DesignContext';
import { useHistory } from '@/contexts/HistoryContext';
import ResponsiveViewControls from './ResponsiveViewControls';
import { useBuilder } from '@/contexts/BuilderContext';

const BuilderHeader = () => {
  const navigate = useNavigate();
  const { project, saveProject, publishProject } = useProject();
  const { isLoading: designLoading } = useDesign();
  const { canUndo, canRedo, undo, redo } = useHistory();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { elements, saveElements, loadElements, isLoading } = useBuilder();
  
  const handleSave = async () => {
    if (saving) return;
    
    try {
      setSaving(true);
      await saveProject({});
      toast({
        title: 'Success',
        description: 'Your changes have been saved'
      });
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: 'Error',
        description: 'Failed to save changes',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handlePublish = async () => {
    if (publishing) return;
    
    try {
      setPublishing(true);
      await publishProject();
      toast({
        title: 'Success',
        description: 'Your project has been published'
      });
    } catch (error) {
      console.error('Error publishing project:', error);
      toast({
        title: 'Error',
        description: 'Failed to publish project',
        variant: 'destructive'
      });
    } finally {
      setPublishing(false);
    }
  };
  
  return (
    <header className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-medium truncate max-w-[150px]">
          {project?.name || 'Loading...'}
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <ResponsiveViewControls />
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon"
            disabled={!canUndo}
            onClick={undo}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            disabled={!canRedo}
            onClick={redo}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setPreviewMode(!previewMode)}
          className={previewMode ? 'bg-blue-100 text-blue-700' : ''}
          title="Preview mode"
        >
          <Eye className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline"
          size="sm"
          disabled={saving || isLoading || designLoading}
          onClick={handleSave}
        >
          <Save className="h-4 w-4 mr-1" />
          {saving ? 'Saving...' : 'Save'}
        </Button>
        
        <Button 
          variant="default"
          size="sm"
          disabled={publishing || isLoading || designLoading}
          onClick={handlePublish}
        >
          <Sparkles className="h-4 w-4 mr-1" />
          {publishing ? 'Publishing...' : 'Publish'}
        </Button>
      </div>
    </header>
  );
};

export default BuilderHeader;
