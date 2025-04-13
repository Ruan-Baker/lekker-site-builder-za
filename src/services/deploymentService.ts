
import { supabase } from '@/integrations/supabase/client';

interface DeployOptions {
  projectId: string;
  name: string;
  target?: 'production' | 'preview' | 'development';
  repo?: string;
  branch?: string;
}

interface DomainOptions {
  projectId: string;
  domain: string;
}

interface EnvOptions {
  projectId: string;
  key: string;
  value: string;
  targets?: Array<'production' | 'preview' | 'development'>;
}

export const deploymentService = {
  /**
   * Get all Vercel projects
   */
  getVercelProjects: async () => {
    const { data, error } = await supabase.functions.invoke('vercel-integration', {
      body: { method: 'getProjects' },
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Create a new Vercel project
   */
  createVercelProject: async (name: string) => {
    const { data, error } = await supabase.functions.invoke('vercel-integration', {
      body: { method: 'createProject', data: { name } },
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Deploy a project to Vercel
   */
  deploy: async (options: DeployOptions) => {
    const { data, error } = await supabase.functions.invoke('vercel-integration', {
      body: { method: 'deploy', data: options },
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Get all domains for a project
   */
  getDomains: async (projectId: string) => {
    const { data, error } = await supabase.functions.invoke('vercel-integration', {
      body: { method: 'getDomains', data: { projectId } },
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Add a domain to a project
   */
  addDomain: async (options: DomainOptions) => {
    const { data, error } = await supabase.functions.invoke('vercel-integration', {
      body: { method: 'addDomain', data: options },
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Remove a domain from a project
   */
  removeDomain: async (options: DomainOptions) => {
    const { data, error } = await supabase.functions.invoke('vercel-integration', {
      body: { method: 'removeDomain', data: options },
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Get all environment variables for a project
   */
  getEnvironmentVariables: async (projectId: string) => {
    const { data, error } = await supabase.functions.invoke('vercel-integration', {
      body: { method: 'getEnvironmentVariables', data: { projectId } },
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Set an environment variable for a project
   */
  setEnvironmentVariable: async (options: EnvOptions) => {
    const { data, error } = await supabase.functions.invoke('vercel-integration', {
      body: { method: 'setEnvironmentVariable', data: options },
    });
    
    if (error) throw new Error(error.message);
    return data;
  },
  
  /**
   * Get deployments for a project
   */
  getDeployments: async (projectId: string) => {
    const { data, error } = await supabase.functions.invoke('vercel-integration', {
      body: { method: 'getDeployments', data: { projectId } },
    });
    
    if (error) throw new Error(error.message);
    return data;
  }
};
