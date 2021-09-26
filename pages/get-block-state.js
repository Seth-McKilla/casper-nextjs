import * as React from "react";
import styles from "../styles/Home.module.css";

// Next
import Head from "next/head";

// Mui
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Components
import { DisplayJSON, GetBlockState } from "../components";

export default function Intro() {
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const [showTutorialSection, setShowTutorialSection] = React.useState(false);
  const [showTutorial, setShowTutorial] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-block-state");
      const { blockState } = await response.json();
      setResponse(JSON.stringify(blockState));
      setShowTutorialSection(true);
      return setLoading(false);
    } catch (err) {
      console.log(err);
      setResponse(JSON.stringify(err.message));
      return setLoading(false);
    }
  };

  return (
    <Container className={styles.container} maxWidth="md">
      <Head>
        <title>Get block state</title>
        <meta name="description" content="Get the block state" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GetBlockState
        open={showTutorial}
        setOpen={() => setShowTutorial(false)}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h4">
            {"Let's start off by getting the current block state..."}
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            size="large"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get block state"}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <DisplayJSON
            buttonName="Get Block State"
            loading={loading}
            data={response}
          />
        </Grid>

        {showTutorialSection && (
          <Grid container item xs={12} justifyContent="center">
            <Typography variant="h4" mr={3}>
              Check out how that was done!
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => setShowTutorial(true)}
            >
              View code
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
