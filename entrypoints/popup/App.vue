<script lang="ts" setup>
import useSwitch from "@/composables/useSwitch";
import { browser } from "wxt/browser";
import Switch from "@/components/Switch.vue";
import { onMounted, ref, watch } from "vue";

const switchLocale = ref(false);

onMounted(async () => {
  const data = await browser.storage.local.get("show");
  switchLocale.value = data.show === "yes" ? true : false;
});

const { switchValue, toggleSwitch } = useSwitch(switchLocale);

watch(switchValue, async (newValue) => {
  await browser.storage.local.set({ show: newValue ? "yes" : "no" });
});
</script>

<template>
  <div>
    <h1>Toggle YouTube Sidebar</h1>
    <div class="switch-container">
      <Switch v-model="switchValue" @click="toggleSwitch" id="switch" />
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
