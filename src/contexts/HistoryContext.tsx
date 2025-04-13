
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useBuilder } from '@/contexts/BuilderContext';
import { toast } from '@/hooks/use-toast';
import { ElementData } from '@/contexts/BuilderContext';

interface HistoryState {
  elements: ElementData[];
  timestamp: number;
  id: string;
}

interface HistoryContextType {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  saveSnapshot: () => void;
  snapshotCount: number;
}

interface HistoryRecord {
  id: string;
  page_id: string;
  user_id: string;
  elements: any; // Changed from ElementData[] to any to match Supabase JSON type
  created_at: string;
  metadata: any;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{
  children: React.ReactNode;
  projectId: string;
  pageId?: string;
}> = ({ children, projectId, pageId }) => {
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const { elements, setElements } = useBuilder();
  const { user } = useAuth();
  
  // Load history from Supabase when the page changes
  useEffect(() => {
    if (!pageId || !user) return;
    
    const loadHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('history')
          .select('*')
          .eq('page_id', pageId)
          .order('created_at', { ascending: true }) as { data: HistoryRecord[] | null, error: any };
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          const formattedHistory = data.map(item => ({
            elements: item.elements as ElementData[],
            timestamp: new Date(item.created_at).getTime(),
            id: item.id
          }));
          
          setHistory(formattedHistory);
          setCurrentIndex(formattedHistory.length - 1);
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };
    
    loadHistory();
  }, [pageId, user]);
  
  // Save a snapshot of the current state
  const saveSnapshot = useCallback(async () => {
    if (!pageId || !user || !elements.length) return;
    
    try {
      // Create snapshot in database - convert ElementData[] to a JSON-compatible format
      const { data, error } = await supabase
        .from('history')
        .insert({
          page_id: pageId,
          elements: JSON.parse(JSON.stringify(elements)), // Ensures JSON compatibility
          user_id: user.id,
        })
        .select() as { data: HistoryRecord[] | null, error: any };
        
      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error('Failed to create history record');
      }

      // Create new history item
      const newHistoryItem: HistoryState = {
        elements: elements,
        timestamp: new Date().getTime(),
        id: data[0].id
      };
      
      // Remove any forward history if we're not at the most recent state
      const newHistory = history.slice(0, currentIndex + 1).concat(newHistoryItem);
      
      // Limit history to 50 items
      const limitedHistory = newHistory.slice(Math.max(0, newHistory.length - 50));
      
      setHistory(limitedHistory);
      setCurrentIndex(limitedHistory.length - 1);
      
      // Clean up old history items if over limit
      if (newHistory.length > 50) {
        const idsToDelete = newHistory.slice(0, newHistory.length - 50).map(item => item.id);
        
        await supabase
          .from('history')
          .delete()
          .in('id', idsToDelete);
      }
    } catch (error) {
      console.error('Error saving snapshot:', error);
    }
  }, [elements, history, currentIndex, pageId, user]);
  
  // Auto-save snapshot when elements change (debounced)
  useEffect(() => {
    if (!elements.length) return;
    
    const timer = setTimeout(() => {
      saveSnapshot();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [elements, saveSnapshot]);
  
  const undo = useCallback(() => {
    if (currentIndex <= 0) return;
    
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    
    const previousState = history[newIndex];
    if (previousState) {
      setElements(previousState.elements);
      
      toast({
        title: 'Undo',
        description: `Reverted to previous state (${new Date(previousState.timestamp).toLocaleTimeString()})`,
      });
    }
  }, [currentIndex, history, setElements]);
  
  const redo = useCallback(() => {
    if (currentIndex >= history.length - 1) return;
    
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    
    const nextState = history[newIndex];
    if (nextState) {
      setElements(nextState.elements);
      
      toast({
        title: 'Redo',
        description: `Restored to later state (${new Date(nextState.timestamp).toLocaleTimeString()})`,
      });
    }
  }, [currentIndex, history, setElements]);
  
  return (
    <HistoryContext.Provider
      value={{
        canUndo: currentIndex > 0,
        canRedo: currentIndex < history.length - 1,
        undo,
        redo,
        saveSnapshot,
        snapshotCount: history.length
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
