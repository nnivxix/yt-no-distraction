import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue"],
  manifest: {
    name: "YT No Distraction",
    description: "A YouTube extension that removes distractions.",
    version: "1.0.0",
    host_permissions: ["<all_urls>"],
    permissions: ["activeTab", "tabs", "scripting"],
  },
});
