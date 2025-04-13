
import { useEffect, useState } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { ElementData } from '@/contexts/BuilderContext';
import { toast } from '@/hooks/use-toast';

export const useClipboard = () => {
  const { selectedElement, elements, addElement } = useBuilder();
  const [clipboardData, setClipboardData] = useState<Omit<ElementData, 'id'> | null>(null);

  // Copy function
  const copySelected = () => {
    if (!selectedElement) {
      toast({
        title: "No element selected",
        description: "Please select an element to copy",
        variant: "default"
      });
      return;
    }

    const elementToCopy = elements.find(el => el.id === selectedElement);
    if (elementToCopy) {
      // Create a copy without the id (will be generated on paste)
      const { id, ...elementWithoutId } = elementToCopy;
      setClipboardData(elementWithoutId);
      
      toast({
        title: "Copied",
        description: `Copied ${elementToCopy.type} element to clipboard`,
      });
    }
  };

  // Paste function
  const paste = () => {
    if (!clipboardData) {
      toast({
        title: "Clipboard empty",
        description: "Copy an element before pasting",
        variant: "default"
      });
      return;
    }

    // Slightly offset position to make the pasted element visible
    const newPosition = {
      ...clipboardData.position,
      x: clipboardData.position.x + 20,
      y: clipboardData.position.y + 20
    };

    addElement({
      ...clipboardData,
      position: newPosition
    });
    
    toast({
      title: "Pasted",
      description: `Pasted ${clipboardData.type} element`,
    });
  };

  // Set up keyboard shortcuts for copy/paste
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if focusing on an input, textarea, etc.
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Copy: Ctrl/Cmd + C
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        copySelected();
      }

      // Paste: Ctrl/Cmd + V
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        paste();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedElement, clipboardData]);

  return { copySelected, paste, hasClipboardData: !!clipboardData };
};
