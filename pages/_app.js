import "../styles/globals.css";
import { NavBar, Footer } from "../components";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme";
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
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

export default MyApp;
