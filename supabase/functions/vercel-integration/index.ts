
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
    const body = await req.json()
    const { method, data } = body
    
    // Get Vercel API token from env
    const VERCEL_API_TOKEN = Deno.env.get('VERCEL_API_TOKEN')
    if (!VERCEL_API_TOKEN) {
      throw new Error('Missing Vercel API token')
    }

    console.log(`Processing Vercel API request: ${method}`)

    // Base headers for all requests
    const headers = {
      'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
      'Content-Type': 'application/json',
    }

    // Handle different API methods
    let result
    switch (method) {
      case 'getProjects':
        console.log('Fetching Vercel projects')
        result = await fetch('https://api.vercel.com/v9/projects', {
          headers,
        })
        break
        
      case 'createProject':
        console.log('Creating Vercel project:', data.name)
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
        console.log('Deploying project:', data.name)
        const deployUrl = `https://api.vercel.com/v13/deployments`
        result = await fetch(deployUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: data.name,
            projectId: data.projectId,
            target: data.target || 'production',
            gitSource: data.repo ? {
              type: 'github',
              repo: data.repo,
              ref: data.branch || 'main',
            } : undefined
          }),
        })
        break
        
      case 'getDomains':
        console.log('Getting domains for project:', data.projectId)
        result = await fetch(`https://api.vercel.com/v9/projects/${data.projectId}/domains`, {
          headers,
        })
        break
        
      case 'addDomain':
        console.log('Adding domain:', data.domain)
        result = await fetch(`https://api.vercel.com/v9/projects/${data.projectId}/domains`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: data.domain,
          }),
        })
        break
        
      case 'removeDomain':
        console.log('Removing domain:', data.domain)
        result = await fetch(`https://api.vercel.com/v9/projects/${data.projectId}/domains/${data.domain}`, {
          method: 'DELETE',
          headers,
        })
        break
        
      case 'getEnvironmentVariables':
        console.log('Getting environment variables for project:', data.projectId)
        result = await fetch(`https://api.vercel.com/v9/projects/${data.projectId}/env`, {
          headers,
        })
        break
        
      case 'setEnvironmentVariable':
        console.log('Setting environment variable:', data.key)
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
        console.log('Getting deployments for project:', data.projectId)
        result = await fetch(`https://api.vercel.com/v6/deployments?projectId=${data.projectId}&limit=20`, {
          headers,
        })
        break
        
      default:
        throw new Error(`Unknown method: ${method}`)
    }

    // Check if the result is valid
    if (!result) {
      throw new Error(`Failed to get response from Vercel API for method: ${method}`)
    }

    // Parse the response
    const responseText = await result.text()
    let responseData
    
    try {
      responseData = JSON.parse(responseText)
    } catch (e) {
      console.error('Error parsing Vercel API response:', e)
      responseData = { error: 'Failed to parse Vercel API response', raw: responseText }
    }
    
    // Return the response from Vercel API
    return new Response(JSON.stringify(responseData), {
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
