<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="item in dataSource"
          :class="{selected: selectedTags.indexOf(item) >= 0}"
          @click="toggle(item)"
          :key="item">{{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop(Array) readonly dataSource: string[] | undefined;
  selectedTags: string[] = [];

  @Watch('selectedTags')
  onSelectedTagsChanged(val) {
    this.$emit('update:value', val);
  }

  toggle(tag) {
    const index = this.selectedTags.indexOf(tag);
    if (index < 0) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
  }

  createTag() {
    const tag = window.prompt('请输入标签名');
    if (tag === null) {return;}
    if (tag.trim() === '') {
      window.alert('标签名不能为空');
    } else if (this.dataSource.indexOf(tag.trim()) >= 0) {
      window.alert(`"${tag.trim()}"标签已存在`);
    } else {
      this.$emit('update:dataSource', [...this.dataSource, tag]);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      background: #d9d9d9;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;

      &.selected {
        background: #f60;
        color: white;
      }
    }

  }

  > .new {
    padding-top: 12px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>