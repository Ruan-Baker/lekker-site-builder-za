
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Save, 
  Play, 
  Upload, 
  ArrowLeft, 
  Settings, 
  ChevronDown,
  Eye,
  Code,
  Palette,
  FileCode,
  Laptop,
  Phone,
  Tablet,
  Menu,
  Home
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useHistory } from '@/contexts/HistoryContext';
import { useNavigate } from 'react-router-dom';
import UndoRedoControls from './UndoRedoControls';
import ResponsiveViewControls from './ResponsiveViewControls';
import { toast } from '@/hooks/use-toast';

interface BuilderHeaderProps {
  projectName?: string;
}

const BuilderHeader: React.FC<BuilderHeaderProps> = ({ projectName = 'Untitled Project' }) => {
  const navigate = useNavigate();
  const { canSave, saveState } = useHistory();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    if (!canSave) return;
    
    setIsSaving(true);
    try {
      await saveState();
      toast({
        title: "Saved",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving state:', error);
      toast({
        title: "Error",
        description: "Failed to save changes.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handlePreview = () => {
    toast({
      title: "Preview",
      description: "Preview functionality is coming soon.",
    });
  };
  
  const handlePublish = () => {
    toast({
      title: "Publish",
      description: "Publishing functionality is coming soon.",
    });
  };
  
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/dashboard')}
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center">
            <h1 className="font-semibold text-xl truncate max-w-[180px]">{projectName}</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-lg">
                <DropdownMenuItem className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Project Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center">
                  <FileCode className="mr-2 h-4 w-4" />
                  Export Code
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center" onClick={() => navigate('/dashboard')}>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Tabs defaultValue="design" className="hidden md:block">
            <TabsList>
              <TabsTrigger value="design" className="flex items-center">
                <Palette className="mr-1 h-4 w-4" />
                Design
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center">
                <Code className="mr-1 h-4 w-4" />
                Code
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <ResponsiveViewControls />
          </div>
          
          <div className="hidden md:block">
            <UndoRedoControls />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={handlePreview}
          >
            <Eye className="mr-1 h-4 w-4" />
            <span className="hidden sm:inline">Preview</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={handlePublish}
          >
            <Upload className="mr-1 h-4 w-4" />
            <span className="hidden sm:inline">Publish</span>
          </Button>
          
          <Button
            variant={canSave ? "default" : "outline"}
            size="sm"
            className="flex items-center"
            onClick={handleSave}
            disabled={!canSave || isSaving}
          >
            <Save className={`mr-1 h-4 w-4 ${isSaving ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default BuilderHeader;
