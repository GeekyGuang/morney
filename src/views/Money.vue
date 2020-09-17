<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <type/>
    <notes/>
    <tags/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/money/numberPad.vue';
import Type from '@/components/money/type.vue';
import Notes from '@/components/money/notes.vue';
import Tags from '@/components/money/tags.vue';
export default {
  name: 'Money',
  components: {Tags, Notes, Type, NumberPad},
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>


