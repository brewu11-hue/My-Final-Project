
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChart3,
  Map as MapIcon,
  Menu,
  User,
  Bot,
  LogOut,
  UserCog,
  FileText,
  Landmark,
  Truck,
  Building,
  Home,
  UserCheck,
  HardHat,
  Tags,
  Construction,
  Mountain,
  ShieldCheck,
  Briefcase,
  Banknote,
  Mail,
  Waves,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';

const menuItems = [
  { path: '/dashboard/resident', label: 'Resident Dashboard', icon: Home },
  { path: '/dashboard/partner', label: 'Municipal/Gov', icon: Building },
  { path: '/dashboard/driver', label: 'Partner Driver', icon: UserCheck },
  { path: '/dashboard/driver-application', label: 'Driver Application', icon: FileText },
  { path: '/dashboard/industrial', label: 'Mining & Industrial', icon: HardHat },
  { path: '/dashboard/chrome-washing', label: 'Chrome Washing', icon: Waves },
  { path: '/dashboard/logistics', label: 'Logistics', icon: Truck },
  { path: '/dashboard/plant-hire', label: 'Plant Hire', icon: Construction },
  { path: '/dashboard/drilling-blasting', label: 'Drilling & Blasting', icon: Mountain },
  { path: '/dashboard/compliance', label: 'Compliance', icon: ShieldCheck },
  { path: '/dashboard/careers', label: 'Careers', icon: Briefcase },
  { path: '/dashboard/billing', label: 'Billing', icon: Landmark },
  { path: '/dashboard/payouts', label: 'Payouts', icon: Banknote },
  { path: '/dashboard/tracking', label: 'Live Tracking', icon: MapIcon },
  { path: '/dashboard/pricing', label: 'Pricing', icon: Tags },
  { path: '/dashboard/terms', label: 'Terms', icon: FileText },
  { path: '/dashboard/contact', label: 'Contact', icon: Mail },
  { path: '/dashboard/profile', label: 'Profile', icon: UserCog },
];

const aiTools: any[] = [];


export function SidebarLayout({ children, userRole }: { children: React.ReactNode, userRole: string | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push('/login');
  };
  
  // Show all menu items for the presentation
  const filteredMenuItems = menuItems;

  const allVisibleItems = [...filteredMenuItems, ...aiTools];

  const activeItem = allVisibleItems
    .filter(item => pathname.startsWith(item.path))
    .sort((a, b) => b.path.length - a.path.length)[0];

  const pageTitle = activeItem?.label || 'Dashboard';


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2">
            <Icons.Logo className="w-8 h-8 text-primary" />
            <span className="text-lg font-semibold">TT Group App</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {filteredMenuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={activeItem?.path === item.path}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.path}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          {aiTools.length > 0 && (
            <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                <Bot />
                <span className="group-data-[collapsible=icon]:hidden">
                    AI Tools
                </span>
                </SidebarGroupLabel>
                <SidebarMenu>
                {aiTools.map((item) => (
                    <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                        asChild
                        isActive={activeItem?.path === item.path}
                        tooltip={{ children: item.label }}
                    >
                        <Link href={item.path}>
                        <item.icon />
                        <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroup>
           )}
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 w-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.photoURL || undefined} />
              <AvatarFallback>
                {user?.displayName
                  ? user.displayName.charAt(0).toUpperCase()
                  : user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">
                {user?.displayName || 'User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b h-16 bg-card">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden">
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            <h1 className="text-xl font-semibold">{pageTitle}</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photoURL || undefined} />
                  <AvatarFallback>
                     {user?.displayName
                  ? user.displayName.charAt(0).toUpperCase()
                  : user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
