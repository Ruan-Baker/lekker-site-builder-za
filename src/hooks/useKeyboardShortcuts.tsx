
import { useEffect } from 'react';
import { useHistory } from '@/contexts/HistoryContext';
import { useBuilder } from '@/contexts/BuilderContext';
import { useClipboard } from '@/hooks/useClipboard';
import { toast } from '@/hooks/use-toast';

export const useKeyboardShortcuts = () => {
  const { undo, redo, canUndo, canRedo } = useHistory();
  const { selectedElement, deleteElement, selectElement, elements, duplicateElement } = useBuilder();
  const { copySelected, paste, hasClipboardData } = useClipboard();

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

      // Undo: Ctrl/Cmd + Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey && canUndo) {
        e.preventDefault();
        undo();
        toast({
          title: "Undo",
          description: "Last action undone",
          duration: 2000,
        });
      }

      // Redo: Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z
      if (
        ((e.ctrlKey || e.metaKey) && e.key === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')
      ) {
        if (canRedo) {
          e.preventDefault();
          redo();
          toast({
            title: "Redo",
            description: "Action redone",
            duration: 2000,
          });
        }
      }

      // Delete selected element: Delete or Backspace
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElement) {
        e.preventDefault();
        deleteElement(selectedElement);
        toast({
          title: "Delete",
          description: "Element deleted",
          duration: 2000,
        });
      }
      
      // Cancel selection: Escape
      if (e.key === 'Escape' && selectedElement) {
        e.preventDefault();
        selectElement(null);
      }

      // Copy: Ctrl/Cmd + C
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && selectedElement) {
        e.preventDefault();
        copySelected();
      }

      // Paste: Ctrl/Cmd + V
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        paste();
      }

      // Duplicate: Ctrl/Cmd + D
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedElement) {
        e.preventDefault();
        duplicateElement(selectedElement);
        toast({
          title: "Duplicate",
          description: "Element duplicated",
          duration: 2000,
        });
      }

      // Select all: Ctrl/Cmd + A
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        // This would select all elements, but for now, we'll just prevent the browser behavior
        e.preventDefault();
        toast({
          title: "Select All",
          description: "Select all functionality coming soon",
          duration: 2000,
        });
      }

      // Arrow keys to nudge selected element
      if (selectedElement && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const element = elements.find(el => el.id === selectedElement);
        if (element) {
          e.preventDefault();
          
          const nudgeAmount = e.shiftKey ? 10 : 1; // Shift+Arrow for bigger movements
          let newX = element.position.x;
          let newY = element.position.y;
          
          switch (e.key) {
            case 'ArrowLeft':
              newX -= nudgeAmount;
              break;
            case 'ArrowRight':
              newX += nudgeAmount;
              break;
            case 'ArrowUp':
              newY -= nudgeAmount;
              break;
            case 'ArrowDown':
              newY += nudgeAmount;
              break;
          }
          
          // This needs an updateElement function that can handle position changes
          const { updateElement } = useBuilder();
          updateElement(selectedElement, {
            position: { ...element.position, x: newX, y: newY }
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    undo, redo, canUndo, canRedo, 
    selectedElement, deleteElement, selectElement, 
    elements, duplicateElement, copySelected, paste, 
    hasClipboardData
  ]);
};
