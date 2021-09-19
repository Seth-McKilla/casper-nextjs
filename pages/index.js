import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logo from "../public/logo.png";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Casper & NextJS</title>
        <meta name="description" content="Casper and NextJS Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>
          <Image width={250} height={250} src={logo} alt="casper-nextjs-logo" />
        </div>
        <Typography variant="h3">
          Welcome to the Casper & NextJS Demo!
        </Typography>
        <Typography variant="h6">
          Get started by connecting to your MetaMask Wallet with the icon in the
          top right{" "}
          <span role="img" alt="arrow">
            ↗
          </span>
        </Typography>
      </main>
    </div>
  );
}
