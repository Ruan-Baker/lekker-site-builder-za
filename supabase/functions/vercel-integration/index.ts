
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Handle CORS preflight requests
const handleCors = (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    })
  }
}

serve(async (req) => {
  // Handle CORS
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    const { method } = req.url.split('/').pop() || 'getProjects'
    const { data } = await req.json()
    
    // Get Vercel API token from env
    const VERCEL_API_TOKEN = Deno.env.get('VERCEL_API_TOKEN')
    if (!VERCEL_API_TOKEN) {
      throw new Error('Missing Vercel API token')
    }

    // Base headers for all requests
    const headers = {
      'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
      'Content-Type': 'application/json',
    }

    // Handle different API methods
    let result
    switch (method) {
      case 'getProjects':
        result = await fetch('https://api.vercel.com/v9/projects', {
          headers,
        })
        break
        
      case 'createProject':
        result = await fetch('https://api.vercel.com/v9/projects', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: data.name,
            framework: 'react',
          }),
        })
        break
        
      case 'deploy':
        // Get deployment URL and settings
        const deployUrl = `https://api.vercel.com/v13/deployments`
        result = await fetch(deployUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: data.name,
            projectId: data.projectId,
            target: data.target || 'production',
            gitSource: {
              type: 'github',
              repo: data.repo,
              ref: data.branch || 'main',
            }
          }),
        })
        break
        
      case 'getDomains':
        result = await fetch(`https://api.vercel.com/v9/projects/${data.projectId}/domains`, {
          headers,
        })
        break
        
      case 'addDomain':
        result = await fetch(`https://api.vercel.com/v9/projects/${data.projectId}/domains`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: data.domain,
          }),
        })
        break
        
      case 'removeDomain':
        result = await fetch(`https://api.vercel.com/v9/projects/${data.projectId}/domains/${data.domain}`, {
          method: 'DELETE',
          headers,
        })
        break
        
      case 'getEnvironmentVariables':
        result = await fetch(`https://api.vercel.com/v9/projects/${data.projectId}/env`, {
          headers,
        })
        break
        
      case 'setEnvironmentVariable':
        result = await fetch(`https://api.vercel.com/v9/projects/${data.projectId}/env`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            key: data.key,
            value: data.value,
            target: data.targets || ['production', 'preview', 'development'],
            type: 'plain',
          }),
        })
        break
        
      case 'getDeployments':
        result = await fetch(`https://api.vercel.com/v6/deployments?projectId=${data.projectId}&limit=20`, {
          headers,
        })
        break
        
      default:
        throw new Error(`Unknown method: ${method}`)
    }

    // Return the response from Vercel API
    const response = await result.json()
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: result.status,
    })
  } catch (error) {
    console.error('Error in Vercel integration:', error.message)
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
