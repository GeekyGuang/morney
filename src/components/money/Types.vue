<template>
  <ul class="type">
    <li :class="type === '-' && 'selected' " @click="selectType('-')">支出</li>
    <li :class="type === '+' && 'selected' " @click="selectType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component} from 'vue-property-decorator'

@Component
export default class Types extends Vue {
  type = '-';

  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.type = type;
  }

}
</script>

<style lang="scss" scoped>
.type {
  background: #c4c4c4;
  display: flex;
  text-align: center;

  li {
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected {
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 4px;
        width: 100%;
        background: lighten(#333, 30%);
      }
    }
  }

}
</style>