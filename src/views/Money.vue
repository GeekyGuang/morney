<template>
  <div class="money-wrapper">
    <div class="money">
      Money.vue
    </div>
    <Nav/>
  </div>

</template>

<script lang="ts">
export default {
  name: 'Money',
};
</script>

<style lang="scss" scoped>
.money {
  border: 1px solid green;
  overflow: auto;
  flex-grow: 1;
}

.money-wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>