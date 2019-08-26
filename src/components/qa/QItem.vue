<template>
  <card  class="qa-item-wrapper">
    <div @click="$click_answer" class="question-wrapper">
      <div class="qa icon q">Q<span style="font-size: 12px">{{index}}</span></div>
      <div class="qa text q">{{value.question}}</div>
      <div class="qa user q"><span class="nickname">{{value.user}}</span>{{value.time.substring(0, value.time.length - 3)}}</div>
    </div>
    <div v-if="answerFlag && answers.length" v-for="(item,i) in answers">
      <div style="width: 95%;border-top: 1px dashed #e1e1e1;margin: 10px auto;"></div>
      <div  class="answer-wrapper">
        <div class="answer-item">
          <div class="qa icon a">A<span style="font-size: 12px">{{i+1}}</span></div>

          <div class="qa text a">{{item.answer}}</div>
          <div class="qa user a"><span class="nickname">{{item.user}}</span>{{item.answertime.substring(0, item.answertime.length - 3)}}</div>
        </div>
        <div class="answer-status agree">
          <Tooltip content="赞同该答案" theme="light">
            <div @click="$click_follow(item, i)" :class="{'active': isFollow && followIndex == i}" class="qa follow"><Icon class="follow-icon" type="ios-thumbs-up-outline"></Icon> <span>{{item.follow}}</span></div>
          </Tooltip>
        </div>

      </div>
    </div>
    <div v-if="answerFlag && !isFollow">
      <div style="width: 95%;border-top: 1px dashed #e1e1e1;margin: 10px auto;"></div>
      <div  class="answer-wrapper answer">
        <Input :disabled="!isAnswer"  v-model="answer" type="textarea" :rows="4" placeholder="回答..." />

        <div v-if="isAnswer" class="answer-status answer">
          <Button style="margin-right: 8px"  @click="$click_answer" type="error" >关闭</Button>
          <Button  @click="$click_submit" type="success" >提交</Button>
        </div>

      </div>
    </div>
  </card>
</template>

<script>
  import * as questionRequest from '../../request/question'
  export default {
    data() {
      return {
        followIndex: 0,
        isFollow: false,
        answer: '',
        answerFlag: false,
        isAnswer: true,
        answers: []
      }
    },
    name: "QAItem",
    props: {
      value: {
        type: Object,
        default () {
          return {
            question: ""
          }
        }
      },
      index: 0
    },
    methods:{
      $click_follow(item, i) {
        if (this.isFollow)
          return
        questionRequest.followAnswer(this, item.answerid, i)
      },
      $click_answer() {
        this.answerFlag = !this.answerFlag
      },
      $click_submit() {
        if (!this.answer) {
          this.$Message.warning("请输入完整回答")
          return
        }
        this.$Modal.confirm({
          title: '提示',
          content:
            '<p style="font-size: 15px">确定提交该回答吗？</p>',
          onOk: () => {
            questionRequest.answerQuestion(this)
          }
        })
      }
     /* $click_accept(id, i) {
        this.$Modal.confirm({
          title: '提示',
          content:
            '<p style="font-size: 15px">确定采纳该回答吗？</p>',
          onOk: () => {
            questionRequest.acceptAnswer(this,id,i)
          }
        })
      },*/
    },
    created() {
      questionRequest.getSolveQuestionAnswer(this, this.value.questionid)
    }
  }
</script>

<style scoped>
  .qa-item-wrapper {
    padding: 10px 10px;
    margin: 6px 10px;

    position: relative;
  }
  .qa.follow {
    cursor: pointer;
    display: inline-block;
  }
  .qa.follow.active {
    color: #2185d0;
  }
  .qa.follow:hover {
    color: #2185d0;
  }
  .qa.follow .follow-icon{
    font-size: 20px;
    vertical-align: top;
  }
  .qa.follow span{
    margin-left: 3px;
    margin-right: 20px;
  }
  .question-wrapper {
    position: relative;
  }
  .answer-wrapper {
    margin-top: 5px;
    position: relative;
  }
  .answer-wrapper.answer{
   padding-left: 47px;
    position: relative;
  }
  .qa.icon {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    background: #2185d0;
    font-size: 17px;
    cursor: default;
    display: inline-block;
    vertical-align: top;
  }
  .qa.icon.q {
    background: #ff9900;
  }
  .qa.text {
    font-size: 15px;
    width: 70%;
    max-width: 1000px;
    display: inline-block;
    margin-left: 15px;
    margin-top: 7px;
    vertical-align: top;
  }
  .qa.text.q {
    font-weight: 600;
  }
  .qa.btn {
    font-size: 12px;
    position: absolute;
    right: 15px;
    top: 7px;
  }
  .qa.user {
    font-size: 12px;
    position: absolute;
    right: 0px;
    top: 9px;
    color: rgba(0,0,0,0.5);
  }
  .qa.user .nickname {
    margin-right: 10px;
    cursor: pointer;
    color: rgba(0,0,0,0.5);
    font-size: 13px;
  }
  @media screen and (max-width: 1024px) {
    .qa.user {
     display: none;
    }
    .qa.btn {
      right: -18px;
    }
    .qa.text {
      width: 80%;
      max-width: 220px;
    }
  }
  .qa.user .nickname:hover {
    color: #2185d0;
  }
  .answer-status.answer {
    margin-top: 12px;
    text-align: right;
  }
  .answer-status.agree {
    margin-top: 12px;
    margin-left: 47px;
  }
  .no-answer-wrapper {
    margin-top: 12px;
    margin-left: 47px;
    color: rgba(0,0,0,0.5);
  }
</style>