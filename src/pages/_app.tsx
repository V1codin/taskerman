import '@/styles/globals.css';
import GlobalStyle from '@/styles/GlobalStyles';
import DefaultLayout from '@/layouts/DefaultLayout';

import { SessionProvider } from 'next-auth/react';
import { themes } from '@/styles/theme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'jotai';
import { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider theme={themes['dark']}>
      <SessionProvider session={session}>
        <Provider>
          <GlobalStyle />
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}
