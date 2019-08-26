<template>
  <Modal
    v-model="flag_"
    :footer-hide="true"
    width="70%"
    @on-visible-change="on_visible_change"
    :title="`答题记录(${questions.length})`">

    <div v-if="questions.length">
      <QAHistoryItem v-for="(item, i) in questions" :value="item" :index="i+1"></QAHistoryItem>
    </div>
    <div v-else class="qa-wrapper no-data">
      <Icon class="icon" type="ios-information-circle" />
      <div class="content">没有查询到相关记录</div>
    </div>

  </Modal>
</template>

<script>
  import * as questionRequest from '../../request/question'
  import QAHistoryItem from "./QAHistoryItem"
  export default {
    data() {
      return {
        flag_: false,
        questions: []
      }
    },
    props: {
      flag: false
    },
    methods:{
      on_visible_change(val) {
        this.flag_ = val
        this.$emit('changeStatus', val)
      }
    },
    created() {
      this.flag_ = this.flag
      // 获取历史记录
    },
    watch: {
      flag: function(val) {
        this.flag_ = val
        if(val)
          questionRequest.getHistory(this)
      }
    },
    components: {
      QAHistoryItem
    }
  }
</script>

<style scoped>
  .qa-wrapper.no-data {
    padding-top: 80px;
    padding-bottom: 80px;
    text-align: center;
    color: gray;
  }
  .qa-wrapper.no-data .icon {
    font-size: 40px;

  }
  .qa-wrapper.no-data .content {
    margin-top: 12px;
    font-size: 16px;
  }
</style>