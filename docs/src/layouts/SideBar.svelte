<script lang="ts">
	import { versionsMap } from "@lib/versions.ts";
	import type { CollectionEntry } from "astro:content";

    export let entry: CollectionEntry<"reactDocs" | "solidDocs" | "commonDocs">;
    export let basePath: "/docs/react" | "/docs/solid" | "/docs";
    export let entries: Record<string, CollectionEntry<"reactDocs" | "solidDocs" | "commonDocs">[]>;
    const categories = Object.keys(entries).sort();
    const library = versionsMap[basePath].lib;
    const version = versionsMap[basePath].version;
</script>

{#if library}
    <p class="text-on-surface-variant py-3 text-sm tracking-widest ml-1">
        {library}
        {#if version}v{version}{/if}
    </p>
{/if}
{#each categories as category}
    {#if category}
        <p class="text-on-surface-variant py-3 text-xs tracking-widest ml-4 uppercase">{category}</p>
    {/if}
    {#each entries[category].sort((a, b) => a.data.title.localeCompare(b.data.title)) as e}
        <ul>
            <li
                class={
                    `pr-1.5 py-1.5 relative rounded-md text-on-surface-variant
                    before:w-0.25 before:block before:absolute duration-150
                    before:left-4 before:top-0 ` +
                    (e.id == entry.id
                        ? "before:bg-primary/50 bg-secondary-container/30 hover:bg-secondary-container/60 hover:before:bg-primary/70 "
                        : "before:bg-surface-container-highest hover:bg-surface-container-low hover:text-on-background")
                    + 
                    (category ? " before:h-full pl-9" : " pl-4")
                }
            >
                <a href={'redirect' in e.data ? e.data.redirect : `${basePath}/${e.id}`} class="w-full h-full relative inline-block">
                    {e.data.title}
                </a>
            </li>
        </ul>
    {/each}
{/each}