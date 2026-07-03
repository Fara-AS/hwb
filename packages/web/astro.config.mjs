import { defineConfig } from "astro/config";
import remarkMermaid from "./src/plugins/mermaid";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  markdown: {
    remarkPlugins: [remarkMermaid],
  },
});
