import * as React from "react";
import { Context } from "../context";
import styles from "../styles/Home.module.css";
import { STATUS_API } from "../constants";

// Next
import Head from "next/head";

// Mui
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Intro() {
  const { state } = React.useContext(Context);
  const [error, setError] = React.useState("");

  const handleClick = async () => {
    try {
      const statusResponse = await fetch(STATUS_API);
      const json = await statusResponse.json();
      setNetworkName(json.chainspec_name);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container className={styles.container} maxWidth="sm">
      <Head>
        <title>Introduction</title>
        <meta name="description" content="Introduction page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h4">Now let's connect to the network</Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <Button variant="contained" size="large" onClick={handleClick}>
            Connect
          </Button>
        </Grid>

        {error && (
          <Grid item xs={12} align="center">
            <Typography variant="body1">{error.message}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
