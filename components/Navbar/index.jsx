import * as React from "react";
import styles from "./index.module.css";
import logo from "../../public/logo.png";
import { Context } from "../../context";
import Cookies from "js-cookie";
import { getActivePublicKey } from "../../services/casper";

// Next
import Image from "next/image";
import { useRouter } from "next/router";

// Mui
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";

// Components
import { Alert } from "..";

export default function NavBar() {
  const router = useRouter();
  const { state, dispatch } = React.useContext(Context);
  const [showAlert, setShowAlert] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItem = async () => {
    if (state.user) {
      dispatch({
        type: "ASSIGN_PUB_KEY",
        payload: "",
      });

      Cookies.remove("casper_pub_key");
      setAnchorEl(null);
      return router.push("/");
    }

    try {
      const publicKey = await getActivePublicKey();

      dispatch({
        type: "ASSIGN_PUB_KEY",
        payload: publicKey,
      });
      Cookies.set("casper_pub_key", publicKey, { expires: 7 });
      return setAnchorEl(null);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      setAnchorEl(null);
      return setShowAlert(true);
    }
  };

  return (
    <>
      <Alert
        open={showAlert}
        handleClose={() => setShowAlert(false)}
        title="Uh oh..."
        message={error}
        btnText="Close"
      />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className={styles.nav}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => router.push("/")}
            >
              <Image
                width={50}
                height={50}
                src={logo}
                alt="casper-nextjs-logo"
              />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Casper & NextJS
            </Typography>
            {mounted && (
              <Tooltip
                title={state.user ? `Public Key: ${state.user}` : "Signed out"}
              >
                <IconButton color="inherit" onClick={handleMenu}>
                  {state.user ? <LockOpenTwoToneIcon /> : <LockTwoToneIcon />}
                </IconButton>
              </Tooltip>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={!!anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleMenuItem}>
                {mounted && (
                  <Typography>{state.user ? "LOG OUT" : "LOG IN"}</Typography>
                )}
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
