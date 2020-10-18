<template>
  <button class="button" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
@Component
export default class Button extends Vue{

}
</script>

<style lang="scss" scoped>
.button {
  background: #f60;
  border: none;
  padding: 0 16px;
  height: 40px;
  color: white;
  border-radius: 4px;
}
</style>