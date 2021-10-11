import * as React from "react";

// Next
import Head from "next/head";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import { Container, Logo } from "../components";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Casper & NextJS</title>
        <meta name="description" content="Casper and NextJS Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid container spacing={3} align="center">
          <Logo />

          <Grid item xs={12}>
            <Typography variant="h2">
              Welcome to the Casper & NextJS Demo!
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">
              This site serves as an introduction to integrating the{" "}
              <a href="https://nextjs.org/" target="__blank" rel="noreferrer">
                NextJS
              </a>{" "}
              framework with the{" "}
              <a
                href="https://casperlabs.io/"
                target="__blank"
                rel="noreferrer"
              >
                Casper
              </a>{" "}
              {
                "ecosystem. It's main purpose is to get you developing NextJS dApps on the Casper blockchain as quickly and painlessly as possible "
              }
              <span role="img" aria-label="Rocket">
                🚀
              </span>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">
              Click one of the links at the top of this page{" "}
              <span role="img" aria-label="Finger">
                ☝️
              </span>{" "}
              to start learning some fundamentals now!
            </Typography>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}
