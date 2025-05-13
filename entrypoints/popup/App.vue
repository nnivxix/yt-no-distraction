<script lang="ts" setup>
import useSwitch from "@/composables/useSwitch";
import Switch from "@/components/Switch.vue";

const { switchValue, toggleSwitch } = useSwitch();
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
