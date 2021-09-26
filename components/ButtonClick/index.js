// Components
import { Button } from "..";

export default function ButtonClick({ text, onClick, loading }) {
  return (
    <Button
      variant="contained"
      size="large"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Loading..." : text}
    </Button>
  );
}
