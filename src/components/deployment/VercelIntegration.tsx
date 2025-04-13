
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Rocket, Link as LinkIcon } from 'lucide-react';
import { deploymentService } from '@/services/deploymentService';
import { toast } from '@/hooks/use-toast';

interface VercelIntegrationProps {
  projectId: string;
  onConnect: (vercelProjectId: string) => void;
}

export default function VercelIntegration({ projectId, onConnect }: VercelIntegrationProps) {
  const [vercelProjects, setVercelProjects] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  
  const fetchVercelProjects = async () => {
    try {
      setLoading(true);
      const data = await deploymentService.getVercelProjects();
      setVercelProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to fetch Vercel projects:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch Vercel projects',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateProject = async () => {
    if (!newProjectName) return;
    
    try {
      setLoading(true);
      const result = await deploymentService.createVercelProject(newProjectName);
      if (result.id) {
        toast({
          title: 'Success',
          description: `Project ${newProjectName} created successfully on Vercel`,
        });
        onConnect(result.id);
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error('Failed to create Vercel project:', error);
      toast({
        title: 'Error',
        description: 'Failed to create Vercel project',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Rocket className="mr-2 h-5 w-5" />
          Connect to Vercel
        </CardTitle>
        <CardDescription>
          Deploy your website easily with Vercel integration
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!showCreateForm ? (
          <div className="space-y-6">
            <div className="rounded-lg border p-6 flex flex-col items-center text-center">
              <Rocket className="h-12 w-12 mb-4 text-blue-500" />
              <h3 className="font-semibold text-lg mb-2">Deploy with Vercel</h3>
              <p className="text-sm text-gray-500 mb-4">
                Link your project with Vercel for one-click deployments, custom domains, 
                and automatic updates whenever you make changes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button 
                  onClick={() => setShowCreateForm(true)} 
                  className="flex-1"
                >
                  Create New Project
                </Button>
                <Button 
                  variant="outline" 
                  onClick={fetchVercelProjects}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Loading...' : 'Use Existing Project'}
                </Button>
              </div>
            </div>
            
            {vercelProjects.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Select a Vercel project</h3>
                <div className="grid gap-2">
                  {vercelProjects.map((project: any) => (
                    <div 
                      key={project.id} 
                      className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => onConnect(project.id)}
                    >
                      <div className="flex items-center">
                        {project.framework === 'react' ? (
                          <div className="w-6 h-6 mr-2 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">R</div>
                        ) : (
                          <div className="w-6 h-6 mr-2 rounded-full bg-gray-100" />
                        )}
                        <span>{project.name}</span>
                      </div>
                      <LinkIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="my-awesome-site"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="github-repo">
                  <div className="flex items-center">
                    <GitHubLogoIcon className="h-4 w-4 mr-1" />
                    GitHub Repository (Optional)
                  </div>
                </Label>
                <Input
                  id="github-repo"
                  placeholder="username/repository"
                  value={githubRepo}
                  onChange={(e) => setGithubRepo(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Link to a GitHub repository to enable automatic deployments
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateProject}
                disabled={!newProjectName || loading}
              >
                {loading ? 'Creating...' : 'Create Project'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
