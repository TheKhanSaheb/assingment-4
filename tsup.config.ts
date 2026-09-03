import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["cjs"],
  target: "node20",
  platform: "node",
  outDir: "dist",
  bundle: true,
  minify: true,
});