import { ThemeProvider } from "theme-ui";

import theme from "../src/theme";

function App({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default App;
