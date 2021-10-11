//Mui
import { default as MuiContainer } from "@mui/material/Container";

const styles = {
  root: {
    overflowY: "auto",
    width: "100vw",
    height: "calc(100vh - 115px)",
  },
  container: {
    marginTop: "100px",
    width: "100vw",
    height: "calc(100vh - 200px)",
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
