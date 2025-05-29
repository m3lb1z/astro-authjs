// @ts-check
import { defineConfig } from "astro/config";

import auth from "auth-astro";

import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [auth(), db()],
  vite: {
    plugins: [tailwindcss()],
  },
});