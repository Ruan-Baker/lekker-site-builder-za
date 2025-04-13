
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Laptop, Smartphone, Tablet, X } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';
import { useBuilder } from '@/contexts/BuilderContext';

interface PreviewModeProps {
  open: boolean;
  onClose: () => void;
  pageId: string;
}

const PreviewMode: React.FC<PreviewModeProps> = ({ open, onClose, pageId }) => {
  const { elements } = useBuilder();
  const { viewportSize, setViewportSize } = useDesign();
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  // Generate a temporary preview URL based on the current elements
  useEffect(() => {
    if (!open || !pageId) return;
    
    // In a real implementation, this would create a temporary preview URL
    setPreviewUrl(`/preview/${pageId}?timestamp=${Date.now()}`);
  }, [open, pageId]);
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] w-[1200px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Preview Mode</span>
            <div className="flex items-center gap-1 border border-gray-200 rounded-md p-0.5 bg-white">
              <Button 
                variant="ghost" 
                size="sm"
                className={`px-3 ${viewportSize === 'desktop' ? 'bg-blue-100 text-blue-600' : ''}`}
                onClick={() => setViewportSize('desktop')}
              >
                <Laptop className="h-4 w-4 mr-2" />
                Desktop
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className={`px-3 ${viewportSize === 'tablet' ? 'bg-blue-100 text-blue-600' : ''}`}
                onClick={() => setViewportSize('tablet')}
              >
                <Tablet className="h-4 w-4 mr-2" />
                Tablet
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className={`px-3 ${viewportSize === 'mobile' ? 'bg-blue-100 text-blue-600' : ''}`}
                onClick={() => setViewportSize('mobile')}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center items-start overflow-auto h-[70vh]">
          <div 
            className="bg-white overflow-hidden shadow-md transition-all"
            style={{
              width: viewportSize === 'desktop' ? '100%' : viewportSize === 'tablet' ? '768px' : '375px',
              height: '100%',
              border: '1px solid #e5e7eb'
            }}
          >
            {/* In a real implementation, this would be an iframe showing the preview */}
            <div className="p-4 h-full">
              <div className="relative" style={{ minHeight: '500px' }}>
                {elements.map((element) => {
                  // Apply responsive styles based on viewport
                  const responsive = element.properties.responsive || {
                    desktop: {}, tablet: {}, mobile: {}
                  };
                  
                  const currentViewport = responsive[viewportSize] || {};
                  const isVisible = currentViewport.isVisible !== false;
                  
                  if (!isVisible) return null;
                  
                  return (
                    <div
                      key={element.id}
                      className="absolute p-4 rounded-md bg-white border border-gray-200"
                      style={{
                        left: `${element.position.x}px`,
                        top: `${element.position.y}px`,
                        width: currentViewport.width || `${element.position.width}px`,
                        height: currentViewport.height || `${element.position.height}px`,
                        margin: currentViewport.margin || '',
                        padding: currentViewport.padding || '',
                        fontSize: currentViewport.fontSize || '',
                        textAlign: currentViewport.textAlign || 'left',
                      }}
                    >
                      {element.properties.content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>
            Close Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewMode;
