
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Laptop, 
  Smartphone, 
  Save, 
  Eye, 
  Settings,
  LogOut,
  User,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

const BuilderHeader = () => {
  const { user, signOut } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulate saving
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Project saved",
        description: "Your project has been saved successfully"
      });
    }, 1000);
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <div className="font-bold text-xl mr-4">
            <span className="text-blue-700">Lekker</span><span className="text-blue-500">Sites</span>
          </div>
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">Builder</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="bg-gray-100 rounded-md flex items-center p-1 mr-4">
          <Button variant="ghost" size="icon" className="rounded-md">
            <Laptop size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-md">
            <Smartphone size={18} />
          </Button>
        </div>
        
        <Button variant="ghost" size="icon">
          <Settings size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <Eye size={18} />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={handleSave}
          disabled={saving}
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save"}
        </Button>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Publish</Button>
        
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>My Projects</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default BuilderHeader;
