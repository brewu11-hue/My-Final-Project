
'use client';

import { Assistant } from '@/components/assistant/assistant';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useUser, useFirestore } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { PushNotificationManager } from '@/components/push-notification-manager';
import { InstallPrompt } from '@/components/install-prompt';

interface RoleContextType {
  userRole: string | null;
  roleLoading: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useUserRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a RoleContext.Provider');
  }
  return context;
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const firestore = useFirestore();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user && firestore) {
        setRoleLoading(true);

        // 1. Check for Driver role FIRST. This is a more specific role.
        const driverDocRef = doc(firestore, 'drivers', user.uid);
        const driverDocSnap = await getDoc(driverDocRef);
        
        if (driverDocSnap.exists()) {
          setUserRole('driver');
          setRoleLoading(false);
          return; // Stop execution if user is a driver.
        }

        // 2. If not a driver, check for Admin role.
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists() && userDocSnap.data().role === 'admin') {
          setUserRole('admin');
          setRoleLoading(false);
          return; // Stop execution if user is an admin.
        }
        
        // 3. If not a driver or an admin, default to a standard user.
        setUserRole('user');
        setRoleLoading(false);

      } else if (!authLoading && !user) {
        // Not logged in, no role to fetch, stop loading.
        setRoleLoading(false);
      }
    };

    fetchUserRole();
  }, [user, firestore, authLoading]);

  const isLoading = authLoading || roleLoading;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    // This case is handled by the redirect, but as a fallback
    return null;
  }

  return (
    <RoleContext.Provider value={{ userRole, roleLoading }}>
        <SidebarLayout userRole={userRole}>
            {children}
            <Assistant />
            <PushNotificationManager />
            <InstallPrompt />
        </SidebarLayout>
    </RoleContext.Provider>
  );
}
