import * as React from "react";
import { NavBar, Footer } from "../components";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme";
import { Provider } from "../context";

export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}
