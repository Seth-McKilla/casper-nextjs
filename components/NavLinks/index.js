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
  zIndex: 10,
};

export default function NavLinks() {
  const pages = [
    "contract-setup",
    "get-block-state",
    "update-key-value",
    "signer-connect",
  ];

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
