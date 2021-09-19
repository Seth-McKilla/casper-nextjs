import { useEffect, useState, useContext } from "react";
import logo from "../public/logo.png";
import styles from "../styles/Home.module.css";
import { getActivePublicKey } from "../services/casper";
import { Context } from "../context";

// Next
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

// Mui
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Components
import { Alert } from "../components";

export default function Home() {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    const setPublicKey = async () => {
      try {
        const publicKey = await getActivePublicKey();

        dispatch({
          type: "ASSIGN_PUB_KEY",
          payload: publicKey,
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    setPublicKey();
  }, []);

  const handleClick = () => {
    if (!state.user) return setShowAlert(true);
    return router.push("/intro");
  };

  return (
    <Container className={styles.container}>
      <Head>
        <title>Casper & NextJS</title>
        <meta name="description" content="Casper and NextJS Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Grid container spacing={3}>
          <Alert
            open={showAlert}
            handleClose={() => setShowAlert(false)}
            title="Casper Vault Required"
            message="Please signin to Casper Vault before continuing"
            btnText="Close"
          />

          <Grid item xs={12} align="center">
            <div className={styles.logo}>
              <Image
                width={250}
                height={250}
                src={logo}
                alt="casper-nextjs-logo"
              />
            </div>
          </Grid>

          <Grid item xs={12} align="center">
            <Typography variant="h3">
              Welcome to the Casper & NextJS Demo!
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <Typography variant="h6">
              Get started by connecting to your CasperLabs Signer{" "}
              <span role="img" alt="arrow">
                ↗
              </span>
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <Button variant="contained" size="large" onClick={handleClick}>
              Continue <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}
