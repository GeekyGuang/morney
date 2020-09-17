<template>
  <div class="content-wrapper">
    <div class="content" :class="`${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
  props:['classPrefix']
};
</script>

<style lang="scss" scoped>
.content {
  overflow: auto;
  flex-grow: 1;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>