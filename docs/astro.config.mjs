// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import solidJs from "@astrojs/solid-js";
import tsconfigPaths from "vite-tsconfig-paths";

import mdx from "@astrojs/mdx";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss(), tsconfigPaths()],
        ssr: {
            noExternal: ["@m3-components/react"]
        }
    },
    integrations: [react({ include: ["**/react/*"] }), solidJs({ exclude: ["**/react/*"] }), mdx(), svelte()]
});