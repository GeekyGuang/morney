<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateNumberPad"/>
    <Types @update:value="onUpdateType"/>
    <notes @update:value="onUpdateNotes"/>
    <tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';

@Component({
      components: {Tags, Notes, Types, NumberPad}
    }
)
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];

  onUpdateTags(selectedTags: string[]) {
    console.log(selectedTags);
  }

  onUpdateNotes(notes: string) {
    console.log(notes);
  }

  onUpdateType(type: string) {
    console.log(type);
  }

  onUpdateNumberPad(number: string) {
    console.log(number);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>


