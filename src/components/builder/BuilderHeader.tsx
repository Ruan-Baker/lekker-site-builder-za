
import React from 'react';
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
  Menu
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

const BuilderHeader = () => {
  const navigate = useNavigate();
  const { canSave, saveState } = useHistory();
  
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/projects')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center">
            <h1 className="font-semibold text-xl">Builder</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Project Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileCode className="mr-2 h-4 w-4" />
                  Export Code
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Tabs defaultValue="design">
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
          <ResponsiveViewControls />
          
          <UndoRedoControls />
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={() => {}}
          >
            <Eye className="mr-1 h-4 w-4" />
            Preview
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            <Upload className="mr-1 h-4 w-4" />
            Publish
          </Button>
          
          <Button
            variant="default"
            size="sm"
            className="flex items-center"
            onClick={saveState}
            disabled={!canSave}
          >
            <Save className="mr-1 h-4 w-4" />
            Save
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
