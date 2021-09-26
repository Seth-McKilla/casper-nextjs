import * as React from "react";

// Next
import Head from "next/head";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import { ButtonClick, Container } from "../components";

export default function SignerConnect() {
  return (
    <Container>
      <Head>
        <title>Signer Connect</title>
        <meta
          name="description"
          content="How to connect to the CasperLabs Signer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid container spacing={3} align="center">
          <Grid item xs={12}>
            <Typography variant="h2">Signer Connect</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Log into the CasperLabs Signer and connect it to this site in
              three easy steps:
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">
              1.{" "}
              <span role="img" alt="unlock">
                🔓
              </span>{" "}
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
              2.{" "}
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
                rel="noreferrer"
              >
                this
              </a>{" "}
              resource for some detailed instructions
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">
              3.{" "}
              <span role="img" alt="refresh">
                🔑
              </span>{" "}
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

          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" mr={3}>
              Check out how this was done!
            </Typography>
            <ButtonClick
              text="</> View Code"
              onClick={() => alert("WORK IN PROGRESS")}
            />
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}
