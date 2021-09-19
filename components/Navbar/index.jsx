import * as React from "react";
import styles from "./index.module.css";
import logo from "../../public/logo.png";
import { Context } from "../../context";

// Next
import Image from "next/image";

// Mui
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";

export default function NavBar() {
  const { state } = React.useContext(Context);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.nav}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Image width={50} height={50} src={logo} alt="casper-nextjs-logo" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Casper & NextJS
          </Typography>
          {mounted && (
            <Tooltip
              title={
                state.user
                  ? `Public Key: ${state.user}`
                  : "Unlock Casper Vault to continue"
              }
            >
              {state.user ? <LockOpenTwoToneIcon /> : <LockTwoToneIcon />}
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
