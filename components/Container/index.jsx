//Mui
import { default as MuiContainer } from "@mui/material/Container";

const styles = {
  root: {
    overflowY: "auto",
    width: "100vw",
    height: "calc(100vh - 115px)",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
};

export default function Container({ children }) {
  return (
    <div style={styles.root}>
      <MuiContainer sx={styles.container} maxWidth="md">
        {children}
      </MuiContainer>
    </div>
  );
}
