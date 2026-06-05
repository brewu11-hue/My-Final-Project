'use server';

/**
 * @fileOverview Server actions for handling email notifications.
 */

export async function emailServiceRequest(data: any) {
  // This is a placeholder for actual email sending logic.
  // To send real emails, you would integrate a service like Resend or SendGrid here.
  console.log(`[EMAIL NOTIFICATION] New request received for TT Group App`);
  console.log(`To: info@ttwastecontrol.co.za`);
  console.log(`From: System Notification`);
  console.log('Request Data:', JSON.stringify(data, null, 2));
  
  // Simulate a slight delay for the "sending" process
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return { success: true, message: 'Notification sent to company email.' };
}
