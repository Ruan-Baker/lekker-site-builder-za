
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from '@/components/ui/tabs';
import {
  AlertCircle,
  Check,
  Clock,
  CloudOff,
  ExternalLink,
  GitBranch,
  Globe,
  RefreshCw,
  Rocket,
  Settings,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { deploymentService } from '@/services/deploymentService';

// Define type for deployment status
type DeploymentStatus = 'READY' | 'BUILDING' | 'ERROR' | 'CANCELED' | 'QUEUED';

interface Deployment {
  id: string;
  name: string;
  url: string;
  created: number;
  state: DeploymentStatus;
  target: string;
  meta: {
    githubCommitRef?: string;
  };
}

interface Environment {
  id: string;
  key: string;
  value: string;
  target: string[];
  gitBranch: string | null;
  type: string;
  createdAt: number;
}

interface Domain {
  id: string;
  name: string;
  verified: boolean;
  error?: {
    code: string;
    message: string;
  };
}

interface DeploymentManagerProps {
  projectId: string;
}

export default function DeploymentManager({ projectId }: DeploymentManagerProps) {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newDomain, setNewDomain] = useState('');
  const [newEnvKey, setNewEnvKey] = useState('');
  const [newEnvValue, setNewEnvValue] = useState('');
  
  const fetchDeployments = async () => {
    try {
      setIsLoading(true);
      const data = await deploymentService.getDeployments(projectId);
      setDeployments(data.deployments || []);
    } catch (error) {
      console.error('Error fetching deployments:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch deployments',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchDomains = async () => {
    try {
      setIsLoading(true);
      const data = await deploymentService.getDomains(projectId);
      setDomains(data.domains || []);
    } catch (error) {
      console.error('Error fetching domains:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch domains',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchEnvironments = async () => {
    try {
      setIsLoading(true);
      const data = await deploymentService.getEnvironmentVariables(projectId);
      setEnvironments(data.envs || []);
    } catch (error) {
      console.error('Error fetching environment variables:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch environment variables',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (projectId) {
      fetchDeployments();
      fetchDomains();
      fetchEnvironments();
    }
  }, [projectId]);
  
  const handleDeploy = async () => {
    try {
      setIsLoading(true);
      await deploymentService.deploy({
        projectId,
        name: 'Manual deployment',
        target: 'production',
      });
      
      toast({
        title: 'Success',
        description: 'Deployment initiated successfully',
      });
      
      // Refresh deployments after a short delay
      setTimeout(() => {
        fetchDeployments();
      }, 2000);
    } catch (error) {
      console.error('Error deploying:', error);
      toast({
        title: 'Error',
        description: 'Failed to deploy project',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddDomain = async () => {
    if (!newDomain) return;
    
    try {
      setIsLoading(true);
      await deploymentService.addDomain({
        projectId,
        domain: newDomain,
      });
      
      toast({
        title: 'Success',
        description: `Domain ${newDomain} added successfully`,
      });
      
      setNewDomain('');
      fetchDomains();
    } catch (error) {
      console.error('Error adding domain:', error);
      toast({
        title: 'Error',
        description: 'Failed to add domain',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRemoveDomain = async (domain: string) => {
    try {
      setIsLoading(true);
      await deploymentService.removeDomain({
        projectId,
        domain,
      });
      
      toast({
        title: 'Success',
        description: `Domain ${domain} removed successfully`,
      });
      
      fetchDomains();
    } catch (error) {
      console.error('Error removing domain:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove domain',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddEnvironmentVariable = async () => {
    if (!newEnvKey || !newEnvValue) return;
    
    try {
      setIsLoading(true);
      await deploymentService.setEnvironmentVariable({
        projectId,
        key: newEnvKey,
        value: newEnvValue,
      });
      
      toast({
        title: 'Success',
        description: `Environment variable ${newEnvKey} added successfully`,
      });
      
      setNewEnvKey('');
      setNewEnvValue('');
      fetchEnvironments();
    } catch (error) {
      console.error('Error adding environment variable:', error);
      toast({
        title: 'Error',
        description: 'Failed to add environment variable',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStatusBadge = (status: DeploymentStatus) => {
    switch (status) {
      case 'READY':
        return <Badge className="bg-green-500"><Check className="w-3 h-3 mr-1" /> Live</Badge>;
      case 'BUILDING':
        return <Badge className="bg-yellow-500"><RefreshCw className="w-3 h-3 mr-1 animate-spin" /> Building</Badge>;
      case 'ERROR':
        return <Badge className="bg-red-500"><AlertCircle className="w-3 h-3 mr-1" /> Error</Badge>;
      case 'CANCELED':
        return <Badge className="bg-gray-500"><X className="w-3 h-3 mr-1" /> Canceled</Badge>;
      case 'QUEUED':
        return <Badge className="bg-blue-500"><Clock className="w-3 h-3 mr-1" /> Queued</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Rocket className="mr-2 h-5 w-5" />
          Deployment Manager
        </CardTitle>
        <CardDescription>
          Deploy and manage your website on Vercel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="deployments">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="domains">Domains</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deployments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Recent Deployments</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchDeployments}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleDeploy}
                  disabled={isLoading}
                >
                  <Rocket className="h-4 w-4 mr-1" />
                  Deploy
                </Button>
              </div>
            </div>
            
            {deployments.length > 0 ? (
              <div className="space-y-4">
                {deployments.map(deployment => (
                  <Card key={deployment.id} className="overflow-hidden">
                    <div className="p-4 flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          {getStatusBadge(deployment.state)}
                          <span className="ml-2 font-medium">{deployment.name || 'Deployment'}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {new Date(deployment.created).toLocaleString()}
                        </div>
                        {deployment.meta?.githubCommitRef && (
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <GitBranch className="h-3 w-3 mr-1" />
                            {deployment.meta.githubCommitRef}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        {deployment.url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={`https://${deployment.url}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Visit
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8">
                <CloudOff className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">No deployments yet</h3>
                <p className="text-sm text-gray-500">
                  Deploy your project to see deployment history
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="domains" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Custom Domains</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchDomains}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            
            <div className="flex gap-2 items-end">
              <div className="flex-1 space-y-1">
                <Label htmlFor="domain">Add Domain</Label>
                <Input
                  id="domain"
                  placeholder="mydomain.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleAddDomain}
                disabled={!newDomain || isLoading}
              >
                Add Domain
              </Button>
            </div>
            
            {domains.length > 0 ? (
              <div className="space-y-2">
                {domains.map(domain => (
                  <div 
                    key={domain.id} 
                    className="flex justify-between items-center p-3 border rounded-md"
                  >
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{domain.name}</span>
                      {domain.verified ? (
                        <Badge className="ml-2 bg-green-500">Verified</Badge>
                      ) : (
                        <Badge className="ml-2 bg-yellow-500">Pending verification</Badge>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveDomain(domain.name)}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 border rounded-md bg-gray-50">
                <Globe className="h-8 w-8 mx-auto text-gray-400" />
                <h3 className="mt-2 font-medium">No custom domains</h3>
                <p className="text-sm text-gray-500">
                  Add a custom domain to make your site accessible at your own URL
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="environment" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Environment Variables</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchEnvironments}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-2 items-end">
                <div className="space-y-1">
                  <Label htmlFor="env-key">Key</Label>
                  <Input
                    id="env-key"
                    placeholder="API_KEY"
                    value={newEnvKey}
                    onChange={(e) => setNewEnvKey(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="env-value">Value</Label>
                  <Input
                    id="env-value"
                    placeholder="secret_value"
                    type="password"
                    value={newEnvValue}
                    onChange={(e) => setNewEnvValue(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleAddEnvironmentVariable}
                disabled={!newEnvKey || !newEnvValue || isLoading}
                className="w-full"
              >
                Add Environment Variable
              </Button>
            </div>
            
            <Separator />
            
            {environments.length > 0 ? (
              <div className="space-y-2 mt-4">
                {environments.map(env => (
                  <div 
                    key={env.id} 
                    className="flex justify-between items-center p-3 border rounded-md"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{env.key}</div>
                      <div className="text-xs text-gray-500">
                        {env.target.join(', ')}
                        {env.gitBranch && ` • ${env.gitBranch}`}
                      </div>
                    </div>
                    <Badge>{env.type === 'secret' ? 'Secret' : 'Plain'}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <Alert>
                <Settings className="h-4 w-4" />
                <AlertTitle>No environment variables</AlertTitle>
                <AlertDescription>
                  Add environment variables to configure your project
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
