import './globals.css';
import Header from '@/components/Header/Header';
import Toast from '@/modules/toast/Toast';
import Modal from '@/modules/modal/Modal';
import NextAuthProvider from '@/components/SessionProvider/NextAuthProvider';

import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { authService } from '@/libs/auth.service';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tasker Man',
  description: 'App for creating tasks and assignin them to people',
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const cookieStorage = cookies();

  const sessionToken = cookieStorage.get(AUTH_TOKEN_COOKIE_NAME);
  const sessionUser = await authService.getSessionUser(
    sessionToken?.value || '',
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header user={sessionUser} />
        <Modal />
        <Toast />
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
