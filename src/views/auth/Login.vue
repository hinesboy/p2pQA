<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <img src="/static/m.png" alt="Vue Material Admin" width="120" height="120"/>
        <h1 class="flex my-4 primary--text" style="font-size: 2em !important;">欢迎登陆</h1>
      </div>
      <v-form>

        <v-text-field
          append-icon="email"
          name="login"
          placeholder="邮箱"
          type="text"
          v-model="username"
        ></v-text-field>

        <v-text-field
          append-icon="lock"
          name="password"
          placeholder="密码"
          id="password"
          type="password"
          v-model="password"
          @keyup.enter="login"
        ></v-text-field>

      </v-form>
    </v-card-text>
    <div class="login-btn">
      <!--<v-btn icon>
        <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="red">fa fa-google fa-lg</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
      </v-btn>-->
      <v-spacer></v-spacer>
      <v-btn block color="primary" @click="login" :loading="loading" >登陆</v-btn>
      <div class="register-btn" @click="toRegister">新用户注册</div>
    </div>

  </v-card>
</template>

<script>
  import Cookies from 'js-cookie'
  import * as loginRequest from "../../request/login";
  export default {
    data: () => ({
      loading: false,
      username: "",
      password: ""
    }),
    created() {
      //
      this.username = Cookies.get('qaUsername')
      this.password = Cookies.get('qaPassword')
      if (this.username && this.password) {
        // 直接登陆
        this.login()
      }
    },
    mounted() {
    },
    methods: {
      login() {
        this.loading = true
        if (!this.username || !this.password) {
          //  账号密码不能为空
          this.$Message.error("账号密码不能为空")
          this.loading = false
          return
        }
        // handle login
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!reg.test(this.username)) {
          //  邮箱不合法
          this.$Message.error("邮箱格式不正确")
          this.loading = false
          return
        }
        if (this.password.length < 4 || this.password.length > 16) {
          //  密码格式不正确
          this.$Message.error("密码格式不正确")
          this.loading = false
          return
        }
        /* 调用登陆接口*/
        loginRequest.Login(this)

      },
      toRegister() {
        this.$router.push('/register')
      }
    }
  }
</script>
<style scoped lang="css">
  .register-btn {
    cursor: pointer;
    margin-top: 12px;
    margin-right: 8px;
    color: #999;
    text-align: right;
  }

  .register-btn:hover {
    color: #2185d0;
  }
</style>
