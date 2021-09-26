import logo from "../../public/logo.png";

// Next
import Image from "next/image";

// Mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const styles = {
  marginBottom: "3rem",
  zIndex: 2,
  borderRadius: "15%",
  backgroundColor: "rgba(0, 0, 0, 1)",
  boxShadow: "0 10px 15px 0px rgba(0, 0, 0, 0.8)",
  width: "250px",
  animation: "logo-float 5s ease-in-out infinite",
  "@keyframes logo-float": {
    "0%": {
      boxShadow: "0 10px 15px 0px rgba(0, 0, 0, 0.8)",
      transform: "translatey(0px)",
    },
    "50%": {
      boxShadow: "0 35px 15px 0px rgba(0, 0, 0, 0.4)",
      transform: "translatey(-25px)",
    },
    "100%": {
      boxShadow: "0 10px 15px 0px rgba(0, 0, 0, 0.8)",
      transform: "translatey(0px)",
    },
  },
};

export default function Logo() {
  return (
    <Grid item xs={12}>
      <Box sx={styles}>
        <Image width={250} height={250} src={logo} alt="casper-nextjs-logo" />
      </Box>
    </Grid>
  );
}
