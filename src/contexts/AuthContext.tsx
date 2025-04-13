
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, Provider } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
};

type AuthError = {
  message: string;
  status?: number;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  signInWithProvider: (provider: Provider) => Promise<{ error: AuthError | null }>;
  isUpdatingProfile: boolean;
  errorMessage: string | null;
  clearErrorMessage: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Clear error message
  const clearErrorMessage = () => setErrorMessage(null);

  // Fetch user profile from the profiles table
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
      } else {
        // If no profile exists, create one
        createEmptyProfile(userId);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Create an empty profile if one doesn't exist
  const createEmptyProfile = async (userId: string) => {
    try {
      const { error } = await supabase.from('profiles').insert({
        id: userId,
        display_name: user?.email?.split('@')[0] || null,
        avatar_url: null
      });

      if (error) {
        console.error('Error creating profile:', error);
        return;
      }

      // Fetch the newly created profile
      fetchProfile(userId);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          fetchProfile(currentSession.user.id);
        }
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in",
            description: "You have successfully signed in"
          });
        }
        
        if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out"
          });
          setProfile(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setErrorMessage(error.message);
        return { error: { message: error.message, status: error?.status } };
      }
      
      return { error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred during sign in';
      setErrorMessage(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            display_name: name
          }
        }
      });
      
      if (error) {
        setErrorMessage(error.message);
        return { error: { message: error.message, status: error?.status } };
      }
      
      toast({
        title: "Account created",
        description: "Please check your email to confirm your account"
      });
      
      return { error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred during sign up';
      setErrorMessage(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) {
      return { error: { message: 'User is not authenticated' } };
    }

    try {
      setIsUpdatingProfile(true);
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        setErrorMessage(error.message);
        return { error: { message: error.message } };
      }

      // Update local profile state
      setProfile(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated"
      });
      
      return { error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred while updating profile';
      setErrorMessage(errorMessage);
      return { error: { message: errorMessage } };
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-confirmation`,
      });
      
      if (error) {
        setErrorMessage(error.message);
        return { error: { message: error.message, status: error?.status } };
      }
      
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for a link to reset your password"
      });
      
      return { error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred while sending reset email';
      setErrorMessage(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const signInWithProvider = async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        setErrorMessage(error.message);
        return { error: { message: error.message, status: error?.status } };
      }
      
      return { error: null };
    } catch (error: any) {
      const errorMessage = error.message || `An error occurred during ${provider} sign in`;
      setErrorMessage(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword,
    signInWithProvider,
    isUpdatingProfile,
    errorMessage,
    clearErrorMessage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
