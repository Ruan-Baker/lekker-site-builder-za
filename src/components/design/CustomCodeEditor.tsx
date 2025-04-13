
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useDesign } from '@/contexts/DesignContext';
import { AlertCircle, Check, Code, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CustomCodeEditorProps {
  projectId: string;
}

const CustomCodeEditor: React.FC<CustomCodeEditorProps> = ({ projectId }) => {
  const { designSettings, setCustomCSS } = useDesign();
  const [cssCode, setCssCode] = useState(designSettings?.custom_css || '');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSave = async () => {
    try {
      await setCustomCSS(cssCode);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setError(null);
    } catch (err) {
      setError('Failed to save custom code');
    }
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Code className="h-5 w-5" />
            Custom Code Injection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="css">
            <TabsList className="mb-4">
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="html" disabled>HTML (Coming soon)</TabsTrigger>
              <TabsTrigger value="js" disabled>JavaScript (Coming soon)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="css" className="space-y-4">
              <div className="bg-black/90 rounded-md p-2">
                <textarea
                  className="w-full min-h-[300px] bg-transparent text-green-400 p-2 font-mono text-sm focus:outline-none resize-y"
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  placeholder="/* Add your custom CSS here */
:root {
  --custom-color: #ff6b6b;
}

.my-custom-class {
  color: var(--custom-color);
}"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  This code will be applied globally
                </div>
                <Button onClick={handleSave} disabled={showSuccess} className="gap-1">
                  {showSuccess ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                  {showSuccess ? 'Saved' : 'Save Changes'}
                </Button>
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="bg-muted/50 rounded p-4 text-sm">
                <h3 className="font-medium mb-2">Custom CSS Tips:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Use <code className="text-primary">.section-*</code> classes to style specific sections</li>
                  <li>Override Tailwind utilities with <code className="text-primary">!important</code> if needed</li>
                  <li>Use custom properties with <code className="text-primary">:root</code> for reusable values</li>
                  <li>Test your CSS in a browser console first for best results</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomCodeEditor;
