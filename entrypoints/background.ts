import { executeScript, executeTab } from "@/utils/browser";

export default defineBackground(() => {
  let isShow = false;

  browser.storage.local.get("show").then((result) => {
    const showValue = result.show;
    if (showValue === undefined) {
      browser.storage.local.set({ show: "no" });
      isShow = false;
    } else {
      isShow = showValue === "yes";
    }
    executeTab(isShow);
  });

  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only run when the page is fully loaded and URL contains youtube
    if (changeInfo.status === "complete") {
      // Get latest setting from storage before applying
      browser.storage.local.get("show").then((result) => {
        isShow = result.show === "yes";
        setTimeout(() => {
          executeScript(tabId, isShow);
        }, 1500);
      });
    }
  });
});
