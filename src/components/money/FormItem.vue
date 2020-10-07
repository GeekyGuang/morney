<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input type="text" v-model="value" :placeholder="placeHolder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  value = '';
  @Prop({required: true}) fieldName!: string;
  @Prop() placeHolder?: string;
  @Watch('value')
  onValueChanged(val: string) {
    this.$emit('update:value', val);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: flex;
  padding-left: 16px;
  align-items: center;

  > .name {
    padding-right: 16px;
  }

  input {
    height: 64px;
    background-color: transparent;
    border: none;
    padding-right: 16px;
    flex-grow: 1;
  }
}
</style>