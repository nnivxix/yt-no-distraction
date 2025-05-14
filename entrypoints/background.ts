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
    executeTab(isShow); // ✅ jalankan setelah nilai isShow didapat
  });

  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only run when the page is fully loaded and URL contains youtube
    if (changeInfo.status === "complete") {
      // Get latest setting from storage before applying
      browser.storage.local.get("show").then((result) => {
        isShow = result.show === "yes";
        executeTab(isShow);
        setTimeout(() => {
          executeScript(tabId, isShow);
        }, 1500);
      });
    }
  });

  const executeScript = (tabId: number, isCheckedValue: boolean) => {
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

  const executeTab = (isCheckedValue: boolean) =>
    browser.tabs
      .query({
        active: true,
        currentWindow: true,
      })
      .then((tabs) => {
        if (tabs.length > 0) {
          const currentTab = tabs[0];
          if (currentTab.id) {
            browser.scripting
              .executeScript({
                target: { tabId: currentTab.id },
                func: (isChecked: boolean) => {
                  const secondaryId = document.getElementById("secondary");

                  if (!secondaryId) {
                    console.error("Element with ID 'secondary' not found.");
                    return;
                  }

                  if (isChecked) {
                    secondaryId.style.display = "none";
                  } else {
                    secondaryId.style.removeProperty("display");
                  }
                },
                args: [isCheckedValue],
              })
              .catch((err) => console.error("Failed to execute script:", err));
          }
        }
      })
      .catch((error) => {
        console.error("Error querying tabs: ", error);
      });
});
