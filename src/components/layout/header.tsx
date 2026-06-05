
'use client';

import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, LogOut, User, Languages } from 'lucide-react';
import { useI18n } from '@/i18n/i18n-provider';

export function Header() {
  const { user } = useUser();
  const router = useRouter();
  const { language, setLanguage, t } = useI18n();

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Icons.Logo className="w-8 h-8 text-primary" />
          <span className="text-lg font-semibold">{t('header.title')}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            {t('header.news')}
          </Link>
          <Link
            href="/dashboard"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            {t('header.dashboard')}
          </Link>
           <Link
            href="/signup-driver"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            {t('header.driveForUs')}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Languages className="mr-2 h-5 w-5" />
                {t('header.language')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('header.language')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={language}
                onValueChange={(value) => setLanguage(value as 'en' | 'af' | 'zu' | 'so')}
              >
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="af">Afrikaans</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="zu">isiZulu</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="so">Sesotho</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.photoURL || ''}
                      alt={user.displayName || 'User'}
                    />
                    <AvatarFallback>
                      {user.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>{t('header.userMenu.dashboard')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>{t('header.userMenu.profile')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('header.userMenu.logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">{t('header.getStarted')}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
