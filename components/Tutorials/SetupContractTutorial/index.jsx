import * as React from "react";
import {
  codeTextContract,
  codeTextSetupTests,
  codeTextUnitTests,
  codeTextRunTests,
} from "./codeText";

// Mui
import Typography from "@mui/material/Typography";

// Components
import { CodeBlock } from "../..";

export default function GetBlockStateTutorial() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        First things first, setup a simple Casper contract using Rust to store
        three types of values; a boolean, number, and string:
      </Typography>

      <CodeBlock code={codeTextContract} language="rust" />

      <Typography variant="h6" gutterBottom>
        {
          "Then we'll set up some tests by first deploying the contract with initial values:"
        }
      </Typography>

      <CodeBlock code={codeTextSetupTests} language="rust" />

      <Typography variant="h6" gutterBottom>
        Create the unit tests to ensure that everything is functionaing as
        expected:
      </Typography>

      <CodeBlock code={codeTextUnitTests} language="rust" />

      <Typography variant="h6" gutterBottom>
        Finally, run the tests with a simple CLI command:
      </Typography>

      <CodeBlock code={codeTextRunTests} language="shell" />
    </>
  );
}
