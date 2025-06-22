import commonjs from "@rollup/plugin-commonjs";
import { exec } from "child_process";
import json from "@rollup/plugin-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import preserveDirectives from "rollup-plugin-preserve-directives";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import tailwindcss from "@tailwindcss/postcss";
import tailwindConfig from "./tailwind.config.js";

const outputOptions = {
    sourcemap: false,
    preserveModules: true,
    preserveModulesRoot: "src",
};

const tscAlias = () => {
    return {
        name: "tsAlias",
        writeBundle: () => {
            return new Promise((resolve, reject) => {
                exec("tsc-alias", function callback(error, stdout, stderr) {
                    if (stderr || error) {
                        reject(stderr || error);
                    } else {
                        resolve(stdout);
                    }
                });
            });
        },
    };
};

export default [
    {
        input: ["src/index.ts"],
        output: [
            {
                dir: "dist",
                format: "esm",
                entryFileNames: "[name].mjs",
                ...outputOptions,
            }
        ],
        external: ["clsx", "react", "motion", "tslib", "date-fns", "react-dom", "@babel/runtime"],
        plugins: [
            peerDepsExternal(),
            json(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: "./tsconfig.json",
            }),
            postcss(),
            typescriptPaths(),
            preserveDirectives(),
            terser({ compress: { directives: false } }),
            tscAlias(),
        ],
        onwarn(warning, warn) {
            if (warning.code !== "MODULE_LEVEL_DIRECTIVE") {
                warn(warning);
            }
        },
    },
    {
        input: "src/styles/main.css",
        output: [{ file: "dist/index.css", format: "es" }],
        plugins: [
            postcss({
                extract: true,
                minimize: true,
                plugins: [tailwindcss(tailwindConfig)],
            }),
        ],
    },
];
