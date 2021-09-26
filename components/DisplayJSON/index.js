import styles from "./index.module.css";
import JSONPretty from "react-json-pretty";

// Mui
import Paper from "@mui/material/Paper";

const theme = {
  main: "line-height:1.3;color:#66d9ef;",
  error: "line-height:1.3;color:#66d9ef;",
  key: "color:#f92672;",
  string: "color:#fd971f;",
  value: "color:#a6e22e;",
  boolean: "color:#ac81fe;",
};

export default function DisplayJSON({ buttonName, loading, data }) {
  const defaultMessage = `Click the "${buttonName}" button above to display the results here.`;
  return (
    <Paper elevation={10} className={styles.container}>
      <JSONPretty
        id="json-pretty"
        data={loading ? "Loading..." : data || defaultMessage}
        theme={theme}
      />
    </Paper>
  );
}
