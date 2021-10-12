import * as React from "react";

// Next
import Head from "next/head";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";

// Components
import {
  ButtonClick,
  Container,
  DisplayJSON,
  GitHubLink,
  UpdateValuesTutorial,
} from "../components";

export default function UpdateKeyValue() {
  const [boolean, setBoolean] = React.useState(false);
  const [number, setNumber] = React.useState(50);
  const [string, setString] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const [showTutorial, setShowTutorial] = React.useState(false);

  const handleClick = async (type, update) => {
    setLoading(true);
    try {
      const response = await fetch("/api/update-key-value", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [type]: update }),
      });

      const { deploy } = await response.json();
      setResponse(deploy);
    } catch (err) {
      console.log(err);
      setResponse(JSON.stringify(err.message));
    }
    return setLoading(false);
  };

  return (
    <Container>
      <Head>
        <title>Update Key-Value</title>
        <meta
          name="description"
          content="Update a key-value pair on the Casper blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UpdateValuesTutorial
        open={showTutorial}
        setOpen={() => setShowTutorial(false)}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h2">Update Key-Value</Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2} direction="row" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Modify the boolean, number, and string values with the inputs
                below then submit to update the values on the blockchain:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={2} align="center" alignItems="flex-end">
                <Grid item xs={12}>
                  <Typography variant="body1">{boolean.toString()}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Switch
                    id="boolean"
                    label="Update boolean"
                    value={boolean}
                    onChange={() => setBoolean(!boolean)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ButtonClick
                    text="Update boolean"
                    onClick={() => handleClick("boolean", boolean)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={2} align="center">
                <Grid item xs={12}>
                  <Slider
                    aria-label="Number"
                    valueLabelDisplay="on"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ButtonClick
                    text="Update number"
                    onClick={() => handleClick("number", number)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} align="center">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="string"
                    label="Update string"
                    variant="filled"
                    value={string}
                    onChange={(e) => setString(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ButtonClick
                    text="Update string"
                    onClick={() => handleClick("string", string)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <DisplayJSON
            buttonName="Update Blockchain"
            loading={loading}
            data={response}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">
            As you can see, the value under the entry point has been updated to
            the bytecode version of the value entered above.
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
          <GitHubLink link="https://github.com/Seth-McKilla/casper-nextjs/blob/main/pages/api/update-key-value.js" />
        </Grid>
      </Grid>
    </Container>
  );
}
