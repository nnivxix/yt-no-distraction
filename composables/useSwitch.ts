import { ref } from "vue";
import { browser } from "wxt/browser";

const useSwitch = () => {
  const switchValue = ref(false);
  const toggleSwitch = async () => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tabs.length > 0) {
      const currentTab = tabs[0];

      // Uncomment this if you want to restrict the extension to only work on YouTube watch pages
      // if (!currentTab.url?.includes("youtube.com/watch")) {
      //   console.error("Not a YouTube watch page.");
      //   switchValue.value = false;
      //   return;
      // }

      if (currentTab.id) {
        await browser.scripting.executeScript({
          target: { tabId: currentTab.id },
          func: (isCheckedValue: boolean) => {
            // This function runs in the context of the page
            const secondaryId = document.getElementById("secondary");

            if (!secondaryId) {
              console.error("Element with ID 'secondary' not found.");
              return;
            }

            if (isCheckedValue) {
              secondaryId.style.display = "none";
            } else {
              secondaryId.style.removeProperty("display");
            }
          },
          args: [switchValue.value],
        });
      }
    }
  };
  return {
    switchValue,
    toggleSwitch,
  };
};

export default useSwitch;
