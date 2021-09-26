// Mui
import { styled } from "@mui/material/styles";
import { default as MuiButton } from "@mui/material/Button";

const Button = styled(MuiButton)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  height: theme.spacing(6),
  fontSize: theme.spacing(2),
  borderRadius: theme.spacing(3),
}));

export default Button;
