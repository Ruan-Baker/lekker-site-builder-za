
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
    try {
      const { data, error } = await supabase.functions.invoke('vercel-integration', {
        body: { method: 'getProjects' },
      });
      
      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.error('Error getting Vercel projects:', err);
      throw err;
    }
  },
  
  /**
   * Create a new Vercel project
   */
  createVercelProject: async (name: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('vercel-integration', {
        body: { method: 'createProject', data: { name } },
      });
      
      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.error('Error creating Vercel project:', err);
      throw err;
    }
  },
  
  /**
   * Deploy a project to Vercel
   */
  deploy: async (options: DeployOptions) => {
    try {
      const { data, error } = await supabase.functions.invoke('vercel-integration', {
        body: { method: 'deploy', data: options },
      });
      
      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.error('Error deploying project:', err);
      throw err;
    }
  },
  
  /**
   * Get all domains for a project
   */
  getDomains: async (projectId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('vercel-integration', {
        body: { method: 'getDomains', data: { projectId } },
      });
      
      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.error('Error getting domains:', err);
      throw err;
    }
  },
  
  /**
   * Add a domain to a project
   */
  addDomain: async (options: DomainOptions) => {
    try {
      const { data, error } = await supabase.functions.invoke('vercel-integration', {
        body: { method: 'addDomain', data: options },
      });
      
      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.error('Error adding domain:', err);
      throw err;
    }
  },
  
  /**
   * Remove a domain from a project
   */
  removeDomain: async (options: DomainOptions) => {
    try {
      const { data, error } = await supabase.functions.invoke('vercel-integration', {
        body: { method: 'removeDomain', data: options },
      });
      
      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.error('Error removing domain:', err);
      throw err;
    }
  },
  
  /**
   * Get all environment variables for a project
   */
  getEnvironmentVariables: async (projectId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('vercel-integration', {
        body: { method: 'getEnvironmentVariables', data: { projectId } },
      });
      
      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.error('Error getting environment variables:', err);
      throw err;
    }
  },
  
  /**
   * Set an environment variable for a project
   */
  setEnvironmentVariable: async (options: EnvOptions) => {
    try {
      const { data, error } = await supabase.functions.invoke('vercel-integration', {
        body: { method: 'setEnvironmentVariable', data: options },
      });
      
      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.error('Error setting environment variable:', err);
      throw err;
    }
  },
  
  /**
   * Get deployments for a project
   */
  getDeployments: async (projectId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('vercel-integration', {
        body: { method: 'getDeployments', data: { projectId } },
      });
      
      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.error('Error getting deployments:', err);
      throw err;
    }
  }
};
