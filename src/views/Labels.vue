<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tags" :key="tag"><span>{{ tag }}</span>
        <icon name="right"/>
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新增标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

tagListModel.fetch();
@Component
export default class Labels extends Vue {
  tags = tagListModel.data;

  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        window.alert('标签名已存在');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  padding-left: 16px;
  font-size: 16px;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    min-height: 44px;

    svg {
      margin-right: 14px;
      width: 18px;
      height: 18px;
      color: #666;
    }
  }
}

.createTag {
  background: #f60;
  border: none;
  padding: 0 16px;
  height: 40px;
  color: white;
  border-radius: 4px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }

}
</style>