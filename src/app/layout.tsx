import type { Metadata, Viewport } from 'next';
import { fontSans, fontDisplay, fontMono } from '@/lib/fonts';
import { AppProviders } from '@/providers/providers';
import { CustomCursor } from '@/components/effects/custom-cursor';
import { ScrollProgress } from '@/components/effects/scroll-progress';
import { SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s · ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  keywords: ['AI workspace', 'team productivity', 'docs', 'tasks', 'automation'],
  openGraph: {
    type: 'website',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a0a10',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html
      lang="en"
      className={cn(fontSans.variable, fontDisplay.variable, fontMono.variable, 'dark')}
      suppressHydrationWarning
    >
      <body className="noise motion-reduce-safe min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <AppProviders>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
