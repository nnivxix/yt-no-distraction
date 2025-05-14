import { browser } from "wxt/browser";

export const executeScript = (tabId: number, isCheckedValue: boolean) => {
  browser.scripting
    .executeScript({
      target: { tabId: tabId },
      func: (isChecked) => {
        // Use a more robust way to wait for the element
        const findElement = () => {
          const secondaryId = document.getElementById("secondary");
          if (!secondaryId) {
            console.log("Element not found, will retry...");
            setTimeout(findElement, 500);
            return;
          }

          if (isChecked) {
            secondaryId.style.display = "none";
          } else {
            secondaryId.style.removeProperty("display");
          }
        };

        findElement();
      },
      args: [isCheckedValue],
    })
    .catch((err) => console.error("Failed to execute script:", err));
};

export const executeTab = (isCheckedValue: boolean) =>
  browser.tabs
    .query({
      active: true,
      currentWindow: true,
    })
    .then((tabs) => {
      if (tabs.length > 0) {
        const currentTab = tabs[0];
        if (currentTab.id) {
          executeScript(currentTab.id, isCheckedValue);
        }
      }
    })
    .catch((error) => {
      console.error("Error querying tabs: ", error);
    });
