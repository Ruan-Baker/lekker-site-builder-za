
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ChevronLeft, Settings, Rocket } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VercelIntegration from '@/components/deployment/VercelIntegration';
import DeploymentManager from '@/components/deployment/DeploymentManager';

interface ProjectData {
  id: string;
  name: string;
  description: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  published_url: string;
  thumbnail_url: string;
  vercel_project_id?: string;
}

const Deployment = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  const [project, setProject] = useState<ProjectData | null>(null);
  const [vercelProjectId, setVercelProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Redirect if user is not logged in
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);
  
  useEffect(() => {
    if (projectId && user) {
      fetchProject();
    }
  }, [projectId, user]);
  
  const fetchProject = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
        
      if (error) throw error;
      
      const projectData = data as ProjectData;
      setProject(projectData);
      
      // Check if project has vercel_project_id
      if (projectData.vercel_project_id) {
        setVercelProjectId(projectData.vercel_project_id);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConnectVercel = async (newVercelProjectId: string) => {
    try {
      setIsLoading(true);
      
      // Update the project with the Vercel project ID
      const { error } = await supabase
        .from('projects')
        .update({ vercel_project_id: newVercelProjectId })
        .eq('id', projectId);
        
      if (error) throw error;
      
      setVercelProjectId(newVercelProjectId);
      
      // Re-fetch the project
      fetchProject();
    } catch (error) {
      console.error('Error connecting to Vercel:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (loading || isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4 text-lg">Project not found</p>
        <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16 border-b border-gray-200 flex items-center px-4 bg-white">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/builder/${projectId}`)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="ml-2">
          <h1 className="text-lg font-medium">{project.name}</h1>
          <p className="text-xs text-gray-500">Deployment settings</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        {vercelProjectId ? (
          <Tabs defaultValue="deployments">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold flex items-center">
                  <Rocket className="mr-2 h-6 w-6" />
                  Deployment Dashboard
                </h2>
                <p className="text-gray-500">
                  Manage your website deployment on Vercel
                </p>
              </div>
              <TabsList>
                <TabsTrigger value="deployments">Deployments</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="deployments" className="space-y-8">
              <DeploymentManager projectId={vercelProjectId} />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Deployment Settings
                </h3>
                <p className="text-gray-500 text-sm">
                  Manage your Vercel project connection
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Connected Vercel Project</p>
                    <p className="text-sm text-gray-500">ID: {vercelProjectId}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setVercelProjectId(null)}
                  >
                    Change Project
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Connect to Vercel</h2>
              <p className="text-gray-500">
                Link your project with Vercel to deploy your website
              </p>
            </div>
            
            <VercelIntegration 
              projectId={projectId || ''} 
              onConnect={handleConnectVercel} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Deployment;
