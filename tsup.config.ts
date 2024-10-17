import { defineConfig } from "tsup";
import { esbuildPluginVersionInjector } from "esbuild-plugin-version-injector";

export default defineConfig({
  entry: ["./src/index.ts"],
  external: [],
  noExternal: [],
  platform: "node",
  format: ["cjs", "esm"],
  target: "es2018",
  skipNodeModulesBundle: true,
  clean: true,
  minify: false,
  terserOptions: {
    mangle: false,
    keep_classnames: true,
    keep_fnames: true,
  },
  splitting: false,
  keepNames: true,
  dts: true,
  sourcemap: true,
  treeshake: false,
  esbuildPlugins: [esbuildPluginVersionInjector()],
  outDir: "dist",
});
