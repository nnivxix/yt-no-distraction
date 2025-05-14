import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue"],
  manifest: {
    name: "YT No Distraction",
    // browser_specific_settings: {
    //   gecko: {
    //     id: "{b4510bfd-f252-4447-b922-52ec94f7a4f6}",
    //     strict_min_version: "109.0",
    //   },
    // },
    description: "A YouTube extension that removes distractions.",
    version: "0.2",
    host_permissions: ["<all_urls>"],
    permissions: ["activeTab", "tabs", "scripting", "storage"],
  },
});
