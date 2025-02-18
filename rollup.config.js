import typescript from "@rollup/plugin-typescript";
import cleanup from "rollup-plugin-cleanup";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "es",
  },
  plugins: [
    typescript(),
    cleanup({ comments: "jsdoc", extensions: ["js", "ts"] }),
  ],
};
