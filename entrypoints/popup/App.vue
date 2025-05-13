<script lang="ts" setup>
import { ref } from "vue";
import { browser } from "wxt/browser";
import Switch from "@/components/Switch.vue";

const isChecked = ref(false);

const handleClick = async () => {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tabs.length > 0) {
    const currentTab = tabs[0];

    if (!currentTab.url?.includes("youtube.com/watch")) {
      console.error("Not a YouTube watch page.");
      isChecked.value = false;
      return;
    }

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
            secondaryId.style.display = "block";
          }
        },
        args: [isChecked.value],
      });
    }
  }
};
</script>

<template>
  <div>
    <h1>Toggle YouTube Sidebar</h1>
    <div class="switch-container">
      <Switch v-model="isChecked" @click="handleClick" id="switch" />
      <label for="switch">Hide Sidebar</label>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 20px;
}

.switch-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 10px;

  label {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
