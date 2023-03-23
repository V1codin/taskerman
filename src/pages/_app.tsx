import '@/styles/globals.css';
import GlobalStyle from '@/styles/GlobalStyles';

import { themes } from '@/styles/theme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'jotai';

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <ThemeProvider theme={themes['dark']}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
