import '@/styles/globals.css';
import GlobalStyle from '@/styles/GlobalStyles';

import { themes } from '@/styles/theme';
import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';

interface PageProps {}

interface Props extends AppProps<PageProps> {
  // cookieContext: ReturnType<typeof createCookieServer>;
  // cookieContext: {};
}

export default function App({ Component, pageProps }: Props) {
  return (
    <ThemeProvider theme={themes['dark']}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

