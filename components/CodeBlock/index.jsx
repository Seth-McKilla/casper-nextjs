import styles from "./index.module.css";
import { CodeBlock as ReactCodeBlock, monokai } from "react-code-blocks";

export default function CodeBlock({ code, startingLineNumber }) {
  return (
    <div className={styles.container}>
      <ReactCodeBlock
        text={code}
        language="jsx"
        startingLineNumber={startingLineNumber}
        theme={monokai}
      />
    </div>
  );
}
