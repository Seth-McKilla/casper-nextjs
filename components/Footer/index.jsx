import React from "react";
import styles from "./index.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        Made with{" "}
        <span role="img" alt="heart">
          ❤️
        </span>{" "}
        by{" "}
        <a
          href="https://github.com/Seth-McKilla"
          target="_blank"
          rel="noopener noreferrer"
        >
          Seth
        </a>
      </div>
    </footer>
  );
}
