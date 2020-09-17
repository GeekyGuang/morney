<template>
    <ul class="type">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
</template>

<script lang="ts">
export default {
name: "type"
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
        background: #333;
      }
    }
  }

}
</style>