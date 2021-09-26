import _ from "lodash";

// Mui
import Stack from "@mui/material/Stack";

// Components
import { ButtonLink } from "..";

const stackStyles = {
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  marginTop: "16px",
};

export default function NavLinks() {
  const pages = ["signer-connect", "get-block-state", "update-string"];

  return (
    <Stack direction="row" spacing={2} sx={stackStyles}>
      {pages.map((page) => (
        <div key={page}>
          <ButtonLink href={`/${page}`} text={_.startCase(page)} />
        </div>
      ))}
    </Stack>
  );
}
