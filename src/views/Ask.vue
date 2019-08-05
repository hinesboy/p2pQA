<template>
  <div>
    <Card class="ask-wrapper">
      <Input size="large" class="ask-input" @on-search="$click_search_question" v-model="question" search enter-button="提问" placeholder="输入问题"/>
    </Card>

    <div class="ask-histroy-wrapper">
      <div class="condition-wrapper">
        <div style="font-size: 14px;line-height: 20px;color: rgba(0,0,0,0.7);margin-top: 5px"><Icon style="font-size: 20px;margin-right: 3px;vertical-align: top" type="ios-timer-outline" />提问记录({{querylist.length}})</div>
        <Dropdown class="qa-type-dropdown" @on-click="$click_qa_type" trigger="click">
          <a style="cursor: pointer">
            {{qaType[qaStatus]}}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="all">全部</DropdownItem>
            <DropdownItem name="1">已有结果</DropdownItem>
            <DropdownItem name="2">已采纳</DropdownItem>
            <DropdownItem name="0">尚无结果</DropdownItem>
          </DropdownMenu>
        </Dropdown>

      </div>
      <div v-if="querylist.length && hasQuestion()" class="qa-wrapper">
        <QAItem @rejectAnswer="rejectAnswer" @acceptAnswer="acceptAnswer" v-show="qaStatus == 'all' || item.status == qaStatus" :value="item" :index="i + 1" v-for="(item,i) in querylist"></QAItem>
      </div>
      <div v-else class="qa-wrapper no-data">
        <Icon class="icon" type="ios-information-circle" />
        <div class="content">没有查询到相关问题</div>
      </div>
    </div>
  </div>

</template>

<script>
  import Cookies from 'js-cookie'
  import QAItem from '../components/qa/QAItem'
  import * as questionRequest from '../request/question'
  export default {
    data() {
      return {
        question: '',
        qaType: {
          'all': '全部',
          '0': '尚无结果',
          '1': '已有结果',
          '2': '已采纳'
        },
        qaStatus: 'all',
        querylist: []
      }
    },
    methods: {
      hasQuestion() {
        if (this.qaStatus == 'all') {
          return true
        }
        for (var i =0; i < this.querylist.length ; i ++) {
          if (this.querylist[i].status == this.qaStatus) {
            return true
          }
        }
        return false
      },
      $click_qa_type(val) {
        this.qaStatus = val
      },
      $click_search_question(val){
        if(!val || val.length < 4) {
          this.$Message.warning("请输入完整问题")
          return
        }
        if (this.isQuestionExist(val)) {
          this.$Message.warning("类似的问题已存在，请勿重复提问")
          return
        }
        questionRequest.searchQuestion(this)
      },

      // TODO 相似语句检测
      isQuestionExist(val) {
        for (var i =0; i < this.querylist.length ; i ++) {
          if (this.querylist[i].question == val) {
            return true
          }
        }
        return false
      },
      rejectAnswer(questionindex, answerindex) {
        this.querylist[questionindex-1].answers.splice(answerindex, 1)
      },
      acceptAnswer(questionindex, answerindex) {
        this.querylist[questionindex-1].status = 2
        for (var i = 0; i < this.querylist[questionindex -1].answers.length; i++) {
          if (i != answerindex) {
            this.querylist[questionindex-1].answers.splice(i, 1)
          }
        }
      }
    },
    created() {
      if (!Cookies.get('activeFlag')) {
        // 尚未登陆
        this.$router.push("/login")
      }
      questionRequest.getQuestionHistory(this)
    },
    components: {
      QAItem
    }
  }
</script>
<style scoped lang="css">
  .ask-wrapper {
    position: absolute;
    top: 15px;
    height: 120px;
    right: 12px;
    left: 12px;
  }

  .ask-input {
    width: 80%;
    max-width: 800px;
    min-width: 200px;
    margin: 25px auto;
  }
  .qa-wrapper.no-data {
    padding-top: 100px;
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
  .ask-histroy-wrapper {
    position: absolute;
    top: 145px;
    bottom: 12px;
    right: 12px;
    left: 12px;
    background: #fff;
    overflow-y: auto;
  }

  .condition-wrapper {
    padding: 10px 12px;
    position: relative;
    height: 40px;
  }
  .condition-wrapper .qa-type-dropdown {
    position: absolute;
    right: 30px;
    top: 15px;
  }
</style>
