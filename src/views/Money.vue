<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :type.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" place-holder="请输入备注" @update:value="onUpdateNotes"/>
    </div>

    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tags from '@/components/money/Tags.vue';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const tags = tagListModel.fetch();
const recordList = recordListModel.fetch();

@Component({
      components: {Tags, FormItem, Types, NumberPad}
    }
)
export default class Money extends Vue {
  tags = tags;
  record: RecordItem = {tags: [], type: '-', notes: '', amount: 0, createTime: new Date()};

  recordList = recordList;

  onUpdateTags(selectedTags: string[]) {
    this.record.tags = selectedTags;
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createTime = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChanged() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
  background: #fff;
}

.notes {
  padding: 12px 0;
  background: #f5f5f5;
}
</style>


