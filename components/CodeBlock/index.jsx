import { CodeBlock as ReactCodeBlock, monokai } from "react-code-blocks";

export default function CodeBlock({ code, startingLineNumber }) {
  return (
    <div style={{ paddingBottom: "24px" }}>
      <ReactCodeBlock
        text={code}
        language="jsx"
        startingLineNumber={startingLineNumber}
        theme={monokai}
      />
    </div>
  );
}
