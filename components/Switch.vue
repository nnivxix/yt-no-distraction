<script lang="ts" setup>
import { defineModel, defineOptions } from "vue";

const modelValue = defineModel<boolean>("modelValue");

defineOptions({
  inheritAttrs: false,
});
</script>
<template>
  <label class="switch">
    <input type="checkbox" v-model="modelValue" @click.stop v-bind="$attrs" />
    <span class="slider round"></span>
  </label>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: red;
}

input:focus + .slider {
  box-shadow: 0 0 1px red;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
