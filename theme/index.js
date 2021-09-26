import { createTheme } from "@mui/material/styles";

export default createTheme({
  typography: {
    fontFamily: ["Ubuntu", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#ff4e00",
    },
    secondary: {
      main: "#ec9f05",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      html,
      body {
        padding: 0;
        margin: 0;
      }  
      a {
        color: inherit;
        text-decoration: none;
        font-weight: 600;
        color: #ff4e00;
      }
      * {
        box-sizing: border-box;
      }
      `,
    },
  },
});
