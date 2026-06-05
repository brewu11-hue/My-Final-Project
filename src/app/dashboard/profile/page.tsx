
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/firebase';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { Loader2, LogOut, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import { useUserRole } from '@/app/dashboard/layout';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, loading } = useUser();
  const { userRole } = useUserRole();
  const router = useRouter();
  const { toast } = useToast();

  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push('/login');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        toast({
          variant: 'destructive',
          title: 'Image too large',
          description: 'Please select an image smaller than 1MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePicture = async () => {
    if (!preview || !user) return;
    setUploading(true);
    const auth = getAuth();
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          photoURL: preview,
        });
        toast({ title: 'Success', description: 'Profile picture updated successfully.' });
        setPreview(null);
      } catch (error) {
        console.error('Error updating profile picture:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to update profile picture.',
        });
      } finally {
        setUploading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={preview || user.photoURL || undefined} alt={user.displayName || 'User profile picture'} />
              <AvatarFallback>
                {user.displayName
                  ? user.displayName.charAt(0).toUpperCase()
                  : user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
             {userRole === 'driver' && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload profile picture"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          <CardTitle className="text-3xl">Welcome, {user.displayName || 'User'}!</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
            {preview && userRole === 'driver' && (
            <div className="flex flex-col items-center gap-3 p-4 bg-muted/50 rounded-lg w-full">
                <p className="text-sm text-center text-muted-foreground">You have a pending profile picture change.</p>
                <div className="flex gap-2">
                    <Button onClick={handleSavePicture} disabled={uploading}>
                        {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Picture
                    </Button>
                    <Button variant="ghost" onClick={() => setPreview(null)} disabled={uploading}>Cancel</Button>
                </div>
            </div>
          )}

          <p className="text-muted-foreground text-center">
            You have successfully logged in to your personalized dashboard.
          </p>
          
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
