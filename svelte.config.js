import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      base: process.env.NODE_ENV === "production" ? "/simple_wood_working" : "",
      pages: "build",
      assets: "build",
      fallback: null,
      precompress: false,
      strict: true,
    }),
  },
};

export default config;
