import { createGlobalStyle, DefaultTheme } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
//========================================================================================================
// GENERAL
//========================================================================================================


* {
	box-sizing: border-box;
}
*::before {
	box-sizing: border-box;
}
*::after {
	box-sizing: border-box;
}

body {
  background-color: ${({ theme }) => theme.themeColors.background.secondary};
}

.colored {
	background-color: var(--black-aqua);
	box-shadow: 0 0 5px var(--yellow);
	border-radius: 7px;
	transition: 0.2s ease;
	animation: fadeIn 1s;
	animation-fill-mode: forwards;
}

.conflict {
	color: var(--pink);
}

.warning {
	color: var(--pale-yellow);
}

.notification {
	color: var(--bright-green);
}

`;

export default GlobalStyle;
