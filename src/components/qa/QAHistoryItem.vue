<template>
  <card class="qa-item-wrapper">
    <div class="question-wrapper">
      <div class="qa icon q">Q<span style="font-size: 12px">{{index}}</span></div>
      <div class="qa text q">{{value.question}}</div>
    </div>
    <div>
      <div style="width: 95%;border-top: 1px dashed #e1e1e1;margin: 10px auto;"></div>
      <div  class="answer-wrapper">
        <div v-if="!changeFlag" class="answer-item">
          <div class="qa icon a">A</div>

          <div class="qa text a">{{value.answer}}</div>
           <div  class="qa user a">{{value.answertime.substring(0, value.answertime.length - 3)}}</div>
        </div>
        <div v-else class="answer-wrapper answer">
          <Input v-model="value.answer" type="textarea" :rows="4" placeholder="回答..." />

          <div class="answer-status answer">
            <Button style="margin-right: 8px"  @click="$click_close_change_answer" type="error" >关闭</Button>
            <Button  @click="$click_submit" type="success" >提交</Button>
          </div>
        </div>
        <div v-if="value.answerType == 'follow'" class="answer-status">
          <span class="nickname">答案来自于用户 <span style="color: rgba(0,0,0,0.6);font-size: 14px">{{value.user}}</span></span>
        </div>

        <div v-else class="answer-status">
          <Button v-if="!changeFlag" @click="$click_change_answer"  size="small">修改答案</Button>
        </div>

      </div>
    </div>

  </card>
</template>

<script>
  import * as questionRequest from '../../request/question'
  export default {
    name: "QAItem",
    data() {
      return {
        changeFlag: false,
        answer_bat: ''
      }
    },
    props: {
      value: {
        type: Object,
        default () {
          return {
            status: 0
          }
        }
      },
      index: 0
    },
    methods:{
      $click_accept(id, i) {
        this.$Modal.confirm({
          title: '提示',
          content:
            '<p style="font-size: 15px">确定采纳该回答吗？</p>',
          onOk: () => {
            questionRequest.acceptAnswer(this,id,i)
          }
        })
      },
      $click_change_answer() {
        this.answer_bat = this.value.answer
        this.changeFlag = true
      },
      $click_reject(id, i) {
        this.$Modal.confirm({
          title: '提示',
          content:
            '<p style="font-size: 15px">确定拒绝该回答吗？</p>',
          onOk: () => {
            questionRequest.rejectAnswer(this,id,i)
          }
        })
      },
      $click_close_change_answer() {
        this.changeFlag = false
        this.value.answer = this.answer_bat
      },
      $click_submit() {
        if (!this.value.answer) {
          this.$Message.warning("请输入答案")
          return
        }
        questionRequest.changeAnswer(this)
      }
    },
    created() {
      console.log(this.value)
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
    width: 70%;
    max-width: 1000px;
    display: inline-block;
    margin-left: 15px;
    margin-top: 7px;
    vertical-align: top;
  }
  .qa.follow {
    display: inline-block;
  }
  .qa.follow .follow-icon{
    font-size: 20px;
    vertical-align: top;
  }
  .qa.follow span{
    margin-left: 3px;
    margin-right: 20px;
  }

  .qa.text.q {
    font-weight: 600;
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
    .qa.text {
      width: 80%;
    }
  }
  .qa.user .nickname:hover {
    color: #2185d0;
  }
  .answer-status {
    margin-top: 12px;
    margin-left: 47px;
  }
  .no-answer-wrapper {
    margin-top: 12px;
    margin-left: 47px;
    color: rgba(0,0,0,0.5);
  }
  .answer-status .nickname {
    font-size: 13px;
    color: rgba(0,0,0 , 0.5);
  }

  .answer-wrapper.answer{
    padding-left: 47px;
    position: relative;
  }
  .answer-status.answer {
    margin-top: 12px;
    text-align: right;
  }
</style>