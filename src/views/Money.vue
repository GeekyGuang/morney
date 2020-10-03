<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :type.sync="record.type"/>
    <notes @update:value="onUpdateNotes"/>
    <tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';

const {model} = require('@/model.js');

type Record = {
  tags: string[];
  type: string;
  notes: string;
  amount: number;
  createTime: Date;
}

@Component({
      components: {Tags, Notes, Types, NumberPad}
    }
)
export default class Money extends Vue {
  tags: string[] = ['衣', '食', '住', '行'];
  record: Record = {tags: [], type: '-', notes: '', amount: 0, createTime: new Date()};

  recordList: Record[] = model.fetch();

  onUpdateTags(selectedTags: string[]) {
    this.record.tags = selectedTags;
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  saveRecord() {
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    record2.createTime = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChanged() {
    model.save(this.recordList)
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>


