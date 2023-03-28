import '@/styles/globals.css';
import GlobalStyle from '@/styles/GlobalStyles';

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
    <SessionProvider session={session}>
      <Provider>
        <ThemeProvider theme={themes['dark']}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
