import { createTheme } from "@mui/material/styles";

export default createTheme({
  typography: {
    fontFamily: ["Ubuntu", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#C84B31",
    },
    secondary: {
      main: "#ECDBBA",
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
        color: #c84b31;
      }
      * {
        box-sizing: border-box;
      }
      `,
    },
  },
});
