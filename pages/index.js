import { useEffect, useState, useContext } from "react";
import logo from "../public/logo.png";
import styles from "../styles/Home.module.css";
import { getActivePublicKey } from "../services/casper";
import { Context } from "../context";
import Cookies from "js-cookie";

// Next
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

// Mui
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Components
import { Alert } from "../components";

export default function Home() {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    const setPublicKey = async () => {
      try {
        const publicKey = await getActivePublicKey();

        dispatch({
          type: "ASSIGN_PUB_KEY",
          payload: publicKey,
        });
        return Cookies.set("casper_pub_key", publicKey);
      } catch (error) {
        console.error(error.message);
        return Cookies.set("casper_pub_key", "");
      }
    };

    setPublicKey();
  }, []);

  const handleClick = () => {
    if (!state.user) return setShowAlert(true);
    return router.push("/intro");
  };

  return (
    <Container className={styles.container}>
      <main className={styles.main}>
        <Grid container spacing={3}>
          <Alert
            open={showAlert}
            handleClose={() => setShowAlert(false)}
            title="Whoa there, hold on..."
            message="Please unlock your CasperLabs Signer Vault before moving on."
            btnText="Close"
          />

          <Grid item xs={12} align="center">
            <div className={styles.logo}>
              <Image
                width={250}
                height={250}
                src={logo}
                alt="casper-nextjs-logo"
              />
            </div>
          </Grid>

          <Grid item xs={12} align="center">
            <Typography variant="h3" gutterBottom>
              Welcome to the Casper & NextJS Demo!
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <Typography variant="h4">
              Step 1.{" "}
              <span role="img" alt="unlock">
                🔓
              </span>{" "}
              Unlock your CasperLabs Signer extension up there{" "}
              <span role="img" alt="arrow">
                ↗
              </span>{" "}
            </Typography>
            <Typography variant="body1">
              Don't have the CasperLabs Signer extension? No problem, grab it{" "}
              <a
                href="https://chrome.google.com/webstore/detail/casperlabs-signer/djhndpllfiibmcdbnmaaahkhchcoijce?hl=en"
                target="_blank"
              >
                here
              </a>
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <Typography variant="h4">
              Step 2.{" "}
              <span role="img" alt="plug">
                🔌
              </span>{" "}
              Connect to this site through the extension
            </Typography>
            <Typography variant="body1">
              Having trouble? Check out{" "}
              <a
                href="https://docs.casperlabs.io/en/latest/workflow/staking.html#creating-your-wallet-with-the-casperlabs-signer"
                target="_blank"
              >
                this
              </a>{" "}
              resource for some detailed instructions
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <Typography variant="h4">
              Step 3.{" "}
              <span role="img" alt="refresh">
                🔄
              </span>{" "}
              Refresh your browser
            </Typography>
            <Typography variant="body1">
              The padlock in the top right portion of the page should now be
              unlocked
            </Typography>
            <Typography variant="body1">
              (P.S. You can view your public account key by hovering over the
              unlocked padlock)
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <Button variant="contained" size="large" onClick={handleClick}>
              Continue <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}
