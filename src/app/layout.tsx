import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'KCA AI LAB Design System - Component Library',
  description: 'A comprehensive component library built with KCA AI LAB Design System principles. Explore reusable UI components for modern product development.',
  keywords: ['KCA AI LAB', 'Design System', 'Components', 'UI', 'React', 'TypeScript'],
  authors: [{ name: 'KCA AI LAB Design System' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#08090A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <div className="min-h-screen bg-background-primary text-text-primary">
          {children}
        </div>
      </body>
    </html>
  );
} 