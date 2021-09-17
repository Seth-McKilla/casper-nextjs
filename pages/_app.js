import "../styles/globals.css";
import { NavBar, Footer } from "../components";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
