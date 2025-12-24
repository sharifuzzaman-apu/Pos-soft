import { ReduxProvider } from '@/lib/redux/provider';
import './globals.css';

export const metadata = {
  title: 'POS-Soft Accounting',
  description: 'Personal & Business Accounting Software',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="antialiased">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
