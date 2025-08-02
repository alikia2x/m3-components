import { type Options, defineConfig } from "tsup";

function generateConfig(jsx: boolean): Options {
	return {
		target: "esnext",
		platform: "browser",
		format: "esm",
		clean: true,
		dts: jsx,
		entry: ["./lib/index.ts"],
		outDir: "dist/",
		treeshake: true,
		replaceNodeEnv: true,
		esbuildOptions(options) {
			if (jsx) {
				options.jsx = "preserve";
			}
			options.chunkNames = "[name]/[hash]";
			options.drop = ["console", "debugger"];
		},
		outExtension() {
			return jsx ? { js: ".jsx" } : {};
		}
	};
}

export default defineConfig([generateConfig(true)]);
