import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
const reactDocs = defineCollection({
	loader: glob({ pattern: ["**/*.mdx"], base: "./src/content/docs/react" }),
	schema: z.object({
		title: z.string(),
		description: z.string()
	})
});
const solidDocs = defineCollection({
	loader: glob({ pattern: ["**/*.mdx"], base: "./src/content/docs/solid" }),
	schema: z.object({
		title: z.string(),
		description: z.string()
	})
});
export const collections = {
	reactDocs,
	solidDocs
};
