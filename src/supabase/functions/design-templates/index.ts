
// Follow Deno Edge Function documentation
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0';

// Define the theme template structure
interface ThemeTemplate {
  id: string;
  name: string;
  typography_settings: any;
  color_palette: any;
  spacing_settings: any;
  responsive_settings?: any;
  animations?: any;
  custom_css?: string;
  preview_image?: string;
  category: string;
  tags?: string[];
}

serve(async (req) => {
  try {
    // Create a Supabase client with the Auth context of the logged in user
    const authorization = req.headers.get('Authorization');
    if (!authorization) {
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the access token from the Authorization header
    const token = authorization.replace('Bearer ', '');

    // Create a supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );
    
    // Get the user by validating the token
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    // Handle different API paths
    if (path === 'list') {
      // List all available design templates
      const { data, error } = await supabaseClient
        .from('design_templates')
        .select('*');
      
      if (error) {
        console.error('Error fetching templates:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ templates: data }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } 
    else if (path === 'apply' && req.method === 'POST') {
      // Apply a template to a project
      const { projectId, templateId } = await req.json();
      
      if (!projectId || !templateId) {
        return new Response(
          JSON.stringify({ error: 'Missing required parameters' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Fetch the template
      const { data: template, error: templateError } = await supabaseClient
        .from('design_templates')
        .select('*')
        .eq('id', templateId)
        .single();
        
      if (templateError || !template) {
        return new Response(
          JSON.stringify({ error: 'Template not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Update the project's design settings
      const { error: updateError } = await supabaseClient
        .from('design_settings')
        .update({
          typography_settings: template.typography_settings,
          color_palette: template.color_palette,
          spacing_settings: template.spacing_settings,
          responsive_settings: template.responsive_settings,
          animations: template.animations,
          custom_css: template.custom_css,
          theme: template.id
        })
        .eq('project_id', projectId);
        
      if (updateError) {
        return new Response(
          JSON.stringify({ error: updateError.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ success: true, message: 'Template applied successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Default response for unsupported endpoints
    return new Response(
      JSON.stringify({ error: 'Endpoint not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
