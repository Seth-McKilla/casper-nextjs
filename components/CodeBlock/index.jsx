import { CodeBlock as ReactCodeBlock, monokai } from "react-code-blocks";

function CodeBlock({ code, startingLineNumber, language }) {
  return (
    <div style={{ paddingBottom: "24px" }}>
      <ReactCodeBlock
        text={code}
        language={language}
        startingLineNumber={startingLineNumber}
        theme={monokai}
      />
    </div>
  );
}

CodeBlock.defaultProps = {
  language: "jsx",
};

export default CodeBlock;
