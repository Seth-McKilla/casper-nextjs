import JSONPretty from "react-json-pretty";

// Mui
import Paper from "@mui/material/Paper";

const paperStyle = {
  height: "500px",
  overflowY: "scroll",
  backgroundColor: "#272822",
  padding: "24px",
  marginBottom: "24px",
};

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
    <Paper elevation={10} sx={paperStyle}>
      <JSONPretty
        id="json-pretty"
        data={loading ? "Loading..." : data || defaultMessage}
        theme={theme}
      />
    </Paper>
  );
}
