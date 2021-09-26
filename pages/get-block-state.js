import * as React from "react";

// Next
import Head from "next/head";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import {
  ButtonClick,
  Container,
  DisplayJSON,
  GetBlockStateTutorial,
} from "../components";

export default function GetBlockState() {
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const [showTutorial, setShowTutorial] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-block-state");
      const { blockState } = await response.json();
      setResponse(JSON.stringify(blockState));
      return setLoading(false);
    } catch (err) {
      console.log(err);
      setResponse(JSON.stringify(err.message));
      return setLoading(false);
    }
  };

  return (
    <Container>
      <Head>
        <title>Get block state</title>
        <meta name="description" content="Get the block state" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GetBlockStateTutorial
        open={showTutorial}
        setOpen={() => setShowTutorial(false)}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h2">Get Block State</Typography>
        </Grid>

        <Grid
          container
          item
          xs={12}
          justifyContent="space-around"
          alignItems="center"
        >
          <Typography variant="h5">
            {"Let's start off by fetching the current block state..."}
          </Typography>
          <ButtonClick
            text={loading ? "Loading..." : "Fetch block state"}
            onClick={handleClick}
            disabled={loading}
          />
        </Grid>

        <Grid item xs={12}>
          <DisplayJSON
            buttonName="Get Block State"
            loading={loading}
            data={response}
          />
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
            onClick={() => setShowTutorial(true)}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
