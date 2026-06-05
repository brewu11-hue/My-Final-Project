'use server';

/**
 * @fileOverview Server actions for handling Web Push subscriptions using the web-push library.
 */

import webpush from 'web-push';

// Use a valid 87-character Base64-URL encoded public key (65 bytes decoded)
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'BM6I-U6X6vV_pI7_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6v_U6X6A';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';

// Initialize VAPID details only if keys are provided to prevent runtime crashes
if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  try {
    webpush.setVapidDetails(
      'mailto:info@ttwastecontrol.co.za',
      VAPID_PUBLIC_KEY,
      VAPID_PRIVATE_KEY
    );
  } catch (error) {
    console.error('[PUSH] Failed to set VAPID details:', error);
  }
} else {
  console.warn('[PUSH] VAPID keys are missing. Push notifications will not be sent.');
}

// In a prototype environment, we use a global variable to store the most recent subscription.
// IMPORTANT: In a production environment with multiple users or serverless scaling, 
// subscriptions must be stored in a database (e.g., Firestore) associated with a User UID.
let globalSubscription: any = null;

export async function subscribeUser(sub: any) {
  globalSubscription = sub;
  console.log('[PUSH] Subscription received and stored in memory.');
  return { success: true };
}

export async function unsubscribeUser() {
  globalSubscription = null;
  console.log('[PUSH] Subscription removed from memory.');
  return { success: true };
}

export async function sendNotification(message: string) {
  if (!globalSubscription) {
    console.error('[PUSH] Failed to send: No active subscription available.');
    return { success: false, error: 'No subscription available' };
  }

  // Check if VAPID details are configured
  if (!VAPID_PRIVATE_KEY) {
    console.error('[PUSH] VAPID private key is missing.');
    return { success: false, error: 'Push service not configured' };
  }

  try {
    await webpush.sendNotification(
      globalSubscription,
      JSON.stringify({
        title: 'TT Group App Update',
        body: message,
        icon: '/icon-192x192.png',
      })
    );
    console.log('[PUSH] Notification sent successfully.');
    return { success: true };
  } catch (error) {
    console.error('[PUSH] Error sending push notification:', error);
    return { success: false, error: 'Failed to send notification' };
  }
}
