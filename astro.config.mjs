// @ts-check
import { defineConfig } from "astro/config";

import auth from "auth-astro";

import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [auth()],
  vite: {
    plugins: [tailwindcss()],
  },
});
