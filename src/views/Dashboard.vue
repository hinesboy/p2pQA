<template>
  <div>
    <div class="user-info-wrapper">
      <div class="user-info">
        <div class="name">{{nickname}}</div>
        <div class="email">{{email}}</div>
      </div>
      <div class="user-info-other">
        <div class="item">
          <div class="label">提交问题：</div>
          <div class="content">{{queries}}个</div>
        </div>

        <div class="item">
          <div class="label">被回答问题：</div>
          <div class="content">{{answeredQueries}}个</div>
        </div>

        <div class="item">
          <div class="label">回答问题：</div>
          <div class="content">{{answers}}个</div>
        </div>

        <div class="item">
          <div class="label">被采纳答案：</div>
          <div class="content">{{accepted}}个</div>
        </div>

        <div class="item">
          <div class="label">被赞同次数：</div>
          <div class="content">{{follows}}次</div>
        </div>

        <div class="item">
          <div class="label">总积分：</div>
          <div class="content">{{score}}分</div>
        </div>
      </div>
    </div>

    <div class="banner-wrapper">
      <Carousel class = "banner" v-model="value1" loop>
        <CarouselItem>
          <div class="demo-carousel" style="background: #506b9e;"></div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel" style="background: #2185d0;"></div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel"style="background: #2b2b2b;"></div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel" style="background: #506b9e;"></div>
        </CarouselItem>
      </Carousel>

      <div class="notice-title">
        <div class="tag"></div>
        <div class="content">通知公告</div>
      </div>
      <div class="notice-content">
        <div class="notice-item"><div class="point"></div>你的提问【机器学习的作用】已经得到回答</div>
        <div class="notice-item"><div class="point"></div>你对问题【今天天气怎么样】的回答已经被采纳</div>
        <div class="notice-item"><div class="point"></div>智慧问答 | 使用手册</div>
        <div class="notice-item"><div class="point"></div>你的提问【可以吃冰淇淋吗】已经得到回答</div>
      </div>
    </div>

    <div class="router-wrapper">
      <div class="router-title">
        <div class="tag"></div>
        <div class="content">应用入口</div>
      </div>
      <div class="router-app">
        <div @click="toMenu('/ask')" class="app-item">
          <div class="app-icon-wrapper">
            <div class="icon-question"></div>
          </div>
          <div class="icon-title">我要提问</div>
        </div>
        <div @click="toMenu('/solve')" class="app-item">
          <div class="app-icon-wrapper">
            <div class="icon-answer"></div>
          </div>
          <div class="icon-title">我要回答</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import * as questionRequest from '../request/question'
  export default {
    data() {
      return {
        value1:0,
        nickname: Cookies.get('qaNickname'),
        email: Cookies.get('qaUsername'),
        queries: 0, // 提出问题数量
        follows: 0, // 被赞同次数
        answeredQueries: 0, // 被回答问题数量
        answers: 0, // 回答数量
        score: 0, // 总计
        accepted: 0 // 被采纳水量
      }
    },
    created() {
      if (!Cookies.get('activeFlag')) {
        // 尚未登陆
        this.$router.push("/login")
      }
      questionRequest.getAmount(this)
    },
    methods: {
      toMenu(path) {
        this.$router.push(path)
      }
    }
  }
</script>
<style scoped lang="css">
  .notice-content {
    width: 100%;
    margin-top: 8px;
  }
  .notice-item {
    height: 27px;
    line-height: 27px;
    cursor: pointer;
  }
  .notice-item .point {
    width: 5px;
    height: 5px;
    margin-right: 5px;
    vertical-align: middle;
    background: gray;
    border-radius: 50%;
    display: inline-block;
  }
  .notice-item:hover {
    color: #2185d0;
  }
  .notice-title {
    position: relative;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #eeece8;
  }

  .notice-title .tag {
    position: absolute;
    top: 15px;
    left: 5px;
    width: 3px;
    height: 20px;
    border-left: 3px solid #2185d0;
  }

  .notice-title .content {
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.7);
  }

  .banner {
    height: 250px;
  }

  .demo-carousel {
    width: 100%;
    height: 250px;
  }
  .user-info-wrapper {
    padding: 15px;
    width: 350px;
    position: absolute;
    top: 25px;
    left: 20px;
    height: 665px;
    background: #fff;
    border: 1px solid #f2f2f5;
    box-shadow: 0 2px 4px 0 hsla(0, 0%, 90.6%, .5);
    border-radius: 4px;
  }

  .user-info {
    padding-top: 20px;
    box-sizing: border-box;
    height: 120px;
    border-bottom: 1px solid #eeece8;
    text-align: center;
  }

  .user-info .name {
    font-size: 24px;
    color: #111;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-info .email {
    color: white;
    background-color: rgb(51, 126, 255);
    line-height: 24px;
    height: 24px;
    padding: 0 12px;
    border-radius: 12px;
    width: 150px;
    margin: 5px auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user-info-other {
    margin-top: 15px;
  }
  .user-info-other .item {
    position: relative;
    width: 100%;
    height: 35px;
    font-size: 14px;
    line-height: 35px;
    color: rgba(0,0,0,0.7);
  }
  .user-info-other .item .label{
    position: absolute;
    top: 0;
    left: 10px;
  }
  .user-info-other .item .content{
    position: absolute;
    top: 0;
    right: 10px;
  }
  .banner-wrapper {
    top: 25px;
    left: 385px;
    right: 20px;
    height: 450px;
    position: absolute;
    background: #fff;
    border: 1px solid #f2f2f5;
    box-shadow: 0 2px 4px 0 hsla(0, 0%, 90.6%, .5);
    border-radius: 4px;
    padding: 15px;
  }

  .router-wrapper {
    top: 495px;
    left: 385px;
    right: 20px;
    height: 195px;
    position: absolute;
    background: #fff;
    border: 1px solid #f2f2f5;
    box-shadow: 0 2px 4px 0 hsla(0, 0%, 90.6%, .5);
    border-radius: 4px;
  }

  .router-title {
    position: relative;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #eeece8;
  }

  .router-title .tag {
    position: absolute;
    top: 15px;
    left: 20px;
    width: 3px;
    height: 20px;
    border-left: 3px solid #2185d0;
  }

  .router-title .content {
    position: absolute;
    top: 15px;
    left: 30px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.7);
  }

  .router-app {
    width: 100%;
    height: 145px;
  }

  .app-item {
    width: 62px;
    height: 85px;
    text-align: center;
    float: left;
    margin-left: 50px;
    margin-top: 30px;
    cursor: pointer;
  }

  .app-item:hover {
    color: #2185d0;
  }

  .app-item .icon-question {
    background: url(../../public/static/app_icon.png) no-repeat 0 0px;
    width: 120px;
    height: 124px;
    transform: scale(.5);
    transform-origin: left top;
  }

  .app-item .icon-answer {
    background: url(../../public/static/app_icon.png) no-repeat -240px -124px;
    width: 120px;
    height: 124px;
    transform: scale(.5);
    transform-origin: left top;
  }

  .app-item .icon-title {
    text-align: center;
    font-size: 13px;
    box-sizing: border-box;
    margin-top: 8px;
  }

  .app-icon-wrapper {
    width: 62px;
    height: 62px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 762px) {
    .user-info-wrapper {
      position: absolute;
      width: auto;
      top: 25px;
      left: 15px;
      right: 15px;
      height: 310px;
    }

    .banner-wrapper {
      position: absolute;
      top: 345px;
      left: 15px;
      right: 15px;
      height: 210px;
    }

    .router-wrapper {
      position: absolute;
      top: 570px;
      left: 15px;
      right: 15px;
      margin-bottom: 20px;
    }

    .banner {
      display: none;
    }
  }
</style>
