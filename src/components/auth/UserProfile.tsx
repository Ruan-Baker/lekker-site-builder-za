
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Check, AlertCircle } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user, profile, updateProfile, isUpdatingProfile, errorMessage, clearErrorMessage } = useAuth();
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await updateProfile({
      display_name: displayName,
      avatar_url: avatarUrl
    });
    
    if (!result.error) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const getInitials = () => {
    if (displayName) {
      return displayName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || '?';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your account profile information and avatar
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-center mb-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarUrl || undefined} />
            <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
          </Avatar>
        </div>
        
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto h-6 px-2" 
              onClick={clearErrorMessage}
            >
              Dismiss
            </Button>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-4 border-green-500 bg-green-50 text-green-800">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription>Profile updated successfully!</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={user?.email || ''} 
              disabled 
              className="bg-gray-50"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input 
              id="displayName" 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)} 
              placeholder="Your display name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input 
              id="avatarUrl" 
              value={avatarUrl || ''} 
              onChange={(e) => setAvatarUrl(e.target.value)} 
              placeholder="https://example.com/avatar.jpg"
            />
            <p className="text-xs text-muted-foreground">
              Enter a URL to your profile picture
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
