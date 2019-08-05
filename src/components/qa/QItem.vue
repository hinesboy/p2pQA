<template>
  <card  class="qa-item-wrapper">
    <div @click="$click_answer" class="question-wrapper">
      <div class="qa icon q">Q<span style="font-size: 12px">{{index}}</span></div>
      <div class="qa text q">{{value.question}}</div>
     <!-- <div class="qa user q"><span class="nickname">朱鸿雨</span>2019-7-21 12:36</div>-->

      <!--<Button class="qa btn" v-if="!answerFlag" @click.prevent.stop="$click_answer" type="text" size="small" icon="md-create">回答</Button>-->
    </div>
    <div v-if="answerFlag">
      <div style="width: 95%;border-top: 1px dashed #e1e1e1;margin: 10px auto;"></div>
      <div  class="answer-wrapper">
        <Input :disabled="!isAnswer"  v-model="answer" type="textarea" :rows="4" placeholder="回答..." />

        <div v-if="isAnswer" class="answer-status">
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
        answer: '',
        answerFlag: false,
        isAnswer: true
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
      $click_answer() {
        this.answerFlag = !this.answerFlag
        console.log(123123)
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
    }
  }
</script>

<style scoped>
  .qa-item-wrapper {
    padding: 10px 10px;
    margin: 6px 10px;

    position: relative;
  }

  .question-wrapper {
    position: relative;
  }
  .answer-wrapper {
    margin-top: 5px;
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
    width: 80%;
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
  .qa.user .nickname {
    margin-right: 10px;
    cursor: pointer;
    color: rgba(0,0,0,0.5);
    font-size: 13px;
  }
  @media screen and (max-width: 762px) {
    .qa.user {
     display: none;
    }
    .qa.btn {
      right: -18px;
    }
    .qa.text {
      max-width: 220px;
    }
  }
  .qa.user .nickname:hover {
    color: #2185d0;
  }
  .answer-status {
    margin-top: 12px;
    text-align: right;
  }
  .no-answer-wrapper {
    margin-top: 12px;
    margin-left: 47px;
    color: rgba(0,0,0,0.5);
  }
</style>