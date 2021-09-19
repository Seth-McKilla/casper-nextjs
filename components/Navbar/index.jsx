import * as React from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import Tooltip from "@mui/material/Tooltip";
import logo from "../../public/logo.png";
import styles from "./index.module.css";
import { Context } from "../../context";

export default function NavBar() {
  const { state } = React.useContext(Context);

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
          {state.user ? (
            <Typography variant="body1">{state.user}</Typography>
          ) : (
            <Tooltip title="Unlock Casper Vault to continue">
              <LockIcon />
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
