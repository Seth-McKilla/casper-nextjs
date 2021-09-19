import * as React from "react";
import { Context } from "../context";
import styles from "../styles/Home.module.css";

// Next
import Head from "next/head";

// Mui
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Intro() {
  const { state } = React.useContext(Context);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    setMessage(`Hey there ${state.user}!`);
  }, []);

  return (
    <Container className={styles.container}>
      <Head>
        <title>Introduction</title>
        <meta name="description" content="Introduction page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography variant="h6">{message}</Typography>
    </Container>
  );
}
