import * as React from "react";

// Mui
import Box from "@mui/material/Box";

const styles = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function Footer() {
  return (
    <Box sx={styles}>
      <div>
        Made with{" "}
        <span role="img" alt="heart">
          ❤️
        </span>{" "}
        by{" "}
        <a
          href="https://github.com/Seth-McKilla"
          target="_blank"
          rel="noreferrer"
        >
          Seth
        </a>
      </div>
    </Box>
  );
}
