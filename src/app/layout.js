import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AlertModal from '@/components/AlertModal';
import CookieConsent from '@/components/CookieConsent';
import { siteConfig } from '@/data/content';

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({ children }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
          <AlertModal />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
