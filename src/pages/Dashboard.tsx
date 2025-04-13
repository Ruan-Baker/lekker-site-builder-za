import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, FileEdit, Trash2, ExternalLink, Power, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import NewProjectDialog from '@/components/dashboard/NewProjectDialog';
import { ProjectProvider } from '@/contexts/ProjectContext';

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  published_url: string | null;
  thumbnail_url: string | null;
  project_type?: string;
}

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your projects',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [user]);
  
  const deleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);
        
      if (error) {
        throw error;
      }
      
      setProjects(projects.filter(project => project.id !== projectId));
      
      toast({
        title: 'Success',
        description: 'Project deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive'
      });
    }
  };
  
  const getProjectTypeIcon = (projectType?: string) => {
    if (projectType === 'funnel') {
      return <span className="inline-block h-2 w-2 rounded-full bg-purple-500 mr-2"></span>;
    }
    return <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mr-2"></span>;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
              <span className="text-blue-700">Lekker</span><span className="text-blue-500">Sites</span>
            </h1>
          </div>
          
          {profile && (
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 flex items-center gap-1"
                onClick={() => navigate('/profile')}
              >
                <User size={16} />
                Profile
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 flex items-center gap-1"
                onClick={signOut}
              >
                <Power size={16} />
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Projects</h2>
          <Button 
            onClick={() => setDialogOpen(true)} 
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            <PlusCircle size={16} />
            New Project
          </Button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse rounded-xl overflow-hidden shadow-md">
                <div className="h-40 bg-gray-100"></div>
                <CardContent className="pt-4">
                  <div className="h-5 bg-gray-100 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Card key={project.id} className="overflow-hidden rounded-xl shadow-md">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  {project.thumbnail_url ? (
                    <img 
                      src={project.thumbnail_url} 
                      alt={project.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400">No preview</div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{project.name}</CardTitle>
                  {project.description && (
                    <CardDescription>{project.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date(project.updated_at).toLocaleDateString()}
                  </p>
                  <div className="flex items-center mt-2">
                    {project.project_type && (
                      <div className="flex items-center mr-4">
                        {getProjectTypeIcon(project.project_type)}
                        <span className="text-sm">{project.project_type === 'funnel' ? 'Funnel' : 'Website'}</span>
                      </div>
                    )}
                    {project.is_published && (
                      <div className="flex items-center">
                        <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        <span className="text-sm text-green-600">Published</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/builder/${project.id}`)}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <FileEdit size={14} />
                    Edit
                  </Button>
                  <div className="flex gap-2">
                    {project.published_url && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1 rounded-md"
                        onClick={() => window.open(project.published_url!, '_blank')}
                      >
                        <ExternalLink size={14} />
                        View
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1 rounded-md"
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="rounded-xl shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <PlusCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create your first project</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Start building your website by creating a new project
              </p>
              <Button 
                onClick={() => setDialogOpen(true)} 
                className="bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Create Project
              </Button>
            </CardContent>
          </Card>
        )}
        
        <ProjectProvider>
          <NewProjectDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </ProjectProvider>
      </div>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} LekkerSites. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
