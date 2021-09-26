import * as React from "react";
import { Context } from "../context";

// Next
import Head from "next/head";
import { useRouter } from "next/router";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Components
import { Alert, Container, Logo } from "../components";

export default function Home() {
  const router = useRouter();

  const [showAlert, setShowAlert] = React.useState(false);
  const { state } = React.useContext(Context);

  const handleClick = () => {
    if (!state.user) return setShowAlert(true);
    return router.push("/get-block-state");
  };

  return (
    <Container>
      <Head>
        <title>Casper & NextJS</title>
        <meta name="description" content="Casper and NextJS Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid container spacing={3} align="center">
          <Alert
            open={showAlert}
            handleClose={() => setShowAlert(false)}
            title="Whoa there, hold on..."
            btnText="Close"
          >
            <Typography variant="body1">
              Please unlock your CasperLabs Signer Vault and Sign In before
              moving on.
            </Typography>
          </Alert>

          <Logo />

          <Grid item xs={12}>
            <Typography variant="h3">Casper & NextJS Demo</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Logging in is as easy as 1, 2, 3...
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">
              1.
              <span role="img" alt="unlock">
                🔓
              </span>
              Unlock your CasperLabs Signer extension
              <span role="img" alt="arrow">
                ↗
              </span>
            </Typography>
            <Typography variant="body1">
              {
                "Don't have the CasperLabs Signer extension? No problem, grab it "
              }
              <a
                href="https://chrome.google.com/webstore/detail/casperlabs-signer/djhndpllfiibmcdbnmaaahkhchcoijce?hl=en"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">
              2.
              <span role="img" alt="plug">
                🔌
              </span>
              Connect to this site through the extension
            </Typography>
            <Typography variant="body1">
              Having trouble? Check out{" "}
              <a
                href="https://docs.casperlabs.io/en/latest/workflow/staking.html#creating-your-wallet-with-the-casperlabs-signer"
                target="_blank"
                rel="noreferrer"
              >
                this
              </a>
              resource for some detailed instructions
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">
              3.
              <span role="img" alt="refresh">
                🔑
              </span>
              {"Log in by clicking the padlock and selecting 'Log In' "}
              <span role="img" alt="arrow">
                ↗
              </span>
            </Typography>
            <Typography variant="body1">
              The padlock should now be unlocked and your public account key can
              be viewed by hovering over the padlock
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" size="large" onClick={handleClick}>
              Continue <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}
