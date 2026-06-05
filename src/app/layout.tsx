import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { I18nProvider } from '@/i18n/i18n-provider';

export const metadata: Metadata = {
  title: 'TT Group App',
  description: 'Efficient Waste Removal Management',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TT Group App',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#0284c7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased bg-background">
        <FirebaseClientProvider>
          <I18nProvider>
            <div className="relative flex min-h-screen flex-col">
              {children}
            </div>
            <Toaster />
          </I18nProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
