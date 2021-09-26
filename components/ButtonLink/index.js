import * as React from "react";

// Next
import Link from "next/link";

// Components
import { Button } from "..";

const ButtonRef = React.forwardRef(({ onClick, href, text }, ref) => {
  return (
    <Button
      variant="contained"
      size="large"
      href={href}
      onClick={onClick}
      ref={ref}
    >
      {text}
    </Button>
  );
});

ButtonRef.displayName = "ButtonRef";

export default function ButtonLink({ href, text }) {
  return (
    <Link href={href} passHref>
      <ButtonRef text={text} />
    </Link>
  );
}
