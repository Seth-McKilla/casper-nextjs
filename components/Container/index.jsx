//Mui
import { default as MuiContainer } from "@mui/material/Container";

const styles = {
  maxHeight: "calc(100vh - 115px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

export default function Container({ children }) {
  return (
    <MuiContainer sx={styles} maxWidth="md">
      {children}
    </MuiContainer>
  );
}
