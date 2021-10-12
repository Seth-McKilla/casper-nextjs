import * as React from "react";
import { codeTextAPI, codeTextFetch } from "./codeText";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import { Alert, CodeBlock } from "../..";

export default function UpdateValuesTutorial({ open, setOpen }) {
  return (
    <Alert
      open={open}
      handleClose={setOpen}
      title="How to update the current block state"
      btnText="Close"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Simply create a file in the pages/api directory called
            update-key-value.js with this code:
          </Typography>

          <CodeBlock code={codeTextAPI} />

          <Typography variant="h6" gutterBottom>
            Then call the endpoint with these lines:
          </Typography>

          <CodeBlock code={codeTextFetch} />
        </Grid>
      </Grid>
    </Alert>
  );
}
