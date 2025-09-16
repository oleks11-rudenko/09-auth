import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import 'modern-normalize';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { getPageUrl } from '@/lib/api';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub - Managing online notes',
  description: 'App for creating, filtering and removing notes. Created by @oleks11-rudenko',
  openGraph: {
    title: 'NoteHub - Managing online notes',
    description: 'App for creating, filtering and removing notes. Created by @oleks11-rudenko',
    url: getPageUrl('/'),
    siteName: 'NoteHub',
    type: 'website',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Managing online notes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoteHub - Managing online notes',
    description: 'App for creating, filtering and removing notes. Created by @oleks11-rudenko',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Managing online notes',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanStackProvider>
        <body className={roboto.variable}>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </body>
      </TanStackProvider>
    </html>
  );
}
