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
  GitHubLink,
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
    } catch (err) {
      console.log(err);
      setResponse(JSON.stringify(err.message));
    }
    return setLoading(false);
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

        <Grid item xs={12}>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={9}>
              <Typography variant="h5">
                {
                  "Check out the current block state of the contract created in the 'Contract Setup' section..."
                }
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <ButtonClick
                text={loading ? "Loading..." : "Fetch block state"}
                onClick={handleClick}
                disabled={loading}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <DisplayJSON
            buttonName="Fetch Block State"
            loading={loading}
            data={response}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">
            As you can see after fetching the state, the three entry points for
            updating the key-value items can be seen in the block state above.
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
            Check out how this is done!
          </Typography>
          <ButtonClick
            text="</> View Code"
            onClick={() => setShowTutorial(true)}
          />
          <GitHubLink link="https://github.com/Seth-McKilla/casper-nextjs/blob/main/pages/api/get-block-state.js" />
        </Grid>
      </Grid>
    </Container>
  );
}
