import * as React from "react";

// Next
import Head from "next/head";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import { ButtonClick, Container } from "../components";

export default function GetBlockState() {
  return (
    <Container>
      <Head>
        <title>Update String</title>
        <meta
          name="description"
          content="Update a string value on the blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h2">Update String</Typography>
        </Grid>

        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" mr={3}>
            Check out how this is done!
          </Typography>
          <ButtonClick
            text="</> View Code"
            onClick={() => alert("WORK IN PROGRESS")}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
