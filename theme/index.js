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
});
