import * as React from "react";

// Next
import Head from "next/head";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import { Container, SetupContractTutorial, GitHubLink } from "../components";

export default function GetBlockState() {
  return (
    <Container>
      <Head>
        <title>Setup Contract</title>
        <meta
          name="description"
          content="Setup a basic Casper smart contract"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h2">Setup Contract</Typography>
        </Grid>

        <Grid item xs={12}>
          <SetupContractTutorial />
        </Grid>

        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" mr={3}>
            Check out the repo for more detail!
          </Typography>
          <GitHubLink link="https://github.com/Seth-McKilla/casper-nextjs/tree/main/casper" />
        </Grid>
      </Grid>
    </Container>
  );
}
