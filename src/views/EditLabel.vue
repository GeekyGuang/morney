<template>
  <layout>
    <div>
      <icon name="left"/>
      <span>编辑标签</span>
    </div>
    <FormItem field-name="标签" place-holder="请输入标签名"/>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue'
import FormItem from '@/components/money/FormItem.vue'
import {Component} from 'vue-property-decorator'
import tagListModel from '@/models/tagListModel';
@Component({
  components:{FormItem}
})
export default class EditLabel extends Vue{
  created(){
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace('/404');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>