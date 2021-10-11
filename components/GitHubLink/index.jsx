import React from "react";
import Link from "next/link";

// MUI
import { IconButton } from "@mui/material";

// Components
import GitHubIcon from "./GitHubIcon";

export default function GitHubLink({ link }) {
  return (
    <Link href={link} passHref>
      <IconButton sx={{ maxWidth: 65 }}>
        <GitHubIcon />
      </IconButton>
    </Link>
  );
}
