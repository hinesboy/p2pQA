<template>
  <card class="qa-item-wrapper">
    <div class="question-wrapper">
      <div class="qa icon q">Q<span style="font-size: 12px">{{index}}</span></div>
      <div class="qa text q">{{value.question}}</div>
     <!-- <div class="qa user q"><span class="nickname">朱鸿雨</span>2019-7-21 12:36</div>-->
    </div>
    <div v-if="value.status != 0" v-for="(answer,i) in value.answers">
      <div style="width: 95%;border-top: 1px dashed #e1e1e1;margin: 10px auto;"></div>
      <div  class="answer-wrapper">
        <div class="answer-item">
          <div class="qa icon a">A<span style="font-size: 12px">{{i+1}}</span></div>

          <div class="qa text a">{{answer.answer}}</div>
          <!-- <div class="qa user a"><span class="nickname">王刚</span>2019-7-22 05:22</div>-->
        </div>
        <div v-if="value.status ==1" class="answer-status">
          <Button @click="$click_accept(answer.answerid, i)" type="success" size="small" icon="md-checkmark">采纳</Button>
          <Button @click="$click_reject(answer.answerid, i)" style="margin-left: 10px" type="error" size="small" icon="md-close">拒绝</Button>
        </div>

        <div v-if="value.status ==2" class="answer-status">
          <Button disabled type="success" size="small" icon="md-checkmark">已采纳</Button>
        </div>

      </div>
    </div>
    <div v-if="value.status == 0" style="width: 95%;border-top: 1px dashed #e1e1e1;margin: 10px auto;"></div>
    <div v-if="value.status == 0" class="no-answer-wrapper">
      暂无结果
    </div>
  </card>
</template>

<script>
  import * as questionRequest from '../../request/question'
  export default {
    name: "QAItem",
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
  .qa.user {
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 9px;
    color: rgba(0,0,0,0.5);
  }
  .qa.user .nickname {
    margin-right: 10px;
    cursor: pointer;
    color: rgba(0,0,0,0.5);
    font-size: 13px;
  }
  @media screen and (max-width: 1366px) {
    .qa.user {
     display: none;
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
</style>