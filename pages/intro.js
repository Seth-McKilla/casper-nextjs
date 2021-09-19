import styles from "../styles/Home.module.css";
import { useContext } from "react";
import { Context } from "../context";

// Mui
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Intro() {
  const { state } = useContext(Context);

  return (
    <Container className={styles.container}>
      <Typography variant="h6">{`Hey there ${state.user}!`}</Typography>
    </Container>
  );
}
