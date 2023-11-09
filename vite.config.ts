import { defineConfig } from "vite";
import path from "path";
// import { ZeroEnv } from "@zrcode/vite-zero-env-plugin";
import { ZeroEnv } from "./src/index";
export default defineConfig({
  plugins: [ZeroEnv({})],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "vite-zero-env-plugin",
      fileName: (format) => `vite-zero-env-plugin.${format}.js`,
      formats: ["umd"],
    },
  },
});
