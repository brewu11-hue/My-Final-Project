'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Share, PlusSquare, X, Smartphone, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Detect iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // Detect if already installed
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(isStandaloneMode);

    // Show prompt if not installed
    if (!isStandaloneMode) {
      const hasDismissed = localStorage.getItem('pwa-install-dismissed');
      if (!hasDismissed) {
        setShowPrompt(true);
      }
    }

    // Capture the install event for supported browsers (Chrome/Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-24 left-6 z-50 w-full max-w-[320px] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Card className="shadow-2xl border-primary/20 bg-background/95 backdrop-blur-md">
        <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-primary" />
              Install TT Group App
            </CardTitle>
            <CardDescription className="text-[10px]">
              Access waste management services faster from your home screen.
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-2" onClick={dismissPrompt}>
            <X className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {isIOS ? (
            <div className="text-[11px] space-y-2 text-muted-foreground leading-relaxed">
              <p className="flex items-center flex-wrap gap-1">
                1. Tap the Share button 
                <span className="inline-flex items-center justify-center bg-secondary p-1 rounded">
                  <Share className="w-3 h-3 text-primary" />
                </span>
              </p>
              <p className="flex items-center flex-wrap gap-1">
                2. Select <strong>'Add to Home Screen'</strong>
                <span className="inline-flex items-center justify-center bg-secondary p-1 rounded">
                  <PlusSquare className="w-3 h-3 text-primary" />
                </span>
              </p>
            </div>
          ) : (
            <Button className="w-full h-8 text-xs" onClick={handleInstallClick} disabled={!deferredPrompt && !isIOS}>
              {deferredPrompt ? 'Install Now' : 'Add to Home Screen'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
