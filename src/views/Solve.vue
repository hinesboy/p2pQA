<template>
  <div class="solve-histroy-wrapper">
    <AutoComplete
      class="ask-input"
      v-model="question"
      :data="questionData"
      @on-search="handleSearch"
      placeholder="检索问题">
    </AutoComplete>
    <Button @click="$click_search" class="question-search-btn" type="primary">搜索</Button>
    <QAhistroy @changeStatus="changeStatus" :flag="histroyFlag"></QAhistroy>
    <Button @click="$click_answer_history" class="answer-history" type="primary" icon="ios-timer-outline">答题记录</Button>
    <div v-if="questions.length" class="qa-wrapper">
      <QItem  v-show="isShowQA(item)" :value="item" :index="i + 1" v-for="(item,i) in questions"></QItem>
    </div>

    <div v-else class="qa-wrapper no-data">
      <Icon class="icon" type="ios-information-circle" />
      <div class="content">没有查询到相关问题</div>
    </div>
  </div>
</template>

<script>
  import * as questionRequest from '../request/question'
  import QItem from '../components/qa/QItem'
  import QAhistroy from "../components/qa/QAhistroy"
  import Cookies from 'js-cookie'
  export default {
    data() {
      return {
        question_: '',
        question: '',
        questions: [],
        questionData: [],
        histroyFlag: false
      }
    },
    methods: {
      isShowQA(item) {
        if (!this.question_ || !item.question) {
          return true
        }
        if (item.question.indexOf(this.question_) !== -1) {
          return true
        }
        return false
      },
      handleSearch (value) {
        this.questionData = []
        if (!value) {
          return
        }
        this.questions.forEach(element => {
          if(element.question && element.question.indexOf(value) !== -1) {
            this.questionData.push(element.question)
          }
        })
      },
      $click_search() {
        this.question_ = this.question
      },
      $click_answer_history() {
        this.histroyFlag = true
      },
      changeStatus(val) {
        this.histroyFlag = val
      }
    },
    created() {
      if(!Cookies.get('activeFlag')) {
        // 尚未登陆
        this.$router.push("/login")
      }
      questionRequest.getQuestions(this)
    },
    components: {
      QItem,
      QAhistroy
    }
  }
</script>
<style scoped lang="css">
  .solve-histroy-wrapper {
    position: absolute;
    top: 10px;
    bottom: 10px;
    right: 8px;
    left: 8px;
    background: #fff;
  }
  .ask-input {
    position: absolute;
    width: 350px;
    top: 10px;
    left: 12px;
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
  .question-search-btn {
    position: absolute;
    top: 10px;
    left: 368px;
  }
  .answer-history {
    position: absolute;
    top: 10px;
    right: 15px;
  }
  @media screen and (max-width: 762px) {
    .ask-input {
      width: 150px;
    }
    .question-search-btn {
      left: 168px;
    }
  }

  .qa-wrapper {
    position: absolute;
    top: 65px;
    width: 100%;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    border-top: 1px solid #eeece8;
  }
</style>
