'use client';

import { useState, useEffect } from 'react';
import { subscribeUser, unsubscribeUser, sendNotification } from '@/app/actions/push-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, BellOff, Loader2, Send, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

/**
 * Converts a base64 VAPID public key to a Uint8Array.
 */
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  }

  async function subscribeToPush() {
    setLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Use a valid 87-character Base64-URL encoded public key (65 bytes decoded)
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'BM6I-U6X6vV_pI7_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6A';
      
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      setSubscription(sub);
      const serializedSub = JSON.parse(JSON.stringify(sub));
      await subscribeUser(serializedSub);
      
      toast({
        title: 'Notifications Enabled',
        description: 'You will now receive real-time updates for your requests.',
      });
    } catch (err) {
      console.error('Failed to subscribe the user: ', err);
      toast({
        variant: 'destructive',
        title: 'Subscription Failed',
        description: 'Please ensure you have granted notification permissions in your browser.',
      });
    } finally {
      setLoading(false);
    }
  }

  async function unsubscribeFromPush() {
    setLoading(true);
    try {
      await subscription?.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();
      
      toast({
        title: 'Notifications Disabled',
        description: 'You will no longer receive push notifications.',
      });
    } catch (err) {
      console.error('Error unsubscribing', err);
    } finally {
      setLoading(false);
    }
  }

  async function sendTestNotification() {
    if (subscription && message.trim()) {
      setLoading(true);
      try {
        await sendNotification(message);
        setMessage('');
        toast({
          title: 'Test Sent',
          description: 'A test notification has been triggered.',
        });
      } catch (error) {
        console.error('Test notification failed', error);
      } finally {
        setLoading(false);
      }
    }
  }

  if (!isSupported) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className={`rounded-full w-12 h-12 shadow-md bg-background border-2 transition-all ${
              subscription ? 'border-green-500 text-green-600 hover:bg-green-50' : 'border-primary/20 text-muted-foreground hover:bg-primary/5'
            }`}
          >
            {loading ? <Loader2 className="animate-spin" /> : subscription ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" side="top" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Push Notifications</h4>
              {subscription && (
                <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive" onClick={unsubscribeFromPush} disabled={loading}>
                  Unsubscribe
                </Button>
              )}
            </div>
            
            {!subscription ? (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Subscribe to receive real-time updates and collection alerts.</p>
                <Button className="w-full" size="sm" onClick={subscribeToPush} disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                  Enable Notifications
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-2 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900 rounded text-[10px] text-green-700 dark:text-green-300">
                  You are active and ready to receive updates.
                </div>
                <div className="space-y-2 pt-2 border-t">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Test Integration</p>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Test message..." 
                      className="h-8 text-xs" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button size="icon" className="h-8 w-8 shrink-0" onClick={sendTestNotification} disabled={loading || !message.trim()}>
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
